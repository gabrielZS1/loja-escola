// Vitrine: monta os cards a partir do catálogo, com busca, filtro e ordenação.

const campoBusca = document.querySelector("#filtroProduto");
const campoRegra = document.querySelector("#filtroRegra");
const campoOrdem = document.querySelector("#ordenarProdutos");
const listaProdutos = document.querySelector("#listaProdutos");
const mensagemFiltro = document.querySelector("#mensagemFiltro");

// Remove acentos e maiúsculas para a busca ser mais tolerante.
function normalizar(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function criarCard(produto) {
  const selos = produto.regras
    .map((regra) => `<span class="badge rounded-pill text-bg-light border me-1">${regra}</span>`)
    .join("");

  return `
    <article class="col-sm-6 col-lg-4 product-item" data-name="${produto.nome}">
      <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden product-card">
        <div class="product-illustration bg-${produto.cor}-subtle" role="img" aria-label="${produto.alt}">${produto.emoji}</div>
        <div class="card-body d-flex flex-column p-4">
          <p class="small text-uppercase fw-semibold text-secondary mb-1">${produto.categoria}</p>
          <h3 class="h5 fw-bold">${produto.nome}</h3>
          <p class="text-secondary">${produto.curta}</p>
          <div class="mb-3">${selos}</div>
          <div class="d-flex justify-content-between align-items-center mt-auto pt-3 border-top">
            <span class="price">${formatarPreco(produto.preco)}</span>
            <a class="btn btn-primary rounded-pill px-4" href="produto.html?id=${produto.id}">Ver detalhes</a>
          </div>
        </div>
      </div>
    </article>`;
}

function obterProdutosVisiveis() {
  const termo = normalizar(campoBusca.value.trim());
  const regra = campoRegra.value;

  const resultado = PRODUTOS.filter((produto) => {
    const combinaTexto = normalizar(`${produto.nome} ${produto.categoria}`).includes(termo);
    const combinaRegra = !regra || produto.regras.includes(regra);
    return combinaTexto && combinaRegra;
  });

  const ordem = campoOrdem.value;
  if (ordem === "nome") resultado.sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
  if (ordem === "menor-preco") resultado.sort((a, b) => a.preco - b.preco);
  if (ordem === "maior-preco") resultado.sort((a, b) => b.preco - a.preco);

  return resultado;
}

function renderizar() {
  const produtos = obterProdutosVisiveis();
  listaProdutos.innerHTML = produtos.map(criarCard).join("");

  const filtrando = campoBusca.value.trim() || campoRegra.value;
  if (produtos.length === 0) {
    mensagemFiltro.textContent = "Nenhum produto encontrado. Tente outra busca ou limpe o filtro.";
  } else {
    mensagemFiltro.textContent = filtrando ? `${produtos.length} produto(s) encontrado(s).` : "";
  }
}

// Preenche o filtro de regras com a lista do catálogo.
REGRAS.forEach((regra) => campoRegra.add(new Option(regra, regra)));

[campoBusca, campoRegra, campoOrdem].forEach((campo) => {
  campo.addEventListener(campo === campoBusca ? "input" : "change", renderizar);
});

renderizar();