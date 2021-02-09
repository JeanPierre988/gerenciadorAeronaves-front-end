angular.module('meusServicos', ['ngResource'])
    .factory('recursoAeronave', function($resource) { //Factory('nome', função() {});  cria um serviço e sempre retorna um objeto
        return $resource('http://localhost:9090/aeronaves/:aeronaveId', null, { //Centralizando a URL do back-end em um só lugar, passando a chave como parametro

            update : {  method : 'PUT'  }

        });
    })
    /*
    Promise funciona de maneira assincrona. Ou seja, ela não trava a execução do processo e, ela só ira retornar o valor, quando tiver uma resposta do servidor.
    */
    .factory('cadastroDeAeronaves', function(recursoAeronave, $q) { //$q e o serviço especializado em Promises, onde recebe uma função quando é resolvida(resolve) e quando é rejeitada(reject)
        var servico = {};

        servico.cadastrar = function(aeronave){ //O Serviço "Cadastrar" recebe uma Aeronave e retorna uma Promisse.
            return $q(function(resolve, reject) {
                if(aeronave.id){ //Se a aeronave tiver ID é para ALTERAR
                    recursoAeronave.update({aeronaveId : aeronave.id}, aeronave, function(){
                        resolve({
                            mensagem : 'Aeronave ' + aeronave.nome + ' foi atualizada com sucesso!',
                            inclusao: false
                        })
                    }, function(error){
                        console.log(error);
                        reject({
                            mensagem : 'Não foi possível alterar a Aeronave.'
                        });
                    });
                } else { //Se não é INCLUSÃO
                    recursoAeronave.save(aeronave, function(){
                        resolve({
                            mensagem : 'Aeronave ' + aeronave.nome + ' incluído com sucesso!',
                            inclusao: true
                        });
                    }, function(error){
                        console.log(error);
                        reject({
                            mensagem : 'Não foi possível incluir a Aeronave.'
                        });
                    })
                }
            });
        };

        return servico;
    })