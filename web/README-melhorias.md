## Melhorias realizadas

### Nome e conceito da loja
**Improvável** — loja de invenções que ainda não existem. Identidade: roxo-noite (`#1b1340`) com âmbar de destaque, títulos com fonte serifada.

### Produtos e regra do desafio atendida
| Produto | Regra(s) |
|---|---|
| Zumbilume | Começa com Z; uso único |
| Guarda-chuva Pré-Pingo | Cabe no bolso |
| Estação Astro-Formiga | Serve em uma formiga; uso no espaço sideral |
| Jardim Flutuante Cirrus | Não cabe em um avião |

### Principais mudanças
- **HTML:** conteúdo e identidade novos em todas as páginas; favicon próprio; `meta description` e Open Graph por página; scripts com `defer`; `label` em todos os campos, `fieldset`/`legend` e áreas `aria-live` para feedback.
- **CSS:** paleta em variáveis CSS ligadas às variáveis do Bootstrap; estados de `hover`, `focus-visible`, desabilitado, erro e sucesso; `prefers-reduced-motion`. O Bootstrap cuida de grid, espaçamentos e formulários.
- **JavaScript:** catálogo único em `js/produtos.js`; vitrine gerada a partir dele, com busca, filtro por regra e ordenação; `produto.html` lê o `id` com `URLSearchParams` (com tratamento de id inexistente); resumo do checkout calculado dinamicamente; validação com mensagens por campo; máscaras de telefone e CEP; página de sucesso protegida contra acesso direto; dados guardados em `sessionStorage`.

### APIs utilizadas
- **ViaCEP** (`https://viacep.com.br/ws/{cep}/json/`): preenche endereço, bairro, cidade e UF. Trata CEP inválido, inexistente, dados ausentes, falha de rede, resposta inválida e segunda busca.

### Testes realizados
_Preencher depois de executar cada cenário da lista do enunciado (resultado e data)._

### Dificuldades encontradas e como foram resolvidas
_Preencher com a experiência real do grupo._

### Integrantes do grupo
_Preencher._
