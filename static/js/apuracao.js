$(document).ready(function () {
    // Função para abrir o modal de apuração
    $('#apuracao-link').on('click', function (e) {
        e.preventDefault();  // Previne o comportamento padrão do link
        $('#modal-apuracao').show();  // Exibe o modal de apuração
    });

    // Fechar o modal de apuração ao clicar no "X"
    $('.close').on('click', function () {
        $('#modal-apuracao').hide();  // Esconde o modal de apuração
    });

    // Fechar o modal de apuração se o usuário clicar fora do conteúdo
    $(window).on('click', function (event) {
        if ($(event.target).is('#modal-apuracao')) {
            $('#modal-apuracao').hide();  // Esconde o modal
        }
    });
});
