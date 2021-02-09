angular.module('minhasDiretivas', [])
    .directive('meuPainel', function(){ //Uso correto da diretiva é "meu-painel" quando utilizado em uma diretiva
        var ddo = {}; //Directive Definition Object

        ddo.restric = "AE"; //A = Atribute ex: <div meu-Painel>/ E = Element ex:<meu-painel>
        ddo.scope= { //Este scope é diferente do $scope. Este scope é somente desta diretiva
            titulo:'@' //Utilização = <meu-painel titulo="NomeDoPainel"></meu-painel> //Geralmente é utilizado o '@', pois o valor que a diretiva irá receber será passado como STRING.
                       // Logo, se: <meu-painel titulo="NomeDoPainel"> o titulo terá o nome "NomeDoPainel"
                       //Também existe o uso do &, que serve para avaliar expressões
                       //E o = que serve para comunicação Biderecional. Controle e Diretivas ficam sabendo o que acontece na propriedade
        };

        ddo.transclude = true;

        ddo.templateUrl = 'js/directives/meu-painel.html';

    return ddo; //.directive sempre retorna um um DDO
});