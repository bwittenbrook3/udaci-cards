import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { Constants } from 'expo'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'

import configureStore from './store'
import { Provider } from 'react-redux'

import DecksList from './components/DecksList'
import NewDeck from './components/NewDeck'
import Deck from './components/Deck'
import NewCard from './components/NewCard'
import Quiz from './components/Quiz'

const UdaciStatusBar = ({backgroundColor, ...props}) => (
  <View style={{height: Constants.statusBarHeight }}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
  </View>
)

const TabNav = TabNavigator({
  Decks: {
    screen: DecksList,
    navigationOptions: {
      title: `Decks`,
      tabBarIcon: () => (
        <MaterialCommunityIcons name="cards-outline" size={27}/>
      )
    },
  },
  NewDecks: {
    screen: NewDeck,
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
    screen: Deck
  },
  NewCardView: {
    screen: NewCard
  },
  QuizView: {
    screen: Quiz
  }
})

export default class App extends React.Component {
  render() {
    return (
      <Provider store={configureStore()}>
        <View style={{flex: 1}}>
          <UdaciStatusBar />
          <MainNav />
        </View>
      </Provider>
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
