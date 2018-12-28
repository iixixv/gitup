import { Navigation } from 'react-native-navigation'
import { colors } from '../styles/colors'

export const goHome = () =>
	Navigation.setRoot({
		root: {
			stack: {
				id: 'App',
				options: {
					topBar: {
						backButton: {
							color: colors.accent
						}
					}
				},
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
