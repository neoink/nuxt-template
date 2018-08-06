export const getCookies = (cookieName, stringCookie) => {
  if (typeof stringCookie === 'undefined') {
    return false;
  }

  if (stringCookie.indexOf(cookieName) === -1) {
    return false;
  }

  const strCookie = new RegExp(`${cookieName}[^;]+`).exec(stringCookie)[0];
  return unescape(strCookie ? strCookie.toString().replace(/^[^=]+./, '') : '');
};

{{#if i18n}}
export const dateFormat = (dateString, method, param) => {
  //    Methods :                 Params :
  //    'returnDateElement'       'day' / 'month' / 'year'
  //    'returnFormatedDate'      'en' / 'fr' / 'de' / 'nl'

  if (typeof dateString === 'undefined') {
    throw new Error('dateFormat is not defined');
  }

  const dateSplit = dateString.split('-');

  const date = {
    day: dateSplit[2],
    month: dateSplit[1],
    year: dateSplit[0],
  };

  let output = '';

  switch (method) {
    case 'returnFormatedDate':
      switch (param) {
        {{#each i18Config as |value key|}}  
        {{#if_eq key 'FR'}}
        case 'fr':
          output = `${date.day}/${date.month}/${date.year}`; // d/m/Y
          break;
        {{/if_eq}}
        {{#if_eq key 'ES'}}
        case 'es':
          output = `${date.day}/${date.month}/${date.year}`; // d/m/Y
          break;
        {{/if_eq}}
        {{#if_eq key 'IT'}}
        case 'it':
          output = `${date.day}/${date.month}/${date.year}`; // d/m/Y
          break;
        {{/if_eq}}
        {{#if_eq key 'IE'}}
        case 'ie':
          output = `${date.day}/${date.month}/${date.year}`; // d/m/Y
          break;
        {{/if_eq}}
        {{#if_eq key 'DE'}}
        case 'de':
          output = `${date.day}.${date.month}.${date.year}`; // d.m.Y
          break;
        {{/if_eq}}
        {{#if_eq key 'NL'}}
        case 'nl':
          output = `${date.day}-${date.month}-${date.year}`; // d-m-Y
          break;
        {{/if_eq}}
        {{#if_eq key 'BE'}}
        case 'be':
          output = `${date.day}-${date.month}-${date.year}`; // d-m-Y
          break;
        {{/if_eq}}
        {{/each}}
        default:
          output = `${date.year}-${date.month}-${date.day}`; // Y-m-d
          break;
      }
      break;

    case 'returnDateElement':
      switch (param) {
        case 'day':
          output = date.day;
          break;
        case 'month':
          output = date.month;
          break;
        case 'year':
          output = date.year;
          break;
        default:
          output = '';
          break;
      }
      break;

    default:
      output = '';
      break;
  }

  return output;
};
{{/if}}