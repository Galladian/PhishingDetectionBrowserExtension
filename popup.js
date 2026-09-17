chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    const currentTab = tabs[0];
    if (!currentTab || !currentTab.url) {return;}

    const url = currentTab.url;
    const statusElement = document.getElementById("status");

    // Detection Rule 1: IP address used as hostname (e.g., http://192.168.1.1/login)
    const ipPattern = /https?:\/\/\d+\.\d+\.\d+\.\d+/;

    // Detection Rule 2: Excessive hyphens in domain (e.g., paypal-secure-login-update.com)
    const hyphenCount = (url.match(/-/g) || []).length;

    if (ipPattern.test(url) || hyphenCount > 4) {
        statusElement.innerText = "Warning: Suspicious URL detected!";
        statusElement.className = "warning";
    } else {
        statusElement.innerText = "Site looks clean.";
        statusElement.className = "safe";
    }
});