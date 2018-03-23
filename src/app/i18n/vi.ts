export var viLocale = {
  abbr: 'vi',
  vi: 'Tiếng Việt',
  en: 'Tiếng Anh',
  months: 'Tháng 1_Tháng 2_Tháng 3_Tháng 4_Tháng 5_Tháng 6_Tháng 7_Tháng 8_Tháng 9_Tháng 10_Tháng 11_Tháng 12'.split('_'),
  monthsShort: 'TH1_TH2_TH3_TH4_TH5_TH6_TH7_TH8_TH9_TH10_TH11_TH12'.split('_'),
  weekdays: 'Chủ nhật_Thứ 2_Thứ 3_Thứ 4_Thứ 5_Thứ 6_Thứ 7'.split('_'),
  weekdaysShort: 'CN_T2_T3_T4_T5_T6_T7'.split('_'),
  weekdaysMin: 'CN_T2_T3_T4_T5_T6_T7'.split('_'),
  longDateFormat: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd, D MMMM YYYY HH:mm'
  },
  calendar: {
    sameDay: '[Hôm nay lúc] LT',
    nextDay: '[Ngày mai lúc] LT',
    nextWeek: 'dddd [lúc] LT',
    lastDay: '[Hôm qua lúc] LT',
    lastWeek: '[Tuần trước] dddd [lúc] LT',
    sameElse: 'L'
  },
  relativeTime: {
    future: 'trong %s',
    past: '%s trước',
    s: '1 vài giây',
    ss: '%d giây',
    m: '1 phút',
    mm: '%d phút',
    h: '1 giờ',
    hh: '%d giờ',
    d: '1 ngày',
    dd: '%d ngày',
    M: '1 tháng',
    MM: '%d tháng',
    y: '1 năm',
    yy: '%d năm'
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
    LANGUAGE: 'Ngôn ngữ',
    HOME: 'Trang chủ',
    REGISTER: 'Đăng ký doanh nghiệp',
    MARKETPLACE: 'Cửa hàng ứng dụng',
    CALENDAR: 'Lịch',
    USER_MANAGER: 'Quản lý tài khoản',
    ACCOUNT: 'Tài khoản',
    ROLE_GROUP: 'Nhóm quyền',
    GRANT_ROLE: 'Cấp quyền',
    USER_PROFILE: 'Thông tin cá nhân',
    CONFIG: 'Cấu hình',
    ABOUT: 'Thông tin hệ thống',
    LOGOUT: 'Đăng xuất',
    DOCUMENTS: 'Hồ sơ công việc',
    SYSTEM_CONFIG: 'Cấu hình hệ thống',
    SCHEDULER: 'Lịch trình',
    ADMIN: 'Quản trị đơn vị'
  },
  PROFILE: {
    GENERAL: 'Thông tin chung',
    USERNAME: 'Tài khoản'
  }
};
