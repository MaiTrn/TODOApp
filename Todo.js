import React from 'react'
import {TouchableOpacity, Switch, Text, View, ScrollView, StyleSheet} from 'react-native'
import AddTodo from'./AddTodo'

let id = 0

const Todo = props => (
  <View style={styles.todoContainer}>
    <Switch value={props.todo.checked} onChange={props.onToggle}/>
    <Text style={[styles.todoText, styles.textColor]}>{props.todo.text}</Text>
   	<View style={[styles.deletebtnContainer, styles.fill]}>
   		<TouchableOpacity style={styles.button} onPress={props.onDelete}>
    		<Text style={styles.textColor}>Delete</Text>
   		 </TouchableOpacity>
   	</View>
  </View>
 )

 export default class todoApp extends React.Component {
 	constructor() {
 		super()
 		this.state = {
			 todos: [],
 		}
	 }
	 
	componentDidUpdate() {
		if (this.state.todos.length == 0)
			id = 0
	}

 	addTodo = newTodo => {
 		this.setState(prevState => ({
 			todos: [...this.state.todos, newTodo],
		}))
		id++
	}
	
 	removeTodo(id) {
 		this.setState({
 			todos: this.state.todos.filter(todo => (todo.id !== id))
 		})
 	}

 	toggleTodo(id) {
 		this.setState({
 			todos: this.state.todos.map(todo => {
 				if (todo.id !== id) return todo
 				return {
 					id: todo.id,
 					text: todo.text,
 					checked: !todo.checked,
 				}
 			})
 		})
	 }
	 
 	render() {
 		return (
 		<View style={styles.fill}>
 			<Text style={[styles.titleText, styles.textColor]}>TODOS 	•  {this.state.todos.length}</Text>
			<AddTodo style={styles.addTodo} onSubmit={this.addTodo} onReturn={this.return} id={id}/>
 			<ScrollView>
 				{this.state.todos.map(todo => (
 					<Todo key={todo.id}
 						onDelete = {() => this.removeTodo(todo.id)}
 						onToggle = {() => this.toggleTodo(todo.id)}
 						todo = {todo}
 					/>
 					))
 				}
 			</ScrollView>

 		</View>
 		)
 	}
 }


const styles = StyleSheet.create({
  todoContainer: {
  	height: 50,
    flexDirection: 'row',
    textAlign: 'left',
    alignItems: 'center',
  },
  fill : {
  	flex: 1,
  },

  button: {
    alignItems: 'center',
    padding: 8,
    borderRadius: 3,
    opacity: 0.8,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
  	backgroundColor:'#897979',
    justifyContent: 'center',
    width: 60,
    margin: 5,
  },

  deletebtnContainer: {
  	flexDirection: 'row',
  	justifyContent: 'flex-end',
  },

  titleText: {
  	fontSize: 15,
  	textAlign: 'center',
  	paddingTop: 12,
  	height: 40,
  },
  todoText: {
  	width: '70%',
  },
  textColor:{
  	color: '#F1EFEF',
  }
 })

