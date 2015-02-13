define(
    'sample-app/ItemModel',
    [],
    function () {
        'use strict';

        return function (data) {

            this.getId = function() {
                return data['id'];
            }

        };
    }
);