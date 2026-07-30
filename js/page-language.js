window.applyPageLanguage = function applyPageLanguage(translations) {
  const lang = localStorage.getItem("ovaLang") === "ar" ? "ar" : "en";
  const dict = translations[lang] || translations.en || {};

  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  document.body.classList.toggle("rtl", lang === "ar");

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key] != null) {
      el.innerHTML = dict[key];
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (dict[key] != null) {
      el.setAttribute("placeholder", dict[key]);
    }
  });

  document.querySelectorAll("[data-i18n-value]").forEach((el) => {
    const key = el.getAttribute("data-i18n-value");
    if (dict[key] != null) {
      el.setAttribute("value", dict[key]);
    }
  });

  if (dict.pageTitle) {
    document.title = dict.pageTitle;
  }

  return { lang, t: (key) => dict[key] ?? key, dict };
};
