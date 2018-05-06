import React from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import { Dimensions } from 'react-native'

const { width } = Dimensions.get('window')

export default ({ name }) => (
  <TouchableOpacity style={styles.container}>
    <Text style={styles.header}>{name}</Text>
    <Text style={styles.subtitle}>33 cards</Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 150
  },
  header: {
    fontSize: 35
  }
})
