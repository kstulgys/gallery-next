;(function(window) {
  var ImageFinder = function(static, flickr) {
    this._static = static
    this._flickr = flickr
    this.modules = ['static', 'flickr']
  }

  ImageFinder.prototype = {
    /**
     * start a new search
     * @param {String} query - search term to look for
     * @param {String} moduleId - search module id (flickr/static)
     * @param {Object} signal - signal object to handle request canceling
     * @param {Function} cb - callback function to get the data back to the instance
     *
     */

    async search(query, moduleId, signal) {
      console.log(query, moduleId)
      if (!this.modules.includes(moduleId)) {
        throw new Error()
      }
      if (moduleId === 'static') {
        this._static.search(query)
      }
      if (moduleId === 'flickr') {
        await this._flickr.search(query, signal)
      }
    }
  }
  window.CLASSES.ImageFinderClass = ImageFinder
})(window)
