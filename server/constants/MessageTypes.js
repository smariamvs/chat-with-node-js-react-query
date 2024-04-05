'use strict';

let MESSAGE_TYPE = {
    INITIAL_DATA: 'INITIAL_DATA',
    SEND_MESSAGE: 'SEND_MESSAGE',
    NEW_MESSAGE : 'NEW_MESSAGE',
    DELETE_MESSAGE : 'DELETE_MESSAGE',
};

module.exports =
    Object.freeze(MESSAGE_TYPE);
