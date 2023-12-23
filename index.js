import OAuth from "oauth-1.0a";
import crypto from "crypto-js";
import axios from "axios";

const consumerKey = ""; // Client ID
const consumerSecret = ""; // Client Secret
const tokenId = "";
const tokenSecret = "";
const restletUrl = "";
const accountId = ""; // Realm

const oauth = OAuth({
    consumer: {
        key: consumerKey,
        secret: consumerSecret,
    },
    signature_method: 'HMAC-SHA256',
    hash_function(base_string, key) {
        return crypto.HmacSHA256(base_string, key).toString(crypto.enc.Base64);
    },
});

const token = {
    key: tokenId,
    secret: tokenSecret,
}

const requestData = {
    url: restletUrl,
    method: 'get',
}

const authHeader = oauth.toHeader(oauth.authorize(requestData, token));

const headers = {
    'Authorization': `${authHeader.Authorization}, realm="${accountId}"`,
    'Content-Type': 'application/json'
}

const options = {
    headers: headers,
    method: 'get',
    url: restletUrl
};

axios(options)
    .then((response) => {
        console.log(response);
    }, (error) => {
        console.log(error);
    });




