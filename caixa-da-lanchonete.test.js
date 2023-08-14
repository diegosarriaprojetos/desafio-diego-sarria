import { Cardapio, FormasDePagamento, CaixaDaLanchonete } from "./caixa-da-lanchonete.js";

const cardapio = [
{ codigo: 'cafe', descricao: 'Café', valor: 3.00 },
{ codigo: 'chantily', descricao: 'Chantily (extra do Café)', valor: 1.50 },
{ codigo: 'suco', descricao: 'Suco Natural', valor: 6.20 },
{ codigo: 'sanduiche', descricao: 'Sanduíche', valor: 6.50 },
{ codigo: 'queijo', descricao: 'Queijo (extra do Sanduíche)', valor: 2.00 },
{ codigo: 'salgado', descricao: 'Salgado', valor: 7.25 },
{ codigo: 'combo1', descricao: '1 Suco e 1 Sanduíche', valor: 9.50 },
{ codigo: 'combo2', descricao: '1 Café e 1 Sanduíche', valor: 7.50 }
];

const formasDePagamento = {
dinheiro: {
descricao: 'Dinheiro',
desconto: 5,
acrescimo: 0
},
debito: {
descricao: 'Débito',
desconto: 0,
acrescimo: 0
},
credito: {
descricao: 'Crédito',
desconto: 0,
acrescimo: 3
}
};

class CaixaDaLanchonete {
calcularValorDaCompra(formaDePagamento, itens) {
if (itens.length === 0) {
return 'Não há itens no carrinho de compra!';
}

const formaDePagamentoValida = FormasDePagamento.validarFormaDePagamento(formaDePagamento);
if (!formaDePagamentoValida) {
return 'Forma de pagamento inválida!';
}

let valorTotal = 0;

for (const item of itens) {
const [codigoItem, quantidade] = item.split(',');

const itemPrincipal = Cardapio.getItemPrincipal(codigoItem);
if (!itemPrincipal) {
return 'Item inválido!';
}

const valorItem = itemPrincipal.valor * quantidade;

if (Cardapio.isItemExtra(codigoItem)) {
const itemPrincipalCodigo = Cardapio.getItemPrincipalCodigo(codigoItem);
const itemPrincipalQuantidade = Cardapio.getQuantidadeItem(itens, itemPrincipalCodigo);

if (itemPrincipalQuantidade === 0) {
return 'Item extra não pode ser pedido sem o principal';
}
}

valorTotal += valorItem;
}

valorTotal = CaixaDaLanchonete.aplicarDescontoOuAcrescimo(formaDePagamento, valorTotal);

return `R$ ${valorTotal.toFixed(2)}`;
}

static aplicarDescontoOuAcrescimo(formaDePagamento, valorTotal) {
const formaDePagamentoInfo = FormasDePagamento.getFormaDePagamentoInfo(formaDePagamento);

const desconto = formaDePagamentoInfo.desconto;
const acrescimo = formaDePagamentoInfo.acrescimo;

let valorComDescontoOuAcrescimo = valorTotal;

if (desconto > 0) {
const valorDesconto = (desconto / 100) * valorTotal;
valorComDescontoOuAcrescimo -= valorDesconto;
}

if (acrescimo > 0) {
const valorAcrescimo = (acrescimo / 100) * valorTotal;
valorComDescontoOuAcrescimo += valorAcrescimo;
}

return valorComDescontoOuAcrescimo;
}
}

class Cardapio {
static getItemPrincipal(codigoItem) {
return cardapio.find(item => item.codigo === codigoItem && !Cardapio.isItemCombo(codigoItem));
}

static getItemPrincipalCodigo(codigoItem) {
const itemPrincipalCodigo = cardapio.find(item => item.codigo === codigoItem && !Cardapio.isItemCombo(codigoItem)).codigo;
return itemPrincipalCodigo;
}

static getQuantidadeItem(itens, codigoItem) {
const itemQuantidade = itens.find(item => item.split(',')[0] === codigoItem);
if (itemQuantidade) {
return itemQuantidade.split(',')[1];
}

return 0;
}

static isItemExtra(codigoItem) {
return !Cardapio.isItemCombo(codigoItem) && codigoItem !== Cardapio.getItemPrincipalCodigo(codigoItem);
}

static isItemCombo(codigoItem) {
return codigoItem === 'combo1' || codigoItem === 'combo2';
}
}

class FormasDePagamento {
static validarFormaDePagamento(formaDePagamento) {
return Object.keys(formasDePagamento).includes(formaDePagamento);
}

static getFormaDePagamentoInfo(formaDePagamento) {
return formasDePagamento[formaDePagamento];
}
}

export { CaixaDaLanchonete };

