define(['app'], function (app) {
    var returnedModule = function () {
        this.getModule1Name = function () {
            return app.getName();
        }
    };
 	
    return returnedModule;
 
});