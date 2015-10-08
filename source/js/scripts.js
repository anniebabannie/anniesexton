/**
 * DOMController Boilerplate
 *
 * A basic boilerplate for controlling your page. This DOMController Object is intended
 * to provide structure to your event binds and basic page interaction.
 *
 * Copyright (c) 2015 Digital Telepathy (http://www.dtelepathy.com/)
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
;(function($, window, undefined) {
  /**
   * DOMController Object
   *
   * @param {Object}  context   DOM element to use as the context for binding events,
   *                            getting elements, etc.
   */
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
      $('#work-experience').masonry({
        itemSelector: '.work-block'
      });
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
    },
  };

  $(function(){
    DOMController.initialize();
  });
})(jQuery, window, null);