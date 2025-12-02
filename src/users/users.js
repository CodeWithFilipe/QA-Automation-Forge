// users.js - Funções para manipular usuários
const axios = require('../axiosConfig');

const API_URL = 'https://jsonplaceholder.typicode.com';

/**
 * Busca todos os usuários da API
 * @returns {Promise<Array>} Lista de usuários
 */
async function getAllUsers() {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao buscar usuários: ' + error.message);
  }
}

/**
 * Busca usuário por ID da API
 * @param {number} id - ID do usuário
 * @returns {Promise<Object|null>} Usuário encontrado ou null
 */
async function getUserById(id) {
  if (typeof id !== "number") {
    throw new Error("ID deve ser um número");
  }
  try {
    const response = await axios.get(`${API_URL}/users/${id}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null;
    }
    throw new Error('Erro ao buscar usuário: ' + error.message);
  }
}

/**
 * Filtra usuários por cidade (usando dados da API)
 * @param {string} city - Nome da cidade
 * @returns {Promise<Array>} Usuários filtrados
 */
async function filterUsersByCity(city) {
  if (!city) {
    throw new Error("Cidade é obrigatória");
  }
  const users = await getAllUsers();
  return users.filter((user) => user.address && user.address.city === city);
}

/**
 * Cria um novo usuário (POST para API)
 * @param {Object} userData - Dados do usuário
 * @returns {Promise<Object>} Usuário criado
 */
async function createUser(userData) {
  if (!userData.name || !userData.email) {
    throw new Error("Nome e email são obrigatórios");
  }
  try {
    const response = await axios.post(`${API_URL}/users`, userData);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao criar usuário: ' + error.message);
  }
}

/**
 * Valida email
 * @param {string} email - Email a validar
 * @returns {boolean} True se válido
 */
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Conta usuários
 * @returns {Promise<number>} Número de usuários
 */
async function countUsers() {
  const users = await getAllUsers();
  return users.length;
}

module.exports = {
  getAllUsers,
  getUserById,
  filterUsersByCity,
  createUser,
  validateEmail,
  countUsers,
};
