window.addEventListener('securitypolicyviolation', function (event) {
  const data = {};

  const fields = [
    'blockedURI', 'documentURI', 'effectiveDirective',
    'violatedDirective', 'originalPolicy', 'sourceFile',
    'referrer', 'type',
  ];

  fields.forEach(field => {
    data[field] = event[field]
  });

  chrome.runtime.sendMessage(data);
});
