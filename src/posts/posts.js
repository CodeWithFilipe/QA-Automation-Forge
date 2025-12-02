// posts.js - Funções para manipular posts
const axios = require('../axiosConfig');

const API_URL = 'https://jsonplaceholder.typicode.com';

/**
 * Lista todos os posts da API
 * @returns {Promise<Array>} Lista de posts
 */
async function getAllPosts() {
  try {
    const response = await axios.get(`${API_URL}/posts`);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao buscar posts: ' + error.message);
  }
}

/**
 * Busca posts por ID do usuário
 * @param {number} userId - ID do usuário
 * @returns {Promise<Array>} Posts do usuário
 */
async function getPostsByUserId(userId) {
  if (!userId) {
    throw new Error('User ID é obrigatório');
  }
  try {
    const response = await axios.get(`${API_URL}/posts?userId=${userId}`);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao buscar posts do usuário: ' + error.message);
  }
}

/**
 * Cria um novo post (POST para API)
 * @param {Object} postData - Dados do post
 * @returns {Promise<Object>} Post criado
 */
async function createPost(postData) {
  if (!postData.title || !postData.body) {
    throw new Error('Título e corpo são obrigatórios');
  }
  try {
    const response = await axios.post(`${API_URL}/posts`, postData);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao criar post: ' + error.message);
  }
}

/**
 * Busca um post por ID
 * @param {number} postId - ID do post
 * @returns {Promise<Object|null>} Post encontrado ou null
 */
async function getPostById(postId) {
  if (typeof postId !== 'number') {
    throw new Error('Post ID deve ser um número');
  }
  try {
    const response = await axios.get(`${API_URL}/posts/${postId}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null;
    }
    throw new Error('Erro ao buscar post: ' + error.message);
  }
}

/**
 * Adiciona likes a um post (simulado localmente)
 * @param {number} postId - ID do post
 * @param {number} likes - Número de likes a adicionar
 * @returns {Promise<Object>} Post atualizado
 */
async function addLikesToPost(postId, likes = 1) {
  const post = await getPostById(postId);
  if (!post) {
    throw new Error('Post não encontrado');
  }
  // Simula adição de likes (JSONPlaceholder não suporta esta propriedade)
  post.likes = (post.likes || 0) + likes;
  return post;
}

/**
 * Verifica se post pertence a usuário
 * @param {number} postId - ID do post
 * @param {number} userId - ID do usuário
 * @returns {Promise<boolean>} True se o post pertence ao usuário
 */
async function isPostOwnedByUser(postId, userId) {
  const post = await getPostById(postId);
  return post ? post.userId === userId : false;
}

/**
 * Obtém posts populares (simulado - com mais de 50 caracteres no título)
 * @returns {Promise<Array>} Posts populares
 */
async function getPopularPosts() {
  const posts = await getAllPosts();
  // Critério: posts com títulos longos são "populares"
  return posts.filter(post => post.title.length > 50);
}

module.exports = {
  getAllPosts,
  getPostsByUserId,
  getPostById,
  createPost,
  addLikesToPost,
  isPostOwnedByUser,
  getPopularPosts
};
