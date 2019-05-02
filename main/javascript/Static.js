;(function(window) {
  var Static = class Static {
    search(query, cb) {
      const images = window.DATA.staticImagesDb.reduce((acc, next) => {
        const { title, id, url } = next
        if (title.includes(query)) {
          acc.push({ title, id, url })
        }
        return acc
      }, [])
      cb({ query, images })
    }
  }

  window.CLASSES.StaticClass = Static
})(window)
