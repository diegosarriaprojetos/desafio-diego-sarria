class CaixaDaLanchonete {
    calcularValorDaCompra(metodoDePagamento, itens) {
        
        let valorTotal = 0;
        for (let item of itens) {
            valorTotal += item.preco;
        }
        
        return valorTotal;
    }
}

export { CaixaDaLanchonete };
