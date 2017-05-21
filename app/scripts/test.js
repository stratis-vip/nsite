define(['scripts/nVar'],function(V){
   console.log('into nVar... V.someValue='+V.someValue);
	V.someValue=3;
	console.log('...exiting test.js V.someValue must be now 3. Value='+V.someValue);
});
