define(['jquery'], function ($) {
            function collectInfo() {
                require(['scripts/variables'], function (vbl) {
                    var temp = $("#order")
                        .val();
                    var defer = $.Deferred();
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
                    setTimeout(function () {
                        defer.resolve(); // When this fires, the code in a().then(/..../); is executed.
                    }, 5000);

                    return defer;
                });
            }

            function setDbInfo() {
                require(['jquery','scripts/variables'], function ($,vbl) {
                        $.when(collectInfo()).then(function () {
                                var info = "[";
                                info += "Το φίλτρο είναι " + vbl.filter + " ενώ η ταξινομηση είναι  " + vbl.taxOrder + " το κλειδί είναι " + vbl.key;
                                if (vbl.key === 0) {
                                    info += " «σε όλες τις κατηγορίες»";
                                } else {
                                    var lkey = Number(vbl.key) - 1;
                                    info += " στην κατηγορία «" + vbl.katigories[lkey].Name + "»";
                                }

                                info += "]";
                                $("#curInfo")
                                    .text(info);
                                console.log(vbl.searchText);
                            });
                    });
                }

                return {
                    setDbInfo: setDbInfo,
                    collectInfo: collectInfo
                };

            });
