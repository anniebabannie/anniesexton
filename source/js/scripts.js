;(function($, window, undefined) {
  var AnnieScript = {
    selectors: {
      smoothScroll: '.smooth-scroll',
      workExperienceWrapper: '#work-experience-wrapper',
      topNav: '#top-nav',
      portfolioBlockWrapper: '.portfolio-block-wrapper',
      heroTableCell: '#hero .table-cell',
      heroDownArrow: '#hero i',
      tag: '.tag',
      tagFiltered: '.tag-filtered'
    },
    displayGithubLinkPoint: 800,
    _bindEvents: function() {
      var self = this;
      $(window).on('scroll', function() {
        var scrollTop = $(window).scrollTop();
          self.heroScroll(scrollTop);
          self.toggleNav(scrollTop);
          if (scrollTop > self.displayGithubLinkPoint) {
            self.showGithubLink();
          }
      });
      $('body').on('click', this.selectors.smoothScroll, function(event){
        if (!$(event.target).is('#email-me')) {
          event.preventDefault();
          self.smoothScrollTo($(this).attr('href'));
        }
      });
      this.elements.tag.on('click', function(e){
        self.toggleTags($(e.target));
      });
    },
    _bindVendors: function() {
      this.elements.workExperienceWrapper.masonry({
        itemSelector: '.work-block'
      });
    },
    smoothScrollTo: function($el, speed, offset, delay) {
      speed = speed || 500;
      delay = delay || 0;
      var top = $el;
      if( isNaN($el) ) {
        top = $($el).offset().top;
      }
      top = top + ( parseInt( offset, 10 ) || 0 );
          
      $( 'html, body' ).delay( delay ).animate( {
          scrollTop: top
      }, {
          duration: speed,
          easing: "swing",
          complete: function() {
              // Enforce window scroll
              window.scrollTo( 0, top );
          }
      });
    },
    displayNavPoint: 300,
    toggleNav: function(scrollTop) {
      if (scrollTop > this.displayNavPoint) {
        this.elements.topNav.addClass('visible');
      } else {
        this.elements.topNav.removeClass('visible');
      }
    },
    showGithubLink: function() {
      $('#github-this-site').addClass('visible');
    },
    toggleTags: function(clickedTag) {
      var tag = clickedTag.data('tag');
      if (clickedTag.hasClass('active')) {
        this.elements.tag.removeClass('active');
        this.elements.tagFiltered.addClass('visible');
      } else {
        this.elements.tag.removeClass('active');
        this.elements.tagFiltered.removeClass('visible');
        this.elements.tagFiltered.each(function() {
          var tagElement = $(this).find('.tag[data-tag="' + tag + '"]');
          if (tagElement.length) {
            tagElement.addClass('active')
            $(this).addClass('visible');
          }
        });
      }
    },
    setProjectBlockHeights: function() {
      var maxHeight = 0;
      this.elements.portfolioBlockWrapper.each(function() {
        var projectBlock = $(this).find('.project-block');
        maxHeight = maxHeight > projectBlock.innerHeight() ? maxHeight : projectBlock.innerHeight();
      });
      $('.project-block').height(maxHeight);
    },
    heroScroll: function(scrollTop) {
      if( scrollTop <= $(window)[0].innerHeight ) {
        var scrollPercent = $(window).scrollTop()/$(window)[0].innerHeight,
        scrollTransform = (scrollPercent * ($(window)[0].innerHeight * 0.05));

        this.elements.heroTableCell.css({
          transform: 'translate(0, ' + scrollTransform + '%)',
          opacity: (100 - (scrollTransform*4))/100
        });
        this.elements.heroDownArrow.css({
          opacity: (100 - (scrollTransform*4))/100
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

    initialize: function(context){
      this.context = context || window.document;

      this.elements = this._getElements(this.selectors, this.context);
      
      this._bindEvents();
      this._bindVendors();
      this.setProjectBlockHeights();
    },
  };

  $(function(){
    AnnieScript.initialize();
  });
})(jQuery, window, null);