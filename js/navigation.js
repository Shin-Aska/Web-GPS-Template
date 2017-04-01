var constant = 0.20;

$( "#closeArea" ).dialog({
  autoOpen: false,
  resizable: false,
  width: $(window).width() - ($(window).width() * constant),
  height: $(window).height() - ($(window).height() * constant),
  buttons: {
    "Close Dialog": function() {
      $( this ).dialog( "close" );
    },
  },

  show: {
    effect: "blind",
    duration: 1000
  },

  hide: {
    effect: "blind",
    duration: 1000
  }
});

$(window).resize(function () {
   $('.ui-dialog').css({
        'width': $(window).width() - ($(window).width() * constant),
        'height': $(window).height() - ($(window).height() * constant),
   });
}).resize(); //<---- resizes on page ready