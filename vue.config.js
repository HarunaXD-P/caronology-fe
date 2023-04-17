const { defineConfig } = require('@vue/cli-service')
const { DefinePlugin } = require('webpack')
const path = require('path')
const resolve = dir => {
    return path.join(__dirname, dir)
}

const IS_TEST = process.env.IS_TEST === 'test'
const IS_PROD = !IS_TEST && process.env.NODE_ENV === 'production'

module.exports = defineConfig({
    publicPath: IS_TEST ? 'localhost:7001' : '',
    transpileDependencies: true,
    configureWebpack: (config) => {
        config.plugins = config.plugins.map((plugin) => {
            if (plugin instanceof DefinePlugin) {
                plugin = new DefinePlugin({
                    'process.env': JSON.stringify({
                        BASE_API: IS_TEST ? 'localhost:7001' : 'localhost:7001',
                        BASE_DOMAIN: IS_PROD ? 'localhost:7001' : 'localhost:7001',
                    })
                })
            }
            return plugin
        })
        config.resolve.fallback = { "stream": require.resolve("stream-browserify") }
    },
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('_lib', resolve('src/common'))
            .set('_com', resolve('src/components'))
            .set('_img', resolve('src/assets/images'))
            .set('_css', resolve('src/assets/css'))
            .set('_js', resolve('src/assets/js'))
            .set('_audio', resolve('src/assets/audio'))
            .set('_font', resolve('src/assets/font'))
            .set('_api', resolve('src/api'))
            .set('_mixin', resolve('src/mixin'))
    },

    devServer: {
        host: 'localhost',
        port: 8080, // 端口地址
        https: true, // 使用https提供服务
    }
})