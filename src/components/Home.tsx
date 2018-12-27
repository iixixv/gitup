import * as React from 'react'
import {
	View,
	Text,
	ActivityIndicator,
	StyleSheet,
	Image,
	TouchableHighlight
} from 'react-native'
import { Navigation } from 'react-native-navigation'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import { removeToken } from '../utils/auth'
import { goLogin } from '../navigation/navigation'

const VIEWER = gql`
	query {
		viewer {
			avatarUrl
			name
			websiteUrl
			login
			repositories {
				totalCount
			}
		}
	}
`

interface IProps {
	componentId: any
}

export default class Home extends React.Component<IProps> {
	static get options() {
		return {
			topBar: {
				visible: false,
				_height: 0,
				drawBehind: true
				// title: {
				// 	text: 'GIT"UP'
				// }
			}
		}
	}

	render() {
		return (
			<Query query={VIEWER}>
				{({ loading, data, client }) => {
					if (loading)
						return (
							<View style={styles.container}>
								<ActivityIndicator size="large" color="grey" />
							</View>
						)
					if (!data) goLogin()

					if (data)
						return (
							<View style={styles.container}>
								<TouchableHighlight
									activeOpacity={90}
									onPress={async () => {
										try {
											await removeToken()
											client.resetStore()
											goLogin()
										} catch (e) {
											console.log(e)
										}
									}}
									underlayColor="black"
								>
									<Text>Logout</Text>
								</TouchableHighlight>
								<View style={styles.profile}>
									<Image
										source={{ uri: data.viewer.avatarUrl }}
										style={styles.avatar}
									/>
									<Text style={styles.name}>
										{data.viewer.name}
									</Text>
									<Text style={styles.login}>
										{data.viewer.login}
									</Text>
									<TouchableHighlight
										activeOpacity={90}
										onPress={() => {
											Navigation.push(
												this.props.componentId,
												{
													component: {
														name: 'Repos'
													}
												}
											)
										}}
										underlayColor="black"
										style={styles.repos}
									>
										<Text style={styles.reposText}>
											{'Repositories : ' +
												data.viewer.repositories
													.totalCount}
										</Text>
									</TouchableHighlight>
								</View>
								{/* <Button
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
								/> */}
							</View>
						)
					return null
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
		// backgroundColor: 'lightgrey'
	},
	profile: {
		// alignItems: 'center'
	},

	avatar: {
		width: 200,
		height: 200,
		borderRadius: 10
	},
	name: {
		fontSize: 25,
		alignSelf: 'center'
	},
	login: {
		marginBottom: 15,
		alignSelf: 'center'
	},
	repos: {
		borderRadius: 3,
		backgroundColor: 'grey',
		padding: 15
	},
	reposText: {
		alignSelf: 'center',
		color: 'white',
		textDecorationLine: 'underline'
	}
})
