// Variável que guarda a lista de produtos escolhidos
let carrinho = [];

// Função disparada ao clicar no botão "Adicionar"
function adicionarAoCarrinho(nome, preco) {
    // Adiciona o item na lista do carrinho
    carrinho.push({ nome: nome, preco: preco });
    
    // Atualiza o visual da sacola e o número do contador
    atualizarCarrinho();
    
    // Feedback visual opcional: avisa que foi adicionado e abre a sacola
    abrirCarrinho();
}

// Controla o abrir e fechar do painel lateral
function abrirCarrinho() {
    document.getElementById('painel-carrinho').classList.add('aberto');
}

function fecharCarrinho() {
    document.getElementById('painel-carrinho').classList.remove('aberto');
}

// Atualiza o HTML dentro do carrinho com os itens e o total
function atualizarCarrinho() {
    const divItens = document.getElementById('itens-carrinho');
    const spanContador = document.getElementById('contador-carrinho');
    const spanTotal = document.getElementById('total-carrinho');
    
    divItens.innerHTML = '';
    let total = 0;

    if (carrinho.length === 0) {
        divItens.innerHTML = '<p>Sua sacola está vazia.</p>';
    } else {
        carrinho.forEach((item, index) => {
            total += item.preco;
            let precoFormatado = item.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            
            // Aqui adicionamos o botão de remover chamando a função com o (index)
            divItens.innerHTML += `
                <div class="item-carrinho">
                    <div>
                        <button class="btn-remover" onclick="removerDoCarrinho(${index})">🗑️</button>
                        <span>${item.nome}</span>
                    </div>
                    <span>${precoFormatado}</span>
                </div>
            `;
        });
    }

    spanContador.innerText = carrinho.length;
    spanTotal.innerText = total.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
}

// A MÁGICA: Gera a mensagem e abre o WhatsApp
function enviarParaWhatsApp() {
    if (carrinho.length === 0) {
        alert('Adicione algum bolo na sacola antes de finalizar!');
        return;
    }

    // O telefone deve conter o código do país (55) + DDD + número
    const telefoneAtelie = "9292650030"; 
    
    let texto = "Olá! Gostaria de fazer a seguinte encomenda:%0A%0A";
    let totalPedido = 0;

    carrinho.forEach(item => {
        texto += `- 1x ${item.nome}%0A`;
        totalPedido += item.preco;
    });

    let totalFormatado = totalPedido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    texto += `%0A*Total do Pedido: ${totalFormatado}*`;

    // Cria o link final e abre em uma nova aba
    const linkWhatsApp = `https://wa.me/${telefoneAtelie}?text=${texto}`;
    window.open(linkWhatsApp, '_blank');
}
// Função para remover um item específico pelo índice (posição dele na lista)
function removerDoCarrinho(index) {
    // O comando splice remove 1 item na posição 'index'
    carrinho.splice(index, 1);
    
    // Atualiza a tela para mostrar que o item sumiu
    atualizarCarrinho();
}