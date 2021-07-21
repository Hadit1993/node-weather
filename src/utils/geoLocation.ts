import request from "request";
import Location from "../models/Location";
import Place from "../models/Place";

const getGeoLocation = (address: string) => {
  return new Promise<Location>((resolve, reject) => {
    const url = getGeoUrl(address);
    request({ url, json: true }, (error, response) => {
      const errorMessage = getGeoErrorMessage(error, response);

      if (errorMessage) return reject(errorMessage);

      const geoData = getGeoData(response);

      resolve(geoData);
    });
  });
};

const getGeoUrl = (address: string) => {
  const baseUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
  const encodedAddress = encodeURIComponent(address);
  const accessToken =
    "pk.eyJ1IjoiaGFkaXQxOTkzIiwiYSI6ImNrcjgyeGI1bjB0eTgyd2xwc2hsajJmYzkifQ.jUesOmyz-RrSQsT6HdTBQQ";
  const limit = 1;
  const finalUrl = `${baseUrl}${encodedAddress}.json?access_token=${accessToken}&limit=${limit}`;
  return finalUrl;
};

const getGeoErrorMessage = (error: any, response: request.Response) => {
  if (error) return "Unable to connect to location service!";
  const message = response.body.message as string;
  if (message) {
    return message;
  }
  const features = response.body.features as [];
  if (features.length === 0) {
    return "we cannot provide location try another search";
  }
  return undefined;
};

const getGeoData = (response: request.Response): Location => {
  const data = response.body.features[0] as Place;
  return {
    latitude: data.center[1],
    longitude: data.center[0],
    location: data.place_name,
  };
};

export default getGeoLocation;
