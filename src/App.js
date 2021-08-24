import React from "react";
import "./App.css";
import { YMaps, Map, Placemark } from "react-yandex-maps";

function App() {
    const [shir, setShir] = React.useState(false);
    const [dol, setDol] = React.useState(false);

    const coordinates = [
        [55.684758, 37.738521],
        [57.684758, 39.738521],
    ];

    React.useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setShir(position.coords.latitude);
            setDol(position.coords.longitude);
        });
    }, []);

    return (
        <div className="App">
            {shir ? (
                <YMaps>
                    <Map defaultState={{ center: [shir, dol], zoom: 9 }}>
                        {coordinates.map((coordinate) => (
                            // <Placemark key={0} geometry={coordinate} />
                            <Placemark key={0} geometry={[shir, dol]} />
                        ))}
                    </Map>
                </YMaps>
            ) : (
                "Loading..."
            )}
        </div>
    );
}

export default App;
