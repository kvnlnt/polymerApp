Polymer('polymer-link', {

  // on ready config
  ready: function(){

    // scope ref
      
      var that = this;

    // set up router
    
      this.app = document.querySelector('polymer-app');

    // load page on click
    
      var route = this.app.routes[this.route];

      // override options
      route.container = null === this.container ? route.container : this.container;

      var onclick = function(){ that.app.getPage(route); };
      this.addEventListener('click', onclick);

  },

});