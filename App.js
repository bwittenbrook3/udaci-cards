import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { Constants } from 'expo'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'

import DecksScreen from './components/DecksScreen'
import NewDeckScreen from './components/NewDeckScreen'

const UdaciStatusBar = ({backgroundColor, ...props}) => (
  <View style={{height: Constants.statusBarHeight }}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
  </View>
)

const DeckView = () => (
  <View>
    <Text>Deck View</Text>
  </View>
)

const TabNav = TabNavigator({
  Decks: {
    screen: DecksScreen,
    navigationOptions: {
      title: `Decks`,
      tabBarIcon: () => (
        <MaterialCommunityIcons name="cards-outline" size={27}/>
      )
    },
  },
  NewDecks: {
    screen: NewDeckScreen,
    navigationOptions: {
      title: `Add Deck`,
      tabBarIcon: () => (
        <Ionicons name="ios-add" size={30} />
      )
    },
  }
});


const MainNav = StackNavigator({
  Home: {
    screen: TabNav
  },
  DeckView: {
    screen: DeckView
  }
})


export default class App extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <UdaciStatusBar />
        <MainNav />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
