from flask import Flask, render_template, jsonify, request, session, redirect, url_for

app = Flask(__name__, static_folder='static')
app.secret_key = 'chave_super_secreta'  # Necessário para o uso de sessões

# Armazenando os votos e CPFs que já votaram
opcoes_votacao = {
    'opcao1': 0,
    'opcao2': 0,
    'opcao3': 0
}
cpfs_que_votaram = set()  # Armazenar CPFs dos usuários que já votaram
votacao_encerrada = False  # Controlar o status da votação

# Página principal (home)
@app.route('/')
def home():
    return render_template('home.html', votacao_encerrada=votacao_encerrada, resultados=opcoes_votacao)

# Rota para página de votação
@app.route('/votacao')
def votacao():
    if votacao_encerrada:
        return redirect(url_for('apuracao'))  # Redireciona para a apuração se a votação foi encerrada
    return render_template('votacao.html')

# Rota para login com CPF e votação
@app.route('/login', methods=['POST'])
def login():
    cpf = request.form.get('cpf')
    
    # Simples validação de CPF (pode ser melhorada)
    if len(cpf) != 14:  # Exemplo: CPF com máscara "000.000.000-00"
        return jsonify({'status': 'erro', 'mensagem': 'CPF inválido!'})

    # Verifica se o CPF já votou
    if cpf in cpfs_que_votaram:
        return jsonify({'status': 'erro', 'mensagem': 'Este CPF já votou!'})

    session['cpf'] = cpf  # Armazena o CPF na sessão
    return jsonify({'status': 'sucesso'})

# Rota para registrar voto
@app.route('/votar', methods=['POST'])
def votar():
    global votacao_encerrada
    
    if votacao_encerrada:
        return jsonify({'status': 'erro', 'mensagem': 'Votação já foi encerrada!'})

    cpf = session.get('cpf')
    if not cpf:
        return jsonify({'status': 'erro', 'mensagem': 'Faça login para votar.'})

    dados = request.get_json()
    opcao = dados.get('opcao')

    if opcao in opcoes_votacao:
        # Adiciona o voto
        opcoes_votacao[opcao] += 1
        cpfs_que_votaram.add(cpf)  # Marca o CPF como votado
        session.pop('cpf', None)  # Remove o CPF da sessão após o voto

        # Verifica se o número de votantes atingiu o limite de 15
        if len(cpfs_que_votaram) >= 15:
            votacao_encerrada = True  # Encerra a votação automaticamente
            return jsonify({'status': 'sucesso', 'mensagem': 'Voto registrado! A votação foi encerrada automaticamente.'})

        return jsonify({'status': 'sucesso', 'mensagem': 'Voto registrado com sucesso!'})
    
    return jsonify({'status': 'erro', 'mensagem': 'Opção inválida.'})


# Rota para encerrar a votação (admin)
@app.route('/encerrar_votacao')
def encerrar_votacao():
    global votacao_encerrada
    votacao_encerrada = True    
    return redirect(url_for('home', mensagem='Votação encerrada!'))

# Rota para exibir apuração dos votos
@app.route('/apuracao')
def apuracao():
    return render_template('apuracao.html', resultados=opcoes_votacao, votacao_encerrada=votacao_encerrada)

# Rota para exibir os resultados via API (usado no frontend para atualizar os resultados)
@app.route('/resultados')
def resultados_votacao():
    if votacao_encerrada:
        return jsonify(opcoes_votacao)
    else:
        return jsonify({'message': 'A votação ainda não foi encerrada.'})


@app.route('/progresso_votacao')
def progresso_votacao():
    total_votantes = 15
    votantes_atual = len(cpfs_que_votaram)  # Número de CPFs únicos que já votaram
    porcentagem = (votantes_atual / total_votantes) * 100  # Calcula a porcentagem
    return jsonify({'porcentagem': porcentagem, 'votantes_atual': votantes_atual, 'total_votantes': total_votantes})

# Inicia o servidor
if __name__ == '__main__':
    app.run(debug=True)
