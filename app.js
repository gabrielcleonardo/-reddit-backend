require('./cronJob');

const express = require('express');
const app = express();
const port = 3000;
const sequelize = require('./db');
const postsRoutes = require('./routes/postsRoutes');
const cors = require('cors');

app.use(cors());


// Middleware for JSON parsing
app.use(express.json());

app.use('/api', postsRoutes);

app.get('/', (req, res) => {
  res.send('API do Reddit Backend');
});

// Sever
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

// Synch db
sequelize.sync({ force: true })
  .then(() => {
    console.log('Banco de dados sincronizado');
  })
  .catch((error) => {
    console.error('Erro ao sincronizar o banco de dados:', error);
  });
