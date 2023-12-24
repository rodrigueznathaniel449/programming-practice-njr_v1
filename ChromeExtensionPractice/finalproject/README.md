# DarkDocs
#### Video Demo:  <URL HERE>
#### Description:

Overview:

    Dark Docs was a creation very near and dear to my own heart. As an IT Engineer over the last 5 years,
    I have seen dark mode support role out for numerous sites and software providers; and yet have failed to
    see any support within Googles own SAAS tools.

    As I work within Google Docs almost every day, it is always jarring to be blinded by the site in comparison to the vast majority of other sites I may be using in my day-to-day.

    As the adage goes, "if you want something done right, do it yourself", and so with the newfound skills from taking HarvardX CS50X course, I decided to roll out support for this feature myself as a Chrome browser extension. Implementation is very simple, and detailed below by topic.

Manifest.json:

    The manifest file for Chrome Extension creation is arguably the most important aspect when creating an extension. Primarily this handles parameters and permissions for your Chrome Extension, and helps to route matching requests to the actual code you intend to run.

    The two key pieces for our manifest file are the background, and permissions section. In this project, we are installing a js script as a background service worker, to complete the task at hand. Additionally, we are allowing permissions on the active user tab, in order to utilize a hotkey to execute the extension as well when conditions match.

background.js:

    The JS file for this project is the actual code portion that intertwines with user behavior to execute when desired and on matched conditions.

    At installation, an Event Listener is created from the JS file. Additionally a constant is pulled with the editable URL of google docs, as a URL match for user activity.

    To start the main loop, the catch condition is that the current URL starts with our docs constant. This ensures that the extension should only run when the user is on or editing a google docs page.

    Following the checks are passed, the script sets two states for the extension, 'ON' or 'OFF', and appropriately serves or removes the darkmode CSS file based on current extension state.

    User should be able to start/stop with extension icon from folder, or using the built in hotkeys from manifest (CTRL+U, CMD+U).

darkmode.css:

    This sheet is for stylistic changes towards Google Docs page, setting up Dark Mode features to reduce eye strain. Inital edits are body background color and text color.
