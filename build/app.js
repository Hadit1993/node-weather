"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var hbs_1 = __importDefault(require("hbs"));
var geoLocation_1 = __importDefault(require("./utils/geoLocation"));
var forecast_1 = __importDefault(require("./utils/forecast"));
var process_1 = require("process");
var app = express_1.default();
var port = process_1.env.PORT || 3000;
var assetPath = path_1.default.join(__dirname, "../public");
var viewsPath = path_1.default.join(__dirname, "../templates/views");
var partialsPath = path_1.default.join(__dirname, "../templates/partials");
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs_1.default.registerPartials(partialsPath);
app.use(express_1.default.static(assetPath));
app.get("/", function (req, res) {
    res.status(200).render("index", {
        title: "Weather",
        name: "Hadi Tahmasbi",
    });
});
app.get("/about", function (req, res) {
    res.status(200).render("about", {
        title: "About me",
        name: "Hadi Tahmasbi",
    });
});
app.get("/help", function (req, res) {
    res.status(200).render("help", {
        title: "Help Page",
        message: "Hi I need help!!!!",
        name: "Hadi Tahmasbi",
    });
});
app.get("/weather", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var address, _a, latitude, longitude, location, _b, _c, weather_descriptions, temperature, feelslike, error_1;
    var _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                address = req.query.address;
                _e.label = 1;
            case 1:
                _e.trys.push([1, 4, , 5]);
                if (!address)
                    throw "Please provide an address";
                if (typeof address !== "string")
                    throw "Address is invalid";
                return [4 /*yield*/, geoLocation_1.default(address)];
            case 2:
                _a = _e.sent(), latitude = _a.latitude, longitude = _a.longitude, location = _a.location;
                return [4 /*yield*/, forecast_1.default(latitude, longitude)];
            case 3:
                _b = _e.sent(), _c = _b.weather_descriptions, weather_descriptions = _c === void 0 ? [] : _c, temperature = _b.temperature, feelslike = _b.feelslike;
                res.status(200).json({
                    forecast: ((_d = weather_descriptions[0]) !== null && _d !== void 0 ? _d : "") + ". It is " + temperature + " degrees out there and it feels like " + feelslike + " degrees.",
                    location: location,
                });
                return [3 /*break*/, 5];
            case 4:
                error_1 = _e.sent();
                if (typeof error_1 === "string")
                    return [2 /*return*/, res.status(404).json({ error: error_1 })];
                else
                    res.status(404).json({ error: "Something wrong happened. try later" });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
app.get("/products", function (req, res) {
    var search = req.query.search;
    if (!search) {
        return res.json({
            error: "You must provide a search term",
        });
    }
    res.json({
        products: [],
    });
});
app.get("/help/*", function (req, res) {
    res.status(404).render("404Page", {
        errorMessage: "help article not found",
        title: "404 Help",
        name: "Hadi Tahmasbi",
    });
});
app.get("*", function (req, res) {
    res.status(404).render("404Page", {
        errorMessage: "404 Not Found",
        title: "404 general",
        name: "Hadi Tahmasbi",
    });
});
app.listen(port, function () {
    // console.log("Server is up on port 3000");
});
