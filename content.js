function injectPhishingBanner(reason) {
    const banner = document.createElement("div");
    banner.id = "phishing-warning-banner";
    banner.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        background-color: #ffcccc; /* Light red */
        color: #cc0000; /* Dark red text */
        text-align: center;
        padding: 15px 0;
        font-size: 18px;
        font-weight: bold;
        z-index: 2147483647; /* Highest z-index possible to stay on top */
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        font-family: sans-serif;
    `;

    banner.innerHTML = `Warning: This site shows high risk phishing indicators: ${reason}. Proceed with caution.`;
    document.body.prepend(banner);
}

// Detection heuristics
const hostname = window.location.hostname;
const ipPattern = /^\d+\.\d+\.\d+\.\d+$/;
const hyphenCount = (hostname.match(/-/g) || []).length;

if (ipPattern.test(hostname)) {
    injectPhishingBanner("Uses raw IP address hostname");
} else if (hyphenCount > 3) { 
    injectPhishingBanner("Excessive hyphens in domain");
}