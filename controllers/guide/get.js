module.exports = (req, res) => {
  return res.render('guide/index', {
    page: 'guide/index',
    title: 'İstanbul Blockchain Events',
    includes: {
      external: {
        css: ['general', 'header', 'page'],
        js: ['page', 'serverRequest','guideSearch']
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
