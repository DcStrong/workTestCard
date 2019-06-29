;($ => {

  /**
   * main page slider
   */
  ;(() => {
    if ($('.page-main [data-simple-slider]').length === 0) {
      return;
    }

    let slider = simpleslider.getSlider({
      prop: 'opacity',
      unit: '',
      init: 0,
      show: 1,
      end: 0,
      duration: 1,
      delay: 5
    });

    $('.slides__prev').click(() => {
      slider.prev(); });

    $('.slides__next').click(() => {
      slider.next(); });
  })();

  /**
   * popup control
   */
  ;(() => {
    $('[data-popup-toggler]').click(function() {
      let target = $(this).data('popup-toggler')
      $('[data-popup="' + target + '"]').toggleClass('visible');
    });
  })();

  /**
   * page club card
   */
  ;(function () {
    if ($('.page-club').length === 0) {
      return;
    }
    /**
     *  TODO  FIX :
     */
    function ladingPartnersListSwitcher() {
      let cursor = 6;
      let items = $('.partners__item');

      if (!items.length) {
        return;
      }

      function switcher(cursor) {
        items.attr('data-visibility', 0);

        for(let i = cursor - 6; i < cursor; i++) {
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

    ladingPartnersListSwitcher();
  })();

})(jQuery);