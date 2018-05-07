import React, { Component } from 'react'
import {
  KeyboardAvoidingView,
  Text,
  StyleSheet,
  TextInput,
  Dimensions
} from 'react-native'
import Button from 'react-native-button'

const { width } = Dimensions.get('window')

class NewDeckView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  render() {
    return (
      <KeyboardAvoidingView
        enabled
        behavior="padding"
        style={styles.container}
      >
        <Text style={styles.header}>What is the title of your new deck?</Text>
        <TextInput
          style={styles.input}
          editable = {true}
          maxLength = {40}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
          placeholder="Deck Title"
        />
        <Button
          containerStyle={{padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: '#515E91'}}
          style={{fontSize: 20, color: 'white'}}
          styleDisabled={{color: 'red'}}
          onPress={() => console.log('Add deck')}>
          Submit
        </Button>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    fontSize: 35,
    marginBottom: 50,
    paddingRight: 20,
    paddingLeft: 20
  },
  input: {
    backgroundColor: "#ccc",
    width: width,
    fontSize: 20,
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 30,
    marginBottom: 50
  }
})

export default NewDeckView