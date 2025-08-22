// Armazenamento simples em memória para o contador de usuários
let userCount = 0;

module.exports = (req, res) => {
  // Permitir CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Lidar com solicitações preflight (OPTIONS)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Rota para obter o contador de usuários
  if (req.url === '/user-count') {
    // Incrementar o contador
    userCount++;
    
    // Retornar o contador atual
    return res.status(200).json({
      count: userCount,
      timestamp: new Date().toISOString()
    });
  }
  
  // Rota padrão para testes
  if (req.url === '/test') {
    return res.status(200).json({
      message: 'API funcionando corretamente',
      timestamp: new Date().toISOString()
    });
  }
  
  // Rota não encontrada
  return res.status(404).json({
    error: 'Endpoint não encontrado'
  });
};
