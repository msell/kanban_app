var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var merge = require('webpack-merge');

var TARGET = process.env.npm_lifecycle_event;
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

var common = {
  entry: APP_PATH,
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
        inlculde: APP_PATH
      }
    ]
  },
  plugins: [
    new HtmlwebpackPlugin({
      title: 'Kanban app'
    })
  ]
};

if(TARGET === 'start' || !TARGET){
  module.exports = merge(common, {
    devtool: 'eval-source-map',
    devServer:{
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new OpenBrowserPlugin({
            url: 'http://localhost:8080'
          })
    ]
  });
}


// module.exports = {
//   entry: APP_PATH,
//   output: {
//     path: BUILD_PATH,
//     filename: 'bundle.js'
//   },
//   devServer: {
//     historyApiFallback: true,
//     hot: true,
//     inline: true,
//     progress: true,
//     // parse host and port from env for ease of cusomization
//     host: process.env.HOST,
//     port: process.env.PORT
//   },
//   plugins: [
//     new webpack.HotModuleReplacementPlugin(),
//     new HtmlwebpackPlugin({
//       title: 'Kanban app'
//     }),
//     new OpenBrowserPlugin({
//       url: 'http://localhost:8080'
//     })
//   ],
//   module:{
//     loaders:[
//       {
//         test: /\.css$/,
//         loaders: ['style', 'css'],
//         include: APP_PATH
//       }
//     ]
//   }
// };
