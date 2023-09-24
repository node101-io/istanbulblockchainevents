const FULL_MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];
const SHORT_MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];

function getSuffix(date) {
  let lastDigit = date % 10, lastTwoDigits = date % 100;
  return (lastTwoDigits >= 11 && lastTwoDigits <= 13) ? 'th' : ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th', 'th'][lastDigit];
};

function formatSliderDate(event) {
  const startDate = event.start_date;
  const endDate = event.end_date;
  const startDay = startDate.getDate(), endDay = (endDate ? endDate.getDate() : null);
  const startMonth = FULL_MONTHS[startDate.getMonth()], endMonth = (endDate) ? FULL_MONTHS[endDate.getMonth()] : null;
  const startYear = startDate.getFullYear(), endYear = (endDate) ? endDate.getFullYear() : null;

  if (!endDate || startDate.getTime() === endDate.getTime())
    return `${startMonth} ${startDay}${getSuffix(startDay)}, ${startYear}`;
  else if (startDate.getMonth() === endDate.getMonth() && startYear === endYear)
    return `${startMonth} ${startDay}${getSuffix(startDay)} - ${endDay}${getSuffix(endDay)}, ${startYear}`;
  else if (startYear === endYear)
    return `${startMonth} ${startDay}${getSuffix(startDay)} - ${endMonth} ${endDay}${getSuffix(endDay)}, ${startYear}`;
  else
    return `${startMonth} ${startDay}${getSuffix(startDay)}, ${startYear} - ${endMonth} ${endDay}${getSuffix(endDay)}, ${endYear}`;
};

module.exports = (event, callback) => {
  if (!event || !event._id)
    return callback('document_not_found');

  return callback(null, {
    _id: event._id.toString(),
    name: event.name,
    description: event.description,
    category: event.category,
    event_type: event.event_type,
    start_date: event.start_date,
    end_date: event.end_date,
    formatted_date: `${SHORT_MONTHS[event.start_date.getMonth()]} ${event.start_date.getDate()}${event.end_date && event.start_date.getMonth() === event.end_date.getMonth() ? ' - ' + event.end_date.getDate() : ''}`,
    slider_formatted_date: formatSliderDate(event),
    logo: event.logo,
    label: event.label,
    location: event.location,
    register_url: event.register_url,
    is_slider: event.is_slider,
    is_side: event.is_side,
    social_media_accounts: event.social_media_accounts,
    translations: event.translations,
    is_completed: event.is_completed
  });
}
