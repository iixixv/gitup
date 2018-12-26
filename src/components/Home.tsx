import * as React from 'react'
import { View, Text, ActivityIndicator, Button } from 'react-native'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import { removeToken } from '../utils/auth'
import { goLogin } from '../navigation/navigation'

const VIEWER = gql`
	query {
		viewer {
			login
		}
	}
`

export default class Home extends React.Component {
	render() {
		return (
			<Query query={VIEWER}>
				{({ loading, data, client }) => {
					if (loading) return <ActivityIndicator size="small" />
					if (!data) goLogin()

					return (
						<View style={{ flex: 1, justifyContent: 'center' }}>
							{data && data.viewer && data.viewer.login ? (
								<Text>Welcome {data.viewer.login}</Text>
							) : (
								<Text />
							)}
							<Button
								title="Logout"
								onPress={async () => {
									try {
										await removeToken()
										client.resetStore()
										goLogin()
									} catch (e) {
										console.log(e)
									}
								}}
							/>
						</View>
					)
				}}
			</Query>
		)
	}
}
