;(function(window) {
  var Static = function() {}

  Static.prototype = {
    search(query) {
      const images = window.DATA.staticImagesDb.reduce((acc, next) => {
        const { title, id, url } = next
        if (title.includes(query)) {
          acc.push({ title, id, url })
        }
        return acc
      }, [])
      return { query, images }
    },
    getModuleId() {
      return 'static'
    }
  }
  window.CLASSES.StaticClass = Static
})(window)
