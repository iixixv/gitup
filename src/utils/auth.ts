import { AsyncStorage } from 'react-native'

let token: string

export const getToken = async () => {
	if (token) {
		return Promise.resolve(token)
	}
	return AsyncStorage.getItem('AUTH_TOKEN')
}

export const setToken = (token: string) => {
	return AsyncStorage.setItem('AUTH_TOKEN', token)
}

export const removeToken = async () => {
	await AsyncStorage.removeItem('AUTH_TOKEN')
}
