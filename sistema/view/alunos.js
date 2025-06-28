document.addEventListener('DOMContentLoaded', async function() {
    const tabela = document.getElementById('tabelaAlunos').querySelector('tbody');
    const formAtividadeContainer = document.getElementById('formAtividadeContainer');
    const formAtividade = document.getElementById('formAtividade');
    const cancelarAtividade = document.getElementById('cancelarAtividade');
    const alunoIdAtividade = document.getElementById('alunoIdAtividade');
    const formAtividadeTitulo = document.getElementById('formAtividadeTitulo');
    let alunoSelecionado = null;

    // Buscar alunos e montar tabela
    try {
        const response = await fetch('/api/listar/aluno/0');
        if (response.ok) {
            const alunos = await response.json();
            if (alunos.length === 0) {
                tabela.innerHTML = '<tr><td colspan="3">Nenhum aluno cadastrado.</td></tr>';
            } else {
                tabela.innerHTML = '';
                alunos.forEach(aluno => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `<td>${aluno.nome}</td><td>${aluno.email}</td><td><button class="btn-registrar btn-mini" data-id="${aluno.id}" data-nome="${aluno.nome}">Cadastrar Atividade</button> <button class="btn-registrar btn-mini btn-tarefas" data-id="${aluno.id}" data-nome="${aluno.nome}">Ver Tarefas</button></td>`;
                    tabela.appendChild(tr);
                });
            }
        } else {
            tabela.innerHTML = '<tr><td colspan="3">Erro ao buscar alunos.</td></tr>';
        }
    } catch (error) {
        tabela.innerHTML = '<tr><td colspan="3">Erro ao conectar com o servidor.</td></tr>';
    }

    // Delegação de evento para botões de cadastrar atividade
    tabela.addEventListener('click', function(e) {
        if (e.target && e.target.matches('button[data-id]')) {
            if (e.target.classList.contains('btn-tarefas')) {
                // Redireciona para a tela de tarefas do aluno
                const alunoId = e.target.getAttribute('data-id');
                const nome = encodeURIComponent(e.target.getAttribute('data-nome'));
                window.location.href = `tarefas.html?alunoId=${alunoId}&nome=${nome}`;
                return;
            }
            alunoSelecionado = {
                id: e.target.getAttribute('data-id'),
                nome: e.target.getAttribute('data-nome')
            };
            alunoIdAtividade.value = alunoSelecionado.id;
            formAtividadeTitulo.textContent = `Cadastrar Atividade para ${alunoSelecionado.nome}`;
            formAtividadeContainer.style.display = 'block';
            window.scrollTo({ top: formAtividadeContainer.offsetTop - 40, behavior: 'smooth' });
        }
    });

    // Cancelar cadastro de atividade
    cancelarAtividade.addEventListener('click', function() {
        formAtividade.reset();
        formAtividadeContainer.style.display = 'none';
    });

    // Submissão do formulário de atividade
    formAtividade.addEventListener('submit', async function(e) {
        e.preventDefault();
        const btn = formAtividade.querySelector('.btn-registrar');
        btn.classList.add('loading');
        btn.textContent = 'Cadastrando...';

        const dados = {
            nome: document.getElementById('nomeAtividade').value,
            descricao: document.getElementById('descricaoAtividade').value,
            duracao: document.getElementById('duracaoAtividade').value,
            peso: document.getElementById('pesoAtividade').value,
            alunoId: alunoIdAtividade.value
        };

        try {
            const response = await fetch('/api/criar/atividade', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados)
            });
            if (response.ok) {
                alert('Atividade cadastrada com sucesso!');
                formAtividade.reset();
                formAtividadeContainer.style.display = 'none';
            } else {
                const erro = await response.json().catch(() => ({}));
                alert(erro.message || 'Erro ao cadastrar atividade.');
            }
        } catch (error) {
            alert('Erro ao conectar com o servidor.');
        } finally {
            btn.classList.remove('loading');
            btn.textContent = 'Cadastrar Atividade';
        }
    });
}); 