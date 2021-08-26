import React from "react";
import { YMaps, Map, Placemark } from "react-yandex-maps";

function Mapper({ latitude, longitude }) {
    return (
        <>
            {latitude ? (
                <YMaps>
                    <Map
                        defaultState={{
                            center: [latitude, longitude],
                            zoom: 9,
                        }}
                    >
                        {/* // <Placemark {...placeMark} /> */}

                        <Placemark
                            modules={["geoObject.addon.balloon"]}
                            geometry={[latitude, longitude]}
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
//                     // <Map defaultState={{ center: [latitude, longitude], zoom: 9 }}>

//                         // {coordinates.map((coordinate) => (
//                     //         // <Placemark key={0} geometry={coordinate} />
//                     //         <Placemark key={0} geometry={[latitude, longitude]} />
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
