// ==========================================
// 1. MENU MOBILE (Navegação Responsiva)
// ==========================================
const btnMobile = document.getElementById('btn-mobile');
const nav = document.getElementById('nav');
const linksMenu = document.querySelectorAll('#menu a');

// Função que abre e fecha o menu
function toggleMenu(event) {
    if (event.type === 'touchstart') event.preventDefault();
    nav.classList.toggle('active');
}

if (btnMobile) {
    btnMobile.addEventListener('click', toggleMenu);
    btnMobile.addEventListener('touchstart', toggleMenu);
}

// Faz o menu fechar sozinho quando o usuário clica em um link
linksMenu.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
    });
});

// ==========================================
// 2. LÓGICA DO CARRINHO DE COMPRAS
// ==========================================
let carrinho = JSON.parse(localStorage.getItem('carrinhoAtelie')) || [];

function atualizarContador() {
    const contador = document.getElementById('contador-carrinho');
    if(contador) {
        const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);
        contador.innerText = totalItens;
    }
}

// Adiciona produtos e atualiza a interface
function adicionarAoCarrinho(nomeProduto, precoProduto) {
    const itemExistente = carrinho.find(item => item.nome === nomeProduto);

    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        carrinho.push({ nome: nomeProduto, preco: precoProduto, quantidade: 1 });
    }

    localStorage.setItem('carrinhoAtelie', JSON.stringify(carrinho));
    atualizarContador();
    renderizarCarrinho(); 
}

// ==========================================
// 3. ABRIR E FECHAR A GAVETA DO CARRINHO
// ==========================================
function abrirCarrinho() {
    document.getElementById('painel-carrinho').classList.add('aberto');
}

function fecharCarrinho() {
    document.getElementById('painel-carrinho').classList.remove('aberto');
}

// ==========================================
// 4. DESENHO DA GAVETA E FINALIZAÇÃO NO WHATSAPP
// ==========================================
function renderizarCarrinho() {
    const divItens = document.getElementById('itens-carrinho');
    const spanTotal = document.getElementById('total-carrinho');
    
    if(!divItens || !spanTotal) return;

    divItens.innerHTML = ''; 
    let valorTotal = 0;

    carrinho.forEach((item, index) => {
        valorTotal += item.preco * item.quantidade;
        
        divItens.innerHTML += `
            <div class="item-carrinho">
                <div class="item-esquerda">
                    <span class="item-qtd">${item.quantidade}x</span>
                    <span class="item-nome">${item.nome}</span>
                </div>
                <div class="item-direita">
                    <span class="item-preco">R$ ${(item.preco * item.quantidade).toFixed(2).replace('.', ',')}</span>
                    <button class="btn-remover" onclick="removerItem(${index})">&times;</button>
                </div>
            </div>
        `;
    });

    spanTotal.innerText = valorTotal.toFixed(2).replace('.', ',');
}

// Remove bolo do carrinho
function removerItem(index) {
    carrinho.splice(index, 1);
    localStorage.setItem('carrinhoAtelie', JSON.stringify(carrinho));
    atualizarContador();
    renderizarCarrinho();
}

// Envia dados formatados para o WhatsApp
function enviarParaWhatsApp() {
    if (carrinho.length === 0) {
        alert("Sua sacola está vazia. Escolha um bolo primeiro!");
        return;
    }
    
    let textoFinal = "Olá, Ateliê Doce Sabor! Gostaria de fazer o seguinte pedido:\n\n";
    let total = 0;
    
    carrinho.forEach(item => {
        textoFinal += `*${item.quantidade}x* ${item.nome} - R$ ${(item.preco * item.quantidade).toFixed(2).replace('.', ',')}\n`;
        total += item.preco * item.quantidade;
    });
    
    textoFinal += `\n*Total: R$ ${total.toFixed(2).replace('.', ',')}*`;
    
    // Troque pelo número real da doceria depois
    const numeroWhatsApp = "5592900000000"; 
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(textoFinal)}`;
    
    window.open(url, '_blank');
}

// ==========================================
// 5. LÓGICA DO MODAL (FOTO AMPLIADA)
// ==========================================
function abrirModal(caminhoDaImagem) {
    document.getElementById('img-ampliada').src = caminhoDaImagem;
    document.getElementById('modal-produto').style.display = 'flex';
}

function fecharModal() {
    document.getElementById('modal-produto').style.display = 'none';
}

// ==========================================
// 6. LÓGICA DE FILTROS DO CARDÁPIO
// ==========================================
function filtrar(categoria) {
    const blocoVulcao = document.getElementById('categoria-vulcao');
    const blocoFesta = document.getElementById('categoria-festa');

    if(!blocoVulcao || !blocoFesta) return; 

    if (categoria === 'todos') {
        blocoVulcao.style.display = 'flex';
        blocoFesta.style.display = 'flex';
    } else if (categoria === 'vulcao') {
        blocoVulcao.style.display = 'flex';
        blocoFesta.style.display = 'none';
    } else if (categoria === 'festa') {
        blocoVulcao.style.display = 'none';
        blocoFesta.style.display = 'flex';
    }
}

// ==========================================
// 7. INICIALIZAÇÃO
// ==========================================
atualizarContador();
renderizarCarrinho();