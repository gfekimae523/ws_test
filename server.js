// server.js
const WebSocket = require('ws');
const http = require('http');

// HTTPサーバーを作成
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('WebSocketサーバーが動作中です！\n');
});

// WebSocketサーバーをHTTPサーバーに接続
const wss = new WebSocket.Server({ server });

// 接続時の処理
wss.on('connection', (ws) => {
  console.log('新しいクライアントが接続しました。');

  // クライアントからメッセージを受信
  ws.on('message', (message) => {
    console.log(`受信したメッセージ: ${message}`);
    // すべてのクライアントにメッセージをブロードキャスト
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(`サーバーから: ${message}`);
      }
    });
  });

  // クライアントが切断した場合
  ws.on('close', () => {
    console.log('クライアントが切断しました。');
  });

  // 初回メッセージ送信
  ws.send('ようこそ！WebSocketサーバーへ接続しました。');
});

// ポートを指定してHTTPサーバーを起動
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`サーバーがポート ${PORT} で起動しました。`);
});
