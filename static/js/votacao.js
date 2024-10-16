$(document).ready(function () {

    // Função para verificar se a votação foi encerrada e atualizar os resultados
    function atualizarResultados() {
        $.get('/resultados', function (data) {
            if (data.message) {
                // Se a votação ainda não foi encerrada, não faça nada
                console.log(data.message);
            } else {
                // Atualiza os resultados com os valores retornados
                $('#res-opcao1').text(data.opcao1 + ' votos');
                $('#res-opcao2').text(data.opcao2 + ' votos');
                $('#res-opcao3').text(data.opcao3 + ' votos');
            }
        });
    }

    // Executa a função de atualizar os resultados a cada 5 segundos (opcional)
    setInterval(atualizarResultados, 5000);


    // Função para atualizar o progresso da votação
    function atualizarProgresso() {
        $.get('/progresso_votacao', function (data) {
            // Atualiza a barra de progresso
            $('.progress').css('width', data.porcentagem + '%');
            // Atualiza o texto da porcentagem apurada
            $('p.porcentagem-apurada').text('Porcentagem apurada: ' + data.porcentagem.toFixed(2) + '% (' + data.votantes_atual + '/' + data.total_votantes + ' votantes)');
        });
    }

    // Atualiza o progresso a cada 5 segundos (ou ajusta conforme necessário)
    setInterval(atualizarProgresso, 1000);
});
// Formatação e validação do CPF
$('#cpf').on('input', function () {
    let cpf = $(this).val().replace(/\D/g, ''); // Remove não dígitos

    // Formatação do CPF
    if (cpf.length > 3) cpf = cpf.slice(0, 3) + '.' + cpf.slice(3);
    if (cpf.length > 7) cpf = cpf.slice(0, 7) + '.' + cpf.slice(7);
    if (cpf.length > 11) cpf = cpf.slice(0, 11) + '-' + cpf.slice(11);
    $(this).val(cpf);

    // Validação do CPF
    if (cpf.length === 14) { // Verifica se o CPF está completo
        // Remove a formatação para validação
        const cpfNumeros = cpf.replace(/\D/g, '');

        // Validação do formato do CPF
        if (!validarFormatoCPF(cpf)) {
            $('#mensagem').text('Formato de CPF inválido.'); // Mensagem de erro
        } else if (!validarCPF(cpfNumeros)) {
            $('#mensagem').text('CPF inválido.'); // Mensagem de erro
        } else {
            $('#mensagem').text(''); // Limpa a mensagem de erro
        }
    } else {
        $('#mensagem').text(''); // Limpa a mensagem de erro se o CPF não estiver completo
    }
});

// Função para validar o CPF
function validarCPF(cpf) {
    // Verifica se o CPF possui 11 dígitos
    if (cpf.length !== 11) return false;

    // Verifica se todos os dígitos são iguais (números inválidos)
    if (/^(\d)\1{10}$/.test(cpf)) return false;

    // Cálculo do primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf[i]) * (10 - i);
    }
    let primeiroDigito = (soma * 10) % 11;
    if (primeiroDigito === 10 || primeiroDigito === 11) {
        primeiroDigito = 0;
    }

    // Cálculo do segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf[i]) * (11 - i);
    }
    let segundoDigito = (soma * 10) % 11;
    if (segundoDigito === 10 || segundoDigito === 11) {
        segundoDigito = 0;
    }

    // Verifica se os dígitos verificadores estão corretos
    return cpf[9] == primeiroDigito && cpf[10] == segundoDigito;
}

// Validação do CPF usando Regex
function validarFormatoCPF(cpf) {
    // Expressão regular para validar o formato
    const regex = /^(?:\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11})$/;
    return regex.test(cpf);
}




