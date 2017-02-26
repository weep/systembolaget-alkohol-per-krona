// inject:./header.txt //
var $ = unsafeWindow.jQuery;

(function () {
    'use strict';

    function findNextFromSelectorMatchRegex(selector, regex) {
        let text = $(selector).next().text();
        if (text) {
            let matches = text.match(regex);
            return matches.length >= 2 ? parseFloat(matches[1].replace(',', '.')) : null;
        }
        return null;
    }

    let percent = findNextFromSelectorMatchRegex(".details-list h3:contains('Alkoholhalt')", /(\d*,{0,1}\d*) %/);
    if (percent) {
        let sekPerLitre = findNextFromSelectorMatchRegex(".details-list h3:contains('jämförpris')", /(\d*,{0,1}\d*)/);
        if (sekPerLitre) {
            let apk = (percent / 100 * 1000) / sekPerLitre;
            $('.product-header .right-col').append('<li class="price apk">' + apk.toFixed(2) + " apk</li>");
        }
    }
})();
