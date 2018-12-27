import * as React from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'

import { colors } from '../styles/colors'

export default class Loader extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<ActivityIndicator size="large" color={colors.accent} />
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
})
