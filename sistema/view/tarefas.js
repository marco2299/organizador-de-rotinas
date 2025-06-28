document.addEventListener('DOMContentLoaded', function() {
    // Utilidades para pegar parâmetros da URL
    function getParam(name) {
        const url = new URL(window.location.href);
        return url.searchParams.get(name);
    }
    const alunoId = getParam('alunoId');
    const alunoNome = decodeURIComponent(getParam('nome') || '');
    document.getElementById('alunoNome').textContent = `Tarefas Registradas - ${alunoNome}`;

    const tabela = document.getElementById('tabelaTarefas').querySelector('tbody');
    const btnNovaAtividade = document.getElementById('btnNovaAtividade');
    const formAtividadeContainer = document.getElementById('formAtividadeContainer');
    const formAtividade = document.getElementById('formAtividade');
    const cancelarAtividade = document.getElementById('cancelarAtividade');
    const atividadeIdInput = document.getElementById('atividadeId');

    let modoEdicao = false;

    async function carregarTarefas() {
        tabela.innerHTML = '<tr><td colspan="5">Carregando...</td></tr>';
        // Buscar todas as atividades do aluno
        const atividades = await fetch(`/api/atividades/aluno/${alunoId}`)
            .then(res => res.json())
            .then(arr => Array.isArray(arr) ? arr : []);
        // Buscar todas as associações de rotinaatividade do aluno
        const rotinaAtividades = await fetch(`/api/rotinaatividades/aluno/${alunoId}`)
            .then(res => res.json())
            .then(arr => Array.isArray(arr) ? arr : []);
        // IDs das atividades já associadas a alguma rotina
        const idsAssociadas = new Set(rotinaAtividades.map(ra => ra.atividadeId));
        // Filtrar apenas as atividades não associadas
        const atividadesNaoAssociadas = atividades.filter(atv => !idsAssociadas.has(atv.id));
        if (atividadesNaoAssociadas.length === 0) {
            tabela.innerHTML = '<tr><td colspan="5">Nenhuma atividade registrada.</td></tr>';
        } else {
            tabela.innerHTML = '';
            atividadesNaoAssociadas.forEach(atividade => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${atividade.nome}</td>
                    <td>${atividade.descricao}</td>
                    <td>${atividade.duracao}</td>
                    <td>${atividade.peso}</td>
                    <td>
                        <button class="btn-registrar btn-mini btn-editar" data-id="${atividade.id}">Editar</button>
                        <button class="btn-registrar btn-mini btn-remover" data-id="${atividade.id}">Remover</button>
                    </td>
                `;
                tabela.appendChild(tr);
            });
        }
    }

    carregarTarefas();

    btnNovaAtividade.addEventListener('click', function() {
        modoEdicao = false;
        formAtividade.reset();
        atividadeIdInput.value = '';
        formAtividadeContainer.style.display = 'block';
        document.getElementById('formAtividadeTitulo').textContent = 'Cadastrar Nova Atividade';
    });

    cancelarAtividade.addEventListener('click', function() {
        formAtividade.reset();
        formAtividadeContainer.style.display = 'none';
    });

    tabela.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-editar')) {
            // Buscar dados da atividade e preencher o formulário
            const id = e.target.getAttribute('data-id');
            fetch(`/api/buscar/atividade/${id}`)
                .then(res => res.json())
                .then(atividade => {
                    atividadeIdInput.value = atividade.id;
                    document.getElementById('nomeAtividade').value = atividade.nome;
                    document.getElementById('descricaoAtividade').value = atividade.descricao;
                    document.getElementById('duracaoAtividade').value = atividade.duracao;
                    document.getElementById('pesoAtividade').value = atividade.peso;
                    formAtividadeContainer.style.display = 'block';
                    document.getElementById('formAtividadeTitulo').textContent = 'Editar Atividade';
                    modoEdicao = true;
                });
        } else if (e.target.classList.contains('btn-remover')) {
            if (confirm('Deseja realmente remover esta atividade?')) {
                const id = e.target.getAttribute('data-id');
                fetch(`/api/deletar/atividade/${id}`, { method: 'DELETE' })
                    .then(res => res.json())
                    .then(() => carregarTarefas());
            }
        }
    });

    formAtividade.addEventListener('submit', function(e) {
        e.preventDefault();
        const btn = formAtividade.querySelector('.btn-registrar');
        btn.classList.add('loading');
        btn.textContent = 'Salvando...';
        const dados = {
            nome: document.getElementById('nomeAtividade').value,
            descricao: document.getElementById('descricaoAtividade').value,
            duracao: document.getElementById('duracaoAtividade').value,
            peso: document.getElementById('pesoAtividade').value,
            alunoId: alunoId
        };
        let url = '/api/criar/atividade';
        let method = 'POST';
        if (modoEdicao && atividadeIdInput.value) {
            url = `/api/atualizar/atividade/${atividadeIdInput.value}`;
            method = 'PUT';
        }
        fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        })
        .then(res => res.json())
        .then(() => {
            formAtividade.reset();
            formAtividadeContainer.style.display = 'none';
            carregarTarefas();
        })
        .catch(() => alert('Erro ao salvar atividade.'))
        .finally(() => {
            btn.classList.remove('loading');
            btn.textContent = 'Salvar';
        });
    });

    // ROTINAS
    const tabelaRotinas = document.getElementById('tabelaRotinas').querySelector('tbody');
    const btnNovaRotina = document.getElementById('btnNovaRotina');
    const formRotinaContainer = document.getElementById('formRotinaContainer');
    const formRotina = document.getElementById('formRotina');
    const cancelarRotina = document.getElementById('cancelarRotina');
    const rotinaIdInput = document.getElementById('rotinaId');
    let modoEdicaoRotina = false;

    function carregarRotinas() {
        tabelaRotinas.innerHTML = '<tr><td colspan="3">Carregando...</td></tr>';
        fetch(`/api/rotinas/aluno/${alunoId}`)
            .then(res => res.json())
            .then(rotinas => {
                if (!rotinas || rotinas.length === 0) {
                    tabelaRotinas.innerHTML = '<tr><td colspan="3">Nenhuma rotina registrada.</td></tr>';
                } else {
                    tabelaRotinas.innerHTML = '';
                    rotinas.forEach(rotina => {
                        const tr = document.createElement('tr');
                        tr.innerHTML = `
                            <td>${rotina.nome}</td>
                            <td>${rotina.descricao}</td>
                            <td>
                                <button class="btn-registrar btn-mini btn-editar-rotina" data-id="${rotina.id}">Editar</button>
                                <button class="btn-registrar btn-mini btn-remover-rotina" data-id="${rotina.id}">Remover</button>
                                <button class="btn-registrar btn-mini btn-horario-rotina" data-id="${rotina.id}" data-nome="${rotina.nome}">Ajustar Horário</button>
                                <button class="btn-registrar btn-mini btn-gerar-rotina" data-id="${rotina.id}">Gerar Rotina</button>
                                <button class="btn-registrar btn-mini btn-visualizar-rotina" data-id="${rotina.id}" data-nome="${rotina.nome}">Visualizar Rotina</button>
                            </td>
                        `;
                        tabelaRotinas.appendChild(tr);
                    });
                }
            })
            .catch(() => {
                tabelaRotinas.innerHTML = '<tr><td colspan="3">Erro ao buscar rotinas.</td></tr>';
            });
    }
    carregarRotinas();

    btnNovaRotina.addEventListener('click', function() {
        modoEdicaoRotina = false;
        formRotina.reset();
        rotinaIdInput.value = '';
        formRotinaContainer.style.display = 'block';
        document.getElementById('formRotinaTitulo').textContent = 'Cadastrar Nova Rotina';
    });

    cancelarRotina.addEventListener('click', function() {
        formRotina.reset();
        formRotinaContainer.style.display = 'none';
    });

    tabelaRotinas.addEventListener('click', async function(e) {
        if (e.target.classList.contains('btn-editar-rotina')) {
            const id = e.target.getAttribute('data-id');
            fetch(`/api/buscar/rotina/${id}`)
                .then(res => res.json())
                .then(rotina => {
                    rotinaIdInput.value = rotina.id;
                    document.getElementById('nomeRotina').value = rotina.nome;
                    document.getElementById('descricaoRotina').value = rotina.descricao;
                    formRotinaContainer.style.display = 'block';
                    document.getElementById('formRotinaTitulo').textContent = 'Editar Rotina';
                    modoEdicaoRotina = true;
                });
        } else if (e.target.classList.contains('btn-remover-rotina')) {
            if (confirm('Deseja realmente remover esta rotina?')) {
                const id = e.target.getAttribute('data-id');
                fetch(`/api/deletar/rotina/${id}`, { method: 'DELETE' })
                    .then(res => res.json())
                    .then(() => carregarRotinas());
            }
        } else if (e.target.classList.contains('btn-horario-rotina')) {
            // Abrir formulário de horários
            const id = e.target.getAttribute('data-id');
            const nome = e.target.getAttribute('data-nome');
            document.getElementById('rotinaIdHorario').value = id;
            document.getElementById('formHorarioTitulo').textContent = `Ajustar Horário da Rotina: ${nome}`;
            document.getElementById('formHorario').reset();
            document.getElementById('formHorarioContainer').style.display = 'block';
            // Buscar horários já cadastrados para a rotina
            fetch(`/api/rotinadias/rotina/${id}`)
                .then(res => res.json())
                .then(async rotinasDias => {
                    if (Array.isArray(rotinasDias)) {
                        // Buscar todas as disponibilidades desses rotinaDias
                        const disponibilidadeMap = {};
                        await Promise.all(rotinasDias.map(async rd => {
                            const disp = await fetch(`/api/buscar/disponibilidade/${rd.id}`)
                                .then(res => res.ok ? res.json() : null)
                                .catch(() => null);
                            if (disp && disp.horaInicio && disp.horaFim) {
                                disponibilidadeMap[rd.diaSemana] = { ...disp, rotinaDiaId: rd.id };
                            }
                        }));
                        // Preencher campos
                        const dias = [
                            { nome: 'segunda', valor: 1 },
                            { nome: 'terca', valor: 2 },
                            { nome: 'quarta', valor: 3 },
                            { nome: 'quinta', valor: 4 },
                            { nome: 'sexta', valor: 5 },
                            { nome: 'sabado', valor: 6 },
                            { nome: 'domingo', valor: 0 }
                        ];
                        dias.forEach(dia => {
                            const disp = disponibilidadeMap[dia.valor];
                            if (disp) {
                                if (document.querySelector(`[name=horaInicio-${dia.nome}]`)) {
                                    // Formatar para HH:MM
                                    const horaInicio = disp.horaInicio ? disp.horaInicio.slice(0,5) : '';
                                    const horaFim = disp.horaFim ? disp.horaFim.slice(0,5) : '';
                                    document.querySelector(`[name=horaInicio-${dia.nome}]`).value = horaInicio;
                                    document.querySelector(`[name=horaFim-${dia.nome}]`).value = horaFim;
                                    document.querySelector(`[name=horaInicio-${dia.nome}]`).setAttribute('data-disp-id', disp.id);
                                }
                            } else {
                                if (document.querySelector(`[name=horaInicio-${dia.nome}]`)) {
                                    document.querySelector(`[name=horaInicio-${dia.nome}]`).removeAttribute('data-disp-id');
                                }
                            }
                        });
                    }
                });
        } else if (e.target.classList.contains('btn-gerar-rotina')) {
            const rotinaId = e.target.getAttribute('data-id');
            // 1. Buscar atividades não associadas a rotina
            const atividades = await fetch(`/api/atividades/aluno/${alunoId}`)
                .then(res => res.json())
                .then(arr => Array.isArray(arr) ? arr : []);
            // 2. Buscar rotinaDias e disponibilidades
            const rotinaDias = await fetch(`/api/rotinadias/rotina/${rotinaId}`)
                .then(res => res.json())
                .then(arr => Array.isArray(arr) ? arr : []);
            // Mapa de tempo disponível por dia
            const tempoDisponivel = {};
            for (const rd of rotinaDias) {
                const disp = await fetch(`/api/buscar/disponibilidade/${rd.id}`)
                    .then(res => res.ok ? res.json() : null);
                if (disp && disp.horaInicio && disp.horaFim) {
                    // Calcular minutos disponíveis
                    const [h1, m1] = disp.horaInicio.split(':').map(Number);
                    const [h2, m2] = disp.horaFim.split(':').map(Number);
                    let minutos = (h2*60 + m2) - (h1*60 + m1);
                    tempoDisponivel[rd.id] = { minutos, diaSemana: rd.diaSemana, inicio: disp.horaInicio, fim: disp.horaFim };
                }
            }
            // 3. Ordenar atividades por peso (desc) e duração (desc)
            atividades.sort((a, b) => b.peso - a.peso || b.duracao - a.duracao);
            // 4. Alocar atividades
            const alocadas = [];
            for (const atv of atividades) {
                let alocou = false;
                // Tenta alocar em qualquer dia com tempo suficiente
                for (const [rotinaDiaId, info] of Object.entries(tempoDisponivel)) {
                    if (info.minutos >= atv.duracao) {
                        // Associa atividade à rotina
                        await fetch('/api/criar/rotinaatividade', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ rotinaDiaId, atividadeId: atv.id, horaInicio: info.inicio })
                        });
                        tempoDisponivel[rotinaDiaId].minutos -= atv.duracao;
                        alocadas.push(atv.id);
                        alocou = true;
                        break;
                    }
                }
            }
            // 5. Atualizar interface: recarregar tarefas
            carregarTarefas();
            alert('Rotina gerada! Atividades alocadas: ' + alocadas.length + '\nAtividades não alocadas permanecem no quadro.');
        } else if (e.target.classList.contains('btn-visualizar-rotina')) {
            const rotinaId = e.target.getAttribute('data-id');
            const nomeRotina = e.target.getAttribute('data-nome');
            document.getElementById('tituloModalRotina').textContent = `Rotina: ${nomeRotina}`;
            const quadro = document.getElementById('quadroRotina');
            quadro.innerHTML = '<p>Carregando...</p>';
            document.getElementById('modalVisualizarRotina').style.display = 'flex';
            // Buscar rotinaDias
            const rotinaDias = await fetch(`/api/rotinadias/rotina/${rotinaId}`)
                .then(res => res.json())
                .then(arr => Array.isArray(arr) ? arr : []);
            // Buscar atividades alocadas por rotinaDia
            const diasSemana = [
                { nome: 'Segunda', valor: 1 },
                { nome: 'Terça', valor: 2 },
                { nome: 'Quarta', valor: 3 },
                { nome: 'Quinta', valor: 4 },
                { nome: 'Sexta', valor: 5 },
                { nome: 'Sábado', valor: 6 },
                { nome: 'Domingo', valor: 0 }
            ];
            let html = '<div style="display:flex; gap:16px; flex-wrap:wrap;">';
            for (const dia of diasSemana) {
                const rotinaDia = rotinaDias.find(rd => rd.diaSemana == dia.valor);
                html += `<div style="flex:1 1 180px; min-width:160px; background:#f8f9fa; border-radius:8px; padding:12px; margin-bottom:12px;">
                    <strong>${dia.nome}</strong><br/>`;
                if (rotinaDia) {
                    // Buscar atividades alocadas nesse dia
                    const atividades = await fetch(`/api/rotinaatividades/rotinadia/${rotinaDia.id}`)
                        .then(res => res.json())
                        .then(arr => Array.isArray(arr) ? arr : []);
                    if (atividades.length > 0) {
                        atividades.forEach(ra => {
                            html += `<div class=\"atividade-alocada\" data-id=\"${ra.atividadeId || ra.id}\" style=\"margin:8px 0; padding:6px; background:#fff; border-radius:6px; box-shadow:0 1px 2px #0001; cursor:pointer;\">
                                <span style=\"font-weight:500;\">${ra.nome || ra.Atividade?.nome || 'Atividade'}</span><br/>
                                <span style=\"font-size:0.95em; color:#555;\">Início: ${ra.horaInicio ? ra.horaInicio.slice(0,5) : '--:--'}</span>
                            </div>`;
                        });
                    } else {
                        html += '<span style="color:#888; font-size:0.95em;">Nenhuma atividade alocada</span>';
                    }
                } else {
                    html += '<span style="color:#888; font-size:0.95em;">Nenhuma rotina para este dia</span>';
                }
                html += '</div>';
            }
            html += '</div>';
            quadro.innerHTML = html;
            // Adicionar evento de clique nas atividades alocadas
            quadro.querySelectorAll('.atividade-alocada').forEach(div => {
                div.onclick = async function() {
                    const atividadeId = this.getAttribute('data-id');
                    const detalheDiv = document.getElementById('detalheAtividade');
                    detalheDiv.innerHTML = '<p>Carregando...</p>';
                    document.getElementById('modalDetalheAtividade').style.display = 'flex';
                    // Buscar detalhes da atividade
                    const atividade = await fetch(`/api/buscar/atividade/${atividadeId}`)
                        .then(res => res.json());
                    detalheDiv.innerHTML = `
                        <strong>Nome:</strong> ${atividade.nome}<br/>
                        <strong>Descrição:</strong> ${atividade.descricao}<br/>
                        <strong>Duração:</strong> ${atividade.duracao} min<br/>
                        <strong>Peso:</strong> ${atividade.peso}
                    `;
                };
            });
        }
    });

    document.getElementById('cancelarHorario').addEventListener('click', function() {
        document.getElementById('formHorario').reset();
        document.getElementById('formHorarioContainer').style.display = 'none';
    });

    document.getElementById('formHorario').addEventListener('submit', async function(e) {
        e.preventDefault();
        const rotinaId = document.getElementById('rotinaIdHorario').value;
        const dias = [
            { nome: 'segunda', valor: 1 },
            { nome: 'terca', valor: 2 },
            { nome: 'quarta', valor: 3 },
            { nome: 'quinta', valor: 4 },
            { nome: 'sexta', valor: 5 },
            { nome: 'sabado', valor: 6 },
            { nome: 'domingo', valor: 0 }
        ];
        const horarios = dias.map(dia => ({
            rotinaId,
            diaSemana: dia.nome,
            diaSemanaInt: dia.valor,
            horaInicio: document.querySelector(`[name=horaInicio-${dia.nome}]`).value,
            horaFim: document.querySelector(`[name=horaFim-${dia.nome}]`).value,
            dispId: document.querySelector(`[name=horaInicio-${dia.nome}]`).getAttribute('data-disp-id')
        }));

        async function getOrCreateRotinaDia(rotinaId, diaSemana, diaSemanaInt) {
            let rotinaDia = await fetch(`/api/rotinadias/rotina/${rotinaId}`)
                .then(res => res.json())
                .then(rotinasDias => (rotinasDias || []).find(rd => rd.diaSemana == diaSemanaInt));
            if (rotinaDia) return rotinaDia.id;
            rotinaDia = await fetch('/api/criar/rotinadia', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ rotinaId, diaSemana: diaSemanaInt })
            }).then(res => res.json());
            return rotinaDia.data.id;
        }

        try {
            for (const h of horarios) {
                if (h.horaInicio && h.horaFim) {
                    const rotinaDiaId = await getOrCreateRotinaDia(rotinaId, h.diaSemana, h.diaSemanaInt);
                    if (h.dispId) {
                        // Atualizar disponibilidade existente
                        await fetch(`/api/atualizar/disponibilidade/${h.dispId}`, {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                rotinaDiaId,
                                horaInicio: h.horaInicio,
                                horaFim: h.horaFim
                            })
                        });
                    } else {
                        // Criar nova disponibilidade
                        await fetch('/api/criar/disponibilidade', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                rotinaDiaId,
                                horaInicio: h.horaInicio,
                                horaFim: h.horaFim
                            })
                        });
                    }
                }
            }
            alert('Horários salvos com sucesso!');
            document.getElementById('formHorario').reset();
            document.getElementById('formHorarioContainer').style.display = 'none';
        } catch {
            alert('Erro ao salvar horários.');
        }
    });

    formRotina.addEventListener('submit', function(e) {
        e.preventDefault();
        const btn = formRotina.querySelector('.btn-registrar');
        btn.classList.add('loading');
        btn.textContent = 'Salvando...';
        const dados = {
            nome: document.getElementById('nomeRotina').value,
            descricao: document.getElementById('descricaoRotina').value,
            alunoId: alunoId
        };
        let url = '/api/criar/rotina';
        let method = 'POST';
        if (modoEdicaoRotina && rotinaIdInput.value) {
            url = `/api/atualizar/rotina/${rotinaIdInput.value}`;
            method = 'PUT';
        }
        fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        })
        .then(res => res.json())
        .then(() => {
            formRotina.reset();
            formRotinaContainer.style.display = 'none';
            carregarRotinas();
        })
        .catch(() => alert('Erro ao salvar rotina.'))
        .finally(() => {
            btn.classList.remove('loading');
            btn.textContent = 'Salvar';
        });
    });

    document.getElementById('fecharModalRotina').onclick = function() {
        document.getElementById('modalVisualizarRotina').style.display = 'none';
    };

    document.getElementById('fecharModalAtividade').onclick = function() {
        document.getElementById('modalDetalheAtividade').style.display = 'none';
    };
}); 