import { IStringMap } from '../types/common';

// This's custom error
class UserError extends Error {
  public code: string;
  public data?: IStringMap;

  constructor(message: string, code = 'error', data?: IStringMap) {
    super(message || 'ไม่สามารถดำเนินการได้');
    this.name = 'UserError';
    this.code = code;
    if (data && data.constructor === Object) {
      this.data = data;
    }
  }
}

export default UserError;
