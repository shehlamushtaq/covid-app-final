import axios from "axios";
import React, { useState, useEffect } from "react";
import MediaCard from "./MediaCard";
import { Doughnut, Bar } from "react-chartjs-2";
import Grid from "@material-ui/core/Grid";

function Api() {
  const [confirmed, setConfirmed] = useState(0);
  const [recovered, setRecovered] = useState(0);
  const [deaths, setDeaths] = useState(0);
  const [data, setData] = useState({});

  const [selectedCountry, setSelectedCountry] = useState("");
  const [countryData, setCountryData] = useState(null);
  const [countries, setCountries] = useState([]);
  const [countryURL, setCountryURL] = useState("");

  useEffect(() => {
    axios.get("https://covid19.mathdro.id/api").then((res) => {
      console.log(res.data);
      console.log(res.data.confirmed.value);

      setConfirmed(res.data.confirmed.value);
      setRecovered(res.data.recovered.value);
      setDeaths(res.data.deaths.value);
      setData({
        confirmed,
        deaths,
        recovered,
      });
    });
  }, []);

  //===================================================
  // useEffect(() => {
  //   if (selectedCountry !== "") {
  //     axios.get(countryURL + "/" + selectedCountry).then((res3) => {
  //       console.log(res3);
  //       setCountryData(res3.data);
  //     });
  //   } else {
  //     setCountryData(null);
  //   }
  // }, [selectedCountry]);
//===========================================================
  // const countryDataView = countryData ? (
  //   <DisplayCountryData
  //     confirmed={countryData.confirmed.value}
  //     recovered={countryData.recovered.value}
  //     deaths={countryData.deaths.value}
  //   />
  // ) : null;
  // const view2 =
  //   countries.length === 0 ? null : (
  //     <div>
  //       <select onChange={(e) => setSelectedCountry(e.target.value)}>
  //         <option value="">Select country</option>
  //         {countries.map((item, ind) => (
  //           <option value={item.name}>{item.name}</option>
  //         ))}
  //       </select>
  //       {countryDataView}
  //     </div>
  //   );
  // const view =
  //   confirmed === "" ? (
  //     <p>Loading data, please wait ...</p>
  //   ) : (
  //     <>
  //       <GlobalData
  //         confirmed={confirmed}
  //         deaths={deaths}
  //         recovered={recovered}
  //       />
  //       {view2}
  //     </>
  //   );
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <MediaCard text="Confirmed Cases" value={confirmed} color="pink" />
          <MediaCard text="Recovered Cases" value={recovered} color="grey" />
          <MediaCard text="Deaths Cases" value={deaths} color="offWhite" />
        </Grid>
        <Grid item xs={8} style={{ backgroundColor: "#fff" }}>
          <Bar
            data={{
              labels: ["confirmed", "Recovered", "Deaths"],
              datasets: [
                {
                  label: "People",
                  backgroundColor: [
                    "rgba(0, 0, 255, 0.5)",
                    "rgba(0, 255, 0, 0.5)",
                    "rgba(255, 0, 0, 0.5)",
                  ],
                  data: [confirmed, recovered, deaths],
                },
              ],
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default Api;
