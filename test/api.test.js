// api.test.js - Testes de API com Chai-HTTP e JSONPlaceholder
// Testa os endpoints REST da aplicação que consomem JSONPlaceholder

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.should();

chai.use(chaiHttp);

const app = require('../src/app');

describe('TESTES DE API - Endpoints REST (JSONPlaceholder)', function() {
  // Aumentar timeout para requisições HTTP
  this.timeout(10000);
  
  describe('GET /users - Endpoint de usuários', () => {
    
    it('Deve retornar lista de usuários com status 200', (done) => {
      chai.request(app)
        .get('/users')
        .end((err, res) => {
          expect(err).to.be.null;
          res.should.have.status(200);
          res.body.should.be.an('array');
          res.body.should.have.lengthOf(10);
          done();
        });
    });

    it('Deve retornar usuário específico por ID', (done) => {
      chai.request(app)
        .get('/users/1')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('id', 1);
          res.body.should.have.property('name');
          res.body.should.have.property('email');
          done();
        });
    });

    it('Deve retornar 404 para usuário inexistente', (done) => {
      chai.request(app)
        .get('/users/999')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('error');
          done();
        });
    });
  });

  describe('POST /users - Criação de usuário', () => {
    
    it('Deve criar novo usuário com status 201', (done) => {
      const newUser = {
        name: 'Test User',
        email: 'test@example.com',
        username: 'testuser'
      };

      chai.request(app)
        .post('/users')
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('id');
          res.body.should.have.property('name', 'Test User');
          done();
        });
    });

    it('Deve retornar erro 400 sem dados obrigatórios', (done) => {
      chai.request(app)
        .post('/users')
        .send({ username: 'test' })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('error');
          done();
        });
    });
  });

  describe('GET /posts - Endpoint de posts', () => {
    
    it('Deve retornar todos os posts (100)', (done) => {
      chai.request(app)
        .get('/posts')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.equal(100);
          done();
        });
    });

    it('Deve retornar posts de um usuário específico', (done) => {
      chai.request(app)
        .get('/posts/user/1')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('array');
          res.body.forEach(post => {
            expect(post.userId).to.equal(1);
          });
          done();
        });
    });
  });

  describe('POST /posts - Criação de post', () => {
    
    it('Deve criar novo post', (done) => {
      const newPost = {
        userId: 1,
        title: 'Test Post',
        body: 'This is a test post'
      };

      chai.request(app)
        .post('/posts')
        .send(newPost)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.include.keys('id', 'title', 'body');
          done();
        });
    });
  });

  describe('GET /comments - Endpoint de comentários', () => {
    
    it('Deve retornar todos os comentários (500)', (done) => {
      chai.request(app)
        .get('/comments')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('array');
          expect(res.body.length).to.equal(500);
          done();
        });
    });

    it('Deve retornar comentários de um post específico', (done) => {
      chai.request(app)
        .get('/comments/post/1')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('array');
          if (res.body.length > 0) {
            expect(res.body[0]).to.have.property('postId', 1);
          }
          done();
        });
    });
  });

  describe('POST /comments - Criação de comentário', () => {
    
    it('Deve criar novo comentário', (done) => {
      const newComment = {
        postId: 1,
        name: 'Test Commenter',
        email: 'commenter@test.com',
        body: 'Great post!'
      };

      chai.request(app)
        .post('/comments')
        .send(newComment)
        .end((err, res) => {
          res.should.have.status(201);
          expect(res.body).to.have.property('id');
          expect(res.body.body).to.equal('Great post!');
          done();
        });
    });
  });

  describe('GET /todos - Endpoint de tarefas', () => {
    
    it('Deve retornar todas as tarefas (200)', (done) => {
      chai.request(app)
        .get('/todos')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('array');
          expect(res.body.length).to.equal(200);
          done();
        });
    });
  });

  describe('PATCH /todos/:id/complete - Marcar tarefa como concluída', () => {
    
    it('Deve marcar tarefa como concluída', (done) => {
      chai.request(app)
        .patch('/todos/1/complete')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('completed', true);
          done();
        });
    });
  });

  describe('GET /albums e /photos - Endpoints de álbuns e fotos', () => {
    
    it('Deve retornar todos os álbuns (100)', (done) => {
      chai.request(app)
        .get('/albums')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('array');
          expect(res.body.length).to.equal(100);
          done();
        });
    });

    it('Deve retornar álbuns de um usuário', (done) => {
      chai.request(app)
        .get('/albums/user/1')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('array');
          done();
        });
    });

    it('Deve retornar todas as fotos', (done) => {
      chai.request(app)
        .get('/photos')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('array');
          expect(res.body.length).to.be.above(0);
          done();
        });
    });

    it('Deve retornar fotos de um álbum', (done) => {
      chai.request(app)
        .get('/photos/album/1')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('array');
          done();
        });
    });
  });

  describe('GET / e /ping - Endpoints básicos', () => {
    
    it('Deve retornar informações da API na raiz', (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message');
          done();
        });
    });

    it('Deve responder ao ping', (done) => {
      chai.request(app)
        .get('/ping')
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.text).to.equal('Pong!');
          done();
        });
    });
  });
});
