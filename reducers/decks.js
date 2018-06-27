import { GET_DECKS, ADD_DECK } from '../actions/types'

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
    default:
      return state
  }
}

export default decks
