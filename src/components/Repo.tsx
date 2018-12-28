import * as React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import { colors } from '../styles/colors'
import Loader from './Loader'

const GET_REPO = gql`
	query getReop($owner: String!, $name: String!) {
		repository(owner: $owner, name: $name) {
			name
			description
			createdAt
			refs(first: 100, refPrefix: "refs/heads/") {
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
					if (loading) return <Loader />

					if (data)
						return (
							<View style={styles.container}>
								<Text style={styles.header}>
									{data.repository.name}
								</Text>

								{data.repository.description && (
									<>
										<Text style={styles.item}>
											Description
										</Text>
										<Text style={styles.info}>
											{data.repository.description}
										</Text>
									</>
								)}

								{data.repository.createdAt && (
									<>
										<Text style={styles.item}>
											Created at
										</Text>
										<Text style={styles.info}>
											{data.repository.createdAt}
										</Text>
									</>
								)}

								{data.repository.refs.nodes && (
									<>
										<Text style={styles.item}>
											Branches
										</Text>

										<FlatList
											data={data.repository.refs.nodes}
											renderItem={({ item }: any) => (
												<Text
													key={item.id}
													style={styles.info}
												>
													{item.name}
												</Text>
											)}
											keyExtractor={(item: any) =>
												item.id
											}
										/>
									</>
								)}
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
		padding: 50
	},
	header: {
		fontSize: 25,
		fontWeight: 'bold',
		color: colors.accent,
		textDecorationLine: 'underline',
		marginBottom: 30
	},
	item: {
		fontSize: 17,
		fontWeight: 'bold',
		color: colors.black,
		marginTop: 30,
		marginBottom: 5
	},
	info: {
		fontSize: 14,
		marginBottom: 5,
		marginLeft: 40,
		color: colors.black
	}
})
