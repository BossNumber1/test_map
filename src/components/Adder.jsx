import React from "react";
import axios from "axios";

function Adder({
    coordinates,
    setPlacemarker,
    setNoTags,
    setLatitudeSer,
    setLongitudeSer,
}) {
    const [addBal, setAddBal] = React.useState("");
    const [addSh, setSh] = React.useState("");
    const [addDol, setDol] = React.useState("");

    const createBal = (e) => {
        e.preventDefault();

        let nameBal = document.getElementById("cre").value;
        localStorage.setItem("nameBal", nameBal);
        let id_user = localStorage.getItem("id_user");

        axios
            .post("http://localhost:80/saveBaloon/", {
                id_user: id_user,
                name: nameBal,
                coordinats: JSON.stringify([addSh, addDol]),
            })
            .then((resus) => {
                setPlacemarker(nameBal);
                setNoTags(false);
                setAddBal("");
                setDol("");
                setSh("");
                setLatitudeSer(addSh);
                setLongitudeSer(addDol);
            });
    };

    const changeHandler = (e) => {
        e.preventDefault();
        setAddBal(e.target.value);
    };

    const changeShirHandler = (e) => {
        e.preventDefault();
        setSh(e.target.value);
    };

    const changeDolHandler = (e) => {
        e.preventDefault();
        setDol(e.target.value);
    };

    return (
        <div style={{ marginBottom: 25 }}>
            <form>
                <input
                    type="text"
                    name="addbal"
                    id="cre"
                    placeholder="Имя вашей метки"
                    value={addBal}
                    onChange={changeHandler}
                />
                <input
                    type="text"
                    name="addbal"
                    placeholder="Ширина"
                    value={addSh}
                    onChange={changeShirHandler}
                />
                <input
                    type="text"
                    name="addbal"
                    placeholder="Долгота"
                    value={addDol}
                    onChange={changeDolHandler}
                />
                <button onClick={createBal} style={{ marginLeft: 10 }}>
                    Добавить
                </button>
            </form>
        </div>
    );
}

export default Adder;
