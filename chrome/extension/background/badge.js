chrome.storage.local.get('savedArticles', (obj) => {
  const { savedArticles } = obj;

  if (savedArticles) {
    const articles = JSON.parse(savedArticles);

    chrome.tabs.query(
      {
        active: true,
        windowId: chrome.windows.WINDOW_ID_CURRENT,
      },
      (tabs) => {
        const currentUrl = tabs[0].url;
        const isAlreadySaved = articles.find((article) => article.href === currentUrl);

        if (isAlreadySaved) {
          chrome.browserAction.setBadgeText({ text: 1 });
        }
      }
    );
  }
});
