const cron = require('node-cron');
const { fetchHotPosts } = require('./services/redditService');
const Post = require('./models/post');

// Schedule task to run every day at 8 am
cron.schedule('0 8 * * *', async () => {

  console.log('Iniciando busca de postagens do Reddit...');

  try {
    const posts = await fetchHotPosts();

    if (posts.length === 0) {
      console.log('Nenhuma postagem encontrada.');
      return;
    }

    console.log(`${posts.length} postagens obtidas, iniciando o salvamento no banco de dados...`);

    // save database
    for (const post of posts) {
      await Post.create(post);
    }

    console.log('Todas as postagens foram salvas no banco de dados.');
  } catch (error) {
    console.error('Erro ao buscar ou salvar postagens:', error);
  }
});
