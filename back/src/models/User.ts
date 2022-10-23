import { TAll } from '@declarations/types';


// **** Variables **** //

export enum UserRoles {
  Standard,
  Admin,
}


// **** Types **** //

export interface IUser {
  id: number;
  username: string;
  email: string;
  pwdHash: string;
}


// **** Functions **** //

/**
 * Get a new User object.
 */
function _new(
  username: string,
  email: string,
  pwdHash: string,
): IUser {
  return {
    id: -1,
    email,
    username,
    pwdHash,
  };
}

/**
 * Copy a user object.
 */
function copy(user: IUser): IUser {
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    pwdHash: user.pwdHash,
  };
}

/**
 * See if an object is an instance of User.
 */
function instanceOf(arg: TAll): boolean {
  return (
    !!arg &&
    typeof arg === 'object' &&
    'id' in arg &&
    'email' in arg &&
    'username' in arg
  );
}


// **** Export default **** //

export default {
  new: _new,
  copy,
  instanceOf,
} as const;
