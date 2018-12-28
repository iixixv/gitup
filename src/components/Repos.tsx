import * as React from 'react'
import {
	View,
	Text,
	FlatList,
	StyleSheet,
	TouchableHighlight
} from 'react-native'
import { Navigation } from 'react-native-navigation'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import { goLogin } from '../navigation/navigation'
import Loader from './Loader'
import { colors } from '../styles/colors'

const GET_REPOS = gql`
	query {
		viewer {
			login
			repositories(first: 100) {
				edges {
					node {
						id
						name
						owner {
							login
						}
					}
				}
			}
		}
	}
`

interface IProps {
	componentId: any
}

export default class Repos extends React.Component<IProps> {
	render() {
		return (
			<Query query={GET_REPOS}>
				{({ loading, data }) => {
					if (loading) return <Loader />
					if (!data) goLogin()

					if (data)
						return (
							<View style={styles.container}>
								<FlatList
									data={data.viewer.repositories.edges}
									renderItem={({ item }: any) => (
										<TouchableHighlight
											activeOpacity={90}
											underlayColor={colors.primary}
											onPress={() => {
												Navigation.push(
													this.props.componentId,
													{
														component: {
															id: item.node.id,
															name: 'Repo',
															passProps: {
																name:
																	item.node
																		.name,
																owner:
																	item.node
																		.owner
																		.login
															}
														}
													}
												)
											}}
										>
											<Text style={styles.item}>
												{item.node.name}
											</Text>
										</TouchableHighlight>
									)}
									keyExtractor={(item: any) => item.node.id}
								/>
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
		backgroundColor: colors.white
	},
	item: {
		fontSize: 17,
		fontWeight: 'bold',
		color: colors.black,
		padding: 20,
		marginLeft: 50,
		borderBottomWidth: 3,
		borderBottomColor: colors.primary
	}
})
