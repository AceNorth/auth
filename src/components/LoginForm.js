import React, {Component} from 'react';
import {Text} from 'react-native';
import {Button, Card, CardSection, Input, Spinner} from './common';
import firebase from 'firebase';

class LoginForm extends Component {

	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			error: "",
			loading: false
		}
	}

	onButtonPress() {
		const {email, password} = this.state;
		this.setState({error: "", loading: true});
		firebase.auth().signInWithEmailAndPassword(email, password)
		//this returns a promise - makes a request to the firebase server
			.then(this.onLoginSuccess.bind(this))
			.catch(() => {
			//if authentication fails, attempt to create an account
				firebase.auth().createUserWithEmailAndPassword(email, password)
			})
				.then(this.onLoginSuccess.bind(this))
				//if THAT fails, show an error to the user
				.catch(this.onLoginFail.bind(this))
	}

	onLoginSuccess() {
		this.setState({ email: "",
			password: "",
			error: "",
			loading: false })
	}

	onLoginFail() {
		this.setState({
			error: "Authentication Failed.",
			loading: false
		})
	}

	renderButton() {
		if (this.state.loading) {
			return <Spinner size="small" />
		}

		return <Button onPress={this.onButtonPress.bind(this)}>
				Login
				</Button>
	}

	render() {
		return (
			<Card>
				<CardSection>
					<Input 
						label="Email"
						placeholder="user@gmail.com"
						onChangeText={email => this.setState({email})}
						value={this.state.email}	
						/>
				</CardSection>
				<CardSection>
					<Input 
						label="Password"
						placeholder="password"
						onChangeText={password => this.setState({password})}
						value={this.state.password}
						secureTextEntry
						// same as writing secureTextEntry={true}	
						/>
				</CardSection>
				<Text style={styles.errorTextStyle}>
					{this.state.error}
				</Text>
				<CardSection>
					{this.renderButton()}
				</CardSection>
			</Card>
		);
	}
}

const styles = {
	errorTextStyle: {
		fontSize: 20,
		alignSelf: 'center',
		color: 'red'
	}
};

export default LoginForm;