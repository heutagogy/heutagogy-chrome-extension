// https://developer.mozilla.org/en/docs/Web/API/WindowBase64/Base64_encoding_and_decoding
/* eslint-disable */

export const encodeUnicode = (str) => {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
        return String.fromCharCode('0x' + p1);
    }));
};

export const decodeUnicode = (str) => {
    return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
};
