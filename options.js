const limitVal = document.querySelector('input');
const setLimit = document.getElementById('set-limit');
const resetTotal = document.getElementById('reset-total');

setLimit.addEventListener('click', () => {
  const limit = limitVal.value;
  chrome.storage.sync.set({limit});
});

resetTotal.addEventListener('click', () => {
  const totalSpent = 0;
  chrome.storage.sync.set({totalSpent});
});
