;(function(window) {
  var View = class View {
    constructor(onViewReady) {
      this.cache = {}
      this.onViewReady = onViewReady
    }

    addToNode(node) {
      node.insertAdjacentHTML('afterbegin', this.render())
      this.cache.results = document.querySelector('.gallery-results')
      this.cache.form = document.querySelector('.search')
      this.cache.input = document.querySelector('.search__field')
      this.cache.dropDown = document.querySelector('select')
      this.cache.overlay = document.querySelector('.overlay')
      this.cache.likes = document.querySelector('.likes__list')
      this.cache.clearLikes = document.querySelector('.clear-likes-btn')

      this.onViewReady()
    }

    addSearchResultsToView(images) {
      this.cache.results.innerHTML = ''
      images.forEach(image => {
        this.cache.results.insertAdjacentHTML(
          'beforeend',
          this.renderImage(image)
        )
      })

      this.cache.allImages = [...document.querySelectorAll('.image-container')]
    }

    renderImage({ url, id, liked }) {
      return `
        <div class="image-container" data-id=${id}>
          <img src=${url} class="image"/>
          <div class='image-action'>
            <span class='like-image'>
            ${
              liked
                ? `<i class="fas fa-heart fa-6x"></i>`
                : `<i class="far fa-heart fa-6x"></i>`
            }
            </span>
            <span class='view-image'>
              <i class="far fa-eye fa-6x"></i>
            </span>
          </div>
        </div>
      `
    }

    focusInput() {
      this.cache.input.focus()
    }

    showNoResults() {
      const markup = `<div class='no-results'>
        <h1>No results found :(</h1>
      </div>`
      this.cache.results.innerHTML = ''
      this.cache.results.insertAdjacentHTML('afterbegin', markup)
    }

    setLikes(images) {
      images.forEach(image => {
        this.addToLikes(image.url)
      })
    }

    viewImage(image) {
      this.cache.overlay.innerHTML = ''
      this.cache.overlay.style.visibility = 'visible'
      this.cache.overlay.insertAdjacentHTML('afterbegin', `<img src=${image}/>`)
    }

    closeImage() {
      this.cache.overlay.style.visibility = 'hidden'
      this.cache.overlay.innerHTML = ''
    }

    addToLikes(url, likeSpan) {
      const markup = `
        <li>
          <img class='liked-image' src=${url}/>
        </li>
      `
      this.cache.likes.insertAdjacentHTML('beforeend', markup)
      if (likeSpan) {
        likeSpan.innerHTML = `<i class="fas fa-heart fa-6x"></i>`
      }
    }

    removeFromLikes(likes, likeSpan) {
      this.cache.likes.innerHTML = ''
      likes.forEach(({ url }) => {
        this.addToLikes(url)
      })

      if (likeSpan) {
        likeSpan.innerHTML = `<i class="far fa-heart fa-6x"></i>`
      }
    }

    clearLikes() {
      this.cache.likes.innerHTML = ''
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
                      <button class='clear-likes-btn'>Clear likes</button>
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

  window.CLASSES.ViewClass = View
})(window)
