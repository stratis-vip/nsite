define(['jquery'], function($) {
        console.log('DEBUG: Entering script app/scripts/variables.js');

        function vars() {
            var self = this;
            console.log('DEBUG: Entering function vars() ');
            self.filter = 0;
            self.taxOrder = "ASC";
            self.key = 0;
            self.katigories = {};
            self.buffer = {};
            self.currentId = -1;
            self.searchText = "";
            self.searchNumber = "";
            self.bufferSize = 10;
            self.query = "";
            self.setFilter = function(newFilter) {
                self.filter = newFilter;
                return self.filter;
            };
            self.setTaxOrder = function(newTaxOrder) {
                self.taxOrder = newTaxOrder;
                return self.taxOrder;
            };
            /* self.setKey = function (newKey) {
                 self.key = newKey;
                 return self.key;
             };*/
            self.setKatigories = function(newObject) {
                self.katigories = newObject;
                return self.katigories;
            };
            self.setBuffer = function(newObject) {
                self.buffer = newObject;
                return self.buffer;
            };
            self.setCurrentId = function(newId) {
                self.currentId = newId;

                return self.currentId;
            };
            self.setSearchText = function(newText) {
                self.searchText = newText;
                return self.searchText;
            };
            self.setSearchNumber = function(newText) {
                self.searchNumber = newText;
                return self.searchNumber;
            };
            self.setBufferSize = function(newBufferSize) {
                self.bufferSize = newBufferSize;
                return self.bufferSize;
            };
            self.setQuery = function(newQuery) {
                self.query = newQuery;
                return self.query;
            };

            self.finishedGetCategoriesFromDB = function getCategoriesFromDB() {
                return new Promise(function(resolve, reject) {
                    console.log('DEBUG: Entering function finishedGetCategoriesFromDB');
                    var items = "";
                    $.getJSON("app/scripts/php/getcat.php", function(data) {
                        vbl.katigories = data;
                        items += "<input class=\"w3-radio\" type=\"radio\" name=\"cat\" value=0> Όλες οι κατηγορίες<br>";
                        $.each(data, function(index, item) {
                            items += "<input class=\"w3-radio\" type=\"radio\" name=\"cat\" value=" + item.ID + "> " + item.name + "<br>";
                        });
                        $("#category")
                            .html(items);
                        $("input[name=cat]")
                            .val([0]);
                        resolve("leaving...");
                    });
                });
            };
            //new
            self.finishedGetDatabaseStatus = function getDatabaseStatus() {
                console.log('DEBUG: Entering function getDataBaseStatus');
                return new Promise(
                    function(resolve, reject) {


                        var items = "";
                        $.getJSON("app/scripts/php/connect.php", function(data) {
                            items += '<p>';
                            if (data.status === 0) {
                                items += '<div class="w3-indigo" style="width:auto">' + data.message + '</div>' +
                                    '<div class="w3-sand" style="width:auto">';
                                var postNumber = 0;
                                for (i = 0; i < data.categories.length; i++) {
                                    postNumber += data.categories[i].count;
                                    items += '<span style="font-weight:bold">' + data.categories[i].name + ':</span>' + data.categories[i].count + ' εγγραφές<BR>';
                                }
                                items += '</div><div style="font-weight:bold" class="w3-light-blue"><span style="font-weight:bold">Συνολικές εγγραφές:<span> ' + postNumber + '</div></div>';
                                $("#dbStatus")
                                    .html(items + '<p>');
                                katigories = data.categories;
                            } else {
                                items += '<div class="w3-panel w3-red"> ' + data.message + '</div>';
                                $("#dbStatus")
                                    .html(items + '<p>');
                                katigories = null;
                            }
                            resolve("leaving...");
                        });
                    });
            };
        }
        //old
        return new vars();
    }

);