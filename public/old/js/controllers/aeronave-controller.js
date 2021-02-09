angular.module('app-aeronaves').controller('AeronaveController', function($scope, cadastroDeAeronaves, recursoAeronave, $routeParams){
    
    $scope.aeronave = {};
    $scope.mensagem = '';

    if($routeParams.aeronaveId){
        recursoAeronave.get({aeronaveId : $routeParams.aeronaveId}, function(aeronave){
            $scope.aeronave = aeronave;
        }, function(error) {
            console.log(error);
            $scope.mensagem = 'Não foi possível obter a Aeronave';
        });
    };

    $scope.submeter = function(){
        if($scope.formulario.$valid){
            
            cadastroDeAeronaves.cadastrar($scope.aeronave) //Cadastrar retorna promisse. Logo é preciso usar o .then (resolve) e o .catch(reject)
                .then(function(dados){
                    $scope.mensagem = dados.mensagem;
                    if(dados.inclusao) $scope.aeronave = {};
                })
                .catch(function(dados){
                    $scope.mensagem = dados.mensagem;
                });

        }
    };
});