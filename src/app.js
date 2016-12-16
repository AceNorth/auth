import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

export default class App extends Component {
	//this is from the vids: why don't we have to initialize the state object?
	state = { loggedIn: null };

	//before our app loads we connect with the Firebase database assigned to us
	//find it in "Web Setup" on our firebase project page
	componentWillMount() {
		firebase.initializeApp({

			//copy/paste the "config" object from that page
		    apiKey: "AIzaSyDBKia4lWcYKMcn-AnwGLOlGsTu4JRZDRk",
		    authDomain: "authentication-b3c95.firebaseapp.com",
		    databaseURL: "https://authentication-b3c95.firebaseio.com",
		    storageBucket: "authentication-b3c95.appspot.com",
		    messagingSenderId: "84894895664"
  		});

  		firebase.auth().onAuthStateChanged((user) => {
  			//method that's called whenever the user signs in or out
  			//'user' is either an object (representing the user) 
  			//or 'undefined' if they've just logged out
  			if (user) {
  				this.setState({ loggedIn: true })
  			} else {
  				this.setState({ loggedIn: false })
  			}
  		})
	}

	renderContent() {
		switch (this.state.loggedIn) {
			case true:
				return (
				<View style={styles.logoutStyle}>
					<Button onPress={() => firebase.auth().signOut()}>
						Log out
					</Button>
				</View>);
			case false:
				return <LoginForm />
			default:
				return <Spinner size="large" />
		}
	}

	render() {
		return (
			<View>
				<Header headerText="Authentication" />
				{this.renderContent()}
			</View>
			);
	}
}

const styles = {

  logoutStyle: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    padding: 10

  }

}