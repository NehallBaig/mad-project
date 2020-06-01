import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import InputTextField from "../../components/InputTextField";
import Firebase from 'firebase';

let config = {
  apiKey: "AIzaSyDQhaDFql-UmyFk-ZKOfG-5rHsgaEG6pwg",
  authDomain: "nehal-app.firebaseapp.com",
  databaseURL: "https://nehal-app.firebaseio.com",
  projectId: "nehal-app",
  storageBucket: "nehal-app.appspot.com",
  messagingSenderId: "618345353653",
  appId: "1:618345353653:web:44669e2bbea4ed42e009fc",
  measurementId: "G-5PXB5JH7TL"
};
if (!Firebase.apps.length) {
  Firebase.initializeApp(config);
}

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      pass: ""
    }
  }

  Login = async () => {
    console.log(this.state)
    let { email, pass } = this.state;
    Firebase.auth().signInWithEmailAndPassword(email, pass)
      .then(res => {
        let uid = res.user.uid;
        console.log(res)
        this.props.navigation.navigate("Home")
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        alert(errorMessage)
        // this.setState({ spinner: false })
      });
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <View>
          <View style={{ marginTop: 60, alignItems: "center", justifyContent: "center" }}>
            {/* <Image source={require("./assets/logo.png")} /> */}
            <Text style={[styles.text, { marginTop: 10, fontSize: 22, fontWeight: "500" }]}>Login</Text>
          </View>


          <InputTextField
            style={styles.inputTitle}
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

          <Text style={[styles.text, styles.link, { textAlign: "right" }]}>Forgot Password?</Text>

          <TouchableOpacity style={styles.submitContainer} onPress={() => { this.Login() }}>
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
              Login
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
            Don't have an account?
          </Text>
          <TouchableOpacity style={{ alignItems: "center" }} onPress={() => {
            this.props.navigation.navigate("SignUp")
          }}>
            <Text style={[styles.text, styles.link]}>Register Now</Text>
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
