import {getRequestConfig} from 'next-intl/server';
import { notFound } from 'next/navigation';

const locales = ['en', 'vn', 'ko'];
 
export default getRequestConfig(async ({requestLocale}) => {
  let locale = await requestLocale;
 
  if (!locale || !locales.includes(locale)) {
    locale = 'vn';
  }

  try {
      return {
        locale,
        messages: (await import(`./messages/${locale}.json`)).default
      };
  } catch (error) {
      return {
          locale,
          messages: {}
      }
  }
});
