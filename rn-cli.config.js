module.exports = {
	getTransformModulePath() {
		// @ts-ignore
		return require.resolve('react-native-typescript-transformer')
	},
	getSourceExts() {
		return ['ts', 'tsx']
	}
}
