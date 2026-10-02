// Floating drink icons behind the page content.
(function () {
  var ICONS = [
    // wine glass
    '<path d="M7 3h10c0 5.5-2 8.5-5 8.5S7 8.5 7 3z"/><path d="M7.3 6.5h9.4"/><path d="M12 11.5V20"/><path d="M8 20.5h8"/>',
    // cocktail
    '<path d="M4 4h16l-8 9z"/><path d="M12 13v7"/><path d="M8 20.5h8"/><path d="M16.5 1.5 13.5 8"/><circle cx="9.5" cy="6.5" r="1"/>',
    // coffee cup
    '<path d="M4 10h12v4a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z"/><path d="M16 11.5h1.5a2.5 2.5 0 0 1 0 5H15.5"/><path d="M8 3.5c-1 1 1 2 0 3.5"/><path d="M12 3.5c-1 1 1 2 0 3.5"/><path d="M3 21.5h14"/>',
    // beer mug
    '<path d="M5 8h10v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z"/><path d="M15 11h2a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-2"/><path d="M5 8c0-2 1.3-3 3-3 .8-1.3 3.2-1.3 4 0 1.7 0 3 1 3 3"/><path d="M8.5 12v5.5"/><path d="M11.5 12v5.5"/>'
  ];
  var CELL = 150; // one icon slot per ~150px square
  var FILL = 0.6; // share of slots that get an icon

  var layer = document.createElement('div');
  layer.className = 'bg-drinks';
  layer.setAttribute('aria-hidden', 'true');
  document.body.prepend(layer);

  function rand(min, max) {
    return min + Math.random() * (max - min);
  }

  var lastWidth = 0;
  function build() {
    var w = window.innerWidth;
    var h = window.innerHeight;
    lastWidth = w;
    var cols = Math.ceil(w / CELL);
    var rows = Math.ceil(h / CELL);
    var html = '';
    for (var r = 0; r < rows; r++) {
      for (var c = 0; c < cols; c++) {
        if (Math.random() > FILL) continue;
        var size = Math.round(rand(22, 38));
        var x = c * CELL + rand(10, CELL - size - 10);
        var y = r * CELL + rand(10, CELL - size - 10);
        var gold = Math.random() < 0.3;
        html +=
          '<svg viewBox="0 0 24 24" class="bg-drink' + (gold ? ' gold' : '') + '" style="' +
          'left:' + x.toFixed(0) + 'px;top:' + y.toFixed(0) + 'px;width:' + size + 'px;height:' + size + 'px;' +
          '--dx:' + rand(-45, 45).toFixed(0) + 'px;--dy:' + rand(-45, 45).toFixed(0) + 'px;' +
          '--r0:' + rand(-25, 25).toFixed(0) + 'deg;--r1:' + rand(-25, 25).toFixed(0) + 'deg;' +
          'animation-duration:' + rand(5, 10).toFixed(1) + 's;animation-delay:-' + rand(0, 10).toFixed(1) + 's">' +
          ICONS[Math.floor(Math.random() * ICONS.length)] +
          '</svg>';
      }
    }
    layer.innerHTML = html;
  }

  build();
  var timer;
  window.addEventListener('resize', function () {
    clearTimeout(timer);
    timer = setTimeout(function () {
      // Mobile browsers fire resize when the URL bar hides; only rebuild on real width changes.
      if (Math.abs(window.innerWidth - lastWidth) > 80) build();
    }, 250);
  });
})();
