# Projeto de avaliação VR-Wallet

## Criado com react native e usando a api https://jsonplaceholder.typicode.com

### Features

- [x] Listagens de cartões
- [x] Cadastro de cartões

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Ambiente react native](https://reactnative.dev/docs/getting-started)
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

### :computer: Rodando o Back End (servidor)

Caminho do servidor(API)(baseUrl) pode ser ajustado aqui: src/global/httpClient.ts

```bash
# Clone este repositório
$ git clone <https://github.com/joelsonrocha/VR-Wallet.git>

# Acesse a pasta do projeto no terminal/cmd
$ cd VR-Wallet

# Instale as dependências
$ yarn


# Depois rode o servidor
$ yarn api
```

### :iphone: Rodando o Front End (aplicativo)

```bash
# Na mesma pasta onde está rodando o servidor, mas com outro terminal
$ yarn android
```

Não tá terminado, não ficou do jeito que eu gostaria.
Foi feito com react-native na versão 0.71, e usando a nova arquitetura.
