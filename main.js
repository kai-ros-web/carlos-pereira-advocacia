(function () {
  var $ = function (s) { return document.querySelector(s); };
  var $$ = function (s) { return Array.prototype.slice.call(document.querySelectorAll(s)); };

  // Cabeçalho translúcido e botões de WhatsApp ao rolar a página
  var header = $(".header"), floats = $$(".float-bar, .float-round");
  function onScroll() {
    var y = window.scrollY;
    if (header) header.classList.toggle("scrolled", y > 24);
    floats.forEach(function (el) { el.classList.toggle("show", y > 480); });
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Entrada suave dos blocos
  var items = $$(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.15 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("in"); });
  }

  // Ano do rodapé
  var year = $("#ano");
  if (year) year.textContent = new Date().getFullYear();

  // Aviso de cookies (LGPD)
  var KEY = "cps-cookie-consent", box = $("#cookie");
  if (box) {
    var saved = false;
    try { saved = !!localStorage.getItem(KEY); } catch (e) { saved = true; }
    if (!saved) setTimeout(function () { box.classList.add("show"); }, 1200);
    $("#cookie-ok").addEventListener("click", function () {
      try { localStorage.setItem(KEY, "accepted"); } catch (e) {}
      box.classList.remove("show");
    });
  }
})();
