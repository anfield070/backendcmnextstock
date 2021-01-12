import moment from 'moment';
import 'moment/locale/th';

import { IStringMap } from '../types/common';

export const randomString = (
  n: number,
  possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
): string => {
  let text = '';
  for (let i = 0; i < n; i += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
};

export const randomNumber = (min: number, max: number): number => {
  return Math.ceil(Math.random() * (max - min)) + min;
};

export const randomIndexFromArray = (arr: any[]) => {
  return Math.floor(Math.random() * arr.length);
};

export const randomValueFromArray = (arr: any[]) => {
  return arr[randomIndexFromArray(arr)];
};

export const removeObjectKey = (obj: IStringMap, prop: string | number) => {
  const { [prop]: omit, ...res } = obj;
  return res;
};

export const removeObjectKeys = (obj: IStringMap, props: Array<string | number> = []) => {
  let object = obj;
  for (let i = 0; i < props.length; i += 1) {
    const prop = props[i];
    object = removeObjectKey(object, prop);
  }
  return object;
};

export const escapeRegExp = (str: string): string => (str || '').replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');

export const isValidUrl = (str: string) => {
  return /^https?:\/\/.+/.test(str);
};

export const isValidEmail = (email: string): boolean => {
  // eslint-disable-next-line no-useless-escape
  const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return re.test(email);
};

export const convertStringToDate = (dateString: string): Date | null => {
  if (new RegExp('^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}$', 'im').test(dateString)) {
    const d = new Date(dateString);
    if (d.toString() !== 'Invalid Date') {
      return d;
    }
  }
  return null;
};

export const dateToTimeStamp = (d: Date) => {
  return Math.round(d.getTime() / 1000);
};

export const convertToThaiTimeZoneMoment = (dateString: string, momentFormat: string) => {
  return moment.tz(dateString, momentFormat, 'Asia/Bangkok');
};
