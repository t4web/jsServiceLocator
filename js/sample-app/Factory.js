define(
    'sample-app/Factory',
    ["sample-app/ItemModel"],
    function (ItemModel) {
        'use strict';

        return function () {

            this.create = function() {
                return new ItemModel();
            }

        };
    }
);