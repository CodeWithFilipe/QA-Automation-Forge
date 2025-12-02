// unit.comments.test.js - Testes unitários para módulo de comentários com JSONPlaceholder

const assert = require('assert');
const chai = require('chai');
const expect = chai.expect;
chai.should();

const commentsModule = require('../src/comments/comments');

describe('TESTES UNITÁRIOS - Módulo de Comentários (JSONPlaceholder)', () => {
  
  describe('Operações básicas', () => {
    
    it('Deve retornar todos os comentários (500 comentários)', async () => {
      const comments = await commentsModule.getAllComments();
      comments.should.be.an('array');
      expect(comments.length).to.equal(500);
    });

    it('Deve buscar comentários por postId', async () => {
      const comments = await commentsModule.getCommentsByPostId(1);
      expect(comments.length).to.be.above(0);
      
      comments.forEach(comment => {
        assert.strictEqual(comment.postId, 1);
      });
    });

    it('Deve criar comentário com dados completos', async () => {
      const commentData = {
        postId: 1,
        name: 'Test User',
        email: 'test@example.com',
        body: 'Great comment!'
      };
      
      const newComment = await commentsModule.createComment(commentData);
      expect(newComment).to.have.property('id');
      expect(newComment.body).to.equal('Great comment!');
    });

    it('Deve lançar erro sem postId', async () => {
      try {
        await commentsModule.createComment({ body: 'Test' });
        assert.fail('Deveria ter lançado erro');
      } catch (error) {
        expect(error.message).to.include('Post ID e corpo são obrigatórios');
      }
    });

    it('Deve validar estrutura de comentário', async () => {
      const comments = await commentsModule.getCommentsByPostId(1);
      const comment = comments[0];
      expect(comment).to.have.property('id');
      expect(comment).to.have.property('postId');
      expect(comment).to.have.property('name');
      expect(comment).to.have.property('email');
      expect(comment).to.have.property('body');
    });
  });

  describe('Operações de contagem e deleção', () => {
    
    it('Deve contar comentários de um post', async () => {
      const count = await commentsModule.countCommentsByPost(1);
      count.should.be.a('number');
      expect(count).to.be.above(0);
    });

    it('Deve simular deleção de comentário existente', async () => {
      const deleted = await commentsModule.deleteComment(1);
      expect(deleted).to.be.true;
    });

    it('Deve lançar erro ao deletar sem ID', async () => {
      try {
        await commentsModule.deleteComment(null);
        assert.fail('Deveria ter lançado erro');
      } catch (error) {
        expect(error.message).to.include('Comment ID é obrigatório');
      }
    });
  });
});
