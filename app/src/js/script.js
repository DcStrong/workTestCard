;(function($) {
  // slider
  try {
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
} catch(e) {}

  $('[data-popup-toggler]').click(function(){
    $('[data-popup]').addClass('show');
  });
  $('.popup__close').click(function(){
    $('[data-popup]').removeClass('show');
  });

  function t() {
    let cursor = 6;
    let items = $('.partners__item');

    function switcher(cursor) {
      items.attr('data-visibility', 0);
      for(var i = cursor - 6; i < cursor; i++) {
        $(items[i]).attr('data-visibility', 1);
      }
    }

    switcher(cursor);

    $('.partners__control').click(function() {
      let intent = $(this).data('control');

      if (intent == 1) {
        if (cursor >= items.length) {
          return;
        }

        cursor += 6;
      } else if (intent == -1) {
        cursor -= 6;

        if (cursor <= 0) {
          cursor += 6;
          return;
        }
      }

      switcher(cursor);
    });
  }
  t();
})(jQuery);