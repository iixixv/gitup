import * as base64 from 'base-64'

export const encode = (email: string, password: string) => {
	const bytes = email.trim() + ':' + password.trim()
	const encoded = base64.encode(bytes)
	return encoded
}
