"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var request_1 = __importDefault(require("request"));
var getGeoLocation = function (address) {
    return new Promise(function (resolve, reject) {
        var url = getGeoUrl(address);
        request_1.default({ url: url, json: true }, function (error, response) {
            var errorMessage = getGeoErrorMessage(error, response);
            if (errorMessage)
                return reject(errorMessage);
            var geoData = getGeoData(response);
            resolve(geoData);
        });
    });
};
var getGeoUrl = function (address) {
    var baseUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
    var encodedAddress = encodeURIComponent(address);
    var accessToken = "pk.eyJ1IjoiaGFkaXQxOTkzIiwiYSI6ImNrcjgyeGI1bjB0eTgyd2xwc2hsajJmYzkifQ.jUesOmyz-RrSQsT6HdTBQQ";
    var limit = 1;
    var finalUrl = "" + baseUrl + encodedAddress + ".json?access_token=" + accessToken + "&limit=" + limit;
    return finalUrl;
};
var getGeoErrorMessage = function (error, response) {
    if (error)
        return "Unable to connect to location service!";
    var message = response.body.message;
    if (message) {
        return message;
    }
    var features = response.body.features;
    if (features.length === 0) {
        return "we cannot provide location try another search";
    }
    return undefined;
};
var getGeoData = function (response) {
    var data = response.body.features[0];
    return {
        latitude: data.center[1],
        longitude: data.center[0],
        location: data.place_name,
    };
};
exports.default = getGeoLocation;
