export const upperCaseFirstChar = (str: string): string => str[0].toUpperCase() + str.substr(1);

export const isProduction = process.env.NODE_ENV === 'production';

export const getCookie = (name: string) => {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (const _ of cookies) {
      const cookie = $.trim(_);
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
