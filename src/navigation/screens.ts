import { Navigation } from 'react-native-navigation'

import { withProvider } from '../Provider'
import Welcome from './Welcome'
import Login from '../components/Login'
import Home from '../components/Home'

export function registerScreens() {
	Navigation.registerComponent('Welcome', () => Welcome)
	Navigation.registerComponent('Login', () => withProvider(Login))
	Navigation.registerComponent('Home', () => withProvider(Home))
}
