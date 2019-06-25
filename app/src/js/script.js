;(function($) {
  // slider
  var slider = simpleslider.getSlider({
    prop: 'opacity',
    unit: '',
    init: 0,
    show: 1,
    end: 0,
    duration: 1,
    delay: 5
  });
  $('.slider__prev').click(function(){
    slider.prev();
  });
  $('.slider__next').click(function(){
    slider.next();
  });

  $('[data-popup-toggler]').click(function(){
    $('[data-popup]').addClass('show');
  });
  $('.popup__close').click(function(){
    $('[data-popup]').removeClass('show');
  })
})(jQuery);