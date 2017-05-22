define(['jquery', 'vbl'], function($, vbl) {
    function prepareResults(sqlData, id) {
        var sqlDataObj = {};
        sqlDataObj = JSON.parse(sqlData);
        vbl.setBufferSize(sqlDataObj.count);
        console.log(JSON.stringify(vbl));
        var keimeno = "";
        if (sqlDataObj.status === 0) {
            var recordsCount = sqlDataObj.count;

            var results = sqlDataObj.results;
            var apotelesma = "";
            var counter = 1;

            var katid = 0;
            /*
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
                            });
            		*/

            keimeno += "<div id=\"keimenoInfo\">";
            katid = Number(results[id].category) - 1;
            keimeno += "Κατηγορία: " + vbl.katigories[katid].name;
            keimeno += "<br>Aριθμός καταχώρισης: " +
                results[id].cat_id + "" +
                "<br>Ημερομηνία συγγραφής : " + results[id].date + "</div>" +
                "<div id=\"keimenoText\"><br>";
            for (i = 0; i < results[id].keimeno.length; i++) {
                keimeno += results[id].keimeno[i].str + "<br>";
            }
            keimeno += "<br></div>";

            if ($.trim(results[id].explanations) !== "") {
                keimeno += "<div class=\"w3-card\" style=\"width:80%;margin:auto\"><br>" + results[id].explanations + "<br></div>";
            }



            console.log('DEBUG: vbl object right now = ' + JSON.stringify(vbl));
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