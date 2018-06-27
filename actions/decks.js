import { ADD_DECK, GET_DECKS } from './types'
import { AsyncStorage } from "react-native"
import _ from 'lodash'

const KEY = '@UdaciCards:decks'

const initialDecks = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}

export function setupDecks() {
  return async dispatch => {

    let decks = await AsyncStorage.getItem(KEY)
    if ( decks === null) {
      decks = JSON.stringify(initialDecks)
      await AsyncStorage.setItem(KEY, JSON.stringify(decks))
    }

    dispatch({
      type: GET_DECKS,
      decks: JSON.parse(decks)
    })
  }
}

export function saveDeckTitle(title) {
  return async dispatch => {
    let decks = JSON.parse(await AsyncStorage.getItem(KEY))
    decks = {
      ...decks,
      [title]: {
        title: title,
        questions: []
      }
    }
    await AsyncStorage.setItem(KEY, JSON.stringify(decks))

    dispatch({
      type: ADD_DECK,
      deck: decks[title]
    })
  }
}
