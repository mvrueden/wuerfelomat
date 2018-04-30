'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', ['ngRoute'])
    .controller('MainController', ['$scope', function($scope) {
        $scope.input = "3W20";
        $scope.dices = [
            { id: 6, name: 'd6', image: 'd6.png', description: "W6", color: "info" },
            { id: 20, name: 'd20', image: 'd20.jpg', description: "W20", color: "primary" }
        ];
        $scope.predefinedInputs = [ "1W6", "2W6", "3W6", "1W20", "2W20", "3W20" ];
        $scope.results = [];
        $scope.count = 1;

        var getDiceIndex = function(input) {
            var index = input.indexOf('D');
            if (index === -1) {
                return input.indexOf('W');
            }
            return index;
        };

        var getDiceCount = function(input, diceIndex) {
            if (diceIndex === 0) {
                return 1;
            }
            return input.substr(0, diceIndex);
        };

        var getDiceType = function(input, diceIndex) {
            return input.substr(diceIndex + 1);
        };

        var getRandomNumber = function(max) {
            return Math.floor((Math.random() * max) + 1);
        };

        var getDice = function(diceType) {
            var number = parseInt(diceType)
            for (var i = 0; i<$scope.dices.length; i++) {
                if ($scope.dices[i].id === number) {
                    return $scope.dices[i];
                }
            }
            return {
                id: 'undefined',
                name: 'undefined',
                description: 'undefined',
                color: 'secondary'
            }
        };

        $scope.setInput = function(input) {
            $scope.input = input;
        };

        $scope.roll = function() {
            $scope.error = undefined;
            if ($scope.input === undefined || $scope.input === "") {
                $scope.error = "No input provided";
                return;
            }
            var input = $scope.input.toUpperCase();
            var diceIndex = getDiceIndex(input);
            if (diceIndex === undefined || diceIndex === -1) {
                $scope.error = "No dice defined";
                return;
            }

            var diceCount = getDiceCount(input, diceIndex);
            var diceType = getDiceType(input, diceIndex);
            var dice = getDice(diceType);

            var result = {
                "id": $scope.count++,
                "input": input,
                "rolls": [],
                "date": new Date(),
                "dice": dice
            };
            for (var i = 0; i<diceCount; i++) {
                result.rolls.push(getRandomNumber(diceType));
            }
            $scope.results.unshift(result);
        };

        $scope.clear = function() {
            $scope.results = [];
            $scope.count = 1;
        };

        $scope.deleteResult = function(index) {
            if (index > -1) {
                $scope.results.splice(index, 1);
            }
            if ($scope.results.length === 0) {
                $scope.clear();
            }
        };

        $scope.markSuccess = function(result) {
            result.state = "success";
        };

        $scope.markFailure = function(result) {
            result.state = "failure";
        };

        $scope.resetState = function(result) {
            result.state = undefined;
        }
    }]);