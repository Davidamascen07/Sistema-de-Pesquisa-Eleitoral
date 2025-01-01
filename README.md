# Sistema de Pesquisa Eleitoral

Este é um sistema de votação simples construído com **[Flask](https://flask.palletsprojects.com/)**, **HTML**, **CSS** e **JavaScript** (usando **[jQuery](https://jquery.com/)**). O sistema permite que usuários votem utilizando seu CPF e exibe os resultados após o término da votação.

## Contexto

Este projeto foi desenvolvido para demonstrar as funcionalidades básicas de um sistema de votação eletrônica. Ele pode ser utilizado como base para aplicações mais complexas ou como ferramenta educacional para aprendizado de desenvolvimento web.

## Funcionalidades

- Autenticação de usuário usando CPF.
- Restrito a apenas um voto por CPF.
- Exibição de resultados da votação em tempo real.
- Encerramento de votação e apuração final.

## Especificações do Projeto

- Linguagem principal: Python 3.
- Framework backend: [Flask](https://flask.palletsprojects.com/).
- Frontend: HTML, CSS e JavaScript (com [jQuery](https://jquery.com/)).
- Estrutura de banco de dados: Simples (armazenamento em memória ou arquivo local).

## Estrutura do Projeto

```
Sistema-de-Pesquisa-Eleitoral/
|— app.py               # Arquivo principal do Flask
|— templates/           # Arquivos HTML
|   |— index.html       # Página inicial
|   |— results.html     # Resultados da votação
|— static/              # Arquivos estáticos
    |— css/            # Estilos CSS
    |— js/             # Scripts JavaScript
|— requirements.txt     # Dependências do projeto
```

## Técnicas Utilizadas

- **Flask** para criação e gerenciamento de rotas.
- **Templates Jinja2** para renderização dinâmica de páginas HTML.
- **JavaScript** (com [jQuery](https://jquery.com/)) para manipulação do DOM e atualização em tempo real dos resultados.
- **CSS** para estilização das páginas.

## Dependências

As dependências do projeto estão listadas na tabela abaixo:

| Dependência | Função | Link |
|--------------|----------|------|
| Flask        | Framework backend para desenvolvimento web | [Flask](https://flask.palletsprojects.com/) |
| jQuery       | Biblioteca para manipulação do DOM e eventos | [jQuery](https://jquery.com/) |

## Como Rodar o Projeto

Siga as instruções abaixo para baixar e executar o projeto localmente.

### 1. Clone o repositório

```bash
git clone https://github.com/Davidamascen07/Sistema-de-Pesquisa-Eleitoral.git
```

### 2. Crie e ative um ambiente virtual (opcional, mas recomendado)

```bash
python -m venv venv
venv\Scripts\activate
```

### 3. Instale as dependências

No terminal, instale as dependências do Flask rodando o seguinte comando:

```bash
pip install -r requirements.txt
```

### 4. Inicie o servidor Flask

Após instalar as dependências, inicie o servidor Flask com o comando:

```bash
python app.py
```

## Endpoints do Projeto

- **GET /**: Exibe a página inicial com o formulário de votação.
- **POST /vote**: Processa o voto submetido pelo usuário.
- **GET /results**: Exibe os resultados da votação.

---
Essa documentação foi elaborada para facilitar a compreensão e execução do projeto, além de fornecer uma visão geral das tecnologias e técnicas empregadas.

