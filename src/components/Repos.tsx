import * as React from 'react'
import {
	View,
	Text,
	ActivityIndicator,
	FlatList,
	StyleSheet
} from 'react-native'
import { ListItem, Body, Right } from 'native-base'
import { Navigation } from 'react-native-navigation'

import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import { goLogin } from '../navigation/navigation'

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
						description
						createdAt
						primaryLanguage {
							name
						}
						refs(first: 10, refPrefix: "refs/heads/") {
							nodes {
								name
							}
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
					if (loading)
						return (
							<View style={styles.container}>
								<ActivityIndicator size="large" color="grey" />
							</View>
						)
					if (!data) goLogin()

					if (data)
						return (
							<View style={{ flex: 1, justifyContent: 'center' }}>
								<FlatList
									data={data.viewer.repositories.edges}
									renderItem={({ item }: any) => (
										<ListItem
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
											<Body>
												<Text>{item.node.name}</Text>
											</Body>
											<Right>
												<Text />
											</Right>
										</ListItem>
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
		justifyContent: 'center',
		alignItems: 'center'
		// backgroundColor: 'lightgrey'
	}
})
