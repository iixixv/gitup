import * as React from 'react'
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	TouchableHighlight
} from 'react-native'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import { encode } from '../utils/encode'
import { setToken, removeToken } from '../utils/auth'
import { goHome } from '../navigation/navigation'
import Loader from './Loader'
import { colors } from '../styles/colors'

const VIEWER = gql`
	query viewer {
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
					if (loading) return <Loader />
					return (
						<View style={styles.container}>
							<View>
								<Text style={styles.welcome}>Welcome,</Text>
								<Text style={styles.instructions}>
									sign in to continue
								</Text>
								<TextInput
									style={{
										...styles.input,
										borderColor: invalid
											? colors.accent
											: colors.primary
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
										...styles.input,
										borderColor: invalid
											? colors.accent
											: colors.primary
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

								<Text style={styles.message}>
									{invalid ? 'Wrong email or password!' : ''}
								</Text>

								<TouchableHighlight
									underlayColor={colors.lightgrey}
									activeOpacity={90}
									style={styles.signin}
									onPress={async () => {
										const encoded = encode(email, password)

										await setToken(encoded)

										refetch()

										if (!data) {
											this.setState({ invalid: true })
										}
									}}
									disabled={email && password ? false : true}
								>
									<Text
										style={{
											...styles.signinText,
											color:
												email && password
													? colors.accent
													: colors.black
										}}
									>
										SIGN IN
									</Text>
								</TouchableHighlight>
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
		alignItems: 'center'
	},
	welcome: {
		fontSize: 30,
		color: colors.black,
		fontWeight: 'bold'
	},

	instructions: {
		fontSize: 25,
		color: colors.grey,
		fontWeight: 'bold',
		marginBottom: 60
	},
	input: {
		marginBottom: 20,
		borderBottomWidth: 2,
		borderColor: colors.primary
	},
	message: {
		color: colors.accent,
		marginBottom: 20,
		alignSelf: 'flex-start'
	},
	signin: {
		backgroundColor: colors.primary,
		padding: 20,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5
	},
	signinText: {
		fontSize: 15,
		color: colors.black,
		fontWeight: 'bold'
	}
})
