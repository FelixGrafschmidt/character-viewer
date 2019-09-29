// vue.config.js
module.exports = {
	"outputDir": "./target",
	publicPath: process.env.NODE_ENV === 'production'
		? '/character-viewer/'
		: '/',
	configureWebpack: {
	}
}
