$(function() {
  var r = $(".revealp"),
    rb = $(".reveal"),
    m = $(".main"),
    panel = $(".panel");
  panel.css("min-height", m.outerHeight());

  rb.click(function() {
    m.toggleClass("ractive");
  });

  $(".close").click(function() {
    m.removeClass("pactive").removeClass("ractive");
  });
});
