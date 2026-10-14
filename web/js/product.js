// Página de produto: lê o id da URL, mostra o produto e envia a compra ao checkout.

const parametros = new URLSearchParams(window.location.search);
const produto = buscarProduto(parametros.get("id"));

const conteudo = document.querySelector("#produtoConteudo");
const erro = document.querySelector("#produtoErro");
const formProduto = document.querySelector("#formProduto");
const campoQuantidade = document.querySelector("#quantidade");
const feedback = document.querySelector("#produtoFeedback");
const totalProduto = document.querySelector("#totalProduto");

function mostrarProduto(p) {
  document.title = `${p.nome} | Improvável`;
  document.querySelector('meta[name="description"]').content = p.curta;

  document.querySelector("#breadcrumbNome").textContent = p.nome;
  document.querySelector("#produtoNome").textContent = p.nome;
  document.querySelector("#produtoCategoria").textContent = p.categoria;
  document.querySelector("#produtoCurta").textContent = p.curta;
  document.querySelector("#produtoDescricao").textContent = p.longa;
  document.querySelector("#produtoPreco").textContent = formatarPreco(p.preco);
  document.querySelector("#fichaMaterial").textContent = p.material;
  document.querySelector("#fichaDimensoes").textContent = p.dimensoes;
  document.querySelector("#fichaUso").textContent = p.uso;

  const ilustracao = document.querySelector("#produtoIlustracao");
  ilustracao.textContent = p.emoji;
  ilustracao.setAttribute("aria-label", p.alt);
  ilustracao.classList.add(`bg-${p.cor}-subtle`);

  document.querySelector("#produtoDetalhes").innerHTML = p.detalhes
    .map((item) => `<li class="list-group-item py-3">✅ ${item}</li>`)
    .join("");

  document.querySelector("#produtoRegras").innerHTML = p.regras
    .map((regra) => `<span class="badge rounded-pill text-bg-light border me-1">${regra}</span>`)
    .join("");

  atualizarTotal();
  conteudo.hidden = false;
}

function quantidadeValida() {
  const valor = Number(campoQuantidade.value);
  return Number.isInteger(valor) && valor >= 1 && valor <= 10;
}

function atualizarTotal() {
  const quantidade = quantidadeValida() ? Number(campoQuantidade.value) : 0;
  totalProduto.textContent = formatarPreco(produto.preco * quantidade);
}

if (!produto) {
  // id ausente ou inexistente (ex.: produto.html?id=999)
  document.title = "Produto não encontrado | Improvável";
  erro.hidden = false;
} else {
  mostrarProduto(produto);

  campoQuantidade.addEventListener("input", () => {
    atualizarTotal();
    feedback.textContent = "";
    feedback.className = "mt-3";
    campoQuantidade.removeAttribute("aria-invalid");
  });

  formProduto.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!quantidadeValida()) {
      feedback.textContent = "Escolha uma quantidade inteira entre 1 e 10.";
      feedback.className = "mt-3 feedback-erro";
      campoQuantidade.setAttribute("aria-invalid", "true");
      campoQuantidade.focus();
      return;
    }

    // Guardamos só o necessário: qual produto e quantas unidades.
    const pedido = { produtoId: produto.id, quantidade: Number(campoQuantidade.value) };
    sessionStorage.setItem("pedido", JSON.stringify(pedido));
    window.location.href = "checkout.html";
  });
}