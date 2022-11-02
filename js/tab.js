var $j = jQuery.noConflict();
$j(function() {
    $j("#tabs").tabs({
      show: { effect: "blind", direction: "right", duration: 300 }
    });
    $j( "#accordion" ).accordion();
  
    var btn = $j('#accordion li a');
    var wrapper = $j('#accordion li');
  
    $j(btn).on('click', function() {
      $j(btn).removeClass('active');
      $j(btn).parent().find('.addon').removeClass('fadein');
      
      $j(this).addClass('active');
      $j(this).parent().find('.addon').addClass('fadein');
    });
  });