import { AsyncStorage } from 'react-native'

export const getToken = () => {
	return AsyncStorage.getItem('AUTH_TOKEN')
}

export const setToken = (token: string) => {
	AsyncStorage.setItem('AUTH_TOKEN', token)
}

export const removeToken = () => {
	AsyncStorage.removeItem('AUTH_TOKEN')
}
