define(['jquery', 'vbl'], function ($, vbl) {
    if (vbl.debug) {
        console.log('DEBUG: Entering script app/scripts/dbinfo.js');
    }

    function setDbInfo() {
        if (vbl.debug) {
            console.log('DEBUG: Entering function setDbInfo()...');
        }
        var info = "[";
        if (Object.keys(vbl.katigories)
            .length !== 0) {
            //TODO να τσεκάρω εδώ το object vbl
            collectInfo()
                .then(function () {
                    if (vbl.debug) {
                        console.log('DEBUG: Promise from collectInfo() resolved. ');
                    }
                    info += "Το φίλτρο είναι " + vbl.filter + " ενώ η ταξινομηση είναι  " + vbl.taxOrder + " το κλειδί είναι " + vbl.key;
                    if (vbl.key === 0) {
                        info += " «σε όλες τις κατηγορίες»";
                    } else {
                        var lkey = Number(vbl.key) - 1;
                        info += " στην κατηγορία «" + vbl.katigories[lkey].name + "»]";
                        $("#curInfo")
                            .text(info);
                    }
			$("#setOptions").prop("disabled",false);
                    if (vbl.debug) {
                        console.log("DEBUG: vbl.vars() informed succesfully!\r\n...leaving setDbInfo()");
                    }
                });
        } else {
            info += "Αναμονή...]";
            $("#curInfo")
                .text(info);
        }
    }

    function collectInfo() {
        if (vbl.debug) {
            console.log('DEBUG: |03| Entering function Collectinfo');
        }
        return new Promise(
            function (resolve, reject) {
                var temp = $("#order")
                    .val();
                switch (temp) {
                case "0":
                    vbl.setTaxOrder("ASC");
                    break;
                case "1":
                    vbl.setTaxOrder("DESC");
                    break;
                }
                vbl.setSearchText($('#searchText')
                    .val());
                vbl.setSearchNumber(Number($('#searchNumberText')
                    .val()));
                vbl.key = Number($('input[name=cat]:checked')
                    .val());
                vbl.setFilter(Number($('#tax')
                    .val()));
                resolve("leaving..");
                if (vbl.debug) {
                    console.log('DEBUG: |03| leaving function collectInfo()');
                }

            });
    }

    if (vbl.debug) {
        console.log('DEBUG: Exiting app/scripts/dbinfo.js');
    }
    return {
        setDbInfo: setDbInfo,
        collectInfo: collectInfo
    };
});
