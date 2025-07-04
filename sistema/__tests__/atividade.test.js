const request = require('supertest');
const app = require('../app');
const { Sequelize } = require('sequelize');
const config = require('../config/config.json');

describe('Controller de Atividade', () => {
  let sequelize;
  let alunoId, atividadeId;

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

    // Criar aluno para os testes
    const alunoData = {
      nome: 'Aluno Teste',
      email: 'aluno@teste.com',
      senha: '123456'
    };

    const response = await request(app)
      .post('/api/criar/aluno')
      .send(alunoData);

    alunoId = response.body.data.id;
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe('POST /api/criar/atividade', () => {
    test('Deve criar atividade com todos os campos', async () => {
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
      expect(response.body.data.nome).toBe('Estudar Matemática');
      expect(response.body.data.duracao).toBe(60);
      expect(response.body.data.peso).toBe(3);
      expect(response.body.data.alunoId).toBe(alunoId);

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
      expect(response.body.data.rotinaDiaId).toBeNull();
    });

    test('Deve criar atividade com rotinaDiaId', async () => {
      // Primeiro criar uma rotina e rotinaDia
      const rotinaData = {
        nome: 'Rotina Teste',
        descricao: 'Rotina para teste',
        alunoId: alunoId
      };

      const rotinaResponse = await request(app)
        .post('/api/criar/rotina')
        .send(rotinaData);

      const rotinaId = rotinaResponse.body.data.id;

      const rotinaDiaData = {
        diaSemana: 1,
        rotinaId: rotinaId
      };

      const rotinaDiaResponse = await request(app)
        .post('/api/criar/rotinadia')
        .send(rotinaDiaData);

      const rotinaDiaId = rotinaDiaResponse.body.data.id;

      // Agora criar atividade com rotinaDiaId
      const atividadeData = {
        nome: 'Atividade com Rotina',
        descricao: 'Atividade associada a uma rotina',
        duracao: 45,
        peso: 2,
        rotinaDiaId: rotinaDiaId,
        alunoId: alunoId
      };

      const response = await request(app)
        .post('/api/criar/atividade')
        .send(atividadeData)
        .expect(200);

      expect(response.body.msg).toBe('Atividade criada com sucesso');
      expect(response.body.data.rotinaDiaId).toBe(rotinaDiaId);
    });

    test('Deve falhar ao criar atividade sem campos obrigatórios', async () => {
      const atividadeInvalida = {
        nome: 'Atividade Incompleta'
        // Faltando descricao, duracao, peso, alunoId
      };

      const response = await request(app)
        .post('/api/criar/atividade')
        .send(atividadeInvalida)
        .expect(200);

      expect(response.body.msg).toContain('Não foi possível cadastrar a atividade');
    });

    test('Deve falhar ao criar atividade com aluno inexistente', async () => {
      const atividadeData = {
        nome: 'Atividade Aluno Inexistente',
        descricao: 'Teste com aluno inexistente',
        duracao: 30,
        peso: 1,
        alunoId: 99999 // ID inexistente
      };

      const response = await request(app)
        .post('/api/criar/atividade')
        .send(atividadeData)
        .expect(200);

      expect(response.body.msg).toContain('Não foi possível cadastrar a atividade');
    });
  });

  describe('PUT /api/atualizar/atividade/:id', () => {
    test('Deve atualizar atividade com sucesso', async () => {
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

    test('Deve atualizar atividade sem rotinaDiaId', async () => {
      const updateData = {
        nome: 'Atividade Atualizada',
        descricao: 'Descrição atualizada',
        duracao: 45,
        peso: 2,
        alunoId: alunoId
      };

      const response = await request(app)
        .put(`/api/atualizar/atividade/${atividadeId}`)
        .send(updateData)
        .expect(200);

      expect(response.body.msg).toBe('Atividade atualizada com sucesso');
    });
  });

  describe('GET /api/buscar/atividade/:id', () => {
    test('Deve buscar atividade por ID', async () => {
      const response = await request(app)
        .get(`/api/buscar/atividade/${atividadeId}`)
        .expect(200);

      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('nome');
      expect(response.body).toHaveProperty('descricao');
      expect(response.body).toHaveProperty('duracao');
      expect(response.body).toHaveProperty('peso');
      expect(response.body).toHaveProperty('alunoId');
    });

    test('Deve retornar 404 para atividade inexistente', async () => {
      const response = await request(app)
        .get('/api/buscar/atividade/99999')
        .expect(404);

      expect(response.body.msg).toBe('Atividade não encontrada');
    });
  });

  describe('GET /api/atividades/aluno/:alunoId', () => {
    test('Deve listar atividades do aluno', async () => {
      const response = await request(app)
        .get(`/api/atividades/aluno/${alunoId}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      
      if (response.body.length > 0) {
        expect(response.body[0]).toHaveProperty('alunoId');
        expect(response.body[0].alunoId).toBe(alunoId);
      }
    });

    test('Deve retornar array vazio para aluno sem atividades', async () => {
      const response = await request(app)
        .get('/api/atividades/aluno/99999')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(0);
    });
  });

  describe('DELETE /api/deletar/atividade/:id', () => {
    test('Deve deletar atividade com sucesso', async () => {
      const response = await request(app)
        .delete(`/api/deletar/atividade/${atividadeId}`)
        .expect(200);

      expect(response.body.msg).toBe('Atividade deletada com sucesso');
    });

    test('Deve retornar 404 para atividade inexistente', async () => {
      const response = await request(app)
        .delete('/api/deletar/atividade/99999')
        .expect(404);

      expect(response.body.msg).toBe('Atividade não encontrada');
    });
  });
}); 