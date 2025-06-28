document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const btnEntrar = document.querySelector('.btn-registrar');
        btnEntrar.classList.add('loading');
        btnEntrar.textContent = 'Entrando...';

        const formData = new FormData(loginForm);
        const dadosLogin = {
            email: formData.get('email'),
            senha: formData.get('senha')
        };

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dadosLogin)
            });

            if (response.ok) {
                const data = await response.json();
                if (data.tipo === 'admin') {
                    window.location.href = 'alunos.html';
                } else if (data.tipo === 'aluno') {
                    // Redirecionar para a página de tarefas do aluno
                    const alunoId = data.usuario.id;
                    const nome = encodeURIComponent(data.usuario.nome);
                    window.location.href = `tarefas.html?alunoId=${alunoId}&nome=${nome}`;
                } else {
                    alert('Login realizado com sucesso!');
                }
            } else {
                const erro = await response.json().catch(() => ({}));
                alert(erro.message || 'E-mail ou senha inválidos.');
            }
        } catch (error) {
            alert('Erro ao conectar com o servidor.');
        } finally {
            btnEntrar.classList.remove('loading');
            btnEntrar.textContent = 'Entrar';
        }
    });

    // Link para entrar (redireciona para a tela de login)
    const linkEntrar = document.getElementById('linkEntrar');
    if (linkEntrar) {
        linkEntrar.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'login.html';
        });
    }
}); 