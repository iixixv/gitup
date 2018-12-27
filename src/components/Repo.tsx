import * as React from 'react'
import {
	View,
	Text,
	ActivityIndicator,
	StyleSheet,
	FlatList
} from 'react-native'

import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const GET_REPO = gql`
	query getReop($owner: String!, $name: String!) {
		repository(owner: $owner, name: $name) {
			name
			description
			createdAt
			refs(first: 10, refPrefix: "refs/heads/") {
				nodes {
					name
				}
			}
			languages(first: 10) {
				nodes {
					id
					name
				}
			}
		}
	}
`

interface IProps {
	owner: any
	name: any
}

export default class Repo extends React.Component<IProps> {
	render() {
		const { owner, name } = this.props

		return (
			<Query query={GET_REPO} variables={{ owner, name }}>
				{({ loading, data }) => {
					if (loading)
						return (
							<View style={styles.container}>
								<ActivityIndicator size="large" color="grey" />
							</View>
						)

					if (data)
						return (
							<View style={styles.container}>
								<Text>Name: {data.repository.name}</Text>
								<Text>
									Description: {data.repository.description}
								</Text>
								<Text>
									Created At: {data.repository.description}
								</Text>
								<FlatList
									data={data.repository.refs.nodes}
									renderItem={({ item }: any) => (
										<Text>{item.name}</Text>
									)}
									keyExtractor={(item: any) => item.id}
								/>
								<FlatList
									data={data.repository.languages.nodes}
									renderItem={({ item }: any) => (
										<Text>{item.name}</Text>
									)}
									keyExtractor={(item: any) => item.id}
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
