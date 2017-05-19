define(['jquery','vbl'], function ($,vbl) {
    var finishedCollectInfo = function (collectInfo) {
        return new Promise(
            function (resolve, reject) {
                    var temp = $("#order")
                        .val();
                    switch (temp) {
                    case "1":
                        vbl.setTaxOrder("ASC");
                        break;
                    case "2":
                        vbl.setTaxOrder("DESC");
                        break;
                    }
                    vbl.setSearchText($('#searchText')
                        .val());
                    vbl.setSearchNumber(Number($('#searchNumberText')
                        .val()));
                    vbl.setKey(Number($('input[name=cat]:checked')
                        .val()));
                    vbl.setFilter(Number($('#tax')
                        .val()));
                    resolve("leaving..");                
            });

    };




    function setDbInfo() {
            finishedCollectInfo()
                .then(function () {
                    var info = "[";
                    info += "Το φίλτρο είναι " + vbl.filter + " ενώ η ταξινομηση είναι  " + vbl.taxOrder + " το κλειδί είναι " + vbl.key;
                    if (vbl.key === 0) {
                        info += " «σε όλες τις κατηγορίες»";
                    } else {
                        var lkey = Number(vbl.key) - 1;
                        info += " στην κατηγορία «" + vbl.katigories[lkey].name + "»";
                    }

                    info += "]";
                    $("#curInfo")
                        .text(info);
                });
    }



    return {
        setDbInfo: setDbInfo
    };

});
