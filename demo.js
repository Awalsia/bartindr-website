// Homepage demo: a bar and a bartender swipe through profiles until they match.
(function () {
  var stage = document.querySelector('.demo-stage');
  if (!stage) return;

  // ---- Illustrations (viewBox 0 0 100 100, anchored to the bottom) ----
  function person(o) {
    var hairBack = o.long
      ? '<path fill="' + o.hair + '" d="M30 46C28 20 72 20 70 46l2 26H28z"/>'
      : '';
    var fringe = o.long
      ? '<path fill="' + o.hair + '" d="M33 42c0-18 34-18 34 0-7-9-26-11-34 0z"/>'
      : '<path fill="' + o.hair + '" d="M32 42c-1-22 37-22 36 0-5-11-28-12-36 0z"/>';
    return (
      '<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet">' +
      hairBack +
      '<rect x="44" y="54" width="12" height="14" fill="' + o.skin + '"/>' +
      '<path fill="' + o.vest + '" d="M16 100c0-24 15-34 34-34s34 10 34 34z"/>' +
      '<path fill="#fff" d="M42 66.5 50 84l8-17.5c-5-1.5-11-1.5-16 0z"/>' +
      '<path fill="#d4a017" d="M43.5 71 50 74.5l6.5-3.5v7L50 74.5 43.5 78z"/>' +
      '<ellipse cx="50" cy="42" rx="16" ry="18" fill="' + o.skin + '"/>' +
      fringe +
      '<circle cx="44" cy="44" r="1.7" fill="#2a2a2a"/><circle cx="56" cy="44" r="1.7" fill="#2a2a2a"/>' +
      '<path d="M45 51q5 4 10 0" fill="none" stroke="#2a2a2a" stroke-width="1.6" stroke-linecap="round"/>' +
      '</svg>'
    );
  }

  function bar(o) {
    var stripes = '';
    for (var i = 0; i < 10; i++) {
      var fill = i % 2 ? o.awning2 : o.awning1;
      var x = 14 + i * 7.2;
      stripes +=
        '<rect x="' + x + '" y="50" width="7.2" height="10" fill="' + fill + '"/>' +
        '<circle cx="' + (x + 3.6) + '" cy="60" r="3.6" fill="' + fill + '"/>';
    }
    return (
      '<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet">' +
      '<rect x="14" y="34" width="72" height="66" fill="' + o.wall + '"/>' +
      '<rect x="10" y="30" width="80" height="6" rx="2" fill="#1f1f1f"/>' +
      '<rect x="30" y="38" width="40" height="9" rx="2" fill="#1f1f1f"/>' +
      '<rect x="36" y="41.5" width="28" height="2" rx="1" fill="' + o.sign + '"/>' +
      stripes +
      '<rect x="20" y="68" width="34" height="24" rx="1.5" fill="#ffd98a"/>' +
      '<path fill="#1f1f1f" opacity=".45" d="M25 76h3v-3h1v3h3v12h-7zM35 79h3v-4h1v4h3v9h-7zM45 77h3v-3h1v3h3v11h-7z"/>' +
      '<rect x="62" y="68" width="18" height="32" rx="1.5" fill="#2a1d16"/>' +
      '<circle cx="76" cy="85" r="1.2" fill="#d4a017"/>' +
      '</svg>'
    );
  }

  var ART = {
    luca: person({ skin: '#e8b892', hair: '#3b2a20', vest: '#1f1f1f' }),
    giulia: person({ skin: '#f1c7a5', hair: '#b5562f', vest: '#2d3b4f', long: true }),
    ahmed: person({ skin: '#a8714d', hair: '#1d1a17', vest: '#5a3030' }),
    aurora: bar({ wall: '#2b2f3a', awning1: '#d4a017', awning2: '#1f1f1f', sign: '#d4a017' }),
    centrale: bar({ wall: '#f4ead9', awning1: '#2f6d55', awning2: '#f6f2eb', sign: '#9cc3b4' }),
    lion: bar({ wall: '#6b3b2c', awning1: '#7a1f1f', awning2: '#e9d8b8', sign: '#e9d8b8' })
  };

  // The last card in each deck is the other persona: that's the match.
  var DECKS = {
    bar: [
      {
        art: 'giulia', bg: 'linear-gradient(160deg,#d5e8e4,#7fb3ab)', name: 'Giulia', verified: true, city: 'Milano, Italy',
        stats: [['Experience', '⭐ 4 years'], ['Hourly rate', '💰 16 EUR']],
        about: 'Mixologist with a passion for classic cocktails and a little flair behind the bar.'
      },
      {
        art: 'ahmed', bg: 'linear-gradient(160deg,#eadbd0,#b48d75)', name: 'Ahmed', city: 'Torino, Italy',
        stats: [['Experience', '⭐ 8 years'], ['Hourly rate', '💰 20 EUR']],
        about: 'Head bartender used to busy nights. I love training teams and building wine lists.'
      },
      {
        art: 'luca', bg: 'linear-gradient(160deg,#f6e2b4,#d4a017)', name: 'Luca', verified: true, city: 'Roma, Italy',
        stats: [['Experience', '⭐ 5 years'], ['Hourly rate', '💰 18 EUR']],
        about: 'I am looking for a cocktail bar where I can create signature drinks and grow.'
      }
    ],
    bartender: [
      {
        art: 'centrale', bg: 'linear-gradient(160deg,#e3efea,#9cc3b4)', name: 'Caffè Centrale', city: 'Milano, Italy',
        stats: [['Business type', '☕ Coffee bar'], ['Hourly rate', '💰 14 EUR']],
        about: 'Historic coffee bar in the city centre. We need a fast, friendly barista for day shifts.'
      },
      {
        art: 'lion', bg: 'linear-gradient(160deg,#efe1d2,#b48a6a)', name: 'The Lion Pub', city: 'Torino, Italy',
        stats: [['Business type', '🍺 Pub'], ['Hourly rate', '💰 15 EUR']],
        about: 'Craft beer and live football. We are looking for someone for busy weekends.'
      },
      {
        art: 'aurora', bg: 'linear-gradient(160deg,#4a4566,#16151f)', name: 'Bar Aurora', city: 'Roma, Italy',
        stats: [['Business type', '🍸 Cocktail bar'], ['Hourly rate', '💰 19 EUR']],
        about: 'A cocktail bar for night lovers. We are looking for a creative bartender.'
      }
    ]
  };

  stage.querySelectorAll('[data-art]').forEach(function (el) {
    el.innerHTML = ART[el.dataset.art];
  });
  stage.querySelectorAll('.demo-match').forEach(function (el) {
    el.innerHTML =
      '<span class="m-title">It\'s a match!</span>' +
      '<div class="m-avatars"><span class="m-a">' + ART.aurora + '</span>' +
      '<span class="m-heart">♥</span>' +
      '<span class="m-b">' + ART.luca + '</span></div>' +
      '<span class="m-text">Bar Aurora and Luca liked each other</span>' +
      '<span class="m-btn">Send a message</span>';
  });
  var confetti = '';
  var colors = ['#d4a017', '#f3c442', '#f6f2eb', '#e8b43c', '#ffffff'];
  for (var i = 0; i < 16; i++) {
    confetti +=
      '<i style="--a:' + (i * 22.5 + Math.random() * 12) + 'deg;--d:' + (60 + Math.random() * 50).toFixed(0) +
      'px;background:' + colors[i % colors.length] + '"></i>';
  }
  stage.querySelector('.confetti').innerHTML = confetti;

  var sides = {};
  ['bar', 'bartender'].forEach(function (key) {
    var el = stage.querySelector('[data-side="' + key + '"]');
    sides[key] = { el: el, stack: el.querySelector('.demo-stack'), deck: DECKS[key] };
  });

  function cardHTML(c) {
    return (
      '<div class="demo-card">' +
      '<div class="demo-photo" style="background:' + c.bg + '">' + ART[c.art] +
      '<span class="photo-bars"><i class="on"></i><i></i><i></i></span>' +
      '<span class="photo-arrow prev">‹</span><span class="photo-arrow next">›</span></div>' +
      '<span class="stamp nope">Nope</span><span class="stamp like">Like</span>' +
      '<div class="demo-info">' +
      '<strong>' + c.name + (c.verified ? ' <b class="verified">✓</b>' : '') + '</strong>' +
      '<span class="city">📍 ' + c.city + '</span>' +
      '<div class="stats">' + c.stats.map(function (s) {
        return '<div><small>' + s[0] + '</small><b>' + s[1] + '</b></div>';
      }).join('') + '</div>' +
      '<b class="about-title">About</b><p>' + c.about + '</p>' +
      '<span class="full">View full profile →</span>' +
      '</div></div>'
    );
  }

  // Top card is the last child so it paints above the others.
  function setPositions(side) {
    var live = Array.prototype.slice.call(side.stack.querySelectorAll('.demo-card:not(.gone)')).reverse();
    live.forEach(function (card, i) {
      card.dataset.pos = Math.min(i, 2);
    });
  }

  function deal(side) {
    side.stack.innerHTML = side.deck.slice().reverse().map(cardHTML).join('');
    setPositions(side);
  }

  function sleep(ms) {
    return new Promise(function (resolve) {
      setTimeout(resolve, ms);
    });
  }

  async function swipe(side, dir) {
    var card = side.stack.querySelector('.demo-card[data-pos="0"]:not(.gone)');
    var btn = side.el.querySelector(dir === 'left' ? '.btn-nope' : '.btn-like');
    btn.classList.add('pressed');
    card.classList.add('tilt-' + dir);
    await sleep(450);
    card.classList.add('out-' + dir, 'gone');
    setPositions(side);
    await sleep(250);
    btn.classList.remove('pressed');
    await sleep(300);
  }

  // Only animate while the section is on screen.
  var visible = false;
  var wake = null;
  new IntersectionObserver(function (entries) {
    visible = entries[0].isIntersecting;
    if (visible && wake) {
      wake();
      wake = null;
    }
  }, { threshold: 0.25 }).observe(stage);

  function whenVisible() {
    return visible ? Promise.resolve() : new Promise(function (resolve) { wake = resolve; });
  }

  deal(sides.bar);
  deal(sides.bartender);

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    stage.classList.add('matched');
    return;
  }

  (async function loop() {
    for (;;) {
      await whenVisible();
      await sleep(900);
      for (var step = 0; step < 3; step++) {
        var dir = step < 2 ? 'left' : 'right';
        var a = swipe(sides.bar, dir);
        await sleep(450);
        await Promise.all([a, swipe(sides.bartender, dir)]);
        if (step < 2) await sleep(650);
      }
      stage.classList.add('matched');
      await sleep(4500);
      stage.classList.remove('matched');
      await sleep(450);
      deal(sides.bar);
      deal(sides.bartender);
    }
  })();
})();
