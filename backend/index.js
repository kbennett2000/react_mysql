import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

let dbHam = mysql.createPool({
  host: "192.168.0.235",
  user: "testUser",
  password: "password1",
  database: "HamConditionsDB",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

let dbWeather = mysql.createPool({
  host: "192.168.0.235",
  user: "testUser",
  password: "password1",
  database: "WeatherConditionsDB",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

let dbPiStar = mysql.createPool({
  host: "192.168.0.235",
  user: "testUser",
  password: "password1",
  database: "PiStarConditionsDB",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

console.log("password is " + process.env.MYSQL_PASSWORD);

app.get("/HamConditions", async (req, res) => {
  const promise = dbHam.promise();
  const query = "SELECT * FROM ConditionReports ORDER BY date_time DESC";
  const [rows, fields] = await promise.execute(query);
  return res.status(200).json({ ConditionReports: rows });
});

app.get("/WeatherConditions", async (req, res) => {
  const promise = dbWeather.promise();
  const query =
    "SELECT *, DATE_FORMAT(STR_TO_DATE(SUBSTRING(observation_time, LOCATE('on ', observation_time) + 3, LOCATE(',', observation_time) - LOCATE('on ', observation_time) - 3), '%b %d %Y'), '%m/%d/%Y') AS modified_date, TIME_FORMAT(STR_TO_DATE(SUBSTRING(observation_time, LOCATE(', ', observation_time) + 2), '%l:%i %p'), '%H:%i') AS modified_time FROM WeatherConditionsDB.ConditionReports ORDER BY modified_date DESC, modified_time DESC;";
  const [rows, fields] = await promise.execute(query);
  return res.status(200).json({ ConditionReports: rows });
});

app.get("/PiStarConditions", async (req, res) => {
  const promise = dbPiStar.promise();
  const query = "SELECT * FROM ConditionReports ORDER BY date DESC, time DESC";
  const [rows, fields] = await promise.execute(query);
  return res.status(200).json({ ConditionReports: rows });
});

app.listen(8800, "0.0.0.0", () => {
  console.log("Connected to backend");
});