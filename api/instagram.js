module.exports = async (req, res) => {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) {
    return res.status(500).json({ error: 'Token manquant' });
  }

  const limit = Math.min(parseInt(req.query.limit, 10) || 9, 25);
  const fields = 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp';

  try {
    const response = await fetch(
      `https://graph.instagram.com/me/media?fields=${fields}&limit=${limit}&access_token=${token}`
    );
    if (!response.ok) {
      return res.status(502).json({ error: 'Erreur Instagram' });
    }

    const { data } = await response.json();
    res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate=3600');
    return res.status(200).json({ posts: data });
  } catch (err) {
    return res.status(500).json({ error: 'Erreur serveur' });
  }
};