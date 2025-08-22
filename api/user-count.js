// api/user-count.js
// Simples contador de usuários (em produção, use um sistema mais robusto como Redis)
let userCount = 0;
let lastReset = Date.now();

export default function handler(req, res) {
  const now = Date.now();
  
  // Resetar contador a cada hora para evitar números muito altos
  if (now - lastReset > 3600000) {
    userCount = 0;
    lastReset = now;
  }
  
  if (req.method === 'GET') {
    // Simular alguns usuários online (em produção, use WebSockets para contagem real)
    userCount = Math.max(5, Math.floor(userCount * 0.95 + Math.random() * 10));
    
    res.status(200).json({ 
      count: userCount,
      timestamp: new Date().toISOString()
    });
  } else {
    res.status(405).json({ message: 'Método não permitido' });
  }
}
