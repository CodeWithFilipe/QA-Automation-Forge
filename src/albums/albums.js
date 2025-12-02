// albums.js - Funções para manipular álbuns
const axios = require('../axiosConfig');

const API_URL = 'https://jsonplaceholder.typicode.com';

/**
 * Lista todos os álbuns da API
 * @returns {Promise<Array>} Lista de álbuns
 */
async function getAllAlbums() {
  try {
    const response = await axios.get(`${API_URL}/albums`);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao buscar álbuns: ' + error.message);
  }
}

/**
 * Busca álbuns por ID do usuário
 * @param {number} userId - ID do usuário
 * @returns {Promise<Array>} Álbuns do usuário
 */
async function getAlbumsByUserId(userId) {
  try {
    const response = await axios.get(`${API_URL}/albums?userId=${userId}`);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao buscar álbuns do usuário: ' + error.message);
  }
}

/**
 * Cria um novo álbum (POST para API)
 * @param {Object} albumData - Dados do álbum
 * @returns {Promise<Object>} Álbum criado
 */
async function createAlbum(albumData) {
  if (!albumData.title) {
    throw new Error('Título é obrigatório');
  }
  try {
    const response = await axios.post(`${API_URL}/albums`, albumData);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao criar álbum: ' + error.message);
  }
}

module.exports = {
  getAllAlbums,
  getAlbumsByUserId,
  createAlbum
};
