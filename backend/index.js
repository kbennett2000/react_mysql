import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

let dbHam = mysql.createPool({
  host: "192.168.1.85",
  user: "testUser",
  password: "password1",
  database: "HamConditionsDB",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

let dbWeather = mysql.createPool({
  host: "192.168.1.85",
  user: "testUser",
  password: "password1",
  database: "WeatherConditionsDB",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

let dbPiStar = mysql.createPool({
  host: "192.168.1.85",
  user: "testUser",
  password: "password1",
  database: "PiStarConditionsDB",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

let dbOWM = mysql.createPool({
  host: "192.168.1.85",
  user: "testUser",
  password: "password1",
  database: "OWMConditionsDB",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

let dbBiden = mysql.createPool({
  host: "192.168.1.85",
  user: "testUser",
  password: "password1",
  database: "Biden538DB",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

let dbGasPrices = mysql.createPool({
  host: "192.168.1.85",
  user: "testUser",
  password: "password1",
  database: "GasPriceDB",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

app.get("/HamConditions", async (req, res) => {
  const promise = dbHam.promise();
  const query = "SELECT * FROM ConditionReports ORDER BY date_time DESC LIMIT 24";
  const [rows, fields] = await promise.execute(query);
  return res.status(200).json({ ConditionReports: rows });
});

app.get("/HamConditionsChartData", async (req, res) => {
  const promise = dbHam.promise();
  const query = "SELECT * FROM ConditionReports ORDER BY date_time DESC LIMIT 168";
  const [rows, fields] = await promise.execute(query);
  return res.status(200).json({ ConditionReports: rows });
});

app.get("/WeatherConditions", async (req, res) => {
  const promise = dbWeather.promise();
  const query =
    "SELECT *, DATE_FORMAT(STR_TO_DATE(SUBSTRING(observation_time, LOCATE('on ', observation_time) + 3, LOCATE(',', observation_time) - LOCATE('on ', observation_time) - 3), '%b %d %Y'), '%m/%d/%Y') AS modified_date, TIME_FORMAT(STR_TO_DATE(SUBSTRING(observation_time, LOCATE(', ', observation_time) + 2), '%l:%i %p'), '%H:%i') AS modified_time FROM WeatherConditionsDB.ConditionReports ORDER BY modified_date DESC, modified_time DESC LIMIT 24;";
  const [rows, fields] = await promise.execute(query);
  return res.status(200).json({ ConditionReports: rows });
});

app.get("/PiStarConditions", async (req, res) => {
  const promise = dbPiStar.promise();
  const query = "SELECT * FROM ConditionReports ORDER BY date DESC, time DESC";
  const [rows, fields] = await promise.execute(query);
  return res.status(200).json({ ConditionReports: rows });
});

app.get("/OWMConditions", async (req, res) => {
  const promise = dbOWM.promise();
  const query = "SELECT * FROM OWMConditionsDB.ConditionReports ORDER BY date DESC, time DESC LIMIT 96";
  const [rows, fields] = await promise.execute(query);
  return res.status(200).json({ ConditionReports: rows });
});

app.get("/OWMChartData", async (req, res) => {
  const promise = dbOWM.promise();
  const query = "SELECT * FROM (SELECT * FROM OWMConditionsDB.ConditionReports ORDER BY date ASC, time ASC LIMIT 96) AS top_96 ORDER BY date DESC, time DESC";
  const [rows, fields] = await promise.execute(query);
  return res.status(200).json({ ConditionReports: rows });
});

app.get("/BidenData", async (req, res) => {
  const promise = dbBiden.promise();
  const query = "SELECT * FROM Biden538DB.BidenApproval ORDER BY reportDate DESC, date DESC, time DESC LIMIT 90";
  const [rows, fields] = await promise.execute(query);
  return res.status(200).json({ BidenApproval: rows });
});

app.get("/BidenChartData", async (req, res) => {
  const promise = dbBiden.promise();
  const query = "SELECT * FROM (SELECT * FROM Biden538DB.BidenApproval ORDER BY reportDate DESC, date DESC, time DESC) AS entireDataSet ORDER BY reportDate ASC";
  const [rows, fields] = await promise.execute(query);
  return res.status(200).json({ BidenApproval: rows });
});

app.get("/GasPriceData", async (req, res) => {
  const promise = dbGasPrices.promise();
  const query = "SELECT * FROM GasPriceDB.GasPrices ORDER BY date DESC, time DESC LIMIT 90";
  const [rows, fields] = await promise.execute(query);
  return res.status(200).json({ GasPrices: rows });
});

app.get("/GasPriceChartData", async (req, res) => {
  const promise = dbBiden.promise();
  const query = "SELECT * FROM (SELECT * FROM GasPriceDB.GasPrices ORDER BY date DESC, time DESC) AS entireDataSet ORDER BY date ASC, time ASC";
  const [rows, fields] = await promise.execute(query);
  return res.status(200).json({ GasPrices: rows });
});

app.listen(8800, "0.0.0.0", () => {
  console.log("Connected to backend");
});
