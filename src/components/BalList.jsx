import React from "react";
import axios from "axios";

function BalList({
    placemarker,
    changeHandler,
    coordinates,
    setPlacemarker,
    setNoTags,
    noTags,
    //     changeLatHandler,
    // changeLongHandler,
    latitude,
    longitude,
    setLatitudeSer,
    setLongitudeSer,
    placemarkerAll,
}) {
    const [show, setShow] = React.useState(false);

    const upgrade = () => {
        let id_user = localStorage.getItem("id_user");

        axios
            .post("http://localhost:80/updateBaloon/", {
                id_user: id_user,
                name: placemarker,
                coordinats: JSON.stringify(coordinates),
            })
            .then((resus) => {
                setShow(false);
            });
    };

    const showForm = () => {
        setShow(true);
    };

    const delBal = () => {
        let id_user = localStorage.getItem("id_user");

        //         let um = placemarkerAll;
        //         debugger;

        //         let index = placemarkerAll.indexOf(placemarker);

        //         if (index > -1) {
        //             placemarkerAll.splice(index, 1);
        //         }
        //         let gin = placemarkerAll;
        //         // alert(placemarkerAll);
        // setPlacemarker(gin)
        //         debugger;

        axios
            .post("http://localhost:80/deleteBaloon/", {
                id_user: id_user,
                name: placemarker,
                // name: localStorage.setItem("nameBal"),
            })
            .then((resultat) => {
                setPlacemarker(false);
                setNoTags("Меток нет");
            });
    };

    const changeLatHandler = (e) => {
        e.preventDefault();
        setLatitudeSer(e.target.value);
    };

    const changeLongHandler = (e) => {
        e.preventDefault();
        setLongitudeSer(e.target.value);
    };

    return (
        <div style={{ marginBottom: 25 }}>
            {!noTags && (
                <>
                    <div style={{ display: "flex", marginBottom: 25 }}>
                        {!show ? (
                            <>
                                {placemarker}
                                <form>
                                    <button
                                        onClick={showForm}
                                        style={{ marginLeft: 10 }}
                                    >
                                        Редактировать
                                    </button>
                                    <button
                                        onClick={delBal}
                                        style={{ marginLeft: 10 }}
                                    >
                                        Удалить
                                    </button>
                                </form>
                            </>
                        ) : (
                            <form>
                                <input
                                    type="text"
                                    name="bal"
                                    id="red"
                                    value={placemarker}
                                    onChange={changeHandler}
                                />
                                <input
                                    type="text"
                                    name="addbal"
                                    id="cre"
                                    value={latitude}
                                    onChange={changeLatHandler}
                                />
                                <input
                                    type="text"
                                    name="addbal"
                                    value={longitude}
                                    onChange={changeLongHandler}
                                />
                                <button
                                    onClick={upgrade}
                                    style={{ marginLeft: 10 }}
                                >
                                    Сохранить
                                </button>
                                <button
                                    onClick={delBal}
                                    style={{ marginLeft: 10 }}
                                >
                                    Удалить
                                </button>
                            </form>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default BalList;
