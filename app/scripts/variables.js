define(function () {
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
        self.offset = 0;
        self.postsPerPage = 10;
        self.setFilter = function (newFilter) {
            self.filter = newFilter;
            return self.filter;
        };
        self.setTaxOrder = function (newTaxOrder) {
            self.taxOrder = newTaxOrder;
            return self.taxOrder;
        };
        self.setKatigories = function (newObject) {
            self.katigories = newObject;
            return self.katigories;
        };
        self.setBuffer = function (newObject) {
            self.buffer = newObject;
            return self.buffer;
        };
        self.setCurrentId = function (newId) {
            self.currentId = newId;

            return self.currentId;
        };
        self.setSearchText = function (newText) {
            self.searchText = newText;
            return self.searchText;
        };
        self.setSearchNumber = function (newText) {
            self.searchNumber = newText;
            return self.searchNumber;
        };
        self.setBufferSize = function (newBufferSize) {
            self.bufferSize = newBufferSize;
            return self.bufferSize;
        };
        self.setQuery = function (newQuery) {
            self.query = newQuery;
            return self.query;
        };
    }
    return new vars();
});
