import { AsyncStorage } from "react-native"
import _ from 'lodash'

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

const KEY = '@UdaciCards:decks'

export async function initializeDecks() {
  try {
    const decks = await AsyncStorage.getItem(KEY)
    if ( decks === null) {
      await AsyncStorage.setItem(KEY, JSON.stringify(initialDecks))
    }
  } catch (error) {
    // Error saving data
  }
}

export async function getDecks() {
  const decks = JSON.parse(await AsyncStorage.getItem(KEY))
  return _.values(decks)
}

export async function getDeck(deck) {
  const decks = JSON.parse(await AsyncStorage.getItem(KEY))
  return decks[deck]
}

export async function saveDeckTitle(title) {
  let decks = JSON.parse(await AsyncStorage.getItem(KEY))

  decks = {
    ...decks,
    [title]: {
      title: title,
      questions: []
    }
  }

  await AsyncStorage.setItem(KEY, JSON.stringify(decks))

}
