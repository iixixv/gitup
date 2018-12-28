import { Navigation } from 'react-native-navigation'
import { colors } from '../styles/colors'

export const goHome = () =>
	Navigation.setRoot({
		root: {
			stack: {
				id: 'appstack',
				options: {
					topBar: {
						backButton: {
							color: colors.accent
						}
					},
					animations: {
						push: {
							content: {
								x: {
									from: 300,
									to: 0,
									duration: 500,
									interpolation: 'accelerate'
								},
								alpha: {
									from: 0,
									to: 1,
									duration: 500,
									interpolation: 'accelerate'
								}
							}
						},
						pop: {
							content: {
								x: {
									from: 0,
									to: 300,
									duration: 400,
									interpolation: 'accelerate'
								}
							}
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
