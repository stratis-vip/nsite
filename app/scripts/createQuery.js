define(['jquery', 'vbl'], function ($, vbl) {
    if (vbl.debug) {
        console.log('DEBUG: Entering script app/scripts/createQuery.js');
    }

    function createQuery(count, offset) {
        //Δεν καλείται αυτή η συνάρτηση!!!!
        //TODO Να διαγραφεί αν είναι να παραμείνει έτσι!

        //χτίζω το ερώτημα στη βάση.
        if (vbl.debug) {
            console.log('DEBUG: in createQuery...');
        }
        var queryJSON = {};
        queryJSON.where = null;
        queryJSON.order = null;
        queryJSON.select = "keimena.*";
        queryJSON.from = "keimena";
        if (isNaN(vbl.key)) {
            vbl.key = 0;
        }
        queryJSON.where = [];
        if (Number(vbl.key) !== 0) {
            queryJSON.where.push({
                "wTerm": "keimena.category = " + vbl.key
            });
        }
        if (Number(vbl.filter) !== 0) {
            if (Number(vbl.filter) === 1) {
                queryJSON.order = "keimeno_id " + vbl.taxOrder;

            } else {
                queryJSON.order = "ORDER BY keimena.imnia_auth " + vbl.taxOrder;

            }
        }
        if (count === undefined || count===0) {
            count = null;
        }
        if (offset === undefined || offset ===0) {
            offset = null;
        }

        queryJSON.limit = count;
        queryJSON.offset = offset;
        if (vbl.debug) {
            console.log('DEBUG: queryJSON=' + JSON.stringify(queryJSON));
        }
        return queryJSON;
    }

    function queryFromJSON(obj) {
        q = obj;
        var qString = "";

        qString += "SELECT "+q.select +" FROM  "+ q.from;

        if (q.where.length > 0) {

		qString += ' WHERE ';
            for (i = 0; i < q.where.length; i++) {

                qString +=  q.where[i].wTerm;
                if (i !== q.where.length - 1) {
                    qString += " AND  ";
                }

            }
        }
        if (q.order !== null && q.order.length > 0) {
            qString += ' ORDER BY ' + q.order;
        }
        if (q.limit !== null && q.limit > 0) {
            qString += " LIMIT "+q.limit;
        }
        if (q.offset !== null && q.offset > 0) {
            qString += " OFFSET " + q.offset;
        }
        return qString;
    }

    function countPostsFromJSONQuery(jsonText) {
        //Αυτή η συνάρτηση καλείται στα παρακάτω σημεία
        //app/main.js:49:                 .text(cQ.countPostsFromJSONQuery(cQ.createQueryJSON())));
        //app/scripts/ui.js:83:           countQuery=cQ.countPostsFromJSONQuery(jsonQueryObject);
        //app/scripts/ui.js:97:           |07.1| '+cQ.countPostsFromJSONQuery(JSON.stringify(cQ.createQueryJSON())));}
        if (jsonText === undefined) {
            return 0;
        }

        //q ειναι το object που θα φτιάξω από το jsonText
        if (jsonText !== null && typeof jsonText === 'object') {
            q = jsonText;
        } else {
            q = JSON.parse(jsonText);
        }
        var qString = "";
        qString += 'SELECT count(*)  FROM ' + q.from;
        if (q.where.length > 0) {
		qString += ' WHERE ';
            for (i = 0; i < q.where.length; i++) {
                qString += q.where[i].wTerm;
                if (i !== q.where.length - 1) {
                    qString += " AND  ";
                }

            }
        }
        if (q.order !== null && q.order.length > 0) {
            qString += ' ORDER BY ' + q.order;
        }
        return qString;

    }


    function executeQuery(query, tiposOfQuery) {
        //Αυτή η συνάρτηση καλείται στα παρακάτω σημεία
        //app/scripts/ui.js:84:               cQ.executeQuery(countQuery,1);
        var tipos = tiposOfQuery;
        $.ajax({
            type: "POST",
            url: "app/scripts/php/getTheResults.php",
            data: {
                typeofquery: tiposOfQuery,
                value: query
            },
            success: function (data) {
                if (vbl.debug) {
                    console.log('DEBUG: AJAX returns in getStartAnartiseis');
                }
                require(['scripts/prepareResults'], function (prepareResults) {
                    if (tiposOfQuery === 0) {
                        vbl.setCurrentId(vbl.currentId + 1);
                    }
                    vbl.setBuffer(data);
                    if (tiposOfQuery === 0) {
                        prepareResults.prepareResults(data, vbl.currentId);
                        $("#infoDbRecords")
                            .html(' #' + (vbl.currentId + 1) + ' από ' + vbl.bufferPostsNumber + ' ');
                    } else {
                        prepareResults.fillPagination(data);
                    }

                });
            },
            datatype: "json"
        });
        if (vbl.debug) {
            console.log('DEBUG: leaving getStartAnartiseis!');
        }
    }

    if (vbl.debug) {
        console.log('DEBUG: Exiting script app/scripts/createQuery.js');
    }
    return {
        createQuery: createQuery,
        executeQuery: executeQuery,
        queryFromJSON: queryFromJSON,
        countPostsFromJSONQuery: countPostsFromJSONQuery
    };
});
