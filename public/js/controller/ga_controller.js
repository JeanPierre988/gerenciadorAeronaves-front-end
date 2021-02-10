angular.module('app-ga').controller('GAController', ['$scope', 'GAService', function($scope, GAService){
    var self = this;

    $scope.mensagem = '';
    $scope.status = false;
    
    self.aeronave = {
        id:null,
        nome:'',
        modelo:'',
        ano:'',
        descricao:'',
        vendido:''
    };

    self.marcas = {
        nome:'',
        qntd:''
    }

    self.aeronaves = [];
    self.submit = submit;
    self.edit = edit;
    self.reset = reset;
    self.remove = remove;

    fetchAllAeronaves();

    function fetchAllAeronaves(){ 
        countMarcas();
        GAService.fetchAllAeronaves()
            .then(
                function(d) {
                    self.aeronaves = d;
                },
                function(error) {
                    console.log('CONTROLLER : Erro ao listar as Aeronaves');
                }
            );
    }

    function countMarcas(){ 
        GAService.countMarcas()
            .then(
                function(d) {
                    self.marcas = d;
                },
                function(error) {
                    console.log('CONTROLLER : MARCAS');
                }
            );
    }

    function submit() { // SUBMIT do FORM
        if(self.aeronave.id === null) { //CASO NÃO TENHA ID = Cadastro
            console.log('Cadastrando Aeronave' + self.aeronave);
            createAeronave(self.aeronave);
        } else { //SE NÃO = UPDATE
            updateAeronave(self.aeronave, self.aeronave.id);
            console.log('Atualizando Aeronave ' + self.aeronave.id);
        }
    }

    function createAeronave(aeronave) {
        GAService.createAeronave(aeronave)
            .then( function() {
                    fetchAllAeronaves();
                    reset();
                    $scope.mensagem = 'Aeronave cadastrada com Sucesso';
                    $scope.status = true;
                }, function(error){
                    console.log('Erro ao cadastrar a Aeronave. ' + error);
                    $scope.mensagem = 'Erro ao cadastrar a Aeronave.'
                    $scope.status = false;
                }
            );
    }

    function updateAeronave(aeronave, id) {
        GAService.updateAeronave(aeronave, id)
            .then (function() {
                    fetchAllAeronaves();
                    $scope.mensagem = 'Aeronave atualizada com Sucesso';
                    $scope.status = true;
                }, function(error) {
                    console.log('Erro ao atualizar a Aeronave. ' + error);
                    $scope.mensagem = 'Erro ao cadastrar a Aeronave.'
                    $scope.status = false;
                }
                
            );
        reset();
    }

    function edit(id) { //ENVIA INFO PARA FORM PARA REALIZAR ALTERAÇÃO
        console.log('Aeronave que será editada: ' + id);
        for(var i = 0; i < self.aeronaves.length; i++){
            if(self.aeronaves[i].id === id) {
                self.aeronave = angular.copy(self.aeronaves[i]);
                break;
            }
        }
    }

    function remove(id) { //Método que limpa o FORM e exclui a Aeronave
        //console.log('ID que será deletado é: ' + id);
        if(self.aeronave.id === id) { //Verifica se a Aeronave que está no form é a que será deletada. Se sim, limpa o form
            reset();
        }
        deleteAeronave(id);
    }

    function deleteAeronave(id) { // DELETA
        GAService.deleteAeronave(id)
            .then(function() {
                    fetchAllAeronaves();
                    $scope.mensagem = 'Aeronave excluida com Sucesso';
                    $scope.status = true;
                }, function(error) {
                    console.log('Erro ao excluir a Aeronave. ' + error);
                    $scope.mensagem = 'Erro ao excluir a Aeronave';
                    $scope.status = false;
                }
            )
    }

    function reset() { // LIMPA O FORM
        self.aeronave = {
            id:null,
            nome:'',
            modelo:'',
            ano:'',
            descricao:'',
            vendido:''
        };
        $scope.mensagem = '';
        $scope.status = true;
        $scope.form.$setPristine(); 
    }
}])