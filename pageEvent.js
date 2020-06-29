const menuOption = {
  id: 'spend amount',
  title: 'Spend Amount',
  contexts: ['selection']
}
chrome.contextMenus.create(menuOption);
chrome.contextMenus.onClicked.addListener((clickData) => {
  if (clickData.menuItemId == 'spend amount' && clickData.selectionText) {
    if (parseInt(clickData.selectionText)) {
      chrome.storage.sync.get(['totalSpent','limit'], (budget) => {
        let totalSpent = 0;
        if(budget.totalSpent) {
          totalSpent += parseInt(budget.totalSpent);
        }
        
        totalSpent += parseInt(clickData.selectionText) || 0;
        if(budget.limit && totalSpent > budget.limit) {
          chrome.notifications.create('Limit Reached',{
            type: 'basic',
            iconUrl: 'icon48.png',
            title: 'Limit Exceeded',
            message: 'Hey! looks like your spending limit has exceeded :(',
          });
        }
        chrome.storage.sync.set({totalSpent});
      });
    }
  }
});

chrome.storage.onChanged.addListener((changes, storageName) => {
  chrome.browserAction.setBadgeText({text: changes.totalSpent.newValue.toString()});
});