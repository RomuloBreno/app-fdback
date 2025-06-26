import { WebSocketServer } from 'ws';
import type { WebSocket } from 'ws';
import { verifyToken } from './utils/tokenUtil.ts';

export const clients: WebSocket[] = [];

export function setupWebSocket(port: number) {
  const wss = new WebSocketServer({ port });

  wss.on('connection', (ws: WebSocket, req: any) => {
    const urlParams = new URLSearchParams(req.url?.split('?')[1]);

    // Obtém os parâmetros da URL
    const token = urlParams.get('token')?.split(' ')[1];
    const userId = urlParams.get('userId'); // Pega o userId da URL

    if (!token || !verifyToken(token)) {
      ws.close();
      return;
    }

    
    (ws as any).userId = userId; // Salva o ID do usuário no WebSocket
    clients.push(ws);
    console.log("New client connected" + " " +`Total connected: ${clients.length}`);

    clients.forEach((client) => {
      console.log((client as any).userId);
    });

    ws.on('message', (message: any) => {
      console.log(`Mensagem recebida: ${message}`);
    });

    ws.on('close', () => {
      const index = clients.indexOf(ws);
      if (index !== -1) {
        clients.splice(index, 1);
      }
    });
  });

  console.log(`WebSocket server is running on port: ${port}`);
}
