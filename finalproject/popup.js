const tabs = await chrome.tabs.query({
    url: [
        "https://www.autotempest.com/*",
        "https://www.carvana.com/*",
        "https://www.cars.com/*",
        "https://www.carfax.com/*",
        "https://www.truecar.com/*",
        "https://www.edmunds.com/*",
        "https://www.kbb.com/*",
        "https://www.autotrader.com/*",
        "https://www.carmax.com/*",
        "https://www.cargurus.com/*",
        "https://www.carsdirect.com/*",
        "https://carsandbids.com/*"
    ],
});

const collator = new Intl.Collator();
tabs.sort((a, b) => collator.compare(a.title, b.title));

const template = document.getElementById("li_template");
const elements = new Set();
for (const tab of tabs) {
    const element = template.content.firstElementChild.cloneNode(true);

    const title = tab.title.split("-")[0].trim();
    const pathname = new URL(tab.url);

    element.querySelector(".title").textContent = title;
    element.querySelector(".pathname").textContent = pathname;
    element.querySelector("a").addEventListener("click", async() => {
        await chrome.tabs.update(tab.id, { active: true});
        await chrome.windows.update(tab.windowId, { focused: true });
    });

    elements.add(element);
}
document.querySelector("ul").append(...elements);

const button = document.querySelector("button");
button.addEventListener("click", async () => {
    const tabIds = tabs.map(({ id }) => id);
    const group = await chrome.tabs.group({ tabIds });
    await chrome.tabGroups.update(group, { title: "CarSearch" });
});
