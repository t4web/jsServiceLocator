describe('Sample Service locator config suite', function() {

    // Use require.js to fetch the module
    it("should load the AMD module", function(done) {
        require(
            ['sample-app/ServiceLocatorConfig'],
            function (slConfig) {
                expect(slConfig instanceof Object).toBeTruthy();
                done();
            }
        );
    });

    it("should resolve Factory", function(done) {
        require(
            ['ServiceLocator', 'sample-app/ServiceLocatorConfig', 'sample-app/Factory'],
            function (ServiceLocator, slConfig, Factory) {

                var serviceLocator = new ServiceLocator(slConfig);

                var app = {
                    run: function(factory) {
                        expect(factory instanceof Factory).toBeTruthy();
                        done();
                    }
                };

                serviceLocator.resolve(["sample-app/Factory"], app.run, app);
            }
        );

    });

    it("should resolve Collection", function(done) {
        require(
            ['ServiceLocator', 'sample-app/ServiceLocatorConfig', 'sample-app/Collection', 'sample-app/Factory'],
            function (ServiceLocator, slConfig, Collection, Factory) {

                var serviceLocator = new ServiceLocator(slConfig);

                var app = {
                    run: function(items) {
                        expect(items instanceof Collection).toBeTruthy();
                        expect(items.factory instanceof Factory).toBeTruthy();
                        done();
                    }
                };

                serviceLocator.resolve(["sample-app/Collection"], app.run, app);
            }
        );

    });

    it("should resolve Controller", function(done) {
        require(
            ['ServiceLocator', 'sample-app/ServiceLocatorConfig', 'sample-app/Controller', 'sample-app/Collection', 'sample-app/View'],
            function (ServiceLocator, slConfig, Controller, Collection, View) {

                var serviceLocator = new ServiceLocator(slConfig);

                var app = {
                    run: function(controller) {
                        expect(controller instanceof Controller).toBeTruthy();
                        expect(controller.items instanceof Collection).toBeTruthy();
                        expect(controller.view instanceof View).toBeTruthy();
                        done();
                    }
                };

                serviceLocator.resolve(["sample-app/Controller", "sample-app/View"], app.run, app);
            }
        );
    });

});