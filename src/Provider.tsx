import * as React from 'react'
import { ApolloProvider } from 'react-apollo'

import { client as apolloClient } from './apollo'

export const withProvider = (Component: any, client: any = apolloClient) => {
	return class extends React.Component {
		static options = Component.options

		render() {
			return (
				<ApolloProvider client={client}>
					<Component {...this.props} />
				</ApolloProvider>
			)
		}
	}
}
