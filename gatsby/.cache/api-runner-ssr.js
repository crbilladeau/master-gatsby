var plugins = [{
      plugin: require('C:/Users/Charlie Billadeau/Desktop/master-gatsby/gatsby/node_modules/gatsby-plugin-styled-components/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('C:/Users/Charlie Billadeau/Desktop/master-gatsby/gatsby/node_modules/gatsby-plugin-react-helmet/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('C:/Users/Charlie Billadeau/Desktop/master-gatsby/gatsby/node_modules/gatsby-source-sanity/gatsby-ssr'),
      options: {"plugins":[],"projectId":"s8k40fp2","dataset":"production","watchMode":true,"token":"skL55AwYcBIWG9ibswoSYURpPC2OdVuPJOy1wQkFn7w2UyUCGYYWKE36FxMHy12C9BsracyNwLrKEK9PISzwrzaqto8XoySGL3RAbywQ0BK81aD8M63dOB9MgjFaWg7Hg52lvuw4gAKmj1K7fLlZPNtUHKgQI4SFaQW1sMHoLntgAMddrUBy"},
    },{
      plugin: require('C:/Users/Charlie Billadeau/Desktop/master-gatsby/gatsby/gatsby-ssr'),
      options: {"plugins":[]},
    }]
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

// Run the specified API in any plugins that have implemented it
module.exports = (api, args, defaultReturn, argTransform) => {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  // Run each plugin in series.
  // eslint-disable-next-line no-undef
  let results = plugins.map(plugin => {
    if (!plugin.plugin[api]) {
      return undefined
    }
    const result = plugin.plugin[api](args, plugin.options)
    if (result && argTransform) {
      args = argTransform({ args, result })
    }
    return result
  })

  // Filter out undefined results.
  results = results.filter(result => typeof result !== `undefined`)

  if (results.length > 0) {
    return results
  } else {
    return [defaultReturn]
  }
}
