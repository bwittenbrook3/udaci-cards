import React, { Component } from 'react'
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native'
import Button from 'react-native-button'
const { width } = Dimensions.get('window')
import { addCardToDeck } from '../actions/decks'
import { connect } from 'react-redux'

class NewCard extends Component {

  state = {
    question: '',
    answer: ''
  }

  static navigationOptions = ({navigation}) => {
    const { deckName } = navigation.state.params
    return {
      title: `New Card - ${deckName}`
    }
  }

  _createNewCard = async () => {
    const {...card } = this.state
    const { addCardToDeck, navigation } = this.props
    const { deckName } = navigation.state.params
    Keyboard.dismiss()
    await addCardToDeck(deckName, {...card})
    this.setState({
      question: '',
      answer: ''
    })
    navigation.pop()
  }

  _canCreateNewCard = () => {
    const {question, answer} = this.state
    return question.length > 0 && answer.length > 0
  }

  render() {
    return (
      <KeyboardAvoidingView
        enabled
        behavior="padding"
        style={styles.container}
      >

        <TextInput
          style={styles.input}
          editable = {true}
          onChangeText={(question) => this.setState({question})}
          value={this.state.question}
          placeholder="Question"
        />

        <TextInput
          style={styles.input}
          editable = {true}
          onChangeText={(answer) => this.setState({answer})}
          value={this.state.answer}
          placeholder="Answer"
        />

        <Button
          containerStyle={styles.button}
          style={{fontSize: 26, color: 'white'}}
          styleDisabled={{color: 'grey'}}
          disabled={!this._canCreateNewCard()}
          onPress={this._createNewCard}
        >
          Submit
        </Button>

      </KeyboardAvoidingView>
    )
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    addCardToDeck: async (deckName, card) => dispatch(await addCardToDeck(deckName, card))
  }
}

export default connect(null, mapDispatchToProps)(NewCard)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  input: {
    backgroundColor: "#ccc",
    width: width,
    fontSize: 26,
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 30,
    paddingRight: 30,
    marginBottom: 10
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
})
