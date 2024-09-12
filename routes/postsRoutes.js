const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const { Op, fn, col } = require('sequelize');

// Endpoint 1: Query by date and order
router.get('/posts', async (req, res) => {
  const { startDate, endDate, order } = req.query;

  console.log('Parâmetros recebidos:', { startDate, endDate, order });

  const validOrders = ['ups', 'comments'];
  if (order && !validOrders.includes(order)) {
    return res.status(400).json({ error: 'Parâmetro de ordenação inválido' });
  }

  try {
    const posts = await Post.findAll({
      where: {
        created_at: {
          [Op.between]: [startDate + ' 00:00:00', endDate + ' 23:59:59']
        }
      },
      order: [[order || 'ups', 'DESC']]
    });

    console.log('Postagens encontradas:', posts);

    res.json(posts);
  } catch (error) {
    console.error('Erro ao buscar postagens:', error);
    res.status(500).json({ error: 'Erro ao buscar postagens' });
  }
});


// Endpoint 2: Query in order of authors
router.get('/authors', async (req, res) => {
  const { order } = req.query;

  console.log('Parâmetro recebido:', { order });

  const validOrders = ['totalUps', 'totalComments'];
  if (!validOrders.includes(order)) {
    return res.status(400).json({ error: 'Parâmetro de ordenação inválido' });
  }

  try {
    const authors = await Post.findAll({
      attributes: [
        'author',
        [fn('SUM', col('ups')), 'totalUps'],
        [fn('SUM', col('comments')), 'totalComments']
      ],
      group: 'author',
      order: [[order || 'totalUps', 'DESC']]
    });

    console.log('Autores encontrados:', authors);

    res.json(authors);
  } catch (error) {
    console.error('Erro ao buscar autores:', error);
    res.status(500).json({ error: 'Erro ao buscar autores' });
  }
});


module.exports = router;
