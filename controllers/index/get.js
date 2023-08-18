module.exports = (req, res) => {
  return res.render('index/index', {
    page: 'index/index',
    title: res.__('İstanbul Blockchain Events'),
    includes: {
      external: {
        css: ['general', 'page'],
        js: ['page', 'serverRequest']
      },
      meta: {
        title: res.__('İstanbul Blockchain Events'),
        description: res.__('All blockchain events in Istanbul'),
        image: '/img/meta/header.png',
        twitter: true
      }
    },
  });
};
