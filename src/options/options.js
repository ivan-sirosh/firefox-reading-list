function renderOptions() {
  return browser.storage.local.get('settings').then((store) => {
    const theme = (store.settings && store.settings.theme && store.settings.theme === 'dark') ? 'dark' : 'light';
    document.getElementById('theme').checked = theme === 'dark';
  });
}

document.getElementById('theme').addEventListener('click', (e) => {
  const theme = e.target.checked ? 'dark' : 'light';
  const prefix = e.target.checked ? 'light' : 'dark';
  browser.storage.local.set({
    settings: {
      theme
    }
  });
  browser.browserAction.setIcon({
    path: `/icons/icon-${prefix}.svg`
  });
  browser.sidebarAction.setIcon({
    path: `/icons/icon-${prefix}.svg`
  });
  browser.tabs.query({ currentWindow: true, active: true }, tabs => {
    if (tabs[0]) {
      browser.pageAction.setIcon({
        tabId: tabs[0].id,
        path: `/icons/icon-${prefix}-action.svg`
      });
    }
  });
});

renderOptions();