// axiosConfig.js - Configuração centralizada do Axios
const axios = require('axios');
const https = require('https');

// Criar agente HTTPS que ignora erros de certificado SSL
// NOTA: Isso é apenas para desenvolvimento/testes. Em produção, use certificados válidos.
const httpsAgent = new https.Agent({  
  rejectUnauthorized: false
});

// Criar instância do axios com configurações personalizadas
const axiosInstance = axios.create({
  httpsAgent,
  timeout: 10000 // 10 segundos de timeout
});

module.exports = axiosInstance;
