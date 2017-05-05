function getCategoriesFromDB(selection) {
    var items = "";
    $.getJSON("scripts/getcat.php", function (data) {
        items += "<input class=\"w3-radio\" type=\"radio\" name=\"cat\" value=0> Όλες οι κατηγορίες<br>";
        $.each(data, function (index, item) {
            items += "<input class=\"w3-radio\" type=\"radio\" name=\"cat\" value=" + item.ID + "> " + item.Name + "<br>";
        });
        $(selection)
            .html(items);
        $("input[name=cat]")
            .val([0]);
    });
}
