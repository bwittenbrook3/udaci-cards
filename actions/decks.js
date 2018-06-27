import { ADD_DECK, GET_DECKS, ADD_CARD_TO_DECK } from './types'
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

const saveDecks = async (decks) => {
  await AsyncStorage.setItem(KEY, JSON.stringify(decks))
}

const getDecks = async () => {
  let decks = await AsyncStorage.getItem(KEY)
  if (decks) {
    return JSON.parse(decks)
  } else {
    return null;
  }
}

export function setupDecks() {
  return async dispatch => {

    let decks = await getDecks()
    if ( decks === null) {
      decks = initialDecks
      saveDecks(initialDecks)
    }

    dispatch({
      type: GET_DECKS,
      decks: decks
    })
  }
}

export function saveDeckTitle(title) {
  return async dispatch => {
    let decks = await getDecks()
    decks = {
      ...decks,
      [title]: {
        title: title,
        questions: []
      }
    }
    await saveDecks(decks)

    dispatch({
      type: ADD_DECK,
      deck: decks[title]
    })
  }
}

export function addCardToDeck(deckTitle, card) {
  return async dispatch => {
    let decks = await getDecks(),
        deck = decks[deckTitle]

    console.log(deckTitle)
    console.log(card)


    deck = {
      ...deck,
      questions: [
        ...deck.questions,
        card
      ]
    }

    decks = {
      ...decks,
      [deck.title]: deck
    }

    await saveDecks(decks)

    dispatch({
      type: ADD_CARD_TO_DECK,
      deckTitle,
      card
    })

  }
}
