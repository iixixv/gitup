import * as React from 'react'
import { View, Text, StyleSheet, Image, TouchableHighlight } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import { removeToken } from '../utils/auth'
import { goLogin } from '../navigation/navigation'
import Loader from './Loader'
import { colors } from '../styles/colors'

const VIEWER = gql`
	query viewer {
		viewer {
			avatarUrl
			name
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
				animate: false,
				drawBehind: true
			}
		}
	}

	render() {
		return (
			<Query query={VIEWER}>
				{({ loading, data, client }) => {
					if (loading) return <Loader />
					if (!data) goLogin()

					if (data)
						return (
							<View style={styles.container}>
								<TouchableHighlight
									activeOpacity={90}
									underlayColor={colors.primary}
									onPress={() => {
										Navigation.push(
											this.props.componentId,
											{
												component: {
													name: 'Info'
												}
											}
										)
									}}
									style={styles.info}
								>
									<Text style={styles.infoText}>Info</Text>
								</TouchableHighlight>

								<View style={styles.profile}>
									<Image
										source={{ uri: data.viewer.avatarUrl }}
										style={styles.avatar}
									/>
									<Text style={styles.name}>
										{data.viewer.name}
									</Text>

									<TouchableHighlight
										activeOpacity={90}
										underlayColor={colors.primary}
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
										style={styles.repos}
									>
										<Text style={styles.reposText}>
											Repos
										</Text>
									</TouchableHighlight>
								</View>

								<TouchableHighlight
									style={styles.logout}
									activeOpacity={90}
									underlayColor={colors.primary}
									onPress={async () => {
										try {
											await removeToken()
											client.resetStore()
											goLogin()
										} catch (e) {
											console.log(e)
										}
									}}
								>
									<Text style={styles.logoutText}>
										Logout
									</Text>
								</TouchableHighlight>
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
		alignItems: 'center'
	},
	info: {
		alignSelf: 'flex-end',
		padding: 10,
		borderRadius: 20,
		margin: 10
	},
	infoText: {
		fontWeight: 'bold',
		fontSize: 15,
		color: colors.black
	},
	profile: {
		alignItems: 'center',
		marginTop: 50,
		marginBottom: 80
	},
	avatar: {
		width: 200,
		height: 200,
		borderRadius: 100,
		borderWidth: 3,
		borderColor: colors.accent,
		marginBottom: 30
	},
	name: {
		fontSize: 15,
		color: colors.black,
		fontWeight: 'bold',
		fontStyle: 'italic',
		marginBottom: 10
	},
	repos: {
		padding: 20,
		borderRadius: 5
	},
	reposText: {
		color: colors.accent,
		fontWeight: 'bold',
		fontSize: 20
	},
	logout: {
		padding: 20,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5
	},
	logoutText: {
		fontSize: 15,
		color: colors.black,
		fontWeight: 'bold'
	}
})
