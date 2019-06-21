import 'babel-polyfill'
import router from '@/router'

if ('-ms-scroll-limit' in document.documentElement.style && '-ms-ime-align' in document.documentElement.style) {
  window.addEventListener('hashchange', function () {
    var currentPath = window.location.hash.slice(1)
    if (router.path !== currentPath) {
      router.push(currentPath)
    }
  }, false)
}
