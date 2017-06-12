define(['jquery', 'vbl'], function ($, vbl) {
    if (vbl.debug) {
        console.log('DEBUG: Entering script app/scripts/createQuery.js');
    }

    function createQuery(count, offset) {
        //χτίζω το ερώτημα στη βάση.
        if (vbl.debug) {
            console.log('DEBUG: in createQuery...');
        }
        var query = "";
        var queryJSON = {};
        query += 'SELECT keimena.* FROM keimena ';
        queryJSON.select = "keimena.*";
        queryJSON.from = "keimena";
        if (Number(vbl.key) !== 0) {
            query += '	WHERE keimena.category = ' + vbl.key;
            queryJSON.where = "keimena.category = " + vbl.key;
        }
        if (Number(vbl.filter) !== 0) {
            if (Number(vbl.filter) === 1) {
                query += '	ORDER BY keimena.id ' + vbl.taxOrder;
                queryJSON.order = "keimena.keimena.id" + vbl.taxOrder;

            } else {
                query += '	ORDER BY keimena.imnia_auth ' + vbl.taxOrder;
                queryJSON = "ORDER BY keimena.imnia_auth " + vbl.taxOrder;

            }
        }
        query += ' LIMIT ' + count;
        queryJSON.limit = count;
        queryJSON.offset = offset;
        if (offset > 0) {
            query += ' OFFSET ' + offset;

        }
        if (vbl.debug) {
            console.log('DEBUG: query to database= ' + query);
            console.log('DEBUG: queryJSON=' + JSON.stringify(queryJSON));
        }
        return query;
    }

    function createQueryJSON(count, offset) {
        //χτίζω το ερώτημα στη βάση.
        if (vbl.debug) {
            console.log('DEBUG: |05| in createJSONQuery...');
        }
        var queryJSON = {};
        queryJSON.select = "keimena.*";
        queryJSON.from = "keimena";
        if (isNaN(vbl.key)) {
            vbl.key = 0;
        }
        if (Number(vbl.key) !== 0) {
            queryJSON.where = "keimena.category = " + vbl.key;
        } else {
            queryJSON.where = "";
        }
        queryJSON.order = "";
        if (Number(vbl.filter) !== 0) {
            if (Number(vbl.filter) === 1) {
                queryJSON.order = "keimena.imnia_auth " + vbl.taxOrder;

            } else {
                queryJSONi.order = "keimena.imnia_auth " + vbl.taxOrder;
            }
        }
        if (count === undefined) {
            count = 0;
        }
        if (offset === undefined) {
            offset = 0;
        }
        queryJSON.limit = count;
        queryJSON.offset = offset;
        if (vbl.debug) {
            console.log('DEBUG:|05|  Exiting createJSONQuery ');
        }
        return queryJSON;
    }

    function createQueryFromJson(jsonText) {
        if (jsonText === undefined) {
            return "";
        }
        //q ειναι το object που θα φτιάξω από το jsonText
        if (jsonText !== null && typeof jsonText === 'object') {
            q = jsonText;
        } else {
            q = JSON.parse(jsonText);
        }
        var qString = "";
        qString += 'SELECT ' + q.select + ' FROM ' + q.from;
        if (q.where.length > 0) {
            qString += ' WHERE ' + q.where;
        }
        if (q.order.length > 0) {
            qString += ' ORDER BY ' + q.order;
        }
        if (q.limit > 0) {
            qString += ' LIMIT ' + q.limit;
        }
        if (q.offset) {
            qString += ' OFFSET ' + q.offset;
        }
        return qString;
    }

    function countPostsFromJSONQuery(jsonText) {
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
            qString += ' WHERE ' + q.where;
        }
        if (q.order.length > 0) {
            qString += ' ORDER BY ' + q.order;
        }
        if (q.limit > 0) {
            qString += ' LIMIT ' + q.limit;
        }
        if (q.offset) {
            qString += ' OFFSET ' + q.offset;
        }

        return qString;

    }


    function executeQuery(query, tiposOfQuery) {
        var tipos = tiposOfQuery;
        $.ajax({
            type: "POST",
            url: "app/scripts/php/getTheResults.php",
            data: {
                typeofquery: 1,
                value: query
            },
            success: function (data) {
                if (vbl.debug) {
                    console.log('DEBUG: AJAX returns in getStartAnartiseis');
                }
                require(['scripts/prepareResults'], function (prepareResults) {
                    vbl.setCurrentId(vbl.currentId + 1);
                    vbl.setBuffer(data);
                    if (tiposOfQuery === 0) {
                        prepareResults.prepareResults(data, vbl.currentId);
                    } else {
			    prepareResults.fillPagination(data);
                    }

                    $("#infoDbRecords")
                        .html(' #' + (vbl.currentId + 1) + ' από ' + vbl.bufferSize + ' ');
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
        createQueryJSON: createQueryJSON,
        executeQuery: executeQuery,
        createQueryFromJson: createQueryFromJson,
        countPostsFromJSONQuery: countPostsFromJSONQuery
    };
});
