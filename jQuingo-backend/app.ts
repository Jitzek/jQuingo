import express from 'express';
import path from 'path';

const PORT = 8000;
const app = express();

app.use(express.static(path.join(__dirname, "../", "jQuingo-frontend", "dist")));

// Return index.html of jQuingo
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "../", "jQuingo-frontend", "dist", "index.html"));
});

// app.listen() returns the HTTP server instance which we can reuse for our socket.
app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});

// TODO:Create socket (listening on the same address as server)