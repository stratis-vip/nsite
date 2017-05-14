define(function () {
    function vars() {
        var self = this;
        self.filter = 0;
        self.taxOrder = "ASC";
        self.key = 0;
        self.katigories = {};
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
    }
    return new vars();
});
