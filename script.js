// 1. LÓGICA DE FILTROS DO CARDÁPIO
function filtrar(categoria) {
    const blocoVulcao = document.getElementById('categoria-vulcao');
    const blocoFesta = document.getElementById('categoria-festa');

    if (categoria === 'todos') {
        blocoVulcao.style.display = 'block';
        blocoFesta.style.display = 'block';
    } else if (categoria === 'vulcao') {
        blocoVulcao.style.display = 'block';
        blocoFesta.style.display = 'none';
    } else if (categoria === 'festa') {
        blocoVulcao.style.display = 'none';
        blocoFesta.style.display = 'block';
    }
}

// 2. LÓGICA DO CARRINHO DE COMPRAS
let carrinho = JSON.parse(localStorage.getItem('carrinhoAtelie')) || [];

function atualizarContador() {
    const contador = document.getElementById('contador-carrinho');
    if(contador) {
        // Soma a quantidade de todos os itens no carrinho
        const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);
        contador.innerText = totalItens;
    }
}

// Seleciona todos os botões "Adicionar +"
const botoesAdicionar = document.querySelectorAll('.btn-adicionar');

botoesAdicionar.forEach(botao => {
    botao.addEventListener('click', (event) => {
        const nomeProduto = event.target.getAttribute('data-nome');
        const precoProduto = parseFloat(event.target.getAttribute('data-preco'));

        // Verifica se o bolo já está no carrinho
        const itemExistente = carrinho.find(item => item.nome === nomeProduto);

        if (itemExistente) {
            itemExistente.quantidade += 1; // Se já tem, só aumenta a quantidade
        } else {
            carrinho.push({ nome: nomeProduto, preco: precoProduto, quantidade: 1 }); // Se não tem, adiciona
        }

        // Salva na memória do navegador e atualiza o número no menu
        localStorage.setItem('carrinhoAtelie', JSON.stringify(carrinho));
        atualizarContador();
        
        // Efeito visual rápido para confirmar
        event.target.innerText = "Adicionado ✔";
        event.target.style.backgroundColor = "#28a745"; // Fica verde
        setTimeout(() => {
            event.target.innerText = "Adicionar +";
            event.target.style.backgroundColor = "var(--cor-principal)"; // Volta a cor normal
        }, 1500);
    });
});

// Executa ao carregar a página
atualizarContador();