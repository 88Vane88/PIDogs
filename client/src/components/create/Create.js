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

function validacion(form) {
  let errores = {};
  if (!form.name) {
    errores.name = "Se requiere ingresar un Nombre";
  } else if (!form.height) {
    errores.height = "Se requiere ingresar un número";
  } else if (!form.weight) {
    errores.height = "Se requiere ingresar un número";
  } else if (!form.life_span) {
    errores.life_span = "Se requiere ingresar un número";
  } else if (!form.temperament) {
    errores.temperament = "Seleccionar uno o más";
  }
}

export default function CreatedDog() {
  const dispatch = useDispatch(); //despacho acción
  const temps = useSelector((state) => state.temps); //traido temps de reduce
  const history = useHistory();
  const [errores, setErrores] = useState({}); //seteo nuevo estado para errores

  //gurado form y seteo nuevo estado
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

  //INPUTS
  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value, //va modificando el name
    });
    /*     setErrores(
      validacion({
        ...form,
        [e.target.name]: e.target.value,
      })
    ); */
  }

  //seleccionar temps
  function handleSelect(e) {
    setForm({
      ...form,
      temperament: [...form.temperament, e.target.value],
      //un array. traeme lo que ya tengo y concatenalo por lo que me pasan
    });
  }

  //submit form
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
    /*   history.push("/home"); */ //me re-direcciona
  }

  //delete temps
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
      <div className={style.img}>
        <Link to="/home">
          <button className={style.regresar}>Regresar</button>
        </Link>

        <div className={style.contenedor}>
          <h2 className={style.nombre}> Creá tu perrito</h2>
          <div>
            <form className={style.form} onSubmit={(e) => handleSubmit(e)}>
              <div className={style.all_inputs}>
                <div>
                  <label className={style.form_label}>Nombre Raza: </label>
                  <input
                    className={style.form_input}
                    type="text"
                    value={form.name}
                    name="name"
                    onChange={(e) => handleChange(e)}
                  />
                  {/*         {errores.name && <p className={style.errores}>{errores.name}</p>} */}
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
              </div>
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
      </div>
    </>
  );
}
