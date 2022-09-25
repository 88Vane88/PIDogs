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
  const dispatch = useDispatch(); //despacho acción
  const temps = useSelector((state) => state.temps); //traido temps de reduce
  const history = useHistory();
  const [errores, setErrores] = useState({}); //seteo nuevo estado para errores
  /*  const [errorButton, setErrorButton] = useState(true); */

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

  //-------------INPUTS-----------------------
  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value, //va modificando el name (target es el imput) va entre [porque es una variable]
    });
    setErrores(validar(form));
    console.log(form);
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setErrores(validar(form));
    console.log(form);
  }

  //-------------------SELECT TEMPS--------------------------
  function handleSelect(e) {
    setForm({
      ...form,
      temperament: [...form.temperament, e.target.value],
      //un array. traeme lo que ya tengo y concatenalo por lo que me pasan
    });
  }

  //-----------------SUBMIT----------------------------
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postDog(form));
    /*   setErrores(validar(form)); */
    alert("Perro creado con éxito");
    setForm({
      name: "",
      height: "",
      weight: "",
      life_span: "",
      temperament: [],
    });
    history.push("/home"); //me re-direcciona
  }

  //----------------------VALIDACIONES--------------------------------
  const soloLetras = /^[a-zA-ZñÑáÁéÉíÍóÓuÚ]*$/;
  const soloNumeros = /^[0-9]*$/;

  function validar(form) {
    let errores = {};

    if (!form.name) errores.name = "Campo requerido";
    if (!soloLetras.test(form.name)) errores.name = "Ingresar solo letras";

    if (!form.height_max) errores.height_max = "Campo requerido";
    if (!soloNumeros.test(form.height_max))
      errores.height_max = "Ingresar solo números";
    if (!form.height_min) errores.height_min = "Campo requerido";
    if (!soloNumeros.test(form.height_min))
      errores.height_min = "Ingresar solo números";

    if (!form.weight_max) errores.weight_max = "Campo requerido";
    if (!soloNumeros.test(form.weight_max))
      errores.weight_max = "Ingresar solo números";
    if (!form.weight_min) errores.weight_min = "Campo requerido";
    if (!soloNumeros.test(form.weight_min))
      errores.weight_min = "Ingresar solo números";

    if (!form.life_span_min) errores.life_span_min = "Campo requerido";
    if (!soloNumeros.test(form.life_span_min))
      errores.life_span_min = "Ingresar solo números";
    if (!form.life_span_max) errores.life_span_max = "Campo requerido";
    if (!soloNumeros.test(form.life_span_max))
      errores.life_span_max = "Ingresar solo números";

    if (!form.temperament)
      errores.temperament = "Seleccionar al menos un temperamento";

    return errores;
  }
  //------------------DELETE---------------------------------
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
                  <label htmlFor="name" className={style.form_label}>
                    Nombre Raza:{" "}
                  </label>
                  <input
                    className={style.form_input}
                    id="name"
                    type="text"
                    value={form.name}
                    name="name"
                    onChange={(e) => handleChange(e)}
                  />
                  {errores.name ? (
                    <p className={style.error}>{errores.name}</p>
                  ) : null}
                </div>
                <br />
                <div>
                  <label htmlFor="height_min" className={style.form_label}>
                    Altura mín:{" "}
                  </label>
                  <input
                    className={style.form_input}
                    id="height_min"
                    type="text"
                    value={form.height_min}
                    name="height_min"
                    onChange={(e) => handleChange(e)}
                  />
                  {errores.height_min ? (
                    <p className={style.error}>{errores.height_min}</p>
                  ) : null}
                </div>
                <br />
                <div>
                  <label htmlFor="height_max" className={style.form_label}>
                    Altura máx:{" "}
                  </label>
                  <input
                    className={style.form_input}
                    id="height_max"
                    type="text"
                    value={form.height_max}
                    name="height_max"
                    onChange={(e) => handleChange(e)}
                  />
                  {errores.height_max ? (
                    <p className={style.error}>{errores.height_max}</p>
                  ) : null}
                </div>
                <br />
                <div>
                  <label htmlFor="weight_min" className={style.form_label}>
                    Peso mín:{" "}
                  </label>
                  <input
                    className={style.form_input}
                    id="weight_min"
                    type="text"
                    value={form.weight_min}
                    name="weight_min"
                    onChange={(e) => handleChange(e)}
                  />
                  {errores.weight_min ? (
                    <p className={style.error}>{errores.weight_min}</p>
                  ) : null}
                </div>
                <br />
                <div>
                  <label htmlFor="weight_max" className={style.form_label}>
                    Peso máx:{" "}
                  </label>
                  <input
                    className={style.form_input}
                    id="weight_max"
                    type="text"
                    value={form.weight_max}
                    name="weight_max"
                    onChange={(e) => handleChange(e)}
                  />
                  {errores.weight_max ? (
                    <p className={style.error}>{errores.weight_max}</p>
                  ) : null}
                </div>
                <br />
                <div>
                  <label htmlFor="life_span_min" className={style.form_label}>
                    Años de vida min:{" "}
                  </label>
                  <input
                    className={style.form_input}
                    id="life_span_min"
                    type="text"
                    value={form.life_span_min}
                    name="life_span_min"
                    onChange={(e) => handleChange(e)}
                  />
                  {errores.life_span_min ? (
                    <p className={style.error}>{errores.life_span_min}</p>
                  ) : null}
                </div>
                <br />
                <div>
                  <label htmlFor="life_span_max" className={style.form_label}>
                    Años de vida máx:{" "}
                  </label>
                  <input
                    className={style.form_input}
                    id="life_span_max"
                    type="text"
                    value={form.life_span_max}
                    name="life_span_max"
                    onChange={(e) => handleChange(e)}
                  />
                  {errores.life_span_max ? (
                    <p className={style.error}>{errores.life_span_max}</p>
                  ) : null}
                </div>
                <br />
                <div>
                  <label htmlFor="image" className={style.form_label}>
                    Imágen:{" "}
                  </label>
                  <input
                    className={style.form_input}
                    id="image"
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
                {errores.temperament ? (
                  <p className={style.error}>{errores.temperament}</p>
                ) : null}
              </div>
              <br />
              <br />

              <button
                type="submit"
                className={style.button}
                /* disabled={errorButton ? true : false} */
              >
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
