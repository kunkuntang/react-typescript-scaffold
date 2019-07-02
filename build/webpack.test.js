const webpack=require('webpack')
const merge = require('webpack-merge')
const baseConfig=require('./webpack.common')

const testConfig = {
  mode: "test",
  devtool: 'eval-source-map',
}

module.exports=merge(baseConfig,testConfig)

