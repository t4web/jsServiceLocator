define(
    'sample-app/Controller',
    ["sample-app/Collection", "sample-app/View"],
    function (Collection, View) {
        'use strict';

        return function (items, view) {

            if (!(items instanceof Collection)) {
                throw new Error("items must be instance of Collection.");
            }

            if (!(view instanceof View)) {
                throw new Error("view must be instance of View.");
            }

            this.items = items;
            this.view = view;

            this.run = function() {
                items.fetch();

                view.render(items);
            };

        };
    }
);