const path = require('path')
const webpack = require('webpack')
const moment = require('moment')

const version = moment().format('YYYYMMDDHHmm')
const proxyURL = 'http://localhost:3000/'

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: './',
  assetsDir: version,
  outputDir: resolve(`dist/${process.env.VUE_APP_ENV}/${version}`),
  configureWebpack: {
    plugins: [
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ]
  },

  chainWebpack: (config) => {
    config.resolve.alias
      .set('@$', resolve('src'))
      .set('@api', resolve('src/api'))
      .set('@assets', resolve('src/assets'))
      .set('@comp', resolve('src/components'))
      .set('@views', resolve('src/views'))
      .set('@layout', resolve('src/layout'))
      .set('@static', resolve('src/static'))

    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .oneOf('inline')
      .resourceQuery(/inline/)
      .use('vue-svg-icon-loader')
      .loader('vue-svg-icon-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: `${version}/img/[name].[hash:8].[ext]`
      })
  },

  css: {
    loaderOptions: {
      less: {
        modifyVars: {},
        javascriptEnabled: true
      }
    }
  },

  devServer: {
    overlay: {
      warnings: false,
      errors: true
    },
    port: 7000,
    proxy: {
      '/manage': {
        target: proxyURL,
        changeOrigin: true,
        headers: {
          referer: proxyURL,
          orgin: proxyURL
        }
      }
    }
  },
  productionSourceMap: false,
  lintOnSave: process.env.NODE_ENV === 'development',
  transpileDependencies: []
}
