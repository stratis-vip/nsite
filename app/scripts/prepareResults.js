define(['jquery', 'vbl'], function ($, vbl) {
    function prepareResults(sqlData) {
        var sqlDataObj = {};
        sqlDataObj = JSON.parse(sqlData);
        var keimeno = "";
        if (sqlDataObj.status === 0) {
            var recordsCount = sqlDataObj.count;

            var results = sqlDataObj.results;
            var apotelesma = "";
            var counter = 1;

            var katid = 0;
            Object.keys(results)
                .forEach(function (key) {
                    keimeno += "<div id=\"keimenoInfo\">";
                    katid = Number(results[key].category) - 1;
                    keimeno += "Κατηγορία: " + vbl.katigories[katid].name;
                    keimeno += "<br>Aριθμός καταχώρισης: " +
                        results[key].cat_id + "" +
                        "<br>Ημερομηνία συγγραφής : " + results[key].date + "</div>" +
                        "<div id=\"keimenoText\"><br>";
                    for (i = 0; i < results[key].keimeno.length; i++) {
                        keimeno += results[key].keimeno[i].str + "<br>";
                    }
                    keimeno += "<br></div>";

                    if ($.trim(results[key].explanations) !== "") {
                        keimeno += "<div class=\"w3-card\" style=\"width:80%;margin:auto\"><br>" + results[key].explanations + "<br></div>";
                    }

                    console.log(key, results[key], results[key].id);

                });
        } else //έχουμε θέμα στη Βάση Δεδομένων
        {
            keimeno = sqlDataObj.message;
        }

        $('#database')
            .html(keimeno);
        $("#loader")
            .hide();
    }

    return {
        prepareResults: prepareResults
    };

});
