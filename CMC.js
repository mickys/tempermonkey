// ==UserScript==
// @name         CMC
// @namespace    http://coinmarketcap.com/
// @version      2024-01-19
// @description  Better coinmarketcap.com
// @author       Micky Socaci
// @match        https://coinmarketcap.com/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const myElement = document.getElementsByClassName("cmc-body-wrapper")[0].firstChild;
    myElement.id = "MyList";
    myElement.style.width = "2102px";
    myElement.style.maxWidth = "2103px";
})();