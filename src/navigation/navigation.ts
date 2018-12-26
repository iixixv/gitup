import { Navigation } from 'react-native-navigation'

export const goHome = () =>
	Navigation.setRoot({
		root: {
			stack: {
				id: 'App',
				children: [
					{
						component: {
							name: 'Home'
						}
					}
				]
			}
		}
	})

export const goLogin = () =>
	Navigation.setRoot({
		root: {
			component: {
				name: 'Login'
			}
		}
	})
