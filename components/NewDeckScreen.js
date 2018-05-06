import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default ({}) => (
  <View style={styles.container}>
    <Text>New Deck View</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
})
