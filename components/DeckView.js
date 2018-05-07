import React, { Component } from 'react'
import { View, Text } from 'react-native'

class DeckView extends Component {
  static navigationOptions = ({navigation}) => {
    const { deck } = navigation.state.params

    return {
      title: `${deck}`
    }
  }

  render() {

    return (
      <View>
        <Text>uidacicards</Text>
        <Text>30 cards</Text>
      </View>
    )
  }
}

export default DeckView
