import * as React from 'react'
import { View, Text, ActivityIndicator, FlatList } from 'react-native'
import { ListItem, Body, Right } from 'native-base'

import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import { goLogin } from '../navigation/navigation'

const GET_REPOS = gql`
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

export default class Repos extends React.Component {
	render() {
		return (
			<Query query={GET_REPOS}>
				{({ loading, data }) => {
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
