define(function () {
    function vars() {
        var self = this;
        self.filter = 0;
        self.taxOrder = "ASC";
        self.key = 0;
        self.katigories = {};
        self.buffer= {};
	self.currentId=-1;
        self.searchText = "";
        self.searchNumber = "";
        self.bufferSize=10;
   	self.query=""; 
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
        self.setBuffer= function (newObject) {
            self.buffer= newObject;
            return self.buffer;
        };
	self.setCurrentId = function (newId){
		self.currentId=newId;
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
	
	self.setBufferSize = function (newBufferSize){
		self.bufferSize=newBufferSize;
		return self.bufferSize;
	};
	
	self.setQuery = function (newQuery){
		self.query=newQuery;
		return self.query;
	};
    }
    return new vars();
});
