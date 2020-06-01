import React from 'react';
import { Clipboard, Alert, Platform, View } from 'react-native';
import Header from '../../layout/Header';
import {
  ImageNotData,
  ImageNotDataWrapper,
  ProgressText,
  ProgressTextWrapper
} from './styles';
import parseUrl from '../../utils/parseUrl';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import uuid from 'uuid/v4';
import DownloadFile from '../../components/DownloadFile';
import extractFileUrl from '../../utils/extractFileUrl';
import InstagramRequest from '../../services/instagramRequest';
import Button from '../../components/Button';


class Home extends React.Component {
  state = {
    fileUrl: '',
    sourceUrl: null,
    sourceType: null,
    count: 0,
    downloading: false,
    isLogin: false,

  };

  async componentDidMount() {
    await MediaLibrary.requestPermissionsAsync();
  }

  // handlePasteButton = fileUrl => () => {
  //   Clipboard.getString().then(dataPasted => {
  //     this.setState({ fileUrl: dataPasted });
  //   });
  // };

  handleCheckUrl = async () => {
    const { fileUrl } = this.state;
    const { url: urlParsed, error: parseError } = parseUrl(fileUrl);
    if (parseError) {
      Alert.alert('Error', 'Invalid url');
      return;
    }
    const fileData = await InstagramRequest.getFileData(urlParsed);
    const { data, error, type } = extractFileUrl(fileData);
    if (error) {
      Alert.alert('Error', 'Try again');
      return;
    }
    this.setState({ fileUrl: '', sourceUrl: data, sourceType: type });
  };

  onChangeInput = fileUrl => {
    this.setState({ fileUrl });
  };

  resetDownload = () => {
    this.setState({ sourceUrl: null, sourceType: null });
  };

  downloadFile = () => {
    const { sourceType, sourceUrl } = this.state;
    this.setState({ downloading: true });
    FileSystem.downloadAsync(
      sourceUrl,
      FileSystem.documentDirectory +
      uuid() +
      (sourceType === 'GraphVideo' ? '.mp4' : '.jpg')
    )
      .then(async ({ uri }) => {
        MediaLibrary.saveToLibraryAsync(uri).then(() => {
          Alert.alert('Downloaded succesfully', 'Visit your gallery');
        });
        this.setState({ downloading: false });
        this.setState({ sourceUrl: null, sourceType: null });
      })
      .catch(error => {
        Alert.alert('Error', 'Try again');
      });
  };




  render() {
    const { isLogin, fileUrl, sourceType, sourceUrl, downloading } = this.state;

    return (
      <>

        <View>
          <Header
            // handlePasteButton={() => { this.handlePasteButton() }}
            onChangeInput={this.onChangeInput}
            handleCheckUrl={this.handleCheckUrl}
            fileUrl={fileUrl}
          />
          {/* <Button /> */}
          {downloading && (
            <ProgressTextWrapper>
              <ProgressText>Downloading file</ProgressText>
              <ProgressText>Please wait...</ProgressText>
            </ProgressTextWrapper>
          )}
          {sourceUrl && (
            <DownloadFile
              uri={sourceUrl}
              sourceType={sourceType}
              downloadFile={this.downloadFile}
              resetDownload={this.resetDownload}
            />
          )}
          {!sourceUrl && (
            <ImageNotDataWrapper>
              <ImageNotData source={require('../../../assets/attach.png')} />
            </ImageNotDataWrapper>
          )}
        </View>

      </>
    );
  }
}

export default Home;
