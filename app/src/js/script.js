; ($ => {

  /**
   * card control
   */
  ; (() => {

    let inputSearch = document.querySelector('.card__search-input');

    let button = document.querySelectorAll('.card__button').forEach(function (e) {

      e.addEventListener('click', function (e) {
        let button = e.currentTarget;
        let attribute = e.currentTarget.getAttribute('data-control');

        let target = document.querySelector('[data-target="' + attribute + '"]');


        let isHidden = parseInt(target.getAttribute('data-is-hidden'), 10);
        target.setAttribute('data-animate', ~~!isHidden);

        setTimeout(() => {
          target.setAttribute('data-is-hidden', ~~!isHidden)
          target.setAttribute('data-animate', ~~!isHidden);
        }, 500);

        button.setAttribute('data-active', ~~!isHidden);
      });
    });

  })();


  var states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
    'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 
    'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 
    'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 
    'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 
    'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
    'New Jersey', 'New Mexico', 'New York', 'North Carolina', 
    'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 
    'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 
    'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 
    'West Virginia', 'Wisconsin', 'Wyoming'
  ];

  $(function() {
    $("#search").autocomplete({
      source:[states],
      dropdownStyle:{
        position: 'absolute',
        left: '-38px',
        width: '335px',
        top: '30px',
        fontFamily: 'Open Sans',
        padding: '0 45px',
        boxSizing: 'border-box',
        border: 'none'},
    }); 
  });

})(jQuery);

