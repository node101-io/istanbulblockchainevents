const ALLOWED_LANGUAGE_VALUES = [
  'en',
  'tr'
];
const DEFAULT_LANGUAGE = 'en';

module.exports = (req, res, next) => {
  const query_language = req.query.lang && ALLOWED_LANGUAGE_VALUES.includes(req.query.lang) ? req.query.lang : null;
  let language = req.query.lang ? req.query.lang : (req.headers['accept-language'] ? req.headers['accept-language'].split('-')[0] : DEFAULT_LANGUAGE);
  
  if (!language || !ALLOWED_LANGUAGE_VALUES.includes(language))
    language = DEFAULT_LANGUAGE;

  const EVENT_TYPES = [
    res.__('Summit'),
    res.__('Party'),
    res.__('Conference'),
    res.__('Hackathon'),
    res.__('Meetup'),
    res.__('Workshop'),
    res.__('Dinner'),
    res.__('Brunch'),
    res.__('Co-living'),
    res.__('Co-work'),
    res.__('NFTs'),
    res.__('Tour'),
    res.__('Other')
  ];
  const FULL_MONTHS = [
    res.__('January'),
    res.__('February'),
    res.__('March'),
    res.__('April'),
    res.__('May'),
    res.__('June'),
    res.__('July'),
    res.__('August'),
    res.__('September'),
    res.__('October'),
    res.__('November'),
    res.__('December')
  ];
  const SHORT_MONTHS = [
    res.__('Jan'),
    res.__('Feb'),
    res.__('Mar'),
    res.__('Apr'),
    res.__('May'),
    res.__('Jun'),
    res.__('Jul'),
    res.__('Aug'),
    res.__('Sep'),
    res.__('Oct'),
    res.__('Nov'),
    res.__('Dec')
  ];

  const DISTRICTS = [
    res.__('Historical Peninsula (Fatih)'),
    res.__('Historical European District (Beyoğlu)'),
    res.__('Şişli'),
    res.__('Beşiktaş'),
    res.__('Sarıyer'),
    res.__('Golden Horn (Haliç)'),
    res.__('Kadıköy'),
    res.__('Üsküdar'),
    res.__('Beykoz'),
    res.__('Adalar')
  ]

  res.locals.EVENT_TYPES = EVENT_TYPES;
  res.locals.FULL_MONTHS = FULL_MONTHS;
  res.locals.SHORT_MONTHS = SHORT_MONTHS;
  res.locals.DISTRICTS = DISTRICTS;
  res.locals.query_lang = query_language;
  res.locals.lang = language;

  return next();
}