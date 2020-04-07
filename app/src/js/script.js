; ($ => {
  /**
   * card control
   */
  ; (() => {
    document.querySelectorAll('.card__control-icons').forEach( e => {
      e.addEventListener('click', e => {
        let button = e.currentTarget;
        let control = button.getAttribute('data-control-target');

        document.querySelectorAll(`[data-target=${control}]`).forEach( e => {

          let isHidden = parseInt(e.getAttribute('data-hidden'), 10);
          e.setAttribute('data-hidden', ~~!isHidden);
          button.setAttribute('data-active', ~~!isHidden);

        })

      })
    })
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
        marginLeft: 0,
        top: '30px',
        fontFamily: 'Open Sans',
        padding: '0 45px',
        boxSizing: 'border-box',
        border: 'none'},
    });
  });

})(jQuery);

