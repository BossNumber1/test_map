import React from "react";
import { YMaps, Map, Placemark } from "react-yandex-maps";

function Mapper() {
    const [currentLatitude, setLatitude] = React.useState(false);
    const [currentLongitude, setLongitude] = React.useState(false);

    React.useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
        });
    }, []);

    return (
        <>
            {currentLatitude ? (
                <YMaps>
                    <Map
                        defaultState={{
                            center: [currentLatitude, currentLongitude],
                            zoom: 9,
                        }}
                    >
                        {/* // <Placemark {...placeMark} /> */}

                        <Placemark
                            modules={["geoObject.addon.balloon"]}
                            geometry={[currentLatitude, currentLongitude]}
                            properties={{
                                balloonContent: "Название локации из списка",
                            }}
                        />
                    </Map>
                </YMaps>
            ) : (
                "Loading..."
            )}
        </>
    );
}

export default Mapper;

//  <YMaps>
//                     // <Map defaultState={{ center: [currentLatitude, currentLongitude], zoom: 9 }}>

//                         // {coordinates.map((coordinate) => (
//                     //         // <Placemark key={0} geometry={coordinate} />
//                     //         <Placemark key={0} geometry={[currentLatitude, currentLongitude]} />
//                     //     ))}
//                     // </Map>
//                     <Map state={mapState}>
//                     // <Placemark {...placeMark} />

//                     <Placemark
//               geometry={[0, 0]}
//               options={{ balloonContentLayout: "this.state.template" }}
//             />
//                 </Map>
//                 </YMaps>

//---------------------------------------

//const mapState = { center: [56.85, 53.2], zoom: 12 };
// const placeMark = {
//     geometry: [56.848217, 53.236675],
//     properties: {
//         hintContent: 'Это хинт',
//         balloonContent: 'Это балун'
//     },
//     modules: {
//         ['geoObject.addon.balloon', 'geoObject.addon.hint']
//     }
// }
