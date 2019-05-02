;(function(window) {
  var Flickr = class Flickr {
    search(query, signal, cb) {
      const API_KEY = 'b394136d5dde8d9d0d4f8fc6685386e2'
      const url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&tags=${query}&format=json&nojsoncallback=1`
      fetch(url, { signal })
        .then(response => response.json())
        .then(result => {
          const images = result.photos.photo.map(
            ({ farm, server, id, secret, title }, i) => {
              return {
                url: `http://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`,
                id,
                title
              }
            }
          )
          cb({ query, images })
        })
        .catch(e => {
          console.log(e.message)
        })
    }
  }

  window.CLASSES.FlickrClass = Flickr
})(window)
