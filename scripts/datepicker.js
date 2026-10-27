import AirDatepicker from 'air-datepicker';
import localeEn from 'air-datepicker/locale/en';

import 'air-datepicker/air-datepicker.css';

new AirDatepicker('#inlineCalendar', {
  inline: true,
  locale: localeEn
})
