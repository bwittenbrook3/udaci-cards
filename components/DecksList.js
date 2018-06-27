import React, { Component } from 'react'
import { StyleSheet, FlatList, View, Dimensions, Text } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { setupDecks } from '../actions/decks'
import { connect } from 'react-redux'
import _ from 'lodash'


const { width } = Dimensions.get('window')

const DeckItem = ({ deck, onPress }) => (
  <TouchableOpacity
    style={styles.deckItem}
    onPress={onPress}
  >
    <Text style={styles.deckItemHeader}>{deck.title}</Text>
    <Text>{deck.questions.length} cards</Text>
  </TouchableOpacity>
)

class DecksList extends Component {

  componentDidMount() {
    const { initializeDecks } = this.props
    initializeDecks()
  }

  render() {
    const { navigation, decks } = this.props

    return (
      <View style={styles.container}>
        <FlatList
          data={decks}
          renderItem={({item}) =>
            <DeckItem
              deck={item}
              onPress={() => navigation.navigate('DeckView', {deckName: item.title})}
            />
          }
          ItemSeparatorComponent={() => (
            <View style={styles.seperator} />
          )}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  const decks =
    _.values(state.decks)
    .map(d => ({
      ...d,
      key: d.title
    }))

  return {
    decks: decks
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initializeDecks: async () => dispatch( await setupDecks()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DecksList)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  seperator: {
    borderBottomWidth: 2,
    borderBottomColor: "#aaa",
    width: width
  },
  deckItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 150
  },
  deckItemHeader: {
    fontSize: 35
  }
})
