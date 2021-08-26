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

    const [latitude, setLatitude] = React.useState(false);
    const [longitude, setLongitude] = React.useState(false);

    const coordinates = [latitude, longitude];

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
                    setPlacemarker(name);
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
                    />
                    <div style={{ marginBottom: 25 }}>{noTags}</div>
                    <BalList
                        placemarker={placemarker}
                        changeHandler={changeHandler}
                        coordinates={coordinates}
                        setPlacemarker={setPlacemarker}
                        setNoTags={setNoTags}
                        noTags={noTags}
                    />
                    <Mapper latitude={latitude} longitude={longitude} />
                </>
            )}
        </div>
    );
}

export default App;
