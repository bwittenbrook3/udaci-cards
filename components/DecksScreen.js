import React from 'react'
import { StyleSheet, FlatList, View, Dimensions } from 'react-native'

const { width } = Dimensions.get('window')

import Deck from './Deck'

const data = [
  {key: 'udacicards'},
  {key: 'b'}
]

export default ({ navigation }) => (
  <View style={styles.container}>
    <FlatList
      data={data}
      renderItem={({item}) =>
        <Deck
          name={item.key}
          navigation={navigation}
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
    borderBottomColor: "#eee",
    width: width
  }
})
