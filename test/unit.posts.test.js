// unit.posts.test.js - Testes unitários para módulo de posts
// Demonstra uso de SINON para mocking e stubbing com JSONPlaceholder

const assert = require('assert');
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
chai.should();

const postsModule = require('../src/posts/posts');

describe('TESTES UNITÁRIOS - Módulo de Posts (JSONPlaceholder)', () => {
  
  describe('Testes de funcionalidades básicas', () => {
    
    it('Deve retornar todos os posts (100 posts)', async () => {
      const posts = await postsModule.getAllPosts();
      expect(posts).to.be.an('array');
      expect(posts).to.have.lengthOf(100);
    });

    it('Deve filtrar posts por userId', async () => {
      const userPosts = await postsModule.getPostsByUserId(1);
      expect(userPosts.length).to.be.above(0);
      userPosts.forEach(post => {
        expect(post.userId).to.equal(1);
      });
    });

    it('Deve criar novo post com dados válidos', async () => {
      const postData = {
        title: 'Novo Post',
        body: 'Conteúdo do post',
        userId: 1
      };
      const newPost = await postsModule.createPost(postData);
      
      expect(newPost).to.have.property('id');
      expect(newPost.title).to.equal(postData.title);
    });

    it('Deve lançar erro ao criar post sem título', async () => {
      try {
        await postsModule.createPost({ body: 'Test' });
        throw new Error('Deveria ter lançado erro');
      } catch (error) {
        expect(error.message).to.include('Título e corpo são obrigatórios');
      }
    });

    it('Deve buscar post por ID', async () => {
      const post = await postsModule.getPostById(1);
      expect(post).to.have.property('id', 1);
      expect(post).to.have.property('title');
      expect(post).to.have.property('body');
    });
  });

  describe('Testes com SINON - Stubs e Spies', () => {
    
    afterEach(() => {
      sinon.restore();
    });

    it('Deve usar stub para simular getAllPosts', async () => {
      const stub = sinon.stub(postsModule, 'getAllPosts').resolves([
        { id: 1, userId: 1, title: 'Mocked Post', body: 'Test' }
      ]);

      const posts = await postsModule.getAllPosts();
      expect(posts).to.have.lengthOf(1);
      expect(posts[0].title).to.equal('Mocked Post');
      
      stub.restore();
    });

    it('Deve verificar se método foi chamado com spy', async () => {
      const spy = sinon.spy(postsModule, 'getAllPosts');
      
      await postsModule.getAllPosts();
      
      expect(spy.calledOnce).to.be.true;
      spy.restore();
    });
  });

  describe('Testes de validação e edge cases', () => {
    
    it('Deve verificar se post pertence ao usuário', async () => {
      const belongs = await postsModule.isPostOwnedByUser(1, 1);
      expect(belongs).to.be.true;
    });

    it('Deve retornar posts populares (títulos longos)', async () => {
      const popularPosts = await postsModule.getPopularPosts();
      expect(popularPosts).to.be.an('array');
      popularPosts.forEach(post => {
        expect(post.title.length).to.be.above(50);
      });
    });

    it('Deve lançar erro ao buscar posts sem userId', async () => {
      await assert.rejects(
        async () => await postsModule.getPostsByUserId(null),
        /User ID é obrigatório/
      );
    });
  });
});
