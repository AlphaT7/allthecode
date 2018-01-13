
$.fn.sticky = function(options) {
  
    var settings = $.extend({
        targetOffset: 0,
        triggerOffset: 0,
        hideOn: '',
        hideTriggerOffset: 0
      }, options );
    var $this = $(this);
    var $botShadow = $('.bottom-shadow'); 
    var $hideOn = $(settings.hideOn);
    var $onSticky = $('.on-sticky')
    var stickyTop = $this.offset().top + settings.triggerOffset;
    var stickied = 0;
    var stickyHidden = 0;
    var scrollTop = 0;
    //var hideTriggerOffset = (settings.hideTriggerOffset/100) * $hideOn.height();
    var hideTrigger = $hideOn.offset().top + settings.hideTriggerOffset - $hideOn.height()*0.2;
    
      $(window).resize(function() {
        hideTrigger = $hideOn.offset().top + settings.hideTriggerOffset - $hideOn.height()*0.2;
      });
    
    function stickyUpdate(){
      
      if ( (stickyTop > scrollTop) && stickied ) {
        $this
          .removeClass('stickied')
          .css({
            position: '',
            top: ''
          });
        $onSticky
          .removeClass('fadeIn')
          .addClass('animated fadeOut');
        $botShadow
          .removeClass('fadeIn')
          .addClass('animated fadeOut');
        stickied = 0;
      }
      else if ( (stickyTop <= scrollTop) && (hideTrigger >= scrollTop) && !stickied ) {
        $this
          .addClass('stickied')
          .css({
            position: 'fixed',
            top: 0 + settings.targetOffset
          });
        $onSticky
          .removeClass('fadeOut')
          .addClass('animated fadeIn');
        $botShadow
          .removeClass('fadeOut')
          .addClass('animated fadeIn');
        stickied = 1;
      }
      else if ($hideOn[0]) {
        if ( (hideTrigger < scrollTop) && !stickyHidden ) {
              stickyHidden = 1;
              $this
                .removeClass('slideDown')
                .addClass('animated slideUp');
        }
        else if ( (hideTrigger > scrollTop) && stickyHidden ) {
              stickyHidden = 0;
              $this
                .removeClass('slideUp')
                .addClass('animated slideDown');
        }
      }
      
      requestAnimationFrame(stickyUpdate);
    }
    
    $(window).on('scroll', function(){
      scrollTop = $(window).scrollTop();
      requestAnimationFrame(stickyUpdate);
    });
      
  }
  
  $.fn.returnTop = function(options) {  
    var settings = $.extend ({
      targetElement: ''
    }, options);
    var $this = $(this);
    var trigger = $(settings.targetElement)[0] ? $(settings.targetElement).offset().top : 200;
    var returnTopHidden = 1;
    
    $(window).on('scroll', function() {
      var scrollTop = $(window).scrollTop();
      if ( (scrollTop > trigger) && returnTopHidden ) {
        $this
          .removeClass('fadeOut slideRight')
          .addClass('animated fadeIn slideLeft');
        returnTopHidden = 0;
      } else if ( (scrollTop <= trigger) && !returnTopHidden ) {
        $this
          .removeClass('fadeIn slideLeft')
          .addClass('animated fadeOut slideRight');
        returnTopHidden = 1;
      }
    });
  
    $this.click(function () {
      $("html, body").animate({scrollTop: 0}, 800);
      return false;
    });
    
  }
  
  function showWindowWidth() {
      $('.width').text('	Current width is ' + $(window).width() + 'px.');
      $(window).resize(function() {
          width = $(window).width();
          $('.width').text('	Current width is ' + width + 'px.');
      });
  }
  
  function smoothScrollAnchor() {
    
    var htmlBody = htmlBody || $('html,body');
    var smoothAnchor = $('.smoothAnchor');
    var scrollTop = 0;
    
    $(window).on('scroll', function(){
      scrollTop = $(window).scrollTop(); 
      smoothAnchor.each(function(){
        target = $( $.attr(this, 'href') );
        targetTop = target.offset().top - (parseInt($('body').css('font-size')) * 8);
        targetBottom = target.offset().top + (parseInt($('body').css('font-size')) * 10);
        if ((scrollTop > targetTop) && (scrollTop < targetBottom)) {
          smoothAnchor.removeClass('current').parent().removeClass('active');
          $(this).addClass('current').parent().addClass('active');
        } 
      });
      if ( scrollTop < ($($.attr(smoothAnchor[0], 'href')).offset().top - 120) ) {
        smoothAnchor.removeClass('current');
      }
    });
    
    smoothAnchor.click(function(){
        htmlBody.animate({
            scrollTop: $( $.attr(this, 'href') ).offset().top - 80
        }, 1000);
        return false;
    });
  }
  
  $(document).ready(function(){
      $('nav').sticky({
        'hideOn': 'p:last-child'
      });
              $('#return-top').returnTop();
          showWindowWidth();
      smoothScrollAnchor();
  });
  