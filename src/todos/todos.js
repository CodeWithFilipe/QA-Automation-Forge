// todos.js - Funções para manipular tarefas
const axios = require('../axiosConfig');

const API_URL = 'https://jsonplaceholder.typicode.com';

/**
 * Lista todas as tarefas da API
 * @returns {Promise<Array>} Lista de tarefas
 */
async function getAllTodos() {
  try {
    const response = await axios.get(`${API_URL}/todos`);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao buscar tarefas: ' + error.message);
  }
}

/**
 * Busca uma tarefa por ID
 * @param {number} todoId - ID da tarefa
 * @returns {Promise<Object|null>} Tarefa encontrada ou null
 */
async function getTodoById(todoId) {
  if (typeof todoId !== 'number') {
    throw new Error('Todo ID deve ser um número');
  }
  try {
    const response = await axios.get(`${API_URL}/todos/${todoId}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null;
    }
    throw new Error('Erro ao buscar tarefa: ' + error.message);
  }
}

/**
 * Marca tarefa como concluída (PATCH para API)
 * @param {number} todoId - ID da tarefa
 * @returns {Promise<Object>} Tarefa atualizada
 */
async function markTodoAsCompleted(todoId) {
  if (typeof todoId !== 'number') {
    throw new Error('Todo ID deve ser um número');
  }
  const todo = await getTodoById(todoId);
  if (!todo) {
    throw new Error('Tarefa não encontrada');
  }
  try {
    const response = await axios.patch(`${API_URL}/todos/${todoId}`, {
      completed: true
    });
    return response.data;
  } catch (error) {
    throw new Error('Erro ao atualizar tarefa: ' + error.message);
  }
}

/**
 * Busca tarefas por status
 * @param {boolean} completed - Status de conclusão
 * @returns {Promise<Array>} Tarefas filtradas
 */
async function getTodosByStatus(completed) {
  const todos = await getAllTodos();
  return todos.filter(todo => todo.completed === completed);
}

/**
 * Cria nova tarefa (POST para API)
 * @param {Object} todoData - Dados da tarefa
 * @returns {Promise<Object>} Tarefa criada
 */
async function createTodo(todoData) {
  if (!todoData.title) {
    throw new Error('Título é obrigatório');
  }
  try {
    const response = await axios.post(`${API_URL}/todos`, todoData);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao criar tarefa: ' + error.message);
  }
}

/**
 * Alterna status de conclusão
 * @param {number} todoId - ID da tarefa
 * @returns {Promise<Object>} Tarefa atualizada
 */
async function toggleTodoStatus(todoId) {
  const todo = await getTodoById(todoId);
  if (!todo) {
    throw new Error('Tarefa não encontrada');
  }
  try {
    const response = await axios.patch(`${API_URL}/todos/${todoId}`, {
      completed: !todo.completed
    });
    return response.data;
  } catch (error) {
    throw new Error('Erro ao alternar status: ' + error.message);
  }
}

/**
 * Obtém progresso das tarefas do usuário
 * @param {number} userId - ID do usuário
 * @returns {Promise<Object>} Objeto com total e completadas
 */
async function getUserProgress(userId) {
  try {
    const response = await axios.get(`${API_URL}/todos?userId=${userId}`);
    const userTodos = response.data;
    const completed = userTodos.filter(t => t.completed).length;
    return {
      total: userTodos.length,
      completed: completed,
      pending: userTodos.length - completed,
      percentage: userTodos.length > 0 ? (completed / userTodos.length) * 100 : 0
    };
  } catch (error) {
    throw new Error('Erro ao obter progresso: ' + error.message);
  }
}

module.exports = {
  getAllTodos,
  getTodoById,
  markTodoAsCompleted,
  getTodosByStatus,
  createTodo,
  toggleTodoStatus,
  getUserProgress
};
