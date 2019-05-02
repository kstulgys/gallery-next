;(function(window) {
  var Gallery = class Gallery {
    constructor() {
      this._imageFinder = imageFinder
      this._view = new ViewClass(this.onViewReady.bind(this))
      this.aborter = null
      this.state = { query: 'hello', moduleId: 'flickr', images: [] }
    }

    async onViewReady() {
      await this.doSearch(this.state.query, this.state.moduleId)
      this._view.cacheDOM()
      var { form, input, dropDown, allImages } = this._view.cache
      console.log('ready', form, input, dropDown, allImages)
      form.onsubmit = async e => {
        e.preventDefault()
        var query = input.value
        var moduleId = this.state.moduleId
        await this.doSearch(query, moduleId)
        input.value = ''
      }
      dropDown.onchange = e => {
        this._onModuleChange(e)
      }

      // console.log(allImages)
      // allImages.forEach(image => {
      //   image.onclick = e => {
      //     alert('clicked')
      //   }
      // })
    }

    async doSearch(query, moduleId) {
      if (this.aborter) {
        this.aborter.abort()
      }
      this.aborter = new AbortController()
      var signal = this.aborter.signal

      var searchResults = await this._imageFinder.search(
        query,
        moduleId,
        signal
      )
      this._onSearchResultReady(searchResults)
    }

    _onSearchResultReady(searchResult) {
      console.log(searchResult)
      console.log(searchResult.query, searchResult.images)
      if (searchResult.images.length === 0) {
        // this._view.showNoResults()
        this.state = {
          ...this.state,
          query: '',
          images: []
        }
      } else {
        this.state = {
          ...this.state,
          query: searchResult.query,
          images: searchResult.images
        }
        this._view.addSearchResultsToView(this.state.images)
        // this._view.cacheImages()
        console.log(this._view.cache.allImages)
      }
    }

    _onModuleChange(e) {
      const moduleId = e.target.value
      this.state = { ...this.state, moduleId }
      this._view.focusInput()
    }
  }

  // }
  // var Gallery = function(imageFinder) {
  //   this.state = {
  //     images: [],
  //     selectedModuleId: 'flickr',
  //     query: 'hello world',
  //     prevSearchQuery: ''
  //   }
  //   this._imageFinder = imageFinder
  //   this._view = new ViewClass()
  //   // this._view.createInterface()
  //   // this._view.setFunctionality(this)
  //   this.aborter = null
  // }
  // Gallery.prototype = {
  /**
   * start a new search
   * @param {String} query - search term to look for
   * @param {String} moduleId - selected search module id (flickr/static)
   */
  // doSearch(query, moduleId) {
  //   if (this.aborter) {
  //     this.aborter.abort()
  //   }
  //   this.aborter = new AbortController()
  //   var signal = this.aborter.signal

  //   this._imageFinder.search(query, moduleId, signal, searchResults => {
  //     this._onSearchResultReady(searchResults)
  //   })
  // },

  /**
   * update gallery content with search results
   * @param {query:String{images:[{id:String, url:string, title:string}]}} searchResult - results object for gallery update
   */
  // _onSearchResultReady(searchResult) {
  //   if (searchResult.images.length === 0) {
  //     this._view.showNoResults()
  //     this.state = {
  //       ...this.state,
  //       query: '',
  //       images: []
  //     }
  //   } else {
  //     this.state = {
  //       ...this.state,
  //       query: searchResult.query,
  //       images: searchResult.images
  //     }
  //     this._view.addSearchResultsToView(this.state.images)
  //   }
  // },

  /**
   * Handle search button click
   */
  // _onSearchButtonClick(e) {
  //   this.state = {
  //     ...this.state,
  //     query: this._view.getInputText(e)
  //   }
  //   this._view.startLoaderAndDoCleanup()
  //   this.doSearch(this.state.query, this.state.selectedModuleId)
  // },
  /**
   * Handle moduleId change
   */
  // _onModuleChange(e) {
  //   const selected = e.target.value
  //   this.state = { ...this.state, selectedModuleId: selected }
  //   this._view.focusInput()
  // }
  // }

  window.CLASSES.GalleryClass = Gallery
})(window)
