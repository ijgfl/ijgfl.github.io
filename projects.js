(function () {
  'use strict';

  var PROJECTS = [
    {
      name: 'PVAX',
      desc: 'Pulseira para gamers surdos com feedback háptico baseado em frequência de áudio. com ESP32 e mapeamento FFT em tempo real.',
      tags: ['ESP32', 'Arduino', 'C++', 'Projeto 1'],
    },
    {
      name: 'Jardin',
      desc: 'Jogo feito no Bitsy com Bitsy Hacks publicado no itch.io para a av1.',
      tags: ['Bitsy', 'Jogo', 'itch'],
      link: 'https://jgfl.itch.io/jardin',
    },
  ];

  var grid = document.getElementById('project-grid');
  if (!grid) return;

  PROJECTS.forEach(function (p, i) {
    var num = String(i + 1).padStart(2, '0');

    var tagsHtml = p.tags
      .map(function (t) { return '<span class="tag">' + t + '</span>'; })
      .join('');

    var card = document.createElement('article');
    card.className = 'card';
    card.innerHTML =
      '<p class="card-num">' + num + '</p>' +
      '<h3>' + p.name + '</h3>' +
      '<p>' + p.desc + '</p>' +
      '<div class="card-tags">' + tagsHtml + '</div>' +
      '<a class="card-link" href="' + p.link + '" target="_blank" rel="noopener">ver repositório ↗</a>';

    grid.appendChild(card);
  });
})();
