function initlGoogleTranslate() {
  new google.translate.TranslateElement(
    {
      pageLanguage: pageLanguage ? pageLanguage : 'en',
      // includedLanguages: 'en,es,ta,te,ar,zh-CN', //Default All language
      autoDisplay: false,
      multilanguagePage: false,
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
    },
    'google_translate_element'
  );
}

function showOrginalLanguage() {
  try {
    document.getElementById(':2.container')
      .contentDocument.getElementById(':2.restore')
      .click();
  } catch (err) { }
}
