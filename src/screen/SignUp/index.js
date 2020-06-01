import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import InputTextField from "../../components/InputTextField";
import Firebase from 'firebase';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      pass: "",
      name: "",
      confirmPass: "",
      newUserUid: null
    }
  }

  signUp = async () => {

    let { email, pass, name, confirmPass } = this.state;
    if (email == "" || pass == "" || name == "" || confirmPass == "") {
      alert("please fill all the fields")
    }
    else if (pass != confirmPass) {
      alert("your password must be same and atleast 6 character long")
    }
    else {
      Firebase.auth().createUserWithEmailAndPassword(email, pass).then((e) => {
        console.log("user uid******", e.user.uid);
        // this.setState({ newUserUid: e.user.uid })
        // this.uploadImage(this.state.image);
        alert("Congrats your account has been successfully created do login and continue")

      }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // console.log(errorMessage);
        alert(errorMessage);
      });
    }
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <View>
          <View style={{ marginTop: 60, alignItems: "center", justifyContent: "center" }}>
            {/* <Image source={require("./assets/logo.png")} /> */}
            <Text style={[styles.text, { marginTop: 10, fontSize: 22, fontWeight: "500" }]}>SignUp</Text>
          </View>

          <InputTextField
            style={{
              marginTop: 32,
              marginBottom: 8
            }}
            title="Name"
            onChangeText={(text) => this.setState({ name: text })}
            value={this.state.name}
          />
        <InputTextField
            style={{
              marginTop: 32,
              marginBottom: 8
            }}
            title="Email"
            onChangeText={(text) => this.setState({ email: text })}
            value={this.state.email}
          />
        
          <InputTextField
            style={{
              marginTop: 32,
              marginBottom: 8
            }}
            title="Password"
            isSecure={true}
            onChangeText={(text) => this.setState({ pass: text })}
            value={this.state.pass}
          />
          <InputTextField
            style={{
              marginTop: 32,
              marginBottom: 8
            }}
            title="Confirm Password"
            isSecure={true}
            onChangeText={(text) => this.setState({ confirmPass: text })}
            value={this.state.confirmPass}
          />


          <TouchableOpacity style={styles.submitContainer} onPress={() => { this.signUp() }}>
            <Text
              style={[
                styles.text,
                {
                  color: "#FFF",
                  fontWeight: "600",
                  fontSize: 16
                }
              ]}
            >
              SignUp
            </Text>
          </TouchableOpacity>

          <Text
            style={[
              styles.text,
              {
                fontSize: 14,
                color: "#ABB4BD",
                textAlign: "center",
                marginTop: 24
              }
            ]}
          >
            already have an account?
          </Text>
          <TouchableOpacity style={{ alignItems: "center" }} onPress={() => {
            this.props.navigation.navigate("Login")
          }}>
            <Text style={[styles.text, styles.link]}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 30
  },
  text: {
    // fontFamily: "Avenir Next",
    color: "#1D2029"
  },
  socialButton: {
    flexDirection: "row",
    marginHorizontal: 12,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(171, 180, 189, 0.65)",
    borderRadius: 4,
    backgroundColor: "#fff",
    shadowColor: "rgba(171, 180, 189, 0.35)",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 5
  },
  socialLogo: {
    width: 16,
    height: 16,
    marginRight: 8
  },
  link: {
    color: "#FF1654",
    fontSize: 14,
    fontWeight: "500"
  },
  submitContainer: {
    backgroundColor: "#FF1654",
    fontSize: 16,
    borderRadius: 4,
    paddingVertical: 12,
    marginTop: 32,
    alignItems: "center",
    justifyContent: "center",
    color: "#FFF",
    shadowColor: "rgba(255, 22, 84, 0.24)",
    shadowOffset: { width: 0, height: 9 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 5
  }
});
