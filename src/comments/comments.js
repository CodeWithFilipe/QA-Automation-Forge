// comments.js - Funções para manipular comentários
const axios = require('../axiosConfig');

const API_URL = 'https://jsonplaceholder.typicode.com';

/**
 * Lista todos os comentários da API
 * @returns {Promise<Array>} Lista de comentários
 */
async function getAllComments() {
  try {
    const response = await axios.get(`${API_URL}/comments`);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao buscar comentários: ' + error.message);
  }
}

/**
 * Busca comentários por ID do post
 * @param {number} postId - ID do post
 * @returns {Promise<Array>} Comentários do post
 */
async function getCommentsByPostId(postId) {
  if (typeof postId !== 'number') {
    throw new Error('Post ID deve ser um número');
  }
  try {
    const response = await axios.get(`${API_URL}/posts/${postId}/comments`);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao buscar comentários do post: ' + error.message);
  }
}

/**
 * Cria um novo comentário (POST para API)
 * @param {Object} commentData - Dados do comentário
 * @returns {Promise<Object>} Comentário criado
 */
async function createComment(commentData) {
  if (!commentData.postId || !commentData.body) {
    throw new Error('Post ID e corpo são obrigatórios');
  }
  try {
    const response = await axios.post(`${API_URL}/comments`, commentData);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao criar comentário: ' + error.message);
  }
}

/**
 * Conta comentários de um post
 * @param {number} postId - ID do post
 * @returns {Promise<number>} Número de comentários
 */
async function countCommentsByPost(postId) {
  const comments = await getCommentsByPostId(postId);
  return comments.length;
}

/**
 * Deleta comentário (DELETE para API)
 * @param {number} commentId - ID do comentário
 * @returns {Promise<boolean>} True se deletado
 */
async function deleteComment(commentId) {
  if (!commentId) {
    throw new Error('Comment ID é obrigatório');
  }
  try {
    await axios.delete(`${API_URL}/comments/${commentId}`);
    return true;
  } catch (error) {
    throw new Error('Erro ao deletar comentário: ' + error.message);
  }
}

module.exports = {
  getAllComments,
  getCommentsByPostId,
  createComment,
  countCommentsByPost,
  deleteComment
};
