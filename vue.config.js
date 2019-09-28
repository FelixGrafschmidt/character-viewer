// vue.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
module.exports = {
	"outputDir": "./target",
	publicPath: process.env.NODE_ENV === 'production'
		? '/character-viewer/'
		: '/',
	configureWebpack: {
	}
}
