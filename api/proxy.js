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
        // Passar os cabeçalhos necessários, mas removendo alguns que podem causar problemas
        'Accept': req.headers['accept'] || 'application/json',
        'User-Agent': req.headers['user-agent'] || 'Mozilla/5.0',
        // Se houver outros cabeçalhos que queira passar, adicione aqui
      },
      // Se for POST, passar o body
      body: req.method === 'POST' ? JSON.stringify(req.body) : undefined,
    });

    // Obter os dados da resposta
    const data = await response.text();

    // Retornar a resposta com o mesmo status e cabeçalhos (filtrados)
    res.status(response.status);
    res.set('Content-Type', response.headers.get('content-type') || 'application/json');
    res.send(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Proxy request failed' });
  }
};