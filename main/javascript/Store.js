;(function(window) {
  var Store = class Store {
    constructor() {
      this.moduleId = 'flickr'
      this.images = []
      this.likes = []
      this.init()
    }

    init() {
      const likes = JSON.parse(localStorage.getItem('likes'))
      this.likes = likes || []
    }

    findImage(id) {
      return this.images.find(img => img.id === id)
    }

    isLiked(id) {
      return this.likes.findIndex(image => image.id === id) > -1
    }

    addToLikes(image) {
      this.likes = [...this.likes, image]
      localStorage.setItem('likes', JSON.stringify(this.likes))
    }

    removeFromLikes(image) {
      this.likes = this.likes.filter(_image => _image.id !== image.id)
      localStorage.setItem('likes', JSON.stringify(this.likes))
    }

    getImages(images) {
      this.images = images.map(img => {
        if (this.isLiked(img.id)) {
          return { ...img, liked: true }
        } else {
          return { ...img, liked: false }
        }
      })
      return this.images
    }

    clearStorage() {
      this.likes = []
      localStorage.clear()
    }
  }

  window.CLASSES.StoreClass = Store
})(window)
