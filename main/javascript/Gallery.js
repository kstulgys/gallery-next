;(function(window) {
  var Gallery = class Gallery {
    constructor() {
      this._imageFinder = imageFinder
      this._store = new StoreClass()
      this._view = new ViewClass(this.setEventListeners.bind(this))
      this.aborter = null
    }

    setEventListeners() {
      console.log('Gallery view is ready!')
      this._view.setLikes(this._store.likes)

      const {
        form,
        input,
        dropDown,
        overlay,
        likes,
        clearLikes
      } = this._view.cache
      input.focus()

      form.onsubmit = e => {
        e.preventDefault()
        this._view.clearResults()
        this._view.showLoader()
        this.doSearch(input.value, this._store.moduleId)
        input.value = ''
      }

      dropDown.onchange = e => this._onModuleChange(e)
      overlay.onclick = e => this._view.closeImage()
      likes.onclick = e => this._view.viewImage(e.target.src)
      clearLikes.onclick = () => this._clearStorage()

      this.doSearch('hello', this._store.moduleId)
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
      this._view.hideLoader()
      const storeImages = this._store.getImages(images)
      if (storeImages.length === 0) {
        this._view.showNoResults()
      } else {
        this._view.addSearchResultsToView(storeImages)
        var { results } = this._view.cache
        results.onclick = e => {
          this._handleResultsOnClick(e)
        }
      }
    }

    _handleResultsOnClick(e) {
      const { id } = e.target.closest('.image-container').dataset

      if (e.target.matches('.like-image, .like-image *')) {
        const likeSpan = e.target.closest('.like-image')
        this._addToLikes(this._store.findImage(id), likeSpan)
      }
      if (e.target.matches('.view-image, .view-image *')) {
        this._view.viewImage(this._store.findImage(id).url)
      }
    }

    _addToLikes(image, likeSpan) {
      if (!this._store.isLiked(image.id)) {
        this._store.addToLikes(image)
        this._view.addToLikes(image.url, likeSpan)
      } else {
        this._store.removeFromLikes(image)
        this._view.removeFromLikes(this._store.likes, likeSpan)
      }
    }

    _onModuleChange(e) {
      this._store.moduleId = e.target.value
      this._view.focusInput()
    }

    _clearStorage() {
      this._store.clearStorage()
      this._view.clearLikes()
      this._onSearchResultReady({ images: this._store.images })
    }
  }

  window.CLASSES.GalleryClass = Gallery
})(window)
