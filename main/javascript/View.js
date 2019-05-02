;(function(window) {
  var View = class View {
    constructor(onViewReady) {
      this.cache = {}
      this.onViewReady = onViewReady
    }

    addToNode(node) {
      node.insertAdjacentHTML('afterbegin', this.render())
      this.onViewReady()
    }

    cacheDOM() {
      this.cache.results = document.querySelector('.gallery-results')
      this.cache.form = document.querySelector('.search')
      this.cache.input = document.querySelector('.search__field')
      this.cache.dropDown = document.querySelector('select')
      this.cache.overlay = document.querySelector('.overlay')
    }

    addSearchResultsToView(images) {
      console.log(images)
      this.cache.results.innerHTML = ''
      images.forEach(image => {
        this.cache.results.insertAdjacentHTML(
          'beforeend',
          this.renderImage(image)
        )
      })
      this.cache.allImages = [...document.querySelectorAll('.image')]
    }

    renderImage(image) {
      return `
        <div class="image-container">
          <img src=${image.url} class="image" />
        </div>
      `
    }

    focusInput() {
      this.cache.input.focus()
    }

    render() {
      return `
              <div class="container">
              
                <!-- header -->
                <header class="header">
                  <img
                    src="../resources/images/Wix_logo.jpg"
                    alt="Logo"
                    class="header__logo"
                  />
                  <form class="search">
                    <input
                      type="text"
                      class="search__field"
                      placeholder="What are you looking for?"
                    />
                    <button class="btn search__btn">
                      <span class="search__icon">
                        <i class="fas fa-search fa-lg"></i>
                      </span>
                    </button>
                  </form>

                  <select class="select">
                    <option value="flickr" class='flickr' selected>Flickr</option>
                    <option value="static" class='static'>Static</option>
                  </select>

                  <div class="likes">
                    <div class="likes__field">
                      <span class="likes__icon">
                        <i class="fas fa-heart fa-4x"></i>
                      </span>
                    </div>
                    <div class="likes__panel">
                      <ul class="likes__list">
                        <!-- liked images -->
                      </ul>
                    </div>
                  </div>
                </header>
                <!-- end of header -->

                <!-- results -->
                <section class="gallery-results">
      
                </section>
                <!-- end of results -->

                <!-- Footer -->
                <div class="footer">
                  <h1 class="">Designed by Karolis</h1>
                  <div class="overlay"></div>
                </div>
                <!-- end of Footer -->
              </div>
              `
    }
  }

  // var View = function() {}
  // View.prototype = {
  //   startLoaderAndDoCleanup() {
  //     this.startLoader()
  //     this._resultsNode.innerHTML = ''
  //     this._noResultsNode.style.display = 'none'
  //   },

  //   stopLoaderAndDoCleanup() {
  //     this.stopLoader()
  //     this._noResultsNode.style.display = 'none'
  //     this._noResultsNode.style.opacity = '0'
  //   },

  //   stopLoader() {
  //     this._spinnerNode.style.display = 'none'
  //     this._queryInputNode.value = ''
  //   },

  //   startLoader() {
  //     this._spinnerNode.style.display = 'initial'
  //   },

  //   getInputText(e) {
  //     return e.target.value
  //   },

  //   showNoResults() {
  //     this.stopLoaderAndDoCleanup()
  //     this._noResultsNode.style.display = 'initial'
  //     this._noResultsNode.style.opacity = '1'
  //     this._noResultsNode.style.transform = 'translateX(0)'
  //   },

  //   /**
  //    * update gallery content with search results
  //    * @param {[{id:String, url:string, title:string}]}} results -  array of images for gallery update
  //    */
  //   addSearchResultsToView(results) {
  //     const resultsLength = results.length
  //     let loaded = 0
  //     results.forEach((item, i) => {
  //       let imgNode = document.createElement('img')
  //       imgNode.setAttribute('src', item.url)
  //       imgNode.setAttribute('class', 'gallery-image')
  //       imgNode.addEventListener('click', e => this.onImageClick(e))
  //       imgNode.onload = () => {
  //         loaded++
  //         this._imageCounter.innerHTML = `${loaded}/${resultsLength}`
  //         this._resultsNode.appendChild(imgNode)
  //         if (resultsLength >= 12) {
  //           if (loaded === 12) {
  //             this.stopLoaderAndDoCleanup()
  //           }
  //         } else {
  //           this.stopLoaderAndDoCleanup()
  //         }
  //       }
  //     })
  //   },

  // focusInput() {
  //   this._queryInputNode.focus()
  // },

  //   onImageClick(e) {
  //     this._modalImgNode.setAttribute('src', e.target.src)
  //     Object.assign(this._modalNode.style, {
  //       visibility: 'visible',
  //       opacity: '1'
  //     })
  //   },

  //   /**
  //    * adds gallery main view node as child node
  //    * @param {htmlElement} node - html element to append to
  //    */
  //   addToNode(node) {
  //     node.appendChild(this._viewNode)
  //   },

  //   onOutsideImageClick(e) {
  //     Object.assign(this._modalNode.style, {
  //       visibility: 'hidden',
  //       opacity: '0'
  //     })
  //   },

  //   /**
  //    * add event event listeners to the DOM and triger default search
  //    * @param {Object} galleryThis - gallery instance
  //    */
  //   setFunctionality(galleryThis) {
  //     this._queryInputNode.addEventListener('change', e => {
  //       e.preventDefault()
  //       galleryThis._onSearchButtonClick(e)
  //     })

  //     this._formNode.addEventListener('submit', e => {
  //       e.preventDefault()
  //     })

  //     this._dropDownNode.addEventListener('change', e => {
  //       console.log(e.target.value)
  //       galleryThis._onModuleChange(e)
  //     })

  //     this._modalNode.addEventListener('click', e => {
  //       this.onOutsideImageClick(e)
  //     })

  //     this.startLoaderAndDoCleanup()
  //     var { query, selectedModuleId } = galleryThis.state
  //     galleryThis.doSearch(query, selectedModuleId)
  //   },

  //   /**
  //    * creates gallery view, inner structure and ui
  //    */
  //   createInterface() {
  //     this._viewNode = document.createElement('div')
  //     this._viewNode.classList.add('gallery')

  //     this._controlsNode = document.createElement('div')
  //     this._controlsNode.classList.add('gallery-controls')
  //     this._viewNode.appendChild(this._controlsNode)

  //     this._noResultsNode = document.createElement('h1')
  //     this._noResultsNode.classList.add('no-results')
  //     this._noResultsNode.innerHTML = 'Sorry, no results found :-S'
  //     this._viewNode.appendChild(this._noResultsNode)

  //     this._formNode = document.createElement('form')
  //     this._queryInputNode = document.createElement('input')
  //     this._queryInputNode.placeholder = 'Search for anything...'
  //     this._queryInputNode.autofocus = true

  //     this._searchBtnNode = document.createElement('button')
  //     this._searchBtnNode.innerHTML = '&rArr;'
  //     this._formNode.appendChild(this._queryInputNode)
  //     this._formNode.appendChild(this._searchBtnNode)
  //     this._controlsNode.appendChild(this._formNode)

  //     this._dropDownNode = document.createElement('select')
  //     this._option1Node = document.createElement('option')
  //     this._option2Node = document.createElement('option')
  //     this._option1Node.value = 'static'
  //     this._option1Node.innerHTML = 'static'

  //     this._option2Node.value = 'flickr'
  //     this._option2Node.innerHTML = 'flickr'
  //     this._option2Node.selected = 'selected'

  //     this._dropDownNode.appendChild(this._option1Node)
  //     this._dropDownNode.appendChild(this._option2Node)
  //     this._controlsNode.appendChild(this._dropDownNode)

  //     this._imageCounter = document.createElement('p')
  //     this._imageCounter.innerHTML = ''
  //     this._controlsNode.appendChild(this._imageCounter)

  //     this._resultsNode = document.createElement('div')
  //     this._resultsNode.classList.add('gallery-items')
  //     this._viewNode.appendChild(this._resultsNode)

  //     this._modalNode = document.createElement('div')
  //     this._modalNode.classList.add('modal')
  //     this._viewNode.appendChild(this._modalNode)

  //     this._modalImgNode = document.createElement('img')
  //     this._modalImgNode.classList.add('modal-img')
  //     this._modalNode.appendChild(this._modalImgNode)

  //     this._spinnerNode = document.createElement('img')
  //     this._spinnerNode.classList.add('spinner')
  //     this._spinnerNode.src = '../resources/loader.svg'
  //     this._viewNode.appendChild(this._spinnerNode)
  //   }
  // }

  window.CLASSES.ViewClass = View
})(window)
