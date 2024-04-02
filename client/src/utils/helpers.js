import dayjs from 'dayjs';
import customParseFormat from "dayjs/plugin/customParseFormat";
import relativeTime from "dayjs/plugin/relativeTime";

//=====================//
//    dayjs Plugins    //
//=====================//
dayjs.extend(customParseFormat);
dayjs.extend(relativeTime);


//====================//
//     Functions      //
//====================//

export const findAge = (date1, date2) => {
  const first = dayjs(date1);
  const second = dayjs(date2);

  return second.diff(first, 'year');
}
