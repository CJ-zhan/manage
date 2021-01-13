const ora = require('ora')
const path = require('path')
const chalk = require('chalk')
const shell = require('shelljs')
const fs = require('fs')

const spinner = ora()
spinner.start()
const env = process.argv[2]

const distDir = path.resolve(__dirname, `./dist/${env}`)
const dirs = fs.readdirSync(distDir) // [ '201909111711', '201909111717' ] 默认递增
const version = dirs[dirs.length - 1] // 最新版本的打包文件目录名 201909111717

shell.cd(path.resolve(__dirname, `./dist/${env}/${version}`))

console.log(chalk.cyan('开始复制文件\n'))
// shell.rm('-r', path.resolve(__dirname, `../cdn_assets/chuman-grayscale/*`))
shell.cp('-r', path.resolve(__dirname, `./dist/${env}/${version}/*`), path.resolve(__dirname, `../cdn_assets/chuman-grayscale`))
console.log(chalk.cyan(`release: ${version}\n`))
console.log(chalk.cyan('复制完成\n'))

spinner.stop()
