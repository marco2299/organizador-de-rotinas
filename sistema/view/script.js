document.addEventListener('DOMContentLoaded', function() {
    const cadastroForm = document.getElementById('cadastroForm');
    const linkEntrar = document.getElementById('linkEntrar');
    
    // Submissão do formulário
    cadastroForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const btnRegistrar = document.querySelector('.btn-registrar');
        btnRegistrar.classList.add('loading');
        btnRegistrar.textContent = 'Registrando...';
        
        // Coletar dados do formulário
        const formData = new FormData(cadastroForm);
        const dadosAluno = {
            nome: formData.get('nome'),
            email: formData.get('email'),
            senha: formData.get('senha')
        };
        
        try {
            const response = await fetch('/api/criar/aluno', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dadosAluno)
            });

            if (response.ok) {
                alert('Cadastro realizado com sucesso!');
                cadastroForm.reset();
            } else {
                const erro = await response.json().catch(() => ({}));
                alert(erro.message || 'Erro ao realizar cadastro. Tente novamente.');
            }
        } catch (error) {
            alert('Erro ao conectar com o servidor.');
        } finally {
            btnRegistrar.classList.remove('loading');
            btnRegistrar.textContent = 'Registrar-se';
        }
    });
    
    // Link para entrar (redireciona para a tela de login)
    linkEntrar.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = 'login.html';
    });
    
    // Adicionar efeitos visuais nos campos
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
    
    // Feedback visual para campos obrigatórios
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value) {
                this.style.borderColor = '#ff6b6b';
            } else if (this.value) {
                this.style.borderColor = '#51cf66';
            }
        });
    });
}); 