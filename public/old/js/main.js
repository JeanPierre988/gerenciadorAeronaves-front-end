angular.module('app-aeronaves', ['minhasDiretivas', 'ngAnimate', 'ngRoute', 'meusServicos'])
    .config(function($routeProvider, $locationProvider){

        $locationProvider.html5Mode(true);

        $routeProvider.when('/gerenciador', {
            templateUrl: 'partials/principal.html',
            controller: 'AeronavesController'
        });

        $routeProvider.when('/gerenciador/new', {
            templateUrl: 'partials/aeronave.html',
            controller : 'AeronaveController'
        });

        $routeProvider.when('/gerenciador/edit/:aeronaveId', { //:aeronaveId é o parametro que será enviado ao $routeParam do foto-controller.js
            templateUrl: 'partials/aeronave.html',
            controller: 'AeronaveController'
        })
        
        $routeProvider.otherwise({ redirectTo: '/gerenciador' });
    });