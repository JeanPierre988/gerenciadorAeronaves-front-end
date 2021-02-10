angular.module('app-ga')
    .factory('GAService', ['$http', '$q', function($http, $q){
        var BACK_END = 'http://localhost:9090/aeronaves/';
        
        var factory = {
            fetchAllAeronaves : fetchAllAeronaves,
            createAeronave : createAeronave,
            countMarcas : countMarcas,
            updateAeronave : updateAeronave,
            deleteAeronave : deleteAeronave
        };

        return factory

        function fetchAllAeronaves() { 
            var deferred = $q.defer();
            $http.get(BACK_END)
                .then(
                    function(response) {
                        deferred.resolve(response.data);

                    }, function(error) {
                        console.log('SERVICE : Erro ao listar as Aeronaves. ' + error);
                        deferred.reject(error);
                    }
                );
            return deferred.promise;
        }

        function countMarcas() { 
            var deferred = $q.defer();
            $http.get(BACK_END+'marcas-total')
                .then(
                    function(response) {
                        deferred.resolve(response.data);

                    }, function(error) {
                        console.log('SERVICE : countMarcas. ' + error);
                        deferred.reject(error);
                    }
                );
            return deferred.promise;
        }

        function createAeronave(aeronave) { 
            var deferred = $q.defer();
            $http.post(BACK_END, aeronave)
                .then (
                    function(response) {
                        deferred.resolve(response.data);

                    }, function(error) {
                        console.log('SERVICE : Erro ao cadastrar a Aeronave. ' + error);
                        deferred.reject(error);
                    }
                );
            return deferred.promise;
        }

        function updateAeronave(aeronave, id) {
            var deferred = $q.defer();
            $http.put(BACK_END+id, aeronave)
                .then (
                    function(response) {
                        deferred.resolve(response.data);

                    }, function(error) {
                        console.log('SERVICE : Erro ao atualizar a Aeronave. ' + error);
                        deferred.reject(error);
                    }
                );
            return deferred.promise;
        }

        function deleteAeronave(id){
            var deferred = $q.defer();
            $http.delete(BACK_END+id)
                .then(
                    function(response) {
                        deferred.resolve(response.data);
                    }, function(error) {
                        console.log('SERVICE : Erro ao excluir a Aeronave.' + error);
                        deferred.reject(error);
                    }
                );
            return deferred.promise;
        }

    }]);