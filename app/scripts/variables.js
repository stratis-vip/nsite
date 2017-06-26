define(function () {

    function vars() {
        var self = this;
        self.debug = false;
        if (self.debug) {
            console.log('DEBUG: Entering script app/scripts/variables.js');
        }
        self.showExplanations = false; //αν θα εμφανίζει τις εξηγήσεις στη ΒΔ
        self.filter = 0;
        self.taxOrder = "ASC";
        self.key = 0;
        self.katigories = {};
        self.searchText = "";
        self.searchNumber = "";
        //σελιδοποίηση
        self.bufferSize = 10;
        self.bufferType = -1;
        self.totalPosts = 0;
        self.buffer = {};
        self.bufferPostsNumber = 0;
        self.postsPerPage = 10;
        self.currentId = -1;
        self.currentPage = -1;
        self.totalPages = 0;

        self.query = "";
        self.offset = 0;

        self.setBufferPostsNumber = function (newBufferPostsNumber) {
            if (self.bufferPostsNumber !== newBufferPostsNumber) {
                self.bufferPostsNumber = newBufferPostsNumber;
            }
            return self.bufferPostsNumber;
        };
        self.setBufferType = function (newBufferType) {
            if (self.bufferType !== newBufferType) {
                self.bufferType = newBufferType;
            }
            return self.bufferType;

        };

        self.setFilter = function (newFilter) {
            if (self.filter !== newFilter) {
                self.filter = newFilter;
            }
            return self.filter;
        };
        self.setKey = function (newKey) {
            if (self.key !== newKey) {
                self.key = newKey;
            }
            return self.key;
        };
        self.setTaxOrder = function (newTaxOrder) {
            if (self.taxOrder !== newTaxOrder) {
                self.taxOrder = newTaxOrder;
            }
            return self.taxOrder;
        };
        self.setKatigories = function (newObject) {
            if (self.katigories !== newObject) {
                self.katigories = newObject;
            }
            return self.katigories;
        };
        self.setBuffer = function (newObject) {
            self.buffer = newObject;
            return self.buffer;
        };
        self.incCurrentId = function () {
            self.currentId = self.currentId + 1;
        };

        self.decCurrentId = function () {
            self.currentId = self.currentId - 1;
        };
        self.setCurrentId = function (newId) {
            self.currentId = newId;
            if (self.currentId>=0)
            {
            require(['ui'], function (ui) {
                ui.initializeNavBar();
            });
            }
            return self.currentId;

        };
        self.setCurrentPage = function (newCurrentPage) {
            self.currentPage = newCurrentPage;
            return self.currentPage;
        };
        self.incCurrentPage = function () {
            self.currentPage = self.currentPage + 1;
            return self.currentPage;
        };
        self.decCurrentPage = function () {
            self.currentPage = self.currentPage - 1;
            return self.currentPage;
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
        self.setTotalPages = function (newTotalPages) {
            self.totalPages = newTotalPages;
            return self.totalPages;
        };

        self.setTotalPosts = function (newTotalPosts) {
            self.totalPosts = newTotalPosts;
            return self.totalPosts;
        };
        if (self.debug) {
            console.log('DEBUG: Exiting Function Vars() ' + JSON.stringify(self));
        }
    }

    return new vars();
});
