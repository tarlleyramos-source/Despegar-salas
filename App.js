import React, { useRef } from 'react';
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';

// URL do app hospedado no GitHub Pages
// Substitua pela URL real quando publicar
const APP_URL = 'https://tarlleyramos-source.github.io/Despegar-salas/index.html';

export default function App() {
  const webviewRef = useRef(null);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6600FF" />
      <ExpoStatusBar style="light" backgroundColor="#6600FF" />
      <WebView
        ref={webviewRef}
        source={{ uri: APP_URL }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowFileAccess={true}
        mediaPlaybackRequiresUserAction={false}
        allowsInlineMediaPlayback={true}
        startInLoadingState={true}
        cacheEnabled={true}
        onAndroidBackPress={() => {
          if (webviewRef.current) {
            webviewRef.current.goBack();
            return true;
          }
          return false;
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6600FF',
  },
  webview: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
});
