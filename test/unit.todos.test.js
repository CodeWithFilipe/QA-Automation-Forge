// unit.todos.test.js - Testes unitários para módulo de todos com JSONPlaceholder

const assert = require('assert');
const chai = require('chai');
const expect = chai.expect;
chai.should();

const todosModule = require('../src/todos/todos');

describe('TESTES UNITÁRIOS - Módulo de Todos (JSONPlaceholder)', () => {
  
  describe('Operações básicas de tarefas', () => {
    
    it('Deve retornar todas as tarefas (200 tarefas)', async () => {
      const todos = await todosModule.getAllTodos();
      expect(todos).to.be.an('array');
      todos.should.have.lengthOf(200);
    });

    it('Deve marcar tarefa como concluída', async () => {
      const todo = await todosModule.markTodoAsCompleted(1);
      expect(todo.completed).to.be.true;
      todo.should.have.property('completed', true);
    });

    it('Deve lançar erro ao marcar tarefa com ID inválido', async () => {
      try {
        await todosModule.markTodoAsCompleted('invalid');
        assert.fail('Deveria ter lançado erro');
      } catch (error) {
        expect(error.message).to.include('Todo ID deve ser um número');
      }
    });

    it('Deve filtrar tarefas por status', async () => {
      const completedTodos = await todosModule.getTodosByStatus(true);
      expect(completedTodos).to.be.an('array');
      completedTodos.forEach(todo => {
        expect(todo.completed).to.be.true;
      });
    });

    it('Deve criar nova tarefa', async () => {
      const todoData = { title: 'Nova Tarefa', userId: 1 };
      const newTodo = await todosModule.createTodo(todoData);
      
      newTodo.should.have.property('id');
      expect(newTodo.title).to.equal('Nova Tarefa');
    });
  });

  describe('Funcionalidades avançadas', () => {
    
    it('Deve alternar status de tarefa', async () => {
      const todo = await todosModule.toggleTodoStatus(1);
      expect(todo).to.have.property('completed');
      expect(typeof todo.completed).to.equal('boolean');
    });

    it('Deve calcular progresso do usuário', async () => {
      const progress = await todosModule.getUserProgress(1);
      
      expect(progress).to.have.property('total');
      expect(progress).to.have.property('completed');
      expect(progress).to.have.property('pending');
      expect(progress).to.have.property('percentage');
      
      progress.total.should.be.a('number');
      progress.percentage.should.be.at.least(0);
      progress.percentage.should.be.at.most(100);
    });

    it('Deve validar estrutura de tarefa', async () => {
      const todo = await todosModule.getTodoById(1);
      assert.ok(todo);
      assert.strictEqual(typeof todo.completed, 'boolean');
      assert.strictEqual(typeof todo.title, 'string');
    });
  });
});
