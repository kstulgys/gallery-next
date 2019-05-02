;(function(window) {
  var Flickr = function() {}

  Flickr.prototype = {
    async search(query, signal) {
      console.log(query)
      const API_KEY = 'b394136d5dde8d9d0d4f8fc6685386e2'
      const url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&tags=${query}&format=json&nojsoncallback=1`
      return await fetch(url, { signal })
        .then(response => response.json())
        .then(result => {
          // console.log(result)
          const images = result.photos.photo.map(
            ({ farm, server, id, secret, title }, i) => {
              return {
                url: `http://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`,
                id,
                title
              }
            }
          )
          return images
        })
        .catch(e => {
          console.log(e.message)
        })
    },
    getModuleId() {
      return 'flickr'
    }
  }

  window.CLASSES.FlickrClass = Flickr
})(window)
