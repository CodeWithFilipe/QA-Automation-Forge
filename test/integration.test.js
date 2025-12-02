// integration.test.js - Testes de Integração com JSONPlaceholder
// Testa integração entre múltiplos módulos e fluxos completos

const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const expect = chai.expect;
chai.should();

chai.use(chaiHttp);

const app = require('../src/app');
const usersModule = require('../src/users/users');
const postsModule = require('../src/posts/posts');
const commentsModule = require('../src/comments/comments');
const todosModule = require('../src/todos/todos');

describe('TESTES DE INTEGRAÇÃO - Fluxos Completos (JSONPlaceholder)', function() {
  // Aumentar timeout para requisições HTTP reais
  this.timeout(15000);
  
  describe('Integração: Usuários -> Posts -> Comentários', () => {
    
    it('Deve buscar posts de um usuário e validar estrutura', async () => {
      const users = await usersModule.getAllUsers();
      expect(users).to.not.be.empty;
      
      const firstUser = users[0];
      const userPosts = await postsModule.getPostsByUserId(firstUser.id);
      
      userPosts.forEach(post => {
        expect(post.userId).to.equal(firstUser.id);
        expect(post).to.have.property('title');
        expect(post).to.have.property('body');
      });
    });

    it('Deve buscar comentários de posts de um usuário', async () => {
      // Buscar posts do usuário 1
      const userPosts = await postsModule.getPostsByUserId(1);
      expect(userPosts).to.not.be.empty;
      
      // Para o primeiro post, buscar comentários
      const firstPost = userPosts[0];
      const comments = await commentsModule.getCommentsByPostId(firstPost.id);
      
      comments.forEach(comment => {
        expect(comment.postId).to.equal(firstPost.id);
      });
    });

    it('Deve criar usuário e post via API em sequência', (done) => {
      const userData = {
        name: 'Integration User',
        email: 'integration@test.com',
        username: 'intuser'
      };

      chai.request(app)
        .post('/users')
        .send(userData)
        .end((err, userRes) => {
          expect(userRes).to.have.status(201);
          expect(userRes.body).to.have.property('id');
          
          const userId = userRes.body.id;

          // Criar post para o usuário
          const postData = {
            userId: userId,
            title: 'Integration Post',
            body: 'Testing integration'
          };

          chai.request(app)
            .post('/posts')
            .send(postData)
            .end((err, postRes) => {
              expect(postRes).to.have.status(201);
              expect(postRes.body).to.have.property('id');
              done();
            });
        });
    });
  });

  describe('Integração: Usuários -> Todos (Tarefas)', () => {
    
    it('Deve calcular progresso do usuário', async () => {
      const progress = await todosModule.getUserProgress(1);
      
      expect(progress).to.have.property('total');
      expect(progress).to.have.property('completed');
      expect(progress).to.have.property('pending');
      expect(progress).to.have.property('percentage');
      expect(progress.total).to.be.above(0);
    });

    it('Deve marcar tarefa como concluída via API', (done) => {
      chai.request(app)
        .patch('/todos/1/complete')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('completed', true);
          done();
        });
    });

    it('Deve criar tarefa e verificar estrutura', (done) => {
      const todoData = {
        userId: 1,
        title: 'Integration Todo'
      };

      chai.request(app)
        .post('/todos')
        .send(todoData)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('id');
          expect(res.body.title).to.equal('Integration Todo');
          done();
        });
    });
  });

  describe('Integração: Validação de Dados Entre Módulos', () => {
    
    it('Deve validar que emails de usuários são válidos', async () => {
      const users = await usersModule.getAllUsers();
      
      users.slice(0, 5).forEach(user => {
        const isValidEmail = usersModule.validateEmail(user.email);
        expect(isValidEmail).to.be.true;
      });
    });

    it('Deve verificar consistência entre contagem e filtros', async () => {
      const totalUsers = await usersModule.countUsers();
      const allUsers = await usersModule.getAllUsers();
      
      expect(totalUsers).to.equal(allUsers.length);
    });

    it('Deve verificar relação entre posts e usuários', async () => {
      const post = await postsModule.getPostById(1);
      expect(post).to.not.be.null;
      expect(post.userId).to.be.above(0);
      
      const user = await usersModule.getUserById(post.userId);
      expect(user).to.not.be.null;
      expect(user.id).to.equal(post.userId);
    });
  });

  describe('Integração: Testes com Stubs e Mocks (SINON)', () => {
    
    afterEach(() => {
      sinon.restore();
    });

    it('Deve usar stub para simular erro na busca de posts', async () => {
      const stub = sinon.stub(postsModule, 'getPostsByUserId').rejects(new Error('Database error'));
      
      try {
        await postsModule.getPostsByUserId(1);
        assert.fail('Deveria ter lançado erro');
      } catch (error) {
        expect(error.message).to.equal('Database error');
      }
      
      stub.restore();
    });

    it('Deve usar spy para verificar chamadas em cadeia', async () => {
      const getAllUsersSpy = sinon.spy(usersModule, 'getAllUsers');
      const getUserByIdSpy = sinon.spy(usersModule, 'getUserById');
      
      // Simular fluxo de busca
      await usersModule.getAllUsers();
      await usersModule.getUserById(1);
      
      expect(getAllUsersSpy.calledOnce).to.be.true;
      expect(getUserByIdSpy.calledWith(1)).to.be.true;
      
      getAllUsersSpy.restore();
      getUserByIdSpy.restore();
    });

    it('Deve usar stub para simular cenário específico', async () => {
      const stub = sinon.stub(postsModule, 'getPopularPosts').resolves([
        { id: 1, userId: 1, title: 'Post muito longo com mais de cinquenta caracteres para ser popular', body: 'Content' }
      ]);

      const popularPosts = await postsModule.getPopularPosts();
      expect(popularPosts).to.have.lengthOf(1);
      expect(popularPosts[0].title.length).to.be.above(50);
      
      stub.restore();
    });
  });

  describe('Integração: Fluxo Completo de API', () => {
    
    it('Deve testar múltiplos endpoints em sequência', function(done) {
      this.timeout(20000);
      
      Promise.all([
        chai.request(app).get('/users'),
        chai.request(app).get('/posts'),
        chai.request(app).get('/comments'),
        chai.request(app).get('/todos'),
        chai.request(app).get('/albums')
      ]).then(responses => {
        responses.forEach(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
        });
        done();
      }).catch(done);
    });

    it('Deve testar endpoint específico com parâmetros', (done) => {
      chai.request(app)
        .get('/comments/post/1')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          res.body.forEach(comment => {
            expect(comment.postId).to.equal(1);
          });
          done();
        });
    });
  });

  describe('Integração: Cenários de Erro', () => {
    
    it('Deve lidar com criação de post sem dados obrigatórios', (done) => {
      const invalidPost = {
        title: 'Test Post'
        // falta body
      };

      chai.request(app)
        .post('/posts')
        .send(invalidPost)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('error');
          done();
        });
    });

    it('Deve validar entrada em múltiplas camadas', async () => {
      // Validação de tipos
      try {
        await commentsModule.getCommentsByPostId('invalid');
        assert.fail('Deveria ter lançado erro');
      } catch (error) {
        expect(error.message).to.include('Post ID deve ser um número');
      }
    });

    it('Deve retornar 404 para recursos inexistentes', (done) => {
      chai.request(app)
        .get('/users/999')
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
});
