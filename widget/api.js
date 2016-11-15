var widget = (function() {
  var PORT = 5001;
  var HOST = 'http://localhost';

  var init = function(id) {
    var el = document.getElementById(id)
    if(el) {
      var i = document.createElement('iframe');
      i.setAttribute('src', `${HOST}:${PORT}`);
      i.setAttribute('width', '200px');
      i.setAttribute('frameborder', '0');
      i.setAttribute('scrolling', 'no');
      i.style.border = 'none';
      i.style.width = '100%';
      i.style.height = '600px';
      i.style.position = 'relative';
      i.style.overflow = 'hidden';
      el.appendChild(i)
    }
  }

  init('widget')
})()