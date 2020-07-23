import React from 'react'
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native'
import {vibrate} from './utils'


class Counter extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			firstSec: 0,
			secondSec: 0,
			firstMin: 5,
			secondMin: 2,
			updated: false,
			interval: 0, //number of vibrations
		}

	}

	componentDidMount() {
		this.update = setInterval(this.updateTime, 100)
		this.timer = setInterval(this.increaseTimer, 1000)
	}

	componentWillUnmount() {
		clearInterval(this.timer)
		clearInterval(this.update)
	}

	updateTime = () => {
		if (this.props.status == 'break' && !this.state.updated) {
			this.setState({
				firstSec: 0,
				secondSec: 0,
				firstMin: 5,
				secondMin: 0,
				updated: true,
			})
		}
		else if (this.props.status == 'work' && !this.state.updated) {
			this.setState({
				firstSec: 0,
				secondSec: 0,
				firstMin: 5,
				secondMin: 2,
				updated: true,
			})
		}
		else  if (this.props.status == 'stop') {
			this.setState({
				firstSec: 0,
				secondSec: 0,
				firstMin: 5,
				secondMin: 2,
				updated: false,
			})
		}
	}

	increaseTimer = () => {
		if (this.props.isCounting) {
			this.setState({
				firstSec: (this.state.secondMin === 0 && this.state.firstMin === 0 && this.state.secondSec === 0 && this.state.firstSec === 0) ? 0 : 
								((this.state.firstSec === 0) ? 9 : (this.state.firstSec - 1)),

				secondSec: (this.state.secondMin === 0 && this.state.firstMin === 0 && this.state.secondSec === 0 && this.state.firstSec === 0) ? 0 :
							(this.state.secondSec === 0 && this.state.firstSec < 1) ? 5 : ((this.state.firstSec < 1) ?  (this.state.secondSec - 1) : this.state.secondSec),

				firstMin: (this.state.secondMin === 0 && this.state.firstMin === 0 && this.state.secondSec === 0 && this.state.firstSec === 0) ? 0 : 
							(this.state.firstMin === 0 && this.state.secondMin > 0 && this.state.secondSec ===  0 && this.state.firstSec === 0 ) ? 9 : 
							(this.state.secondSec ===  0 && this.state.firstSec === 0 ) ?  (this.state.firstMin - 1) : this.state.firstMin,

				secondMin: (this.state.secondMin === 0 && this.state.firstMin === 0 && this.state.secondSec === 0 && this.state.firstSec === 0) ? 0 :
							(this.state.firstMin === 0 && this.state.secondSec ===  0 && this.state.firstSec === 0) ? (this.state.secondMin - 1) : this.state.secondMin,
			})}
		if (this.state.firstSec === 0 && this.state.secondSec === 0 && this.state.firstMin === 0 && this.state.secondMin === 0)
		{	
			this.setState({
				interval : this.state.interval + 1,
			})
			if (this.state.interval === 6) {
				this.setState({
					interval: 0,
					updated: false,
				})
				this.changeState()
				return
			}
			vibrate()
		}
	}

	changeState = () => {
		this.props.notify()
	}

	render() {

		return <Text style={styles.clockText}>{[this.state.secondMin, this.state.firstMin]} : {[this.state.secondSec, this.state.firstSec]}</Text>
	}
}

//main class
export default class App extends React.Component {
	constructor() {
		super()
		this.state = {
			isCounting: false,
			status: 'work',
			timerText: 'Start'
		}
	}


	toggleCounter = () => {
		this.setState({
			timerText: (this.state.timerText === 'Start') ? 'Pause' : 'Start',
			isCounting: !this.state.isCounting,
			status: (this.state.status == 'stop') ? 'work': this.state.status
		})
	}

	clearCounter = () => {
		this.setState({
			isCounting: false,
			status: 'stop',
			timerText: 'Start',
		})	
	}

	changeState = () => {
		this.setState({
			isCounting: (this.state.status === 'break') ? false : true,
			status: (this.state.status === 'work') ? 'break' : 'stop'
		})
	}	

	render() {
		return (
			<View style = {[(styles.container,(this.state.status === 'break') ? styles.break : styles.work), styles.container]}>	
				<View style={{height: 170}}>
					{<Counter isCounting={this.state.isCounting} status={this.state.status} notify={this.changeState} />}
				</View>

				<View style={styles.flexRow}>
					<TouchableOpacity style={[(styles.container,(this.state.status === 'break') ? styles.breakBtn : styles.workBtn), styles.button]} onPress={this.toggleCounter}>
						<Text style={styles.text}>{this.state.timerText}</Text>
					</TouchableOpacity>
					<TouchableOpacity style={[(styles.container,(this.state.status === 'break') ? styles.breakBtn : styles.workBtn), styles.button]} onPress={this.clearCounter}>
						<Text style={styles.text}>Reset</Text>
					</TouchableOpacity>
						
				</View>
			</View>
			)
	}
}

const styles = StyleSheet.create ({
	container: {
		borderRadius: 10,
		alignItems: 'center',
		height: 250,
		borderBottomColor: 'black',
		borderBottomWidth: 1.5,
	},

	work: {
		backgroundColor: '#9A4C4B',
	},

	break: {
		backgroundColor: '#599750',
	},

	button: {
		alignItems: 'center',	
		padding: 8,
		marginTop:5,
		marginBottom: 5,
		marginLeft: 25,
		marginRight: 25,
		borderRadius: 3,
		opacity: 0.8,
		shadowColor: 'black',
		shadowOffset: {width: 0, height: 3},
		shadowOpacity: 0.8,
		shadowRadius: 5,
		elevation: 5,
		width: 80,
	},

	workBtn: {
		backgroundColor: '#D48C8C',
	},

	breakBtn: {
		backgroundColor: '#3C6137',
	},

	text: {
		color: '#F1EFEF',
		fontSize: 17,
	},

	flexRow: {
		flexDirection: 'row',
	},

	clockText: {
		paddingTop: 40,
		alignItems: 'center',
		fontSize: 80,
		color: '#F1EFEF',
	}
})