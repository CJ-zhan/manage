module.exports = {
  presets: [
    '@vue/app',
    [
      '@babel/preset-env',
      {
        'useBuiltIns': 'entry'
      }
    ]
  ],
  plugins: [
    [ 'import', {
      'libraryName': 'ant-design-vue',
      'libraryDirectory': 'es',
      'style': true // `style: true` 会加载 less 文件
    } ]
  ],
  env: {
    production: {
      plugins: [
        ['transform-remove-console', { 'exclude': ['warn'] }]
      ]
    }
  }
}