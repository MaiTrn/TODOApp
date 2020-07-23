import React from 'react'
import { View, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native'

export default class AddTodo extends React.Component {
    state = {
        id: 0,
        text: '',
        checked: false,
        isFormValid: false,
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.text !== prevState.text)
            this.validateForm()
    }
    
    validateForm = () => {
        if(this.state.text.length > 3)
            this.setState({isFormValid: true})
        else this.setState({isFormValid: false})
    }

    handleSubmit = () => {
        this.props.onSubmit(this.state)
        this.setState({
            text: '',
        })
    }

    handleReturn = () => {
        this.props.onReturn()
    }

    handleTodo = text => {
        if (text.length <= 80)
            this.setState({
                id: this.props.id,
                text: text
            })
            
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.input}
                    value={this.state.text}
                    onChangeText={this.handleTodo}
                    placeholder="Short description"
                />
                <View style={styles.btnContainer}>
                    <TouchableOpacity onPress={this.handleSubmit} disabled={!this.state.isFormValid} style={styles.button}>
                        <Text style={styles.textColor}>Add</Text>
                    </TouchableOpacity>
                </View>               
            </View>
        )
    }
}

const styles = StyleSheet.create ({
    input: {
        borderWidth: 1,
        borderColor: 'white',
        color: 'white',
        minWidth: 280,
        maxWidth: 280,
        marginHorizontal: 20,
        marginVertical: 10,
        paddingVertical: 5,
        paddingLeft: 10,
        borderRadius: 3,
    },

    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },

    btnContainer: {
        justifyContent: 'flex-end',
        flexDirection: 'row',
        flex: 1,
        margin: 10,
    },

    button: {
        backgroundColor:'#929292',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
        borderRadius: 3,
        opacity: 0.8,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 5,
        width: 50,
    },

    textColor: {
        color: 'white',
    }

})