angular.module('app-ga').controller('GAController', ['$scope', 'GAService', function($scope, GAService){
    var self = this;
    
    self.aeronave = {
        id:null,
        nome:'',
        modelo:'',
        ano:'',
        descricao:'',
        vendido:''
    };
    self.aeronaves = [];
    self.submit = submit;
    self.edit = edit;
    self.reset = reset;
    self.remove = remove;

    fetchAllAeronaves();

    function fetchAllAeronaves(){ 
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
            .then(
                fetchAllAeronaves,
                function(error){
                    console.log('Erro ao criar a Aeronave. ' + error);
                }
            );
    }

    function updateAeronave(aeronave, id) {
        GAService.updateAeronave(aeronave, id)
            .then (
                fetchAllAeronaves,
                function(error) {
                    console.log('Erro ao atualizar a Aeronave. ' + error);
                }
            )
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
            .then(
                fetchAllAeronaves,
                function(error) {
                    console.log('Erro ao excluir a Aeronave. ' + error);
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
        $scope.form.$setPristine(); 
    }
}])