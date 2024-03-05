// mysql errorMessages
const DUPLICATE_ENTRY_ERROR = 'Duplicate entry error';
const REFERENCED_ROW_NOT_FOUND_ERROR = 'Referenced row not found error';
const UNHANDLED_QUERY_ERROR = 'Unhandled query error';
const VIEW_NOT_EXIST = 'View does not exist';

// Auth issue
const INVALID_ACCESS_TOKEN = 'Invalid access token';
const DECODE_TOKEN_ERROR = 'Error decoding access token';
const USER_NOT_FOUND = 'User is not register to access this resource';
const USER_NOT_AUTHORIZED = 'User is unauthorized to access this resource';
const INVALID_INPUT_PARAMETERS = 'Invalid input parameters';
const INTERNAL_SERVER_ERROR = 'Internal Server Error';
const App_CONFIG_NOT_FOUND = 'App config is unavailable';
const FORM_NOT_FOUND = 'Form is unavailable';
const EMAIL_ALREADY_EXISTS = 'Email already exists';
const INVALID_OTP = 'Invalid OTP'
const PELASE_CHOOSE_AN_IMAGE = 'Please choose an image'
const PROFILE_PIC_TOO_BIG = 'Profile picture too big. Should be less than 500kb'
module.exports = {
    DUPLICATE_ENTRY_ERROR,
    REFERENCED_ROW_NOT_FOUND_ERROR,
    UNHANDLED_QUERY_ERROR,
    VIEW_NOT_EXIST,
    INVALID_ACCESS_TOKEN,
    DECODE_TOKEN_ERROR,
    USER_NOT_FOUND,
    USER_NOT_AUTHORIZED,
    INVALID_INPUT_PARAMETERS,
    INTERNAL_SERVER_ERROR,
    App_CONFIG_NOT_FOUND,
    FORM_NOT_FOUND,
    EMAIL_ALREADY_EXISTS,
    INVALID_OTP,
    PELASE_CHOOSE_AN_IMAGE,
    PROFILE_PIC_TOO_BIG
};
