// Catálogo único da loja: todas as páginas leem os produtos daqui.

const REGRAS = [
  "Cabe no bolso",
  "Não cabe em um avião",
  "Uso no espaço sideral",
  "Serve em uma formiga",
  "Começa com Z",
  "Uso único",
];

const PRODUTOS = [
  {
    id: 1,
    nome: "Zumbilume",
    categoria: "Iluminação onírica",
    preco: 79.9,
    regras: ["Começa com Z", "Uso único"],
    emoji: "💤",
    alt: "Ilustração de um símbolo de sono, que representa o Zumbilume",
    cor: "primary",
    curta: "Ilumina um sonho inteiro, uma única vez.",
    longa: "Uma pequena lâmpada de vidro leitoso que acende dentro do sonho de quem dorme por perto. Depois de uma noite de brilho, apaga para sempre e vira um enfeite perolado.",
    detalhes: ["Ilumina um único sonho por unidade", "Apaga sozinho ao amanhecer", "Vem 1 unidade por embalagem"],
    material: "Vidro leitoso e luz de sonho",
    dimensoes: "6 cm de altura",
    uso: "Deixe na mesa de cabeceira antes de dormir.",
  },
  {
    id: 2,
    nome: "Guarda-chuva Pré-Pingo",
    categoria: "Clima",
    preco: 129.0,
    regras: ["Cabe no bolso"],
    emoji: "☂️",
    alt: "Ilustração de um guarda-chuva aberto",
    cor: "info",
    curta: "Abre sozinho onde a chuva vai cair.",
    longa: "Dobrado, tem o tamanho de uma caneta. Dez segundos antes da chuva, ele prevê o ponto exato onde os pingos vão cair e abre sobre você.",
    detalhes: ["Previsão de chuva com 10 segundos de antecedência", "Cabe em qualquer bolso", "Alça com trava de segurança"],
    material: "Nylon impermeável e hastes de fibra",
    dimensoes: "Fechado: 12 cm. Aberto: 90 cm",
    uso: "Aponte para o céu e aperte o cabo duas vezes.",
  },
  {
    id: 3,
    nome: "Estação Astro-Formiga",
    categoria: "Hospedagem espacial",
    preco: 249.9,
    regras: ["Serve em uma formiga", "Uso no espaço sideral"],
    emoji: "🐜",
    alt: "Ilustração de uma formiga, hóspede da Estação Astro-Formiga",
    cor: "success",
    curta: "Uma estação de descanso para formigas astronautas.",
    longa: "Um módulo minúsculo com cama, janela panorâmica e gravidade artificial na medida de uma formiga. Feito para descansar entre uma missão e outra em órbita.",
    detalhes: ["Gravidade artificial em escala de formiga", "Janela com vista para a Terra", "Resistente a radiação cósmica"],
    material: "Alumínio ultraleve e gel de descanso",
    dimensoes: "2 mm × 1 mm",
    uso: "Acomode a formiga e lance a estação em órbita.",
  },
  {
    id: 4,
    nome: "Jardim Flutuante Cirrus",
    categoria: "Jardinagem aérea",
    preco: 8990.0,
    regras: ["Não cabe em um avião"],
    emoji: "🎈",
    alt: "Ilustração de balões que sustentam um jardim no ar",
    cor: "warning",
    curta: "Um jardim maior que um avião, pairando no céu.",
    longa: "Um jardim inteiro suspenso por balões de hélio e raízes de nuvem. Tem gramado, canteiros e um banco para olhar a paisagem lá de cima.",
    detalhes: ["Sustentado por 40 balões de hélio", "Rega automática com água de nuvem", "Âncora para pouso em terreno aberto"],
    material: "Solo leve, raízes de nuvem e balões de hélio",
    dimensoes: "42 m de largura",
    uso: "Ancore em um terreno aberto e solte os cabos.",
  },
];

function formatarPreco(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// Retorna o produto com o id informado ou undefined se não existir.
function buscarProduto(id) {
  return PRODUTOS.find((produto) => produto.id === Number(id));
}

// Regra de frete da loja: grátis a partir de R$ 200,00; abaixo disso, valor fixo.
const FRETE_GRATIS_A_PARTIR_DE = 200;
const VALOR_FRETE = 19.9;

function calcularFrete(subtotal) {
  return subtotal >= FRETE_GRATIS_A_PARTIR_DE ? 0 : VALOR_FRETE;
}

const FORMAS_PAGAMENTO = { pix: "Pix", credito: "Cartão de crédito", boleto: "Boleto" };