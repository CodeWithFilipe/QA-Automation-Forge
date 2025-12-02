// photos.js - Funções para manipular fotos
const axios = require('../axiosConfig');

const API_URL = 'https://jsonplaceholder.typicode.com';

/**
 * Lista todas as fotos da API
 * @returns {Promise<Array>} Lista de fotos
 */
async function getAllPhotos() {
  try {
    const response = await axios.get(`${API_URL}/photos`);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao buscar fotos: ' + error.message);
  }
}

/**
 * Busca fotos por ID do álbum
 * @param {number} albumId - ID do álbum
 * @returns {Promise<Array>} Fotos do álbum
 */
async function getPhotosByAlbumId(albumId) {
  try {
    const response = await axios.get(`${API_URL}/albums/${albumId}/photos`);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao buscar fotos do álbum: ' + error.message);
  }
}

/**
 * Cria uma nova foto (POST para API)
 * @param {Object} photoData - Dados da foto
 * @returns {Promise<Object>} Foto criada
 */
async function createPhoto(photoData) {
  if (!photoData.title || !photoData.url) {
    throw new Error('Título e URL são obrigatórios');
  }
  try {
    const response = await axios.post(`${API_URL}/photos`, photoData);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao criar foto: ' + error.message);
  }
}

module.exports = {
  getAllPhotos,
  getPhotosByAlbumId,
  createPhoto
};
