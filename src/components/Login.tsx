import * as React from 'react'
import {
	View,
	Button,
	Text,
	TextInput,
	ActivityIndicator,
	StyleSheet
} from 'react-native'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import { encode } from '../utils/encode'
import { setToken, removeToken } from '../utils/auth'
import { goHome } from '../navigation/navigation'

const VIEWER = gql`
	query Viewer {
		viewer {
			login
		}
	}
`
interface IProps {
	componentId: any
}

export default class Login extends React.Component<IProps> {
	state = { email: '', password: '', invalid: false }

	render() {
		const { email, password, invalid } = this.state
		return (
			<Query
				query={VIEWER}
				onCompleted={async (data) => {
					if (!data) {
						await removeToken()
					} else {
						goHome()
					}
				}}
			>
				{({ loading, data, refetch }) => {
					if (loading)
						return (
							<View style={styles.container}>
								<ActivityIndicator size="large" color="grey" />
							</View>
						)

					return (
						<View style={styles.container}>
							<View style={styles.loginForm}>
								<Text style={styles.loginHeader}> GITUP </Text>
								<TextInput
									style={{
										...styles.loginInput,
										borderColor: invalid
											? 'tomato'
											: 'lightgrey'
									}}
									placeholder="Email or username"
									placeholderTextColor="lightgrey"
									autoCapitalize="none"
									keyboardType="email-address"
									onChangeText={(email) =>
										this.setState({ email })
									}
									value={email}
								/>
								<TextInput
									style={{
										...styles.loginInput,
										borderColor: invalid
											? 'tomato'
											: 'lightgrey'
									}}
									placeholderTextColor="lightgrey"
									placeholder="Password"
									autoCapitalize="none"
									secureTextEntry
									onChangeText={(password) =>
										this.setState({ password })
									}
									value={password}
								/>

								<Text style={styles.loginMessage}>
									{invalid && 'Wrong username or password!'}
								</Text>

								<Button
									title={loading ? 'Loading...' : 'Login'}
									onPress={async () => {
										const encoded = encode(email, password)

										await setToken(encoded)

										refetch()

										if (!data) {
											this.setState({ invalid: true })
										}
									}}
									disabled={email && password ? false : true}
								/>
							</View>
						</View>
					)
				}}
			</Query>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'lightgrey'
	},
	loginForm: {
		justifyContent: 'center',
		width: 300,
		height: 460,
		backgroundColor: 'white',
		padding: 20,
		borderRadius: 10
	},
	loginHeader: {
		fontSize: 50,
		fontWeight: 'bold',
		marginBottom: 80,
		alignSelf: 'center'
	},
	loginInput: {
		padding: 5,
		paddingLeft: 15,
		paddingRight: 15,
		marginBottom: 15,
		borderWidth: 1,
		borderColor: 'lightgrey',
		borderRadius: 3
	},
	loginMessage: {
		color: 'tomato',
		marginBottom: 10,
		alignSelf: 'center'
	}
})
