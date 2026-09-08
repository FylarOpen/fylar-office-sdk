(function () {
  var root = document.documentElement;
  var saved = localStorage.getItem("static-docs-theme") || "os";
  var i18n = window.STATIC_DOCS_I18N || {};
  var searchPrompt = i18n.searchPrompt || "Type to search documentation...";
  var searchNoResults = i18n.searchNoResults || "No matches found";
  root.setAttribute("data-theme", saved);

  function $(selector, base) { return (base || document).querySelector(selector); }
  function esc(value) {
    return String(value).replace(/[&<>"']/g, function (c) {
      return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c];
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var select = $("#theme-select");
    if (select) {
      select.value = saved;
      select.addEventListener("change", function () {
        localStorage.setItem("static-docs-theme", select.value);
        root.setAttribute("data-theme", select.value);
      });
    }

    var menu = $("#menu-btn");
    if (menu) {
      menu.addEventListener("click", function () {
        document.body.classList.toggle("nav-open");
      });
    }

    var input = $("#search-input");
    var results = $("#search-results");
    var docs = window.STATIC_DOCS_SEARCH || [];
    function renderState(text) {
      if (results) results.innerHTML = '<li class="state">' + esc(text) + '</li>';
    }
    renderState(searchPrompt);
    if (input && results) {
      input.addEventListener("input", function () {
        var q = input.value.trim().toLowerCase();
        if (!q) { renderState(searchPrompt); return; }
        var matches = docs.filter(function (item) {
          return (item.title + " " + item.path + " " + item.text).toLowerCase().indexOf(q) !== -1;
        }).slice(0, 12);
        if (!matches.length) { renderState(searchNoResults); return; }
        results.innerHTML = matches.map(function (item) {
          return '<li><a href="' + esc(item.href) + '"><div class="match-title">' + esc(item.title) + '</div><div class="match-path">' + esc(item.path) + '</div></a></li>';
        }).join("");
      });
    }
  });
})();
