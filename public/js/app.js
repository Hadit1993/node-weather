const weatherForm = document.querySelector ('form');
const search = document.querySelector ('input');
const message1 = document.querySelector ('#message-1');
const message2 = document.querySelector ('#message-2');

const getForecast = address => {
  message1.textContent = 'Loading....';
  message2.textContent = '';

  fetch (`/weather?address=${address}`).then (res => {
    res.json ().then (data => {
      const {error, forecast, location} = data;

      if (error) return (message1.textContent = error);
      message1.textContent = location;
      message2.textContent = forecast;
    });
  });
};

message1.textContent = 'From javascript';
weatherForm.addEventListener ('submit', event => {
  event.preventDefault ();

  const location = search.value;
  getForecast (location);
});
