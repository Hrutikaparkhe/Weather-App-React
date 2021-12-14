import styles from "./Home.module.scss";
import Table from "./Table";
import image from "./background.jpg";
// import Main from '../Main/Main';
import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [cityName, setCityName] = useState("");
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

    const current = new Date();
  const day = days[current.getDay()];
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;
  const [dataone, setDataone] = useState([]);
  const [mainTemp, setMainTemp] = useState("");
  const [main, setMain] = useState("");
  const [city, setCity] = useState("");
  const [iconID, setIconID] = useState("");
  const [high, setHigh] = useState("");
  const [low, setLow] = useState("");
  const [wind, setWind] = useState("");
  const [humidity, setHumidity] = useState("");
  const [sunrise, setSunrise] = useState("");
  const [sunset, setSunset] = useState("");
  //
  const getData = async (e: any) => {
    e.preventDefault();

    await axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1bd85ed6939c02056b731f2a0b6fcafb&units=metric`
      )

      .then((res) => {
        setDataone(res.data);
        console.log(dataone);
        console.log(res);

        setMainTemp(res.data.main.temp);
        setMain(res.data.weather[0].main);
        setIconID(res.data.weather[0].icon);
        setCity(res.data.name);
        setHigh(res.data.main.temp_max);
        setLow(res.data.main.temp_min);
        setWind(res.data.wind.speed);
        setHumidity(res.data.main.humidity);
        setSunrise(res.data.sys.sunrise);
        setSunset(res.data.sys.sunset);
       
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const city_name1=city;
// const [city_name,setcityName]=useState([city])
useEffect(() => {
  setCity(city) 
},[city]);

  return (
    <>
      <div className={styles.background_img}>
        <div className={styles.inpt}>
          <form onSubmit={getData}>
            {" "}
            <input
              className={styles.input_field}
              placeholder="city name"
              value={city}
              onChange={(event) => setCity(event.target.value)}
              
            />
            {/* <button  className={styles.btn} type="submit">search</button> */}
          </form>
        </div>
        <div className={styles.main}>
          <div className={styles.left}>
            <label className={styles.city_name}>{city}</label>

            <br />
            <span className={styles.date}>
              {day} {date}
            </span>
          </div>

          <div className={styles.content}>
            <div className={styles.left_side}>
              <div className={styles.icon}>
                {" "}
                <img
                  src={"http://openweathermap.org/img/wn/" + iconID + "@2x.png"}
                />
              </div>
              <label className={styles.temp}>{mainTemp}&deg;</label>
              <br />
              <span className={styles.atmsp}>{main}</span>
            </div>

            <div className={styles.right_side}>
              <table className={styles.table}>
                <tr>
                  <td>{high}&deg;</td>
                  <td>{wind}kmph</td>
                  <td>{sunrise}</td>
                </tr>
                <tr>
                  <td>high</td>
                  <td>wind</td>
                  <td>sunrise</td>
                </tr>
                <tr>
                  <td>{low}&deg;</td>
                  <td>{humidity}%</td>
                  <td>{sunset}</td>
                </tr>
                <tr>
                  <td>Low</td>
                  <td>humidity</td>
                  <td>sunset</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
