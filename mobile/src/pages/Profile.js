import React from 'react'
import { View } from 'react-native'
import { WebView } from 'react-native-webview';

function Profile({ navigation }) {

    const gitrubUsername = navigation.getParam('github_username')
    return <WebView
        originWhitelist={['*']}
        source={{ uri: `https://github.com/${gitrubUsername}` }}
        style={{ flex: 1 }} />
}

export default Profile;