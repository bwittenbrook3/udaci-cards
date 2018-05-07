import React from 'react'
import { StyleSheet, FlatList, View, Dimensions, Text } from 'react-native'
import { TouchableOpacity } from 'react-native'

const { width } = Dimensions.get('window')

const data = [
  {key: 'udacicards'},
  {key: 'b'}
]

const DeckItem = ({ name, onPress }) => (
  <TouchableOpacity
    style={styles.deckItem}
    onPress={onPress}
  >
    <Text style={styles.deckItemHeader}>{name}</Text>
    <Text>33 cards</Text>
  </TouchableOpacity>
)

export default ({ navigation }) => (
  <View style={styles.container}>
    <FlatList
      data={data}
      renderItem={({item}) =>
        <DeckItem
          name={item.key}
          onPress={() => navigation.navigate('DeckView')}
        />
      }
      ItemSeparatorComponent={() => (
        <View style={styles.seperator} />
      )}
    />
  </View>
)

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
