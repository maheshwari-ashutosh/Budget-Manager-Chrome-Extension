const moneySpent = document.getElementById('money-spent');
const moneyLimit = document.getElementById('money-limit');
const moneySpend = document.getElementById('money-spend');
const spendButton = moneySpend.nextElementSibling;

spendButton.addEventListener('click', spendMoneyHandler);

(()=> {
  chrome.storage.sync.get(['totalSpent', 'limit'], (budget) => {
    if(budget.totalSpent) {
      moneySpent.textContent = budget.totalSpent;
    }
    if(budget.limit) {
      moneyLimit.textContent = budget.limit;
    }
  })
})();

function spendMoneyHandler() {
  chrome.storage.sync.get(['totalSpent','limit'], (budget) => {
    let totalSpent = 0;
    if(budget.totalSpent) {
      totalSpent += parseInt(budget.totalSpent);
    }
    
    totalSpent += parseInt(moneySpend.value) || 0;
    if(budget.limit && totalSpent > budget.limit) {
      chrome.notifications.create('Limit Reached',{
        type: 'basic',
        iconUrl: 'icon48.png',
        title: 'Limit Exceeded',
        message: 'Hey! looks like your spending limit has exceeded :(',
      });
    }
    chrome.storage.sync.set({totalSpent});
    moneySpent.textContent = totalSpent;
    moneySpend.select();
  });
}