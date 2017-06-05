define(['jquery', 'vbl', 'ui', 'info'], function ($, vbl, ui, info) {
    if (vbl.debug) {
        console.log('DEBUG: Entering script app/scripts/getCategoriesFromDB.js');
    }

    function getCategoriesFromDB(selection) {
        if (vbl.debug) {
            console.log('DEBUG: |00| Entering function getCategoriesFromDB. Sending AJAX to getcat.php...');
        }
        var items = "";
        $.getJSON("app/scripts/php/getcat.php", function (data) {
                vbl.katigories = data;
                //	items=data;
                items += "<input class=\"w3-radio\" type=\"radio\" name=\"cat\" value=0> Όλες οι κατηγορίες<br>";
                $.each(data, function (index, item) {
                    items += "<input class=\"w3-radio\" type=\"radio\" name=\"cat\" value=" + item.id + "> " + item.name + "<br>";
                });
                $(selection)
                    .html(items);
                $("input[name=cat]")
                    .val([0]);
            })
            .done(function () {
                if (vbl.debug) {
                    console.log("DEBUG: |00| Ajax call to fill categories succeed!");
                }
                ui.changeCategory();
                info.setDbInfo();
            })
            .fail(function () {
                if (vbl.debug) {
                    console.error("DEBUG: |00| Ajax call to fill categories FAILED! error: "+data);
                }
            });
    }
    if (vbl.debug) {
        console.log('DEBUG: Exiting app/scripts/getCategoriesFromDB.js...');
    }
    return {
        getCategoriesFromDB: getCategoriesFromDB
    };
});
