const fs = require('fs-extra')
const templates = [
  'empty',
  'simple-crud',
  'sandbox',
  'crm',
  'cms',
]
const resources = [
  {
    type: 'dir',
    sl: 'public',
    tl: 'public',
  },
  {
    type: 'dir',
    sl: 'locales',
    tl: 'src/locales',
  },
  {
    type: 'dir',
    sl: 'routes',
    tl: 'src/routes',
  },
  {
    type: 'dir',
    sl: 'config',
    tl: 'src/config',
  },
  {
    type: 'file',
    sl: 'main.js',
    tl: 'src/main.js',
  },
  {
    type: 'file',
    sl: 'router.js',
    tl: 'src/router.js',
  },
  {
    type: 'file',
    sl: 'registerServiceWorker.js',
    tl: 'src/registerServiceWorker.js',
  },
]
var args = process.argv.slice(2)

const usage = function () {
  const usageText = `
\x1b[46m\x1b[30m HELP \x1b[0m\x1b[36m

Use the wizard to load the appropriate template.

Usage:
  load-template <template>

  available templates:

  empty         - empty template for creating applications from scratch
  simple-crud   - simple CRUD example (with table configuration)
  sandbox       - Vue CRUD demo (with configuration)
  crm           - extended example of crm app (with auth, app layout and various CRUD exmples)
  cms           - extended example of cms app (with auth, app layout and various CRUD exmples)
  `

  console.log(usageText)
}

function errorLog (error) {
  console.log(
    `
\x1b[41m\x1b[30m  Error \x1b[0m\x1b[31m ${error}
    `
  )
}

function successLog () {
  console.log(
    `
\x1b[42m\x1b[30m DONE \x1b[0m\x1b[32m Template has been successfuly loaded.
    `
  )
}

if (args.length !== 1) {
  errorLog(`Only one argument can be passed`)
  usage()
} else {
  var arg = args[0]
  if (arg === '-help' || arg === '-h') {
    usage()
  } else if (templates.includes(arg)) {
    resources.forEach(function (resource) {
      var sl = `examples/${arg}/${resource.sl}`
      var tl = resource.tl
      if (fs.existsSync(tl)) {
        fs.removeSync(tl)
      }
      if (fs.existsSync(sl)) {
        fs.copySync(sl, tl)
      }
    })
    successLog()
  } else {
    errorLog(`Specified template doesn't exist.`)
    usage()
  }
}
console.log('\x1b[0m')
