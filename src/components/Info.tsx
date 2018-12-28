import * as React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import DeviceInfo from 'react-native-device-info'
import ISO from 'iso-639-1'

import { colors } from '../styles/colors'

export default class Info extends React.Component {
	state = {
		battery: null,
		language: null,
		timezone: null
	}

	async componentDidMount() {
		try {
			const batteryLevel = await DeviceInfo.getBatteryLevel()
			const battery = Math.floor(+batteryLevel.toPrecision(5) * 100)

			const locale = DeviceInfo.getDeviceLocale().slice(0, 2)
			const langName = ISO.getName(locale)
			const langNativeName = ISO.getNativeName(locale)

			let language
			if (langName === langNativeName) language = langName
			else language = `${langName} / ${langNativeName}`

			const timezone = DeviceInfo.getTimezone()

			this.setState({ battery, language, timezone })
		} catch (e) {
			console.log(e)
		}
	}

	render() {
		const { battery, language, timezone } = this.state

		if (battery)
			return (
				<View style={styles.container}>
					<Text style={styles.header}>Info</Text>
					<Text style={styles.item}> Battery </Text>
					<Text style={styles.info}>{battery} </Text>
					<Text style={styles.item}> Language </Text>
					<Text style={styles.info}> {language} </Text>
					<Text style={styles.item}> Time Zone </Text>
					<Text style={styles.info}> {timezone} </Text>
				</View>
			)
		return null
	}
}

const styles = StyleSheet.create({
	container: {
		padding: 50,
		flex: 1
	},
	header: {
		fontSize: 25,
		fontWeight: 'bold',
		color: colors.accent,
		textDecorationLine: 'underline',
		marginBottom: 30
	},
	item: {
		fontSize: 17,
		fontWeight: 'bold',
		color: colors.black,
		marginTop: 30,
		marginBottom: 5
	},
	info: {
		fontSize: 14,
		marginBottom: 5,
		marginLeft: 40,
		color: colors.black
	}
})
