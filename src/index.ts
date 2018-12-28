import { Navigation } from 'react-native-navigation'

import { registerScreens } from './navigation/screens'

console.disableYellowBox = true

registerScreens()

Navigation.events().registerAppLaunchedListener(() => {
	Navigation.setRoot({
		root: {
			component: {
				name: 'Welcome'
			}
		}
	})
})
