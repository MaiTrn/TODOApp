import React from 'react'
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native'
import Constants from 'expo-constants'
import Todo from './Todo'
import Counter from './Count'

export default class App extends React.Component {
  render() {
    return (
      <View style={[styles.container, styles.fill]}>
        <Counter />

        <View style={styles.fill}>
            <Todo />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create ({
  clock: {
      borderRadius: 10,
      alignItems: 'center',
      height: 250,
      backgroundColor: '#9A4C4B',
      borderBottomColor:'black',
      borderBottomWidth: 1.5,
  },

  button :{
    alignItems: 'center',
    backgroundColor: '#D48C8C',
    padding: 10,
    borderRadius: 3,
    opacity: 0.8,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
  },

  text: {
    color: '#F1EFEF',
  },

  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#36363A',
    justifyContent: 'center',
  },

  fill: {
    flex: 1,
  }
})