// ==UserScript==
// @name         Systembolaget Alkohol Per Krona
// @namespace    http://desudesu.net/
// @version      0.4
// @description  Ger alkohol per krona på systembolaget.se
// @author       AOS
// @updateURL	 https://github.com/TheAOS/systembolaget-alkohol-per-krona/raw/master/dist/systembolaget-alkohol-per-krona.meta.js
// @downloadURL  https://github.com/TheAOS/systembolaget-alkohol-per-krona/raw/master/dist/systembolaget-alkohol-per-krona.user.js
// @match        https://www.systembolaget.se/dryck/*/*
// ==/UserScript==

var $ = unsafeWindow.jQuery;

(function () {
    'use strict';

    function findByLabelContent(selectorcontent, regex) {
        var text = $(".details-list h3:contains('" + selectorcontent + "')").next().text();
        if (text) {
            var matches = text.match(regex);
            return matches.length >= 2 ? parseFloat(matches[1].replace(',', '.')) : null;
        }
        return null;
    }

    var percent = findByLabelContent("Alkoholhalt", /(\d*,{0,1}\d*) %/);
    if (percent) {
        var sekPerLitre = findByLabelContent("jämförpris", /(\d*,{0,1}\d*)/);
        if (sekPerLitre) {
            var apk = percent / 100 * 1000 / sekPerLitre;
            $('.product-header .right-col').append('<li class="price apk">' + apk.toFixed(2) + " apk</li>");
        }
    }
})();