import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import _ from 'lodash'
import Button from 'react-native-button'
import { connect } from 'react-redux'
import { scheduleNotification } from '../utils/notifications'

const { width } = Dimensions.get('window')
const randomizeQuestions = (questions) => _.shuffle(questions)

class Quiz extends Component {

  state = {
    questions: []
  }

  componentDidMount() {
    this.setState({
      questions: randomizeQuestions(this.props.deck.questions)
    })
  }

  componentWillUnmount() {
    this.setState({questions: []})
  }

  static navigationOptions = ({navigation}) => {
    const { deckName } = navigation.state.params
    return {
      title: `Quiz ${deckName}`
    }
  }

  render() {
    const { questions, isViewingAnswer } =  this.state
    const { navigation, deck } = this.props

    const {
      remainingQuestions,
      currentQuestion
    } = parseQuestions(questions)

    const toggleViewAnswer = () => {
      isViewingAnswer ?
        this.setState({isViewingAnswer: false}) :
        this.setState({isViewingAnswer: true})
    }

    const restart = () => {
      this.setState({questions: randomizeQuestions(deck.questions)})
    }

    if (remainingQuestions.length > 0 ) {
      return (
        <Question
          questions={questions}
          isViewingAnswer={isViewingAnswer}
          toggleViewAnswer={toggleViewAnswer}
          answer={(response) => {

            const updatedQuestions = questions.map(q => {
              if (q === currentQuestion) {
                return {
                  ...q,
                  response
                }
              } else {
                return {...q}
              }
            })
            this.setState({questions: updatedQuestions})
          }}
        />
      )
    } else {
      return (
        <Score
          questions={questions}
          restart={restart}
          backToDeck={() => navigation.pop()}
        />
      )
    }

  }
}

const parseQuestions = questions => {

  const remainingQuestions = questions.filter(q => q.response === undefined)
  const answeredQuestions = questions.filter(q => q.response !== undefined)
  const currentQuestion = remainingQuestions[0]

  return {
    remainingQuestions,
    answeredQuestions,
    currentQuestion
  }
}

const Score = ({questions, restart, backToDeck }) => {

  const correctQuestions = questions.filter(q => q.response === 'correct')

  const { remainingQuestions } = parseQuestions(questions)
  if (questions.length > 0 && remainingQuestions.length === 0) {
    // reset notifications for 1 day from now since we have finished a quiz
    scheduleNotification()
  }

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{correctQuestions.length} / {questions.length} questions answered correctly</Text>
      <Button
        containerStyle={{
          width: width - 100,
          paddingTop:10,
          paddingBottom:10,
          marginTop: 20,
          height:55,
          overflow:'hidden',
          borderRadius:4,
          backgroundColor: '#515E91'
        }}
        style={{fontSize: 30, color: 'white'}}
        onPress={restart}>
        Start Over
      </Button>
      <Button
        containerStyle={{
          width: width - 100,
          paddingTop:10,
          paddingBottom:10,
          marginTop: 20,
          height:55,
          overflow:'hidden',
          borderRadius:4,
          backgroundColor: '#515E91'
        }}
        style={{fontSize: 30, color: 'white'}}
        onPress={backToDeck}>
        Back To Deck
      </Button>
    </View>
  )
}

const Question =  ({ questions, isViewingAnswer, toggleViewAnswer, answer}) => {

  const {
    remainingQuestions,
    answeredQuestions,
    currentQuestion
  } = parseQuestions(questions)

  return (
    <View style={styles.container}>
      <Text style={styles.position}>{answeredQuestions.length + 1}/{questions.length}</Text>
      <View style={styles.container}>
        <Text style={styles.question}>{
          isViewingAnswer ?
          currentQuestion.answer :
          currentQuestion.question
        }</Text>
        <Button
          containerStyle={{
            width: width - 100,
            paddingTop:10,
            paddingBottom:10,
            height:55,
            marginTop: 10,
            overflow:'hidden',
            borderRadius:4
          }}
          style={{fontSize: 30, color: 'red'}}
          onPress={toggleViewAnswer}>
          {
            isViewingAnswer ?
            "View Question" :
            "View Answer"
          }
        </Button>
      </View>
      <Button
        containerStyle={{
          width: width - 100,
          paddingTop:10,
          paddingBottom:10,
          marginBottom: 10,
          height:55,
          overflow:'hidden',
          borderRadius:4,
          backgroundColor: 'green'
        }}
        style={{fontSize: 30, color: 'white'}}
        onPress={() => answer('correct')}>
        Correct
      </Button>
      <Button
        containerStyle={{
          width: width - 100,
          paddingTop:10,
          paddingBottom:10,
          marginBottom: 50,
          height:55,
          overflow:'hidden',
          borderRadius:4,
          backgroundColor: 'red'
        }}
        style={{fontSize: 30, color: 'white'}}
        onPress={() => answer('incorrect')}>
        Incorrect
      </Button>
    </View>
  )
}

const mapStateToProps = (state, props) => {
  const { deckName } = props.navigation.state.params

  return {
    deck: state.decks[deckName]
  }
}

export default connect(mapStateToProps)(Quiz)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  position: {
    fontSize: 18,
    marginTop: 10,
    width: width - 20,
    textAlign: 'left'
  },
  question: {
    fontSize: 36,
    textAlign: "center",
    paddingLeft: 20,
    paddingRight: 20
  }
})
