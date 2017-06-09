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
                if (data.status===0)
		{
		vbl.katigories = data.categories;
                //	items=data;
                items += "<input class=\"w3-radio\" type=\"radio\" name=\"cat\" value=0> Όλες οι κατηγορίες<br>";
                $.each(data.categories, function (index, item) {
                    items += "<input class=\"w3-radio\" type=\"radio\" name=\"cat\" value=" + item.id + "> " + item.name + "<br>";
                });
                $(selection)
                    .html(items);
                $("input[name=cat]")
                    .val([0]);
		}
		else
		{
                $(selection)
                    .html(data.message);
		}	

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
                    console.error("DEBUG: |00| Ajax call to fill categories FAILED! ");
                }
 $(selection).html("Αδυναμία σύνδεσης στη βάση Δεδομένων");
			
            });
    }
    if (vbl.debug) {
        console.log('DEBUG: Exiting app/scripts/getCategoriesFromDB.js...');
    }
    return {
        getCategoriesFromDB: getCategoriesFromDB
    };
});
