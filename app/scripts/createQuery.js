define(['jquery', 'vbl'], function ($, vbl) {
    console.log('DEBUG: Entering script app/scripts/createQuery.js');

    function createQuery(count, offset) {
        //χτίζω το ερώτημα στη βάση.
        console.log('DEBUG: in createQuery...');
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
                queryJSON.order = "keimena.imnia_auth" + vbl.taxOrder;

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
        console.log('DEBUG: query to database= ' + query);
        console.log('DEBUG: queryJSON=' + JSON.stringify(queryJSON));
        return query;
    }

    function createQueryJSON(count, offset) {
        //χτίζω το ερώτημα στη βάση.
        console.log('DEBUG: in createJSONQuery...');
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
                queryJSON.order = "keimena.imnia_auth" + vbl.taxOrder;

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
        return queryJSON;
    }


    function createQueryFromJson(q) {
        if (q === undefined) {
            return "";
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

    function countPostsFromJSONQuery(q) {
        if (q === undefined) {
            return 0;
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


    function executeQuery(query) {
	    var tipos=1;
        $.ajax({
            type: "POST",
            url: "app/scripts/php/getTheResults.php",
            data: { typeofquery:1, value: query },
            success: function (data) {
                console.log('DEBUG: AJAX returns in getStartAnartiseis');
                require(['scripts/prepareResults'], function (prepareResults) {
                    vbl.setCurrentId(vbl.currentId + 1);
                    vbl.setBuffer(data);
                    console.log('DEBUG: vbl.buffer = ' + JSON.stringify(vbl.buffer));
                    prepareResults.prepareResults(data, vbl.currentId);

                    $("#infoDbRecords")
                        .html(' #' + (vbl.currentId + 1) + ' από ' + vbl.bufferSize + ' ');
                });
            },
            datatype: "json"
        });
        console.log('DEBUG: leaving getStartAnartiseis!');
    }

    return {
        createQuery: createQuery,
        createQueryJSON: createQueryJSON,
        executeQuery: executeQuery,
        createQueryFromJson: createQueryFromJson,
        countPostsFromJSONQuery: countPostsFromJSONQuery
    };
});