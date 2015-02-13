describe('ServiceLocator suite', function() {
    var serviceLocator;

    // Use require.js to fetch the module
    it("should load the AMD module", function(done) {
        require(
            ['ServiceLocator'],
            function (ServiceLocator) {
                serviceLocator = new ServiceLocator({});
                expect(serviceLocator).toBeDefined();
                done();
            }
        );
    });

    it("Constructor should throws Exception when config is missed", function(done) {

        require(
            ['ServiceLocator'],
            function (ServiceLocator) {
                expect(function() {
                    serviceLocator = new ServiceLocator();
                }).toThrowError("Service locator: config must be specified");
                done();
            }
        );
    });

    it("resolve() should throws Exception when callback is missed", function() {

        expect(function() {
            serviceLocator.resolve(["SomeService"]);
        }).toThrowError("Service locator: callback must be specified");

    });

    it("resolve() should throws Exception on unregistered service", function() {

        expect(function() {
            serviceLocator.resolve(["SomeService"], function(){});
        }).toThrowError("Service locator was unable to fetch or create an instance for SomeService");

    });

    it("resolve() should throws ServiceLocator.ServiceNotFoundException on unregistered service", function() {

        try {
            serviceLocator.resolve(['SomeService'], function(){});
        } catch (e) {
            expect(e instanceof ServiceLocator.ServiceNotFoundException).toBeTruthy();
        }
    });

    it("resolve() should inject service with resolved dependencies to callback without require", function(done) {
        require(
            ['ServiceLocator'],
            function (ServiceLocator) {

                var Service1 = function() {
                    this.bar = function(){};
                    this.baz = function(){};
                };

                var Service2 = function(dependencyService1) {
                    this.foo = function(){
                        dependencyService1.bar();
                    };
                    this.zoo = function(){
                        dependencyService1.baz();
                    };
                    this.getService1 = function(){
                        return dependencyService1;
                    };
                };

                var config = {
                    Service1: function(sl) {
                        var dfd = $.Deferred();
                        dfd.resolve(new Service1());
                        return dfd.promise();
                    },
                    Service2: function(sl){
                        var dfd = $.Deferred();
                        sl.resolve(["Service1"], function(service1){ dfd.resolve(new Service2(service1)) });
                        return dfd.promise();
                    }
                };

                var serviceLocator = new ServiceLocator(config);

                var app = {
                    run: function(s1, s2) {
                        expect(s1 instanceof Service1).toBeTruthy();
                        expect(s2 instanceof Service2).toBeTruthy();
                        done();
                    }
                };

                serviceLocator.resolve(["Service1", "Service2"], app.run, app);
            }
        );

    });

});