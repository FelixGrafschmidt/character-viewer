// vue.config.js
module.exports = {
	"outputDir": "./target",
	// publicPath: process.env.NODE_ENV === 'production'
	// 	? '/character-viewer/'
	// 	: '/',
	devServer: {
		proxy: {
			"/saveList": {
				target: "http://92.60.39.47:8081/",
				secure: false,
			},
			"/getList": {
				target: "http://92.60.39.47:8081/",
				secure: false,
			},
		},
	}
}
