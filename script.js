let produtos = [];

function buscarProdutos() {
    fetch("https://fakestoreapi.com/products")
    .then((response) => {return response.json()})
    .then((response) => {
        console.log(response);
        produtos = response;
        carregarProdutos(produtos);
    })
}
buscarProdutos(produtos);

function carregarProdutos(listasProdutos = []) {
    let cards = document.querySelector("#cards");
    cards.innerHTML = "";

    // O map vai transformar cada objeto da lista numa string HTML
    listasProdutos.map((produto) => {
        // colocar o card aqui
        cards.innerHTML += `
        <div class="bg-white rounded p-4">
                <div class="relative">
                    <img src="${produto.image}" alt=""
                        class="w-full h-55 object-contain">
                    <div class="p-2 bg-orange-500 text-white font-bold absolute top-3 right-3 rounded">${produto.rating.rate}</div>
                </div>
                <!-- textos do card -->
                <div>
                    <h2 class="font-semibold text-xl line-clamp-1">${produto.title}</h2>
                    <h6 class="font-bold">${produto.category}</h6>
                    <h6 class="text-right text-2xl"> R$ ${produto.price.toFixed(2)}</h6>
                </div>
            </div>`;
    });
}

function filtrarProdutos(categoria) {
    if (categoria != "All") {
        let produtosFiltrados = produtos.filter((produto) => {
            return produto.category == categoria;
        });
        carregarProdutos(produtosFiltrados);
    } else {
        carregarProdutos(produtos);
    }
}

function ordenarProdutos(ordem) {
    console.log(ordem);
    let produtosOrdenados = [];
    if (ordem == "preco") {
        produtosOrdenados = produtos.toSorted((prodA, prodB) => {
            return prodA.price - prodB.price;
        });
    } else {
        produtosOrdenados = produtos.toSorted((prodA, prodB) => {
            return prodB.rating.rate - prodA.rating.rate;
        });
    };
    carregarProdutos(produtosOrdenados)
}

function pesquisarProdutos(texto) {

    if (texto.length == 0) {
        carregarProdutos(produtos);
        return;
    }
    if (texto.length >= 3) {
        let produtosEncontrados = produtos.filter((produto) => {
            return produto.title.toLowerCase().includes(texto.toLowerCase());
        });
        carregarProdutos(produtosEncontrados);
    }
}
