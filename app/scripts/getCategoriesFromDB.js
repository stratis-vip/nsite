define(['jquery', 'vbl'], function ($, vbl) {
    function getCategoriesFromDB(selection) {
        var items = "";
        $.getJSON("app/scripts/php/getcat.php", function (data) {
                // vbl.katigories = data;
                //	items=data;
                items += "<input class=\"w3-radio\" type=\"radio\" name=\"cat\" value=0> Όλες οι κατηγορίες<br>";
                $.each(data, function (index, item) {
                    items += "<input class=\"w3-radio\" type=\"radio\" name=\"cat\" value=" + item.ID + "> " + item.name + "<br>";
                });
                $(selection)
                    .html(items);
                $("input[name=cat]")
                    .val([0]);
            })
            .done(function () {
                console.log("DEBUG: Ajax call to fill categories succeed! This is the point to assign a change value at categories");
            })
            .fail(function () {
                console.error("DEBUG: Ajax call to fill categories FAILED! ");
            });
    }
    return {
        getCategoriesFromDB: getCategoriesFromDB
    };
});
