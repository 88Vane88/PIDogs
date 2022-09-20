/* Nombre
Altura (Diferenciar entre altura mínima y máxima)
Peso (Diferenciar entre peso mínimo y máximo)
Años de vida
[ ] Posibilidad de seleccionar/agregar uno o más temperamentos
[ ] Botón/Opción para crear una nueva raza de perro */

import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postDog, getTemps } from "../../redux/actions/index";
import style from "../create/Create.module.css";

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

  //inputs
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
      height_min: "",
      height_max: "",
      weight_min: "",
      weight_max: "",
      life_span_min: "",
      life_span_max: "",
      temperament: [],
    });
    history.push("/home");
  }

  function handleDelete(t) {
    setForm({
      ...form,
      temperament: form.temperament.filter((tem) => tem !== t),
    });
  }

  /* si tuviera un checkbox...sería:
  function handleCheck(e){if(e.target.checked){setForm({...input, status:e.target.value})}}
  */

  return (
    <>
      <div className={style.butt__regresar}>
        <Link to="/home">
          <button className={style.regresar}>Regresar</button>
        </Link>
        <h2 className={style.nombre}> Creá tu perrito</h2>
      </div>
      <div className={style.img}>
        <div className={style.contenedor}>
          <form className={style.form} onSubmit={(e) => handleSubmit(e)}>
            <div>
              <label className={style.form_label}>Nombre Raza: </label>
              <input
                className={style.form_input}
                type="text"
                value={form.name}
                name="name"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <br />
            <div>
              <label className={style.form_label}>Altura mín: </label>
              <input
                className={style.form_input}
                type="text"
                value={form.height_min}
                name="height_min"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <br />
            <div>
              <label className={style.form_label}>Altura máx: </label>
              <input
                className={style.form_input}
                type="text"
                value={form.height_max}
                name="height_max"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <br />
            <div>
              <label className={style.form_label}>Peso mín: </label>
              <input
                className={style.form_input}
                type="text"
                value={form.weight_min}
                name="weight_min"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <br />
            <div>
              <label className={style.form_label}>Peso máx: </label>
              <input
                className={style.form_input}
                type="text"
                value={form.weight_max}
                name="weight_max"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <br />
            <div>
              <label className={style.form_label}>Años de vida min: </label>
              <input
                className={style.form_input}
                type="text"
                value={form.life_span_min}
                name="life_span_min"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <br />
            <div>
              <label className={style.form_label}>Años de vida máx: </label>
              <input
                className={style.form_input}
                type="text"
                value={form.life_span_max}
                name="life_span_max"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <br />
            <div>
              <label className={style.form_label}>Imágen: </label>
              <input
                className={style.form_input}
                type="text"
                value={form.image}
                name="image"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <br />
            <label className={style.form_label}>Temperamento: </label>
            <select onChange={(e) => handleSelect(e)}>
              {temps.map((t) => (
                <option value={t.temperament}>{t.temperament}</option>
              ))}
            </select>
            <br />
            <br />
            <button type="submit" className={style.button}>
              Crear Perro
            </button>
            <br />
            {form.temperament.map((t) => (
              <div className={style.divTemps}>
                <div>{t}</div>
                <button
                  className={style.buttonX}
                  onClick={() => handleDelete(t)}
                >
                  x
                </button>
              </div>
            ))}
          </form>
        </div>
      </div>
    </>
  );
}
