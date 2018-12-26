import ApolloClient from 'apollo-boost'

import { getToken } from './utils/auth'

export const client = new ApolloClient({
	uri: 'https://api.github.com/graphql',
	onError: (e) => console.log(e),
	request: async (operation) => {
		const token = await getToken()
		if (token) {
			operation.setContext({
				headers: {
					authorization: `Basic ${token ? token : ''}`
				}
			})
		}
	}
})
