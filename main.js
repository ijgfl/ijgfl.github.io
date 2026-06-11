(function () {
  'use strict';
  var KEY = 'pf_visits_v1';
  var visits = (parseInt(localStorage.getItem(KEY), 10) || 0) + 1;
  localStorage.setItem(KEY, visits);

  var el = document.getElementById('visit-count');
  if (el) {
    var current = 0;
    var increment = Math.max(1, Math.floor(visits / 30));
    var timer = setInterval(function () {
      current = Math.min(current + increment, visits);
      el.textContent = current.toLocaleString('pt-BR');
      if (current >= visits) clearInterval(timer);
    }, 28);
  }
   var yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
