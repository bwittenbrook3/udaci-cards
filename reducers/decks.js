import { GET_DECKS, ADD_DECK, ADD_CARD_TO_DECK } from '../actions/types'

const decks = (state = {}, action) => {
  switch (action.type) {
    case GET_DECKS:
      return {
        ...action.decks
      }
    case ADD_DECK:
      return {
        ...state,
        [action.deck.title]: action.deck
      }
    case ADD_CARD_TO_DECK:
      let deck = state[action.deckTitle]
      return {
        ...state,
        [deck.title]: {
          ...deck,
          questions: [
            ...deck.questions,
            action.card
          ]
        }
      }

    default:
      return state
  }
}

export default decks
