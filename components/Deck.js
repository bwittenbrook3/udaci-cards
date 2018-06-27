import React, { Component } from 'react'
import { StyleSheet, View, Text, Dimensions } from 'react-native'
import Button from 'react-native-button'
import { connect } from 'react-redux'

const { width } = Dimensions.get('window')

class DeckView extends Component {

  static navigationOptions = ({navigation}) => {
    const { deckName } = navigation.state.params
    return {
      title: `${deckName}`
    }
  }

  render() {
    const { navigation, deck } = this.props

    return (
      <View style={styles.container}>
        <Text style={styles.deckTitle}>{deck.title}</Text>
        <Text style={styles.deckSubtitle}>{deck.questions.length} cards</Text>
        <Button
          containerStyle={[styles.button, {marginTop: 60}]}
          style={styles.buttonText}
          onPress={() => navigation.navigate('NewCardView', {
            deckName: deck.title
          })
          }>
          Add Card
        </Button>
        <Button
          containerStyle={styles.button}
          disabled={deck.questions.length === 0}
          styleDisabled={{color: 'grey'}}
          style={styles.buttonText}
          onPress={() => navigation.navigate('QuizView', {
            deckName: deck.title
          })
          }>
          Start Quiz
        </Button>
      </View>
    )
  }
}

const mapStateToProps = (state, props) => {
  const { deckName } = props.navigation.state.params

  return {
    deck: state.decks[deckName]
  }
}

export default connect(mapStateToProps)(DeckView)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  deckTitle: {
    fontSize: 34
  },
  deckSubtitle: {
    fontSize: 20
  },
  button: {
    width: width - 100,
    paddingTop:10,
    paddingBottom:10,
    height:55,
    marginTop: 10,
    overflow:'hidden',
    borderRadius:4,
    backgroundColor: '#515E91'
  },
  buttonText: {
    fontSize: 30,
    color: 'white'
  }
})
