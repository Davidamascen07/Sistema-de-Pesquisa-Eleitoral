$(document).ready(function () {

    // Função para resetar o modal de votação ao abrir
    function resetarModalVotacao() {
        $('#cpf').val('');  // Limpa o campo CPF
        $('#mensagem').text('');  // Limpa mensagens anteriores
        $('#opcoes').hide();  // Esconde as opções até o login com CPF
        $('#login-cpf').show();  // Mostra o campo de login de CPF
        $('.opcao').prop('disabled', false);  // Habilita as opções de votação novamente
    }

    // Ao clicar no botão "Votar", abre o modal e reseta o estado anterior
    $('#votacao-link').on('click', function (e) {
        e.preventDefault();  // Previne o comportamento padrão
        resetarModalVotacao();  // Limpa o estado do modal
        $('#modal-votacao').show();  // Mostra a modal
    });

    // Ao clicar no "X" para fechar a modal
    $('.close').on('click', function () {
        $('#modal-votacao').hide();  // Esconde a modal
    });

    // Fechar a modal se o usuário clicar fora do conteúdo da modal
    $(window).on('click', function (event) {
        if ($(event.target).is('#modal-votacao')) {
            $('#modal-votacao').hide();  // Esconde a modal se clicar fora dela
        }
    });

    // Função de login com CPF (simples validação)
    $('#btn-login').click(function () {
        var cpf = $('#cpf').val();

        // Validação básica do CPF (verifica se tem 11 dígitos)
        if (cpf.length !== 14) {
            $('#mensagem').text('CPF inválido. Insira 11 dígitos.');
            return;
        }

        // Envia o CPF para o servidor
        $.post('/login', { cpf: cpf }, function (response) {
            if (response.status === 'sucesso') {
                $('#login-cpf').hide();  // Esconde o login do CPF
                $('#opcoes').show();  // Mostra as opções de votação
                $('#mensagem').text('');  // Limpa qualquer mensagem
            } else {
                $('#mensagem').text(response.mensagem);  // Exibe a mensagem de erro
            }
        });
    });

    // Função para enviar o voto
    $('.opcao').click(function () {
        var opcao = $(this).data('opcao');

        $.ajax({
            url: '/votar',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ opcao: opcao }),
            success: function (response) {
                if (response.status === 'sucesso') {
                    $('#mensagem').text('Voto registrado com sucesso!');
                    atualizarResultados();  // Atualiza os resultados
                    $('#opcoes').hide();  // Esconde as opções após o voto

                    // Exibe o botão de voltar ao home
                    $('#btn-home').show();  // Exibe o botão
                } else {
                    $('#mensagem').text(response.mensagem);  // Mostra erro, se houver
                }
            }
        });
    });

    // Função para fechar o modal e recarregar a página ao clicar no botão "Voltar ao Home"
    $('#btn-home').on('click', function () {
        // Fecha o modal
        $('#modal-votacao').hide();  
        
        // Adiciona um pequeno atraso para garantir que o modal seja fechado completamente antes de redirecionar
        setTimeout(function() {
            window.location.href = '/';  // Redireciona para o Home
        }, 300);  // Aguarda 300ms antes de redirecionar
    });

    // Função para atualizar os resultados
    function atualizarResultados() {
        $.get('/resultados', function (data) {
            $('#res-opcao1').text(data.opcao1);
            $('#res-opcao2').text(data.opcao2);
            $('#res-opcao3').text(data.opcao3);
        });
    }

    // Atualiza os resultados ao carregar a página
    atualizarResultados();
});
