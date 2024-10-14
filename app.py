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
    return render_template('home.html')

# Rota para página de votação
@app.route('/votacao')
def votacao():
    if votacao_encerrada:
        return redirect(url_for('apuracao'))
    return render_template('votacao.html')

# Rota para login com CPF e votação
@app.route('/login', methods=['POST'])
def login():
    cpf = request.form.get('cpf')
    
    # Simples validação de CPF (pode ser melhorada)
    if len(cpf) != 11 or not cpf.isdigit():
        return jsonify({'status': 'erro', 'mensagem': 'CPF inválido!'})

    # Verifica se o CPF já votou
    if cpf in cpfs_que_votaram:
        return jsonify({'status': 'erro', 'mensagem': 'Este CPF já votou!'})

    session['cpf'] = cpf  # Armazena o CPF na sessão
    return jsonify({'status': 'sucesso'})

# Rota para registrar voto
@app.route('/votar', methods=['POST'])
def votar():
    if votacao_encerrada:
        return jsonify({'status': 'erro', 'mensagem': 'Votação encerrada!'})

    cpf = session.get('cpf')
    if not cpf:
        return jsonify({'status': 'erro', 'mensagem': 'Faça login para votar.'})

    dados = request.json
    opcao = dados.get('opcao')

    if opcao in opcoes_votacao:
        opcoes_votacao[opcao] += 1
        cpfs_que_votaram.add(cpf)  # Marca o CPF como votado
        session.pop('cpf', None)  # Remove o CPF da sessão após o voto
        return jsonify({'status': 'sucesso', 'resultados': opcoes_votacao})
    
    return jsonify({'status': 'erro', 'mensagem': 'Opção inválida.'})

# Rota para encerrar a votação (admin)
@app.route('/encerrar_votacao')
def encerrar_votacao():
    global votacao_encerrada
    votacao_encerrada = True
    return redirect(url_for('apuracao'))

# Rota para exibir apuração dos votos
@app.route('/apuracao')
def apuracao():
    if not votacao_encerrada:
        return redirect(url_for('home'))
    return render_template('apuracao.html', resultados=opcoes_votacao)

# Inicia o servidor
if __name__ == '__main__':
    app.run(debug=True)
