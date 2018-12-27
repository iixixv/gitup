import * as React from 'react'

import { getToken } from '../utils/auth'
import { goHome, goLogin } from './navigation'
import Loader from '../components/Loader'

export default class Welcome extends React.Component {
	async componentDidMount() {
		try {
			const token = await getToken()
			if (token) goHome()
			else goLogin()
		} catch (e) {
			console.log(e)
			goLogin()
		}
	}

	render() {
		return <Loader />
	}
}
