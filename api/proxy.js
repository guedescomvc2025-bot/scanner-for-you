const fetch = require('node-fetch');

module.exports = async (req, res) => {
  // Permitir apenas métodos GET e POST
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Obter a URL de destino dos query parameters
  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).json({ error: 'Missing target URL' });
  }

  try {
    // Fazer a requisição para a URL de destino
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': '0'
      },
      timeout: 15000 // 15 segundos de timeout
    });

    // Obter os dados da resposta
    const data = await response.text();

    // Retornar a resposta com o mesmo status e cabeçalhos (filtrados)
    res.status(response.status);
    
    // Definir cabeçalhos CORS para permitir requisições de qualquer origem
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    
    // Manter o content-type original se existir
    const contentType = response.headers.get('content-type');
    if (contentType) {
      res.setHeader('Content-Type', contentType);
    }
    
    res.send(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Proxy request failed' });
  }
};
