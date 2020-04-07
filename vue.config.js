// vue.config.js
module.exports = {
	"outputDir": "./target",
	// publicPath: process.env.NODE_ENV === 'production'
	// 	? '/character-viewer/'
	// 	: '/',
	devServer: {
		proxy: {
			"/saveList": {
				target: "http://127.0.0.1:8081/",
				secure: false,
			},
			"/getList": {
				target: "http://127.0.0.1:8081/",
				secure: false,
			},
		},
	}
}
