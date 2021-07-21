import request from "request";
import Weather from "../models/Weather";

const forecast = (latitude: number, longitude: number) => {
  return new Promise<Weather>((resolve, reject) => {
    const url = getUrl(latitude, longitude);
    request({ url, json: true }, (error, response) => {
      const errorMessage = getErrorMessage(error, response);
      if (errorMessage) return reject(errorMessage);
      const data = getData(response);
      resolve(data);
    });
  });
};

const getUrl = (latitude: number, longitude: number) => {
  const baseUrl = "http://api.weatherstack.com/current";
  const accessKey = "90566982e19addc827143cc067dbd5e8";
  const query = `${latitude},${longitude}`;
  const units = "f";
  const finalUrl = `${baseUrl}?access_key=${accessKey}&query=${query}&units=${units}`;
  return finalUrl;
};

const getErrorMessage = (error: any, response: request.Response) => {
  if (error) return "Unable to connect to weather service!";
  if (response.body.error) return "Unable to find Location";
  return undefined;
};

const getData = (response: request.Response) => {
  const data = response.body.current as Weather;
  return data;
};

export default forecast;
