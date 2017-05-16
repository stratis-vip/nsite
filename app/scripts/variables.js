define(function () {
    function vars() {
        var self = this;
        self.filter = 0;
        self.taxOrder = "ASC";
        self.key = 0;
        self.katigories = {};
        self.searchText = "";
        self.searchNumber = "";
        self.setFilter = function (newFilter) {
            self.filter = newFilter;
            return self.filter;
        };
        self.setTaxOrder = function (newTaxOrder) {
            self.taxOrder = newTaxOrder;
            return self.taxOrder;
        };
        self.setKey = function (newKey) {
            self.key = newKey;
            return self.key;
        };
        self.setKatigories = function (newObject) {
            self.katigories = newObject;
            return self.katigories;
        };
        self.setSearchText = function (newText) {
            self.searchText = newText;
            return self.searchText;
        };
        self.setSearchNumber = function (newText) {
            self.searchNumber = newText;
            return self.searchNumber;
        };

    }
    return new vars();
});
