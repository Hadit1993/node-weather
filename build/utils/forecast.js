"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var request_1 = __importDefault(require("request"));
var forecast = function (latitude, longitude) {
    return new Promise(function (resolve, reject) {
        var url = getUrl(latitude, longitude);
        request_1.default({ url: url, json: true }, function (error, response) {
            var errorMessage = getErrorMessage(error, response);
            if (errorMessage)
                return reject(errorMessage);
            var data = getData(response);
            resolve(data);
        });
    });
};
var getUrl = function (latitude, longitude) {
    var baseUrl = "http://api.weatherstack.com/current";
    var accessKey = "90566982e19addc827143cc067dbd5e8";
    var query = latitude + "," + longitude;
    var units = "f";
    var finalUrl = baseUrl + "?access_key=" + accessKey + "&query=" + query + "&units=" + units;
    return finalUrl;
};
var getErrorMessage = function (error, response) {
    if (error)
        return "Unable to connect to weather service!";
    if (response.body.error)
        return "Unable to find Location";
    return undefined;
};
var getData = function (response) {
    var data = response.body.current;
    return data;
};
exports.default = forecast;
