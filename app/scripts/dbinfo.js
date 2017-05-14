define(['jquery'], function ($) {
    function setDbInfo() {
        require(['scripts/variables'], function (vbl) {
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
            vbl.setKey(Number($('input[name=cat]:checked')
                .val()));
            var info = "[";
            var dbKey = Number($('input[name=cat]:checked')
                .val());
            vbl.setFilter(Number($('#tax')
                .val()));
            info += "Το φίλτρο είναι " + $("#tax")
                .val() + " ενώ η ταξινομηση είναι  " + vbl.taxOrder + " το κλειδί είναι " + vbl.key;
            if (dbKey === 0) {
                info += " «σε όλες τις κατηγορίες»";
            } else {
                dbKey--;
                info += " στην κατηγορία «" + vbl.katigories[dbKey].Name + "»";
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
