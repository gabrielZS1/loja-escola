# PRD - FormiFofo
## Loja de Pantufas para Formigas

**Versão:** 1.0
**Tipo:** MVP Web
**Frontend:** React
**Backend:** Java
**Banco de Dados:** MySQL
**Equipe:** 8 pessoas multidisciplinares

---

# 1. Visão do Produto

A FormiFofo é uma loja virtual especializada na venda de pantufas para formigas. Embora o conceito seja divertido e fictício, o projeto serve como excelente exercício acadêmico para aprender desenvolvimento web completo.

O objetivo do MVP é permitir que clientes naveguem por um catálogo de pantufas, visualizem detalhes dos produtos e realizem pedidos.

---

# 2. Problema

As formigas caminham grandes distâncias diariamente e não possuem acesso a calçados confortáveis.

Precisamos criar uma plataforma simples que permita a aquisição de pantufas adequadas para diferentes espécies de formigas.

---

# 3. Objetivos do MVP

- Exibir catálogo de produtos.
- Permitir cadastro de clientes.
- Permitir login.
- Visualizar detalhes de uma pantufa.
- Adicionar produtos ao carrinho.
- Finalizar pedido.
- Área administrativa simples para cadastro de produtos.

---

# 4. Personas

## Formiga Operária Olivia

- 25 dias de vida.
- Trabalha transportando folhas.
- Busca conforto após longas jornadas.

## Rainha Antônia

- Responsável pelo formigueiro.
- Compra em grandes quantidades.
- Valoriza qualidade e durabilidade.

---

# 5. Funcionalidades

## Catálogo

Como cliente,
quero visualizar produtos,
para encontrar uma pantufa adequada.

### Critérios de Aceite

- Lista de produtos.
- Imagem.
- Nome.
- Preço.
- Botão de detalhes.

## Cadastro

Como cliente,
quero criar uma conta,
para acompanhar meus pedidos.

### Critérios de Aceite

- Nome.
- E-mail.
- Senha.
- Validação básica.

## Login

Como cliente,
quero acessar minha conta,
para realizar compras.

## Carrinho

Como cliente,
quero adicionar pantufas,
para finalizar posteriormente.

## Pedido

Como cliente,
quero concluir a compra,
para receber minhas pantufas.

## Administração

Como administrador,
quero cadastrar produtos,
para manter o catálogo atualizado.

---

# 6. Fluxo Principal

1. Usuário acessa o site.
2. Navega pelo catálogo.
3. Visualiza um produto.
4. Adiciona ao carrinho.
5. Realiza login.
6. Finaliza pedido.
7. Sistema registra compra.

---

# 7. Telas do MVP

## Tela Inicial

- Banner principal.
- Produtos em destaque.
- Menu superior.

## Catálogo

- Lista de pantufas.
- Filtros simples.

## Produto

- Foto.
- Descrição.
- Preço.
- Botão comprar.

## Carrinho

- Itens.
- Quantidades.
- Valor total.

## Login/Cadastro

- Formulários básicos.

## Administração

- Cadastro de produtos.
- Edição de produtos.

---

# 8. Modelo de Dados Inicial

## Usuário

- id
- nome
- email
- senha

## Produto

- id
- nome
- descricao
- preco
- imagem
- estoque

## Pedido

- id
- usuario_id
- data
- valor_total

## ItemPedido

- id
- pedido_id
- produto_id
- quantidade

---

# 9. Requisitos Não Funcionais

- Interface simples.
- Responsiva para celular.
- Tempo de carregamento inferior a 3 segundos.
- Navegação intuitiva.
- Código organizado e documentado.

---

# 10. Distribuição da Equipe

## Produto e Gestão

- 1 Product Owner
- 1 Scrum Master

## Desenvolvimento Frontend

- 2 Desenvolvedores React

## Desenvolvimento Backend

- 2 Desenvolvedores Java

## Banco de Dados

- 1 Desenvolvedor MySQL

## Qualidade

- 1 Analista de Testes

---

# 11. Métricas de Sucesso

- 20 produtos cadastrados.
- Cadastro de usuário funcionando.
- Fluxo completo de compra funcionando.
- Tempo médio de conclusão de compra inferior a 2 minutos.

---

# 12. Futuras Evoluções

- Avaliações de produtos.
- Programa de fidelidade para formigueiros.
- Inteligência artificial para recomendar pantufas.
- Rastreamento de entrega por trilha de feromônios.
- Aplicativo mobile.

---

# Resumo

A FormiFofo é um MVP educacional que permite a uma equipe multidisciplinar praticar análise de requisitos, UX, React, Java, MySQL e testes através de um produto divertido, simples e viável para desenvolvimento em poucas semanas.
