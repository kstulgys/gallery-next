;(function(window) {
  var Gallery = class Gallery {
    constructor() {
      this._imageFinder = imageFinder
      this._view = new ViewClass(this.onViewReady.bind(this))
      this.aborter = null
      this.moduleId = 'flickr'
      // this.doSearch(this.state.query, this.state.moduleId)
    }

    onViewReady() {
      console.log('view ready!')
      var { form, input, dropDown } = this._view.cache

      form.onsubmit = e => {
        e.preventDefault()
        this.doSearch(input.value, this.moduleId)
        input.value = ''
      }
      dropDown.onchange = e => {
        this._onModuleChange(e)
      }
    }

    doSearch(query, moduleId) {
      if (this.aborter) {
        this.aborter.abort()
      }
      this.aborter = new AbortController()
      var signal = this.aborter.signal

      this._imageFinder.search(query, moduleId, signal, res =>
        this._onSearchResultReady(res)
      )
    }

    _onSearchResultReady({ images }) {
      if (images.length === 0) {
        this._view.showNoResults()
      } else {
        this._view.addSearchResultsToView(images)
        var { allImages } = this._view.cache
        allImages.forEach(image => {
          image.onclick = e => {
            alert('clicked')
          }
        })
      }
    }

    _onModuleChange(e) {
      this.moduleId = e.target.value
      this._view.focusInput()
    }
  }

  window.CLASSES.GalleryClass = Gallery
})(window)
