/*define(['jquery'], function ($) {
    function getDatabaseStatus(selection) {
	    
        var items = "";
        $.getJSON("app/scripts/php/connect.php", function (data) {
            items += '<p>';
            if (data.status === 0) {
                items += '<div class="w3-indigo" style="width:auto">' + data.message + '</div>' +
                    '<div class="w3-sand" style="width:auto">';
                var postNumber = 0;
                for (i = 0; i < data.categories.length; i++) {
                    postNumber += data.categories[i].count;
                    items += '<span style="font-weight:bold">' + data.categories[i].name + ':</span>' + data.categories[i].count + ' εγγραφές<BR>';
                }
                items += '</div><div style="font-weight:bold" class="w3-light-blue"><span style="font-weight:bold">Συνολικές εγγραφές:<span> ' + postNumber + '</div></div>';
                $(selection)
                    .html(items + '<p>');
                katigories = data.categories;
            } else {
                items += '<div class="w3-panel w3-red"> ' + data.message + '</div>';
                $(selection)
                    .html(items + '<p>');
                katigories = null;
            }
        });
    }
    return {
        getDatabaseStatus: getDatabaseStatus
    };
});
*/