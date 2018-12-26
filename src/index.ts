import { Navigation } from 'react-native-navigation'

import { withProvider } from './Provider'
import Login from './components/Login'

console.disableYellowBox = true

Navigation.registerComponent(`Login`, () => withProvider(Login))

Navigation.events().registerAppLaunchedListener(() => {
	Navigation.setRoot({
		root: {
			component: {
				name: 'Login'
			}
		}
	})
})
