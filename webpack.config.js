const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	context: path.resolve(__dirname, 'src'),
	mode: 'development',
	entry: './index.js',
	output: {
		filename: "[name].[hash].bundle.js",
		path: path.resolve(__dirname, 'docs')
	},
	module: {
		rules: [
			{ test: /\.(pug|jade)$/, use: ['pug-loader'] },
			{ test: /\.css$/, use: ['style-loader', 'css-loader'] },
			{ test: /\.(png|jpe?g|gif)$/i, use: 'file-loader' }
		]
	},
	plugins: [
		new HTMLWebpackPlugin({
			template: './assets/pug/pages/index.pug',
			filename: 'index.html'
		}),
		new HTMLWebpackPlugin({
			template: './assets/pug/pages/in-game.pug',
			filename: 'in-game.html'
		}),
		new HTMLWebpackPlugin({
			template: './assets/pug/pages/match-ended.pug',
			filename: 'match-ended.html'
		}),
		new CleanWebpackPlugin()
	]
};