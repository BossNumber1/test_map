import React from "react";
import "./App.css";
import Adder from "./components/Adder";
import Auth from "./components/auth/Auth";
import BalList from "./components/BalList";
import Mapper from "./components/Mapper";
import axios from "axios";

function App() {
    const [placemarker, setPlacemarker] = React.useState("");
    const [noTags, setNoTags] = React.useState(false);
    const [goodAuth, setGoodAuth] = React.useState(false);

    const [currentLatitude, setLatitude] = React.useState(false);
    const [currentLongitude, setLongitude] = React.useState(false);

    const [latitude, setLatitudeSer] = React.useState("");
    const [longitude, setLongitudeSer] = React.useState("");

    const coordinates = [currentLatitude, currentLongitude];

    React.useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
        });
    }, []);

    const changeHandler = (e) => {
        e.preventDefault();
        setPlacemarker(e.target.value);
    };

    React.useEffect(() => {
        if (goodAuth) {
            getBal();
        }
    }, [goodAuth]);

    const getBal = () => {
        let id_user = localStorage.getItem("id_user");
        axios
            .post("http://localhost:80/getBaloons/", {
                id_user: id_user,
            })
            .then((resultat) => {
                if (resultat.data !== "[]") {
                    let name = JSON.parse(resultat.data)[0].name;
                    let coor = JSON.parse(
                        JSON.parse(resultat.data)[0].coordinats
                    );
                    // coor.split

                    // let cir = coor.split(",");
                    debugger;
                    setPlacemarker(name);
                    // setLatitudeSer(cir[0]);
                    // setLongitudeSer(cir[1]);
                    setLatitudeSer(coor[0]);
                    setLongitudeSer(coor[1]);
                } else {
                    setNoTags("Меток нет");
                }
            });
    };

    return (
        <div className="App">
            {!goodAuth ? (
                <Auth setGoodAuth={setGoodAuth} />
            ) : (
                <>
                    <div style={{ marginBottom: 25 }}>
                        <h3>Вы вошли, как - {localStorage.getItem("login")}</h3>
                    </div>
                    <Adder
                        coordinates={coordinates}
                        setPlacemarker={setPlacemarker}
                        setNoTags={setNoTags}
                        setLatitudeSer={setLatitudeSer}
                        setLongitudeSer={setLongitudeSer}
                    />
                    <div style={{ marginBottom: 25 }}>{noTags}</div>
                    <BalList
                        placemarker={placemarker}
                        changeHandler={changeHandler}
                        coordinates={coordinates}
                        setPlacemarker={setPlacemarker}
                        setNoTags={setNoTags}
                        noTags={noTags}
                        // changeLatHandler={changeLatHandler}
                        // changeLongHandler={changeLongHandler}
                        latitude={latitude}
                        longitude={longitude}
                        setLatitudeSer={setLatitudeSer}
                        setLongitudeSer={setLongitudeSer}
                    />
                    <Mapper
                        currentLatitude={currentLatitude}
                        currentLongitude={currentLongitude}
                    />
                </>
            )}
        </div>
    );
}

export default App;
