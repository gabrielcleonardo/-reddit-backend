const axios = require('axios');

// search for HOT posts from the "artificial" subreddit
async function fetchHotPosts() {
  try {
    const response = await axios.get('https://www.reddit.com/r/artificial/hot.json');
    const posts = response.data.data.children.map(post => ({
      title: post.data.title,
      author: post.data.author,
      created_at: new Date(post.data.created_utc * 1000),
      ups: post.data.ups,
      comments: post.data.num_comments
    }));

    return posts;
  } catch (error) {
    if (error.response) {
      console.error(`Erro na resposta do Reddit: ${error.response.status} - ${error.response.statusText}`);
    } else if (error.request) {
      console.error('Nenhuma resposta recebida do Reddit:', error.request);
    } else {
      console.error('Erro ao configurar a requisição ao Reddit:', error.message);
    }

    return []; // Returns empty array if error
  }
}

module.exports = { fetchHotPosts };
