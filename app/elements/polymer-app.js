Polymer('polymer-app', {

    // possible routes

        routes:{
            '/':{ id:'home', container:'content', element:'elements/polymer-home.html', constructor:'PolymerHome'},
            '/about':{ id:'about', container:'content', element:'elements/polymer-about.html', constructor:'PolymerAbout'}
        },

    // on ready config

        ready: function() {

            // load page
            this.getPage(this.getRouteByUrl());

            // start hash watch
            this.watchHash();

        },

        watchHash:function(){

            var that = this;
            var storedHash = window.location.hash;

            window.setInterval(function () {
                if (window.location.hash != storedHash) {
                    storedHash = window.location.hash;
                    that.getPage(that.getRouteByUrl());
                }
            }, 100);

        },

        linkCheck:function(element){

            var exists = false;
            var links   = document.getElementsByTagName('link');

            for(var link in links){
                var href = typeof links[link].getAttribute == "undefined" ? null : links[link].getAttribute('href');
                if(href == element){
                    exists = true;
                }
            }

            return exists;

        },

    // get page

        getPage: function(route) {

            // get container
            var container  = this.getPageContainer(route.container);
            var linkLoaded = this.linkCheck(route.element);
            var page       = null;

            // if link is loaded, just load the page
            // else, load the link, add it to the head, then load the page
            if(linkLoaded){

                page = eval('new ' + route.constructor + '()');
                container.appendChild(page);

            } else {

                // create link and load it, add page object afterwards
                var link = document.createElement('link');
                    link.rel = 'import';
                    link.href = route.element;
                    link.id = 'link_' + route.id;
                    link.onload = function(e) { page = eval('new ' + route.constructor + '()'); container.appendChild(page); };
                    link.onerror = function(e) {};

                // load
                document.head.appendChild(link);

            }

        },

    // get target DOM container

        getPageContainer: function(id) {

            // get container
            var container = document.querySelector('#' + id);

            // if not found, create it
            if (null === container) {
                container = document.createElement('div'); // create DOM div
                container.id = id; // assign it the container id
                document.body.appendChild(container); // attach to body
            }

            // empty it's contents  
            container.innerHTML = null;

            // return new object
            return container;

        },

    // get route by url 

        getRouteByUrl:function(){

            var hash  = document.location.hash.replace('#','');
            var path  = '' == hash ? '/' : hash;
            var route = this.routes[path];

            return route;

        },

});