;(function($, window, undefined) {
  var DOMController = {
    selectors: {
      // Element selectors
    },
  
    _bindEvents: function() {
      var self = this;
      $(window).on('scroll', function() {
        var scrollTop = $(window).scrollTop();
          self.heroScroll(scrollTop);
      });
    },

    _bindVendors: function() {
      $('#work-experience-wrapper').masonry({
        itemSelector: '.work-block'
      });
    },
    setProjectBlockHeights: function() {
      var maxHeight = 0;
      $('.portfolio-block-wrapper').each(function() {
        var projectBlock = $(this).find('.project-block');
        maxHeight = maxHeight > projectBlock.innerHeight() ? maxHeight : projectBlock.innerHeight();
      });
      $('.project-block').height(maxHeight);
    },
    heroScroll: function(scrollTop) {
      if( scrollTop <= $(window)[0].innerHeight ) {
        var scrollPercent = $(window).scrollTop()/$(window)[0].innerHeight,
        scrollTransform = (scrollPercent * ($(window)[0].innerHeight * 0.05));

        $('#hero .table-cell').css({
          transform: 'translate(0, ' + scrollTransform + '%)',
          opacity: (100 - (scrollTransform*4))/100
        });
        $('#hero-overlay img').css({
          opacity: (scrollTransform + 30)/100
        });
      }
    },

    _getElements: function(selectors, context) {
      context = context || window.document;

      // Returns true if it is a DOM element    
      var isElement = function(o){
        return (
          typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
          o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
        );
      };

      // Get the element or, continue iterating over the Object
      var getElements = function(selector){
        // The `selector` is a string or DOM element, get it as a jQuery element
        if(typeof(selector) == "string" || isElement(selector)){
          return $(selector, context);
        }
        // The `selector` is an Object, build a new sub-Object and iterate over it
        else {
          var elements = {};

          for(var key in selector){
            elements[key] = getElements(selector[key]);
          }

          return elements;
        }
      };

      return getElements(selectors);
    },

    /**
     * DOMController initialization
     * 
     * @param  {Object} context Optional `document` or DOM element Object to act as the context
     *                          for all element queries and event binding.
     */
    initialize: function(context){
      this.context = context || window.document;

      this.elements = this._getElements(this.selectors, this.context);
      
      this._bindEvents();
      this._bindVendors();
      this.setProjectBlockHeights();
    },
  };

  $(function(){
    DOMController.initialize();
  });
})(jQuery, window, null);