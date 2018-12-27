import * as React from 'react'
import { Text, View } from 'react-native'
import DeviceInfo from 'react-native-device-info'
import ISO from 'iso-639-1'

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
				<View>
					<Text> Battery: {battery} </Text>
					<Text> Language: {language} </Text>
					<Text> Time Zone : {timezone} </Text>
				</View>
			)
		return null
	}
}
