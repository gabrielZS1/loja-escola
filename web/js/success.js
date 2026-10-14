// Sucesso: mostra o resumo da compra concluída; sem compra, bloqueia o acesso direto.

const painel = document.querySelector("#sucessoConteudo");
const semCompra = document.querySelector("#sucessoErro");

function lerPedidoConcluido() {
  try {
    const pedido = JSON.parse(sessionStorage.getItem("pedidoConcluido"));
    const produto = buscarProduto(pedido?.produtoId);
    return pedido && produto ? { pedido, produto } : null;
  } catch {
    return null;
  }
}

const dados = lerPedidoConcluido();

if (!dados) {
  semCompra.hidden = false;
} else {
  const { pedido, produto } = dados;
  document.querySelector("#mensagemCliente").textContent =
    `${pedido.nome}, sua invenção improvável está a caminho (de mentirinha).`;
  document.querySelector("#numeroPedido").textContent = pedido.numero;
  document.querySelector("#sucessoProduto").textContent = `${produto.emoji} ${produto.nome} × ${pedido.quantidade}`;
  document.querySelector("#sucessoSubtotal").textContent = formatarPreco(pedido.subtotal);
  document.querySelector("#sucessoFrete").textContent = pedido.frete === 0 ? "Grátis" : formatarPreco(pedido.frete);
  document.querySelector("#sucessoTotal").textContent = formatarPreco(pedido.total);
  document.querySelector("#sucessoPagamento").textContent = FORMAS_PAGAMENTO[pedido.pagamento] ?? pedido.pagamento;
  painel.hidden = false;
}