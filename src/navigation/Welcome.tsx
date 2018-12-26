import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { getToken } from '../utils/auth'
import { goHome, goLogin } from './navigation'

export default class Welcome extends React.Component {
	async componentDidMount() {
		try {
			const token = await getToken()
			if (token) goHome()
			else goLogin()
		} catch (e) {
			console.log(e)
			goLogin()
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>Welcome</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	welcome: {
		fontSize: 28
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
})
