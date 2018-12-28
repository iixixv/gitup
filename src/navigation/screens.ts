import { Navigation } from 'react-native-navigation'

import { withProvider } from '../Provider'
import Welcome from './Welcome'
import Login from '../components/Login'
import Home from '../components/Home'
import Repos from '../components/Repos'
import Repo from '../components/Repo'
import Info from '../components/Info'

export function registerScreens() {
	Navigation.registerComponent('Welcome', () => Welcome)
	Navigation.registerComponent('Info', () => Info)
	Navigation.registerComponent('Login', () => withProvider(Login))
	Navigation.registerComponent('Home', () => withProvider(Home))
	Navigation.registerComponent('Repos', () => withProvider(Repos))
	Navigation.registerComponent('Repo', () => withProvider(Repo))
}
