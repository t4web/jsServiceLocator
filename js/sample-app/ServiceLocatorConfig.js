define([], function() {
    return {
        "sample-app/Factory": function(sl) {
            var dfd = $.Deferred();
            require(["sample-app/Factory"], function(Factory){
                dfd.resolve(new Factory());
            });
            return dfd.promise();
        },

        "sample-app/Collection": function(sl){
            var dfd = $.Deferred();
            require(["sample-app/Collection"], function(Collection){
                sl.resolve(["sample-app/Factory"], function(factory){
                    dfd.resolve(new Collection(factory));
                });
            });
            return dfd.promise();
        },

        "sample-app/View": function(sl){
            var dfd = $.Deferred();
            require(["sample-app/View"], function(View){
                dfd.resolve(new View());
            });
            return dfd.promise();
        },

        "sample-app/Controller": function(sl){
            var dfd = $.Deferred();
            require(["sample-app/Controller"], function(Controller){
                sl.resolve(["sample-app/Collection", "sample-app/View"], function(items, view){
                    dfd.resolve(new Controller(items, view));
                });
            });
            return dfd.promise();
        }

    };
});