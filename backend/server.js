const app = require('./app');
const config = require('./config');
const db = require('./config/db');

const MAX_PORT_ATTEMPTS = 10;

async function start() {
  await db.connect();

  const port = Number(config.port);
  if (!Number.isInteger(port) || port < 0 || port > 65535) {
    throw new Error(`Invalid PORT value: ${config.port}`);
  }

  const tryListen = (p) =>
    new Promise((resolve, reject) => {
      const server = app.listen(p, () => resolve(server));
      server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') resolve(null);
        else reject(err);
      });
    });

  const maxAttempts = config.nodeEnv === 'production' ? 1 : MAX_PORT_ATTEMPTS;
  for (let i = 0; i < maxAttempts; i++) {
    const p = port + i;
    const server = await tryListen(p);
    if (server) {
      app.set('port', p);
      console.log(`PatriotAI backend running on http://localhost:${p}`);
      if (p !== port) {
        console.log(`(Port ${port} was in use. Use PORT=${p} or free port ${port}: lsof -ti:${port} | xargs kill -9)`);
      }
      return;
    }
  }
  throw new Error(`No port available in range ${port}-${port + maxAttempts - 1}`);
}

start().catch((err) => {
  console.error('Startup failed:', err);
  process.exit(1);
});
