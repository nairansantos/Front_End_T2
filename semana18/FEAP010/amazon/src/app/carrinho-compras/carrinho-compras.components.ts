import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Item {
  Id: number;
  Name: string;
  Price: number;
  Quantity: number;
  imgURL: string;
}

@Component({
  selector: 'app-carrinho-compras',
  templateUrl: './carrinho-compras.components.html',
  styleUrls: ['./carrinho-compras.components.css']
})
export class CarrinhoComprasComponent implements OnInit {
  listaDeItens: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>([]);
  subtotal: { total: string, quantidade: number } = { total: 'R$ 0,00', quantidade: 0 };

  constructor() {}

  ngOnInit(): void {
    // Exemplos de produtos
    const produtos: Item[] = [
      { Id: 1, Name: 'Tablet Samsung ', Price: 2804, Quantity: 0, imgURL: 'https://a-static.mlcdn.com.br/90x90/tablet-samsung-galaxy-tab-s9-fe-wifi-128gb-8gb-ram-tela-imersiva-de-12-4/samsung/5455/4d01f7b1b8e87cce5a3b2d00559c7f56.jpeg' },
      { Id: 2, Name: 'Liquidificador Oster', Price: 257, Quantity: 0, imgURL: 'https://imgs.casasbahia.com.br/55012567/1g.jpg?imwidth=96' },
      { Id: 3, Name: 'Forno e Fryer 15L', Price: 759, Quantity: 0, imgURL: 'https://m.media-amazon.com/images/I/51KE9jaE-0L._AC_UF226,226_FMjpg_.jpg' },
      { Id: 4, Name: 'Aspirador de pó ', Price: 489, Quantity: 0, imgURL: 'https://m.media-amazon.com/images/I/61x+T0obo8L._AC_SX679_.jpg' },
      { Id: 5, Name: 'Apple iPhone 14', Price: 9499, Quantity: 0, imgURL: 'https://m.media-amazon.com/images/I/611mRs-imxL._AC_SX679_.jpg' },
      { Id: 6, Name: 'livro 2041', Price: 43.00, Quantity: 0, imgURL: 'https://images-na.ssl-images-amazon.com/images/I/71FYolqY2iL._AC_UL232_SR232,232_.jpg' },
    ];

    // Inicializa a lista de itens no carrinho com os produtos
    this.listaDeItens.next(produtos);

    // Inicializa o subtotal como zero
    this.subtotal = { total: 'R$ 0,00', quantidade: 0 };
  }

  adicionarAoCarrinho(item: Item) {
    const itensAtuais = this.listaDeItens.getValue();
    this.listaDeItens.next([...itensAtuais, item]);
    this.subtotal = this.calcularSubtotal([...itensAtuais, item]);
  }

  calcularSubtotal(itens: Item[]): { total: string, quantidade: number } {
    let total = 0;
    let quantidade = 0;
    itens.forEach(item => {
      total += item.Price * item.Quantity;
      quantidade += item.Quantity;
    });
    return { total: this.formatarMoeda(total), quantidade };
  }

  removerItemDoCarrinho(index: number) {
    const itensAtuais = this.listaDeItens.getValue();
    itensAtuais.splice(index, 1);
    this.listaDeItens.next(itensAtuais);
    this.subtotal = this.calcularSubtotal(itensAtuais);
  }

  aumentarQuantidade(index: number) {
    const itensAtuais = this.listaDeItens.getValue();
    itensAtuais[index].Quantity++;
    this.listaDeItens.next(itensAtuais);
    this.subtotal = this.calcularSubtotal(itensAtuais);
  }

  diminuirQuantidade(index: number) {
    const itensAtuais = this.listaDeItens.getValue();
    if (itensAtuais[index].Quantity > 0) {
      itensAtuais[index].Quantity--;
    }
    this.listaDeItens.next(itensAtuais);
    this.subtotal = this.calcularSubtotal(itensAtuais);
  }

  formatarMoeda(valor: number): string {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }
}