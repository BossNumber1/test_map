import React from "react";
import axios from "axios";

function Adder({ coordinates, setPlacemarker, setNoTags }) {
    const [addBal, setAddBal] = React.useState("");

    const createBal = (e) => {
        e.preventDefault();

        let nameBal = document.getElementById("cre").value;
        localStorage.setItem("nameBal", nameBal);
        let id_user = localStorage.getItem("id_user");

        axios
            .post("http://localhost:80/saveBaloon/", {
                id_user: id_user,
                name: nameBal,
                coordinats: JSON.stringify(coordinates),
            })
            .then((resus) => {
                setPlacemarker(nameBal);
                setNoTags(false);
                setAddBal("");
            });
    };

    const changeHandler = (e) => {
        e.preventDefault();
        setAddBal(e.target.value);
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
                <button onClick={createBal} style={{ marginLeft: 10 }}>
                    Добавить
                </button>
            </form>
        </div>
    );
}

export default Adder;
