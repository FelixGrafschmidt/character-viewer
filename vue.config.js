// vue.config.js
module.exports = {
	"outputDir": "./target",
	publicPath: process.env.NODE_ENV === 'production'
		? '/character-viewer/'
		: '/',
	devServer: {
		proxy: {
			"/saveList": {
				target: "http://localhost:8081",
				secure: false,
			},
			"/getList": {
				target: "http://localhost:8081",
				secure: false,
			},
		},
	}
}
