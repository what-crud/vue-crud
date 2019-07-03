const fs = require('fs')
const rootDir = './docs/.vuepress'
const defaultEnv = `${rootDir}/env.default.js`
const env = `${rootDir}/env.js`

if (!fs.existsSync(env)) {
  fs.copyFile(defaultEnv, env, (err) => {
    if (err) throw err
    console.log('Default env file has been created')
  })
}
