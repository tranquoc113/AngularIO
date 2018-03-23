export var enLocale = {
  abbr: 'en',
  vi: 'Vietnamese',
  en: 'English',
  months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
  monthsShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
  weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
  weekdaysShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
  weekdaysMin: 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
  longDateFormat: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd, D MMMM YYYY HH:mm'
  },
  calendar: {
    sameDay: '[Today at] LT',
    nextDay: '[Tomorrow at] LT',
    nextWeek: 'dddd [at] LT',
    lastDay: '[Yesterday at] LT',
    lastWeek: '[Last] dddd [at] LT',
    sameElse: 'L'
  },
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: 'a few seconds',
    ss: '%d seconds',
    m: 'a minute',
    mm: '%d minutes',
    h: 'an hour',
    hh: '%d hours',
    d: 'a day',
    dd: '%d days',
    M: 'a month',
    MM: '%d months',
    y: 'a year',
    yy: '%d years'
  },
  dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
  ordinal: function (_num) {
    var num = Number(_num);
    var b = num % 10, output = (~~(num % 100 / 10) === 1) ? 'th' :
      (b === 1) ? 'st' :
        (b === 2) ? 'nd' :
          (b === 3) ? 'rd' : 'th';
    return num + output;
  },
  week: {
    dow: 1,
    doy: 4 // The week that contains Jan 4th is the first week of the year.
  },
  MENU: {
    LANGUAGE: 'Language',
    HOME: 'Home',
    REGISTER: 'Register new company',
    MARKETPLACE: 'Marketplace',
    CALENDAR: 'Calendar',
    USER_MANAGER: 'User Manager',
    ACCOUNT: 'Account',
    ROLE_GROUP: 'Role groups',
    GRANT_ROLE: 'Grant role',
    USER_PROFILE: 'Profile',
    CONFIG: 'Configuration',
    ABOUT: 'About',
    LOGOUT: 'Logout',
    DOCUMENTS: 'Documents',
    SYSTEM_CONFIG: 'System Configuration',
    SCHEDULER: 'Scheduler',
    ADMIN: 'Administrator',
    EMPLOYEE:'Nhân sự',
  },
  PROFILE: {
    GENERAL: 'General',
    USERNAME: 'Username'
  }
};
