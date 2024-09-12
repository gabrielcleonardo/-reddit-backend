const { fetchHotPosts } = require('./services/redditService');
const Post = require('./models/post');
const sequelize = require('./db');

(async () => {
  try {
    console.log('Buscando postagens do Reddit...');

    const posts = await fetchHotPosts();

    if (posts.length === 0) {
      console.log('Nenhuma postagem encontrada.');
      return;
    }

    console.log(`${posts.length} postagens obtidas, iniciando o salvamento no banco de dados...`);

    for (const post of posts) {
      await Post.create(post);
    }

    console.log('Postagens salvas com sucesso no banco de dados.');

    console.log('Buscando postagens salvas no banco de dados...');
    const savedPosts = await Post.findAll();
    console.log('Postagens salvas:', savedPosts.map(post => post.toJSON()));
  } catch (error) {
    console.error('Erro ao buscar ou salvar postagens:', error);
  } finally {
    await sequelize.close();
  }
})();
