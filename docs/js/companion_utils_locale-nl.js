LANG = 'nl'; // options are: 'nl', 'en'.
const locale = d3.formatLocale({
     'decimal': ',',
     'thousands': '.',
     'grouping': [3],
     'currency': ['€', ''],
     'dateTime': '%a %b %e %X %Y',
     'date': '%d.%m.%Y',
     'time': '%H:%M:%S',
     'periods': ['AM', 'PM'],
     'days': [ 'zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag' ],
     'shortDays': [ 'So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa' ],
     'months': [ 'januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december' ],
     'shortMonths': [ 'jan', 'feb', 'mar', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec' ]
 })
 numformat = locale.format( ',.0f' )
