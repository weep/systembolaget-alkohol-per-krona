// inject:./header.txt //
var $ = unsafeWindow.jQuery;

(function () {
    'use strict';

    function findByLabelContent(selectorcontent, regex) {
        let text = $(".details-list h3:contains('" + selectorcontent + "')").next().text();
        if (text) {
            let matches = text.match(regex);
            return matches.length >= 2 ? parseFloat(matches[1].replace(',', '.')) : null;
        }
        return null;
    }

    let percent = findByLabelContent("Alkoholhalt", /(\d*,{0,1}\d*) %/);
    if (percent) {
        let sekPerLitre = findByLabelContent("jämförpris", /(\d*,{0,1}\d*)/);
        if (sekPerLitre) {
            let apk = (percent / 100 * 1000) / sekPerLitre;
            $('.product-header .right-col').append('<li class="price apk">' + apk.toFixed(2) + " apk</li>");
        }
    }
})();
