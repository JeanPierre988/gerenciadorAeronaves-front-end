angular.module('app-aeronaves').controller('AeronavesController', function($scope, recursoAeronave){
    
    $scope.aeronaves = [];
    $scope.filtro = '';
    $scope.mensagem = '';

    recursoAeronave.query(function(aeronaves) {
        $scope.aeronaves = aeronaves;
    }, function(error) {
        console.log(error);
    });

    $scope.remover = function(aeronave){
        recursoAeronave.delete({aeronaveId : aeronave.id}, function(){
            $scope.aeronaves.splice($scope.aeronaves.indexOf(aeronave), 1); //Atualiza a lista exibida ao usuário, sem fazer um requisição ao back-end, utilizando o método "splice"
            console.log('Aeronave '+ aeronave.id + ' removida com sucesso!');
            $scope.mensagem = 'Aeronave ' + aeronave.id + ' foi removida com sucesso!';

        }, function(error){
            console.log(error);
            $scope.mensagem = 'Não foi possível remover a Aeronave ' + aeronave.id;
        });
    }
});