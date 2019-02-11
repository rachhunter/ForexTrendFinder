//Redux action types

//updated information for authorisation
export const FIRST_NAME_CHANGED = 'first_name_changed';
export const LAST_NAME_CHANGED = 'last_name_changed';
export const EMAIL_CHANGED = 'email_changed';
export const PASSWORD_CHANGED = 'password_changed';
export const CONFIRM_PWD_CHANGED = 'confirm_pwd_changed';

//login existing user
export const LOGIN_USER = 'login_user';

//login or registration success or failure
export const LOGIN_USER_SUCCESS = 'login_user_success';
export const LOGIN_USER_FAIL = 'login_user_fail';
export const REGISTER_USER_FAIL = 'register_user_fail';

//logout user
export const LOGOUT_USER = 'logout_user';

//save user details into Firebase Database (email, firstname, lastname)
export const DATABASE_SAVE = 'database_save';
export const DATABASE_SAVE_SUCCESS = 'database_save_success';
export const DATABASE_SAVE_FAIL = 'database_save_fail';

//daily market data
export const DAILY_DATE_UPDATE = 'daily_date_update';
export const DAILY_FETCH_SUCCESS = 'daily_fetch_success';
export const DAILY_FORMAT_DATE = 'daily_format_date';
