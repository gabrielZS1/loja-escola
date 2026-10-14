// Checkout: resumo dinâmico, validação, máscaras, consulta ao ViaCEP e conclusão da compra.

const conteudo = document.querySelector("#checkoutConteudo");
const semPedido = document.querySelector("#checkoutErro");
const form = document.querySelector("#checkoutForm");
const cepInput = document.querySelector("#cep");
const telefoneInput = document.querySelector("#telefone");
const estadoInput = document.querySelector("#estado");
const buscarCepButton = document.querySelector("#buscarCep");
const cepFeedback = document.querySelector("#cepFeedback");
const formFeedback = document.querySelector("#formFeedback");

// ---------- Utilidades ----------
function somenteNumeros(valor) {
  return valor.replace(/\D/g, "");
}

function formatarCep(valor) {
  const numeros = somenteNumeros(valor).slice(0, 8);
  return numeros.length <= 5 ? numeros : `${numeros.slice(0, 5)}-${numeros.slice(5)}`;
}

function formatarTelefone(valor) {
  const n = somenteNumeros(valor).slice(0, 11);
  if (n.length <= 2) return n;
  if (n.length <= 6) return `(${n.slice(0, 2)}) ${n.slice(2)}`;
  const corte = n.length === 11 ? 7 : 6;
  return `(${n.slice(0, 2)}) ${n.slice(2, corte)}-${n.slice(corte)}`;
}

// Aplica uma máscara sem atrapalhar quem está apagando.
function aplicarMascara(input, formatar) {
  input.addEventListener("input", (event) => {
    let texto = formatar(input.value);
    if (event.inputType?.startsWith("delete")) texto = texto.replace(/\D+$/, "");
    input.value = texto;
  });
}

// ---------- Pedido e resumo ----------
function lerPedido() {
  try {
    const pedido = JSON.parse(sessionStorage.getItem("pedido"));
    const produto = buscarProduto(pedido?.produtoId);
    const quantidade = Number(pedido?.quantidade);
    if (!produto || !Number.isInteger(quantidade) || quantidade < 1 || quantidade > 10) return null;
    return { produto, quantidade };
  } catch {
    return null; // JSON inválido no sessionStorage
  }
}

const pedidoAtual = lerPedido();
let totais = null;

function preencherResumo({ produto, quantidade }) {
  const subtotal = produto.preco * quantidade;
  const frete = calcularFrete(subtotal);
  totais = { subtotal, frete, total: subtotal + frete };

  document.querySelector("#resumoProduto").textContent = `${produto.emoji} ${produto.nome} × ${quantidade}`;
  document.querySelector("#resumoSubtotal").textContent = formatarPreco(subtotal);
  document.querySelector("#resumoFrete").textContent = frete === 0 ? "Grátis" : formatarPreco(frete);
  document.querySelector("#resumoTotal").textContent = formatarPreco(totais.total);
  document.querySelector("#resumoDica").textContent = frete === 0
    ? "Você ganhou frete grátis."
    : `Frete grátis em compras a partir de ${formatarPreco(FRETE_GRATIS_A_PARTIR_DE)}.`;
}

// ---------- Validação ----------
const REGRAS_CAMPOS = {
  nome: (c) => (c.value.trim().length >= 3 ? "" : "Informe seu nome completo."),
  email: (c) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.value.trim()) ? "" : "Informe um e-mail válido, como nome@exemplo.com."),
  telefone: (c) => (!c.value || [10, 11].includes(somenteNumeros(c.value).length) ? "" : "Informe o telefone com DDD (10 ou 11 números)."),
  cep: (c) => (somenteNumeros(c.value).length === 8 ? "" : "Digite um CEP com 8 números."),
  logradouro: (c) => (c.value.trim() ? "" : "Informe o endereço."),
  numero: (c) => (c.value.trim() ? "" : "Informe o número (ou S/N)."),
  cidade: (c) => (c.value.trim() ? "" : "Informe a cidade."),
  estado: (c) => (/^[A-Za-z]{2}$/.test(c.value.trim()) ? "" : "Informe a UF com 2 letras."),
  pagamento: (c) => (c.value ? "" : "Escolha uma forma de pagamento."),
  termos: (c) => (c.checked ? "" : "Marque a confirmação para continuar."),
};

function validarCampo(campo) {
  const mensagem = REGRAS_CAMPOS[campo.id](campo);
  const erro = document.querySelector(`#erro-${campo.id}`);
  campo.setCustomValidity(mensagem);
  campo.classList.toggle("is-invalid", Boolean(mensagem));
  if (mensagem) campo.setAttribute("aria-invalid", "true");
  else campo.removeAttribute("aria-invalid");
  erro.textContent = mensagem;
  return !mensagem;
}

function validarTudo() {
  const invalidos = Object.keys(REGRAS_CAMPOS)
    .map((id) => document.getElementById(id))
    .filter((campo) => !validarCampo(campo));
  invalidos[0]?.focus();
  return invalidos.length === 0;
}

// ---------- ViaCEP ----------
let buscandoCep = false;

function mostrarCepFeedback(texto, classe = "text-secondary") {
  cepFeedback.className = `mt-3 ${classe}`;
  cepFeedback.textContent = texto;
}

async function buscarCep() {
  if (buscandoCep) return; // evita uma segunda busca enquanto a primeira não terminou
  const cep = somenteNumeros(cepInput.value);

  if (cep.length !== 8) {
    validarCampo(cepInput);
    mostrarCepFeedback("Digite um CEP com 8 números antes de buscar.", "feedback-erro");
    cepInput.focus();
    return;
  }

  buscandoCep = true;
  buscarCepButton.disabled = true;
  mostrarCepFeedback("Buscando CEP...");

  try {
    const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`, { signal: AbortSignal.timeout(8000) });
    if (!resposta.ok) throw new Error(`Resposta HTTP ${resposta.status}`);

    const dados = await resposta.json();
    if (dados.erro) {
      mostrarCepFeedback("CEP não encontrado. Confira os números ou preencha o endereço manualmente.", "feedback-erro");
      return;
    }

    document.querySelector("#logradouro").value = dados.logradouro ?? "";
    document.querySelector("#bairro").value = dados.bairro ?? "";
    document.querySelector("#cidade").value = dados.localidade ?? "";
    estadoInput.value = dados.uf ?? "";
    ["logradouro", "cidade", "estado"].forEach((id) => validarCampo(document.getElementById(id)));

    const incompleto = !dados.logradouro || !dados.localidade || !dados.uf;
    if (incompleto) {
      mostrarCepFeedback("Esse CEP não trouxe todos os dados. Complete os campos que ficaram vazios.", "text-secondary");
      document.querySelector(dados.logradouro ? "#cidade" : "#logradouro").focus();
    } else {
      mostrarCepFeedback("Endereço preenchido. Informe o número.", "feedback-sucesso");
      document.querySelector("#numero").focus();
    }
  } catch (erro) {
    console.error("Falha ao consultar o ViaCEP:", erro);
    mostrarCepFeedback("Não foi possível consultar o CEP agora. Verifique sua conexão ou preencha manualmente.", "feedback-erro");
  } finally {
    buscandoCep = false;
    buscarCepButton.disabled = false;
  }
}

// ---------- Conclusão ----------
function concluirCompra(event) {
  event.preventDefault();

  if (!validarTudo()) {
    formFeedback.className = "mt-3 feedback-erro";
    formFeedback.textContent = "Revise os campos destacados antes de concluir a compra.";
    return;
  }
  formFeedback.textContent = "";

  // Guardamos só o necessário para a página de sucesso.
  const concluido = {
    numero: `IMP-${Math.floor(100000 + Math.random() * 900000)}`,
    nome: document.querySelector("#nome").value.trim(),
    produtoId: pedidoAtual.produto.id,
    quantidade: pedidoAtual.quantidade,
    pagamento: document.querySelector("#pagamento").value,
    ...totais,
  };
  sessionStorage.setItem("pedidoConcluido", JSON.stringify(concluido));
  sessionStorage.removeItem("pedido");
  window.location.href = "sucesso.html";
}

// ---------- Início ----------
if (!pedidoAtual) {
  semPedido.hidden = false; // acesso direto ou pedido inválido
} else {
  preencherResumo(pedidoAtual);
  conteudo.hidden = false;

  aplicarMascara(cepInput, formatarCep);
  aplicarMascara(telefoneInput, formatarTelefone);
  estadoInput.addEventListener("input", () => { estadoInput.value = estadoInput.value.replace(/[^a-zA-Z]/g, "").toUpperCase(); });

  Object.keys(REGRAS_CAMPOS).forEach((id) => {
    const campo = document.getElementById(id);
    campo.addEventListener(campo.type === "checkbox" || campo.tagName === "SELECT" ? "change" : "blur", () => validarCampo(campo));
  });

  buscarCepButton.addEventListener("click", buscarCep);
  form.addEventListener("submit", concluirCompra);
}