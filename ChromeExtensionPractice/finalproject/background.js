//Add Event Listener on Installation
//Set ctext to off by default
chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
        text: "OFF",
    });
});
console.log("After Listener");

//create constant for Google Docs URL
//this precedes all opened docs AFAIK

//add listener for when user is on Google Docs page
//set state of enablement on dark mode
//if conditions match (e.g. on Google Docs, and Extension is Enabled), deploy dark mode styling
//if not enabled, keep on normal styling
//Focused to only work with Google Docs, narrow scope better for security and styling consistency

const docs = "https://docs.google.com/d"
console.log("After Docs Constant");
chrome.action.onClicked.addListener(async (tab) => {
    if (tab.url.startsWith(docs)) {
        console.log("Docs Page Detected")
        const currState = await chrome.action.getBadgeText({ tabId: tab.id });
        //if current state is off, set next to on
        //if current state is on, set next to off
        const nextState = currState === 'ON' ? 'OFF' : 'ON'
        console.log("After State Set");
        await chrome.action.setBadgeText({
            tabId: tab.id,
            text: nextState,
        });
        console.log("Badge Text Set");
        if (nextState === "ON") {
            //chrome.scripting.executeScript({
                //target: {
                    //tabId: tab.id,
                //},
                //func: () => {
                    //this only touches title, not rest of doc
                    //document.body.style.color = '#fff';
                //}
            //});
            //insert dark mode css file when extension is turned on
            try {
                await chrome.scripting.insertCSS({
                    target: { tabId: tab.id },
                    files: ["darkmode.css"],
                });
                console.log("DarkMode Loaded");
            } catch (err) {
                console.error(`Failed to insert CSS: ${err}`);
            }
        } else if (nextState === "OFF") {
            //chrome.scripting.executeScript({
                //target: {
                    //tabId: tab.id,
                //},
                //func: () => {
                    //this only touches title, not rest of doc
                    //document.body.style.color = '#000';
                //}
            //});
            //remove dark mode when extension is turned off
            await chrome.scripting.removeCSS({
                target: { tabId: tab.id },
                files: ["darkmode.css"],
            });
        }
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: function () {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.type = 'text/css';
                link.href = 'darkmode.css';
                document.head.appendChild(link);
            },
        });
    }
});
