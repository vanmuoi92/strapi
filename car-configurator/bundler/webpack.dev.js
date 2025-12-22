const { merge } = require('webpack-merge')
const commonConfiguration = require('./webpack.common.js')
const portFinderSync = require('portfinder-sync')

module.exports = merge(
    commonConfiguration,
    {
        mode: 'development',
        devServer:
        {
            host: 'localhost',
            port: portFinderSync.getPort(8080),
            open: true,
            hot: true,
        }
    }
)
