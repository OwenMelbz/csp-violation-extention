'use strict';

const tabs = [];

const securityPolicyViolation = (data, tabId) => {
  if (!tabs[tabId]) {
    tabs[tabId] = [];
  }

  tabs[tabId].push(data);

  updateBadge(tabId)
}

const updateBadge = tabId => {
  if (tabs[tabId]) {
      chrome.browserAction.setBadgeText({
        tabId,
        text: `${tabs[tabId].length}`
      })

    chrome.browserAction.setBadgeBackgroundColor({
      tabId,
      color: '#F00'
    })
  }
}

chrome.runtime.onMessage.addListener(function(data, sender) {
  if (data.type && data.type === 'securitypolicyviolation') {
    securityPolicyViolation(data, sender.tab.id);
  }
});

//
// chrome.tabs.onActivated.addListener(function(tabId) {
//   if (tabs[tabId]) {
//     chrome.browserAction.setBadgeText()
//   }
// });
//
// chrome.tabs.onCreated.addListener(function(tab) {
//   console.log('yyy')
// });
