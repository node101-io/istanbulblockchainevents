module.exports = (req, res) => {
  return res.render('index/guide', {
    page: 'index/guide',
    title: 'İstanbul Blockchain Events',
    includes: {
      external: {
        css: ['general', 'header', 'page'],
        js: ['page', 'serverRequest','guide']
      },
      meta: {
        title: 'İstanbul Blockchain Events',
        description: 'All blockchain events in Istanbul',
        image: '/img/meta/header.png',
        twitter: true
      }
    }
  });
};
