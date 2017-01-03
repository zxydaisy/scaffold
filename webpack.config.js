const webpack = require("webpack");
const config = require('./config');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	entry: {
		index: "./public/src/js/index.js",
		auth: "./public/src/js/auth.js"
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
				test: /\.js$/,
				loaders: ['babel?presets[]=es2015&presets[]=react&presets[]=stage-1'],
				include: [
					path.join(process.cwd(), `./public/src/js`),
				],
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract({
						notExtractLoader: "style-loader",
						loader: "css-loader?sourceMap",
						publicPath: "../"
				})
			},
      { test: /\.less$/i, loader: ExtractTextPlugin.extract(['css', 'less']) },
			{ test: /\.png$/, loader: "file-loader" }
		]
	},
	devtool: "source-map",
	plugins: [
		new ExtractTextPlugin({
			filename: "css/[name].css?[hash]-[chunkhash]-[contenthash]-[name]",
			disable: false,
			allChunks: true
		}),
    new ExtractTextPlugin('less/[name].less'),
		new webpack.optimize.CommonsChunkPlugin({ name: "common", filename: "common.js" }),
		new webpack.ProvidePlugin({
		  _: 'underscore',
		  React: 'react',
		  ReactDOM: 'react-dom',
		  Uuid: 'node-uuid',
		}),
	],
};
