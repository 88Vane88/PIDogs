/* Nombre
Altura (Diferenciar entre altura mínima y máxima)
Peso (Diferenciar entre peso mínimo y máximo)
Años de vida
[ ] Posibilidad de seleccionar/agregar uno o más temperamentos
[ ] Botón/Opción para crear una nueva raza de perro */

import React, { useEffect } from "react";
import { useState, useEEfect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postDog, getTemps } from "../../redux/actions/index";

export default function CreatedDog() {
  const dispatch = useDispatch();
  const temps = useSelector((state) => state.temps);
  const history = useHistory();

  //gurado form
  const [form, setForm] = useState({
    name: "",
    height: "",
    weight: "",
    life_span: "",
    temperament: [],
  });

  useEffect(() => {
    dispatch(getTemps());
  }, []);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value, //va modificando el name
    });
  }
  function handleSelect(e) {
    setForm({
      ...form,
      temperament: [...form.temperament, e.target.value],
      //un array. traeme lo que ya tengo y concatenalo por lo que me pasan
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postDog(form));
    alert("Perro creado con éxito");
    setForm({
      name: "",
      height: "",
      weight: "",
      life_span: "",
      temperament: [],
    });
    history.push("/home");
  }

  /* si tuviera un checkbox...sería:
  function handleCheck(e){if(e.target.checked){setForm({...input, status:e.target.value})}}
  */

  return (
    <div>
      <Link to="/home">
        <button>Regresar</button>
      </Link>
      <h2> Creá tu perrito</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Nombre Raza: </label>
          <input
            type="text"
            value={form.name}
            name="name"
            onChange={(e) => handleChange(e)}
          ></input>
        </div>
        <div>
          <label>Peso máx: </label>
          <input
            type="number"
            value={form.height}
            name="alturamax"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Peso mín: </label>
          <input
            type="number"
            value={form.height}
            name="alturamin"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Peso máx: </label>
          <input
            type="number"
            value={form.weight}
            name="pesomax"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Peso mín: </label>
          <input
            type="number"
            value={form.weight}
            name="pesomin"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Años de vida máx: </label>
          <input
            type="number"
            value={form.life_span}
            name="añosvidamax"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Años de vida mín: </label>
          <input
            type="number"
            value={form.life_span}
            name="añosvidamin"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Imágen: </label>
          <input
            type="text"
            value={form.image}
            name="añosvida"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <label>Temperamento: </label>
        <select onChange={(e) => handleSelect(e)}>
          {temps.map((t) => (
            <option value={t.temperament}>{t.temperament}</option>
          ))}
        </select>
        <ul>
          <li>{form.temperament.map((t) => t + " , ")}</li>
        </ul>
        <button type="submit"> Crear</button>
      </form>
    </div>
  );
}
