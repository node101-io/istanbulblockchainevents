module.exports = (req, res) => {
  return res.render('index/index', {
    page: 'index/index',
    title: 'İstanbul Blockchain Events',
    includes: {
      external: {
        css: ['general', 'header', 'page'],
        js: ['page', 'serverRequest','indexBars','collapsingSideBar','filterEvents']
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
