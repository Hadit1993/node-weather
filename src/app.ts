import express from "express";
import path from "path";
import hbs from "hbs";
import getGeoLocation from "./utils/geoLocation";
import forecast from "./utils/forecast";

const app = express();

const assetPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(assetPath));

app.get("/", (req, res) => {
  res.status(200).render("index", {
    title: "Weather",
    name: "Hadi Tahmasbi",
  });
});

app.get("/about", (req, res) => {
  res.status(200).render("about", {
    title: "About me",
    name: "Hadi Tahmasbi",
  });
});

app.get("/help", (req, res) => {
  res.status(200).render("help", {
    title: "Help Page",
    message: "Hi I need help!!!!",
    name: "Hadi Tahmasbi",
  });
});

app.get("/weather", async (req, res) => {
  const { address } = req.query;

  try {
    if (!address) throw "Please provide an address";
    if (typeof address !== "string") throw "Address is invalid";
    const { latitude, longitude, location } = await getGeoLocation(
      address as string
    );
    const {
      weather_descriptions = [],
      temperature,
      feelslike,
    } = await forecast(latitude, longitude);
    res.status(200).json({
      forecast: `${
        weather_descriptions[0] ?? ""
      }. It is ${temperature} degrees out there and it feels like ${feelslike} degrees.`,
      location,
    });
  } catch (error) {
    if (typeof error === "string") return res.status(404).json({ error });
    else res.status(404).json({ error: "Something wrong happened. try later" });
  }
});

app.get("/products", (req, res) => {
  const { search } = req.query;
  if (!search) {
    return res.json({
      error: "You must provide a search term",
    });
  }
  res.json({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.status(404).render("404Page", {
    errorMessage: "help article not found",
    title: "404 Help",
    name: "Hadi Tahmasbi",
  });
});

app.get("*", (req, res) => {
  res.status(404).render("404Page", {
    errorMessage: "404 Not Found",
    title: "404 general",
    name: "Hadi Tahmasbi",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
