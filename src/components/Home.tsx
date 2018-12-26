import * as React from 'react'
import { View, Text, ActivityIndicator, Button, FlatList } from 'react-native'
import { List, ListItem, Body, Right, Icon } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import { removeToken } from '../utils/auth'
import { goLogin } from '../navigation/navigation'

const VIEWER = gql`
	query {
		viewer {
			login
			repositories(last: 20) {
				edges {
					node {
						id
						name
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

export default class Home extends React.Component {
	render() {
		return (
			<Query query={VIEWER}>
				{({ loading, data, client }) => {
					if (loading) return <ActivityIndicator size="small" />
					if (!data) goLogin()

					if (data)
						return (
							<View style={{ flex: 1, justifyContent: 'center' }}>
								<FlatList
									data={data.viewer.repositories.edges}
									renderItem={({ item }: any) => (
										<ListItem onPress={() => {}}>
											<Body>
												<Text>{item.node.name}</Text>
											</Body>
											<Right>
												<Text />
												{/* <Ionicons name="ios-add" /> */}
												{/* <Icon
													name="arrow-forward"
													// size={20}
												/> */}
											</Right>
										</ListItem>
									)}
									keyExtractor={(item: any) => item.node.id}
								/>

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
