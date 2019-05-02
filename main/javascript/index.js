var {
  StaticClass,
  FlickrClass,
  ImageFinderClass,
  ViewClass,
  GalleryClass
} = window.CLASSES

var static = new StaticClass()
var flickr = new FlickrClass()
var imageFinder = new ImageFinderClass(static, flickr)

window.onload = function() {
  /**
   * Sets up a  new gallery
   */
  var gallery1 = new GalleryClass(imageFinder)
  // var gallery2 = new GalleryClass(imageFinder)

  gallery1._view.addToNode(document.body)
  // gallery2._view.addToNode(document.body)

  initiateTest()
}
