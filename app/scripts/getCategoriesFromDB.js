define(['jquery'], function ($) {
    function getCategoriesFromDB(selection) {
        var items = "";
        $.getJSON("app/scripts/php/getcat.php", function (data) {
            require(['scripts/variables'], function (vbl) {
                vbl.katigories = data;
            });
            items += "<input class=\"w3-radio\" type=\"radio\" name=\"cat\" value=0> Όλες οι κατηγορίες<br>";
            $.each(data, function (index, item) {
                items += "<input class=\"w3-radio\" type=\"radio\" name=\"cat\" value=" + item.ID + "> " + item.name + "<br>";
            });
            $(selection)
                .html(items);
            $("input[name=cat]")
                .val([0]);
        });
    }
    return {
        getCategoriesFromDB: getCategoriesFromDB
    };
});
