const webpack = require("webpack");
const config = require('./config');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	entry: {
		index: "./public/src/js/index.js",
		auth: "./public/src/js/auth.js",
	},
	output: {
		filename: "[name].js?[hash]-[chunkhash]",
		chunkFilename: "[name].js?[hash]-[chunkhash]",
		path: __dirname + "/public/build",
		publicPath: `${config.staticUrl}`, // TODO 上传到cdn之后的地址
	},
	module: {
		loaders: [
			{
			 test: /\.css$/,
				 loader: ExtractTextPlugin.extract('style', 'css?modules!postcss')
			},
			{
				test: /\.js$/,
				loaders: ['babel?presets[]=es2015&presets[]=react&presets[]=stage-1'],
				include: [
					path.join(process.cwd(), `./public/src/js`),
				],
			},
			{ test: /\.png$/, loader: "file-loader" }
		]
	},
	plugins: [
		new ExtractTextPlugin({
			filename: "css/[name].css?[hash]-[chunkhash]-[contenthash]-[name]",
			disable: false,
			allChunks: true
		}),
		new ExtractTextPlugin("[name]-[hash].css"),
		new webpack.optimize.CommonsChunkPlugin({ name: "common", filename: "common.js" }),
		new webpack.ProvidePlugin({
		  _: 'underscore',
		  React: 'react',
		  ReactDOM: 'react-dom',
		  Uuid: 'node-uuid',
		}),
	],
};
