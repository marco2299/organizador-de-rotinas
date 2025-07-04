const request = require('supertest');
const app = require('../app');
const { Sequelize } = require('sequelize');
const config = require('../config/config.json');

describe('Fluxo Completo do Organizador de Rotinas', () => {
  let sequelize;
  let adminId, alunoId, rotinaId, rotinaDiaId, atividadeId;

  beforeAll(async () => {
    // Configurar banco de teste
    sequelize = new Sequelize(
      config.test.database,
      config.test.username,
      config.test.password,
      {
        host: config.test.host,
        dialect: config.test.dialect,
        logging: false
      }
    );

    // Sincronizar banco de teste
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe('1. Cadastro de Admin', () => {
    test('Deve criar um admin com sucesso', async () => {
      const adminData = {
        nome: 'Admin Teste',
        email: 'admin@teste.com',
        senha: '123456'
      };

      const response = await request(app)
        .post('/api/criar/admin')
        .send(adminData)
        .expect(200);

      expect(response.body.msg).toBe('Admin criado com sucesso');
      expect(response.body.data).toHaveProperty('id');
      adminId = response.body.data.id;
    });
  });

  describe('2. Cadastro de Aluno', () => {
    test('Deve criar um aluno com sucesso', async () => {
      const alunoData = {
        nome: 'João Silva',
        email: 'joao@teste.com',
        senha: '123456'
      };

      const response = await request(app)
        .post('/api/criar/aluno')
        .send(alunoData)
        .expect(200);

      expect(response.body.msg).toBe('Aluno criado com sucesso');
      expect(response.body.data).toHaveProperty('id');
      alunoId = response.body.data.id;
    });

    test('Deve listar alunos', async () => {
      const response = await request(app)
        .get('/api/listar/aluno/0')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe('3. Login', () => {
    test('Deve fazer login como admin', async () => {
      const loginData = {
        email: 'admin@teste.com',
        senha: '123456'
      };

      const response = await request(app)
        .post('/api/login')
        .send(loginData)
        .expect(200);

      expect(response.body.tipo).toBe('admin');
      expect(response.body.usuario).toHaveProperty('id');
    });

    test('Deve fazer login como aluno', async () => {
      const loginData = {
        email: 'joao@teste.com',
        senha: '123456'
      };

      const response = await request(app)
        .post('/api/login')
        .send(loginData)
        .expect(200);

      expect(response.body.tipo).toBe('aluno');
      expect(response.body.usuario).toHaveProperty('id');
    });

    test('Deve falhar login com credenciais inválidas', async () => {
      const loginData = {
        email: 'invalido@teste.com',
        senha: 'senhaerrada'
      };

      const response = await request(app)
        .post('/api/login')
        .send(loginData)
        .expect(401);

      expect(response.body.message).toBe('E-mail ou senha inválidos.');
    });
  });

  describe('4. Cadastro de Atividades', () => {
    test('Deve criar uma atividade com sucesso', async () => {
      const atividadeData = {
        nome: 'Estudar Matemática',
        descricao: 'Revisar álgebra e geometria',
        duracao: 60,
        peso: 3,
        alunoId: alunoId
      };

      const response = await request(app)
        .post('/api/criar/atividade')
        .send(atividadeData)
        .expect(200);

      expect(response.body.msg).toBe('Atividade criada com sucesso');
      expect(response.body.data).toHaveProperty('id');
      atividadeId = response.body.data.id;
    });

    test('Deve criar atividade sem rotinaDiaId', async () => {
      const atividadeData = {
        nome: 'Fazer Exercícios',
        descricao: 'Corrida matinal',
        duracao: 30,
        peso: 4,
        alunoId: alunoId
      };

      const response = await request(app)
        .post('/api/criar/atividade')
        .send(atividadeData)
        .expect(200);

      expect(response.body.msg).toBe('Atividade criada com sucesso');
    });

    test('Deve listar atividades do aluno', async () => {
      const response = await request(app)
        .get(`/api/atividades/aluno/${alunoId}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });

    test('Deve buscar atividade por ID', async () => {
      const response = await request(app)
        .get(`/api/buscar/atividade/${atividadeId}`)
        .expect(200);

      expect(response.body).toHaveProperty('id');
      expect(response.body.nome).toBe('Estudar Matemática');
    });

    test('Deve atualizar atividade', async () => {
      const updateData = {
        nome: 'Estudar Matemática Avançada',
        descricao: 'Revisar cálculo diferencial',
        duracao: 90,
        peso: 5,
        alunoId: alunoId
      };

      const response = await request(app)
        .put(`/api/atualizar/atividade/${atividadeId}`)
        .send(updateData)
        .expect(200);

      expect(response.body.msg).toBe('Atividade atualizada com sucesso');
    });
  });

  describe('5. Cadastro de Rotinas', () => {
    test('Deve criar uma rotina com sucesso', async () => {
      const rotinaData = {
        nome: 'Rotina de Estudos',
        descricao: 'Rotina para estudos diários',
        alunoId: alunoId
      };

      const response = await request(app)
        .post('/api/criar/rotina')
        .send(rotinaData)
        .expect(200);

      expect(response.body.msg).toBe('Rotina criada com sucesso');
      expect(response.body.data).toHaveProperty('id');
      rotinaId = response.body.data.id;
    });

    test('Deve listar rotinas do aluno', async () => {
      const response = await request(app)
        .get(`/api/rotinas/aluno/${alunoId}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });

    test('Deve buscar rotina por ID', async () => {
      const response = await request(app)
        .get(`/api/buscar/rotina/${rotinaId}`)
        .expect(200);

      expect(response.body).toHaveProperty('id');
      expect(response.body.nome).toBe('Rotina de Estudos');
    });
  });

  describe('6. Cadastro de Rotina/Dia', () => {
    test('Deve criar rotina/dia com sucesso', async () => {
      const rotinaDiaData = {
        diaSemana: 1, // Segunda-feira
        rotinaId: rotinaId
      };

      const response = await request(app)
        .post('/api/criar/rotinadia')
        .send(rotinaDiaData)
        .expect(200);

      expect(response.body.msg).toBe('RotinaDia criada com sucesso');
      expect(response.body.data).toHaveProperty('id');
      rotinaDiaId = response.body.data.id;
    });

    test('Deve listar rotinas/dias da rotina', async () => {
      const response = await request(app)
        .get(`/api/rotinadias/rotina/${rotinaId}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe('7. Cadastro de Disponibilidade', () => {
    test('Deve criar disponibilidade com sucesso', async () => {
      const disponibilidadeData = {
        horaInicio: '08:00:00',
        horaFim: '12:00:00',
        rotinaDiaId: rotinaDiaId
      };

      const response = await request(app)
        .post('/api/criar/disponibilidade')
        .send(disponibilidadeData)
        .expect(200);

      expect(response.body.msg).toBe('Disponibilidade criada com sucesso');
      expect(response.body.data).toHaveProperty('id');
    });

    test('Deve buscar disponibilidade da rotina/dia', async () => {
      const response = await request(app)
        .get(`/api/disponibilidade/rotina/${rotinaDiaId}`)
        .expect(200);

      expect(response.body).toHaveProperty('id');
      expect(response.body.horaInicio).toBe('08:00:00');
    });
  });

  describe('8. Associação de Atividade com Rotina', () => {
    test('Deve associar atividade à rotina com horário', async () => {
      const rotinaAtividadeData = {
        horaInicio: '09:00:00',
        horaFim: '10:00:00',
        rotinaDiaId: rotinaDiaId,
        atividadeId: atividadeId
      };

      const response = await request(app)
        .post('/api/criar/rotinaatividade')
        .send(rotinaAtividadeData)
        .expect(200);

      expect(response.body.msg).toBe('RotinaAtividade criada com sucesso');
      expect(response.body.data).toHaveProperty('id');
    });

    test('Deve listar atividades da rotina/dia', async () => {
      const response = await request(app)
        .get(`/api/rotinaatividades/rotinadia/${rotinaDiaId}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });

    test('Deve listar rotinas da atividade', async () => {
      const response = await request(app)
        .get(`/api/rotinaatividades/atividade/${atividadeId}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe('9. Operações de Exclusão', () => {
    test('Deve deletar atividade', async () => {
      const response = await request(app)
        .delete(`/api/deletar/atividade/${atividadeId}`)
        .expect(200);

      expect(response.body.msg).toBe('Atividade deletada com sucesso');
    });

    test('Deve deletar rotina', async () => {
      const response = await request(app)
        .delete(`/api/deletar/rotina/${rotinaId}`)
        .expect(200);

      expect(response.body.msg).toBe('Rotina deletada com sucesso');
    });

    test('Deve deletar aluno', async () => {
      const response = await request(app)
        .delete(`/api/deletar/aluno/${alunoId}`)
        .expect(200);

      expect(response.body.msg).toBe('Aluno deletado com sucesso');
    });
  });

  describe('10. Validações e Tratamento de Erros', () => {
    test('Deve retornar erro ao criar atividade sem campos obrigatórios', async () => {
      const atividadeInvalida = {
        nome: 'Atividade sem campos obrigatórios'
        // Faltando descricao, duracao, peso, alunoId
      };

      const response = await request(app)
        .post('/api/criar/atividade')
        .send(atividadeInvalida)
        .expect(200);

      expect(response.body.msg).toContain('Não foi possível cadastrar a atividade');
    });

    test('Deve retornar erro ao buscar atividade inexistente', async () => {
      const response = await request(app)
        .get('/api/buscar/atividade/99999')
        .expect(404);

      expect(response.body.msg).toBe('Atividade não encontrada');
    });

    test('Deve retornar erro ao deletar atividade inexistente', async () => {
      const response = await request(app)
        .delete('/api/deletar/atividade/99999')
        .expect(404);

      expect(response.body.msg).toBe('Atividade não encontrada');
    });
  });
}); 