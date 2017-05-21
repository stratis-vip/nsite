define(['jquery', 'vbl'], function ($, vbl) {
    function getStartAnartiseis(count) {
        require(['jquery', 'vbl', 'info'], function ($, vbl, info) {

            //χτίζω το ερώτημα στη βάση.
            console.log('in getStartAnartiseis...');
            var query = '';

            query += 'SELECT keimena.* FROM keimena ';
		vbl.setKey=0;
            if (Number(vbl.key) !== 0) {
                query += '	WHERE keimena.category = ' + vbl.key;
            }
            if (Number(vbl.filter) !== 0) {
                if (Number(vbl.filter) === 1) {
                    query += '	ORDER BY keimena.id ' + vbl.taxOrder;
                } else {
                    query += '	ORDER BY keimena.imnia_auth ' + vbl.taxOrder;
                }
            }
            query += ' LIMIT ' + count;
            $.ajax({
                type: "POST",
                url: "app/scripts/php/getTheResults.php",
                data: {
                    "value": query
                },
                success: function (data) {
                    console.log('ajax in getStartAnartiseis return data');
                    require(['scripts/prepareResults'], function (prepareResults) {
                        prepareResults.prepareResults(data);

                    });
                },
                datatype: "json"
            });
            console.log('leaving getStartAnartiseis!');
        });
    }
    return {
        getStartAnartiseis: getStartAnartiseis
    };
});
