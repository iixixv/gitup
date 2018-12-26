import * as React from 'react'
import { View, Button, Text, TextInput, ActivityIndicator } from 'react-native'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import { encode } from '../utils/encode'
import { setToken, removeToken } from '../utils/auth'

const VIEWER = gql`
	query Viewer {
		viewer {
			login
		}
	}
`

export default class Login extends React.Component {
	state = { email: '', password: '', encoded: '', invalid: false }

	render() {
		const { email, password, invalid } = this.state
		return (
			<Query query={VIEWER} onError={() => console.error}>
				{({ loading, data, refetch, client }) => {
					if (loading) return <ActivityIndicator size="small" />

					if (data && data.viewer && data.viewer.login) {
						return (
							<>
								<Text>Welcome {data.viewer.login}!</Text>
								<Button
									title="Logout"
									onPress={() => {
										removeToken()
										refetch()
										client.resetStore()
									}}
								/>
							</>
						)
					}

					return (
						<View>
							<Text> Login </Text>
							<TextInput
								placeholder="Email or username"
								keyboardType="email-address"
								onChangeText={(email) =>
									this.setState({ email })
								}
								value={email}
							/>
							<TextInput
								placeholder="Password"
								secureTextEntry
								onChangeText={(password) =>
									this.setState({ password })
								}
								value={password}
							/>

							{invalid && (
								<Text>Wrong username or password!</Text>
							)}

							<Button
								title="Login"
								onPress={() => {
									const encoded = encode(email, password)
									this.setState({ encoded })
									setToken(encoded)
									if (!data) this.setState({ invalid: true })
									refetch()
								}}
								disabled={email && password ? false : true}
							/>
						</View>
					)
				}}
			</Query>
		)
	}
}
