import React, { Component } from 'react'
import { View } from 'react-native'

class NewCard extends Component {

  static navigationOptions = ({navigation}) => {
    const { deckName } = navigation.state.params
    return {
      title: `New Card - ${deckName}`
    }
  }

  render() {
    return (
      <View>

      </View>
    )
  }
}

export default NewCard
