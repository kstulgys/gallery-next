;(function(window) {
  var Gallery = class Gallery {
    constructor() {
      this._imageFinder = imageFinder
      this._view = new ViewClass(this.onViewReady.bind(this))
      this.aborter = null
      this.moduleId = 'flickr'
      this.images = []
      this.likes = []
      this._getLikesFromStorage()
    }

    _getLikesFromStorage() {
      const likes = JSON.parse(localStorage.getItem('likes'))
      this.likes = likes || []
    }

    _clearStorage() {
      this.likes = []
      this._onSearchResultReady({ images: this.images })
      localStorage.clear()
      this._view.clearLikes()
    }

    onViewReady() {
      console.log('Gallery view is ready!')
      this._view.setLikes(this.likes)

      var {
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
        this.doSearch(input.value, this.moduleId)
        input.value = ''
      }

      dropDown.onchange = e => this._onModuleChange(e)
      overlay.onclick = e => this._view.closeImage()
      likes.onclick = e => this._view.viewImage(e.target.src)
      clearLikes.onclick = () => this._clearStorage()

      this.doSearch('lithuania', this.moduleId)
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
      this.images = images.map(img => {
        if (this._isLiked(img.id)) {
          return { ...img, liked: true }
        } else {
          return { ...img, liked: false }
        }
      })
      if (this.images.length === 0) {
        this._view.showNoResults()
      } else {
        this._view.addSearchResultsToView(this.images)
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
        this._addToLikes(this._findImage(id), likeSpan)
      }
      if (e.target.matches('.view-image, .view-image *')) {
        this._view.viewImage(this._findImage(id).url)
      }
    }

    _findImage(id) {
      return this.images.find(img => img.id === id)
    }

    _addToLikes(image, likeSpan) {
      if (!this._isLiked(image.id)) {
        this.likes = [...this.likes, image]
        localStorage.setItem('likes', JSON.stringify(this.likes))
        this._view.addToLikes(image.url, likeSpan)
      } else {
        this.likes = this.likes.filter(_image => _image.id !== image.id)
        localStorage.setItem('likes', JSON.stringify(this.likes))
        this._view.removeFromLikes(this.likes, likeSpan)
      }
    }

    _onModuleChange(e) {
      this.moduleId = e.target.value
      this._view.focusInput()
    }

    _isLiked(id) {
      return this.likes.findIndex(image => image.id === id) > -1
    }
  }

  window.CLASSES.GalleryClass = Gallery
})(window)
