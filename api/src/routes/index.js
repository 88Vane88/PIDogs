const { Router } = require("express");
const axios = require("axios");
const { Dog, Temperamento, Dog_Temp } = require("../db.js");
const { Op } = require("sequelize");
const { getAll, apiInfo, bdInfo } = require("../routes/info");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
//ruta: https://api.thedogapi.com/v1/breeds

//se puede hacer ruta de put y delete para borrar y cambiar cosas en el front..cuando creo dogs
router.get("/dogs/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const allDogs = await getAll();

    if (id) {
      let dogsId = await allDogs.filter((d) => d.id == id);
      dogsId.length
        ? res.status(200).json(dogsId)
        : res.status(404).send("No está ese perro");
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/dogs", async (req, res) => {
  // ---/dogs y /dogs?name=........
  const { name } = req.query;
  try {
    let allDogs = await getAll();

    if (name) {
      //si recibo name por query
      let dogName = await allDogs.filter((d) =>
        d.name.toLowerCase().includes(name.toLowerCase())
      );
      dogName.length
        ? res.status(200).send(dogName)
        : res.status(404).send("No existe el perro");
    } else {
      // si no recibo nada por query
      res.status(200).send(allDogs);
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/temperaments", async (req, res) => {
  try {
    const tempApi = await axios.get("https://api.thedogapi.com/v1/breeds"); //entro a api
    const cadaTemp = tempApi.data //hago un map de cada t y los separo por ,
      .map((d) => d.temperament)
      .toString()
      .split(",");
    const filtrado = cadaTemp.filter((e) => e); // hago filtrado de ese map
    const cadaFiltrado = [...new Set(filtrado)]; //para que no se repitan

    cadaFiltrado.forEach((t) => {
      Temperamento.findOrCreate({
        where: { temperament: t },
      });
    });
    const allTemps = await Temperamento.findAll();
    res.send(allTemps);
  } catch (error) {
    console.log(error);
  }
});

//DELETE DOG
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Dog.destroy({ where: { id } }); //en la tabla del dog, borrame id
    const newDelete = await getAll(); //devolvemelo sin ese id
    res.send(newDelete);
  } catch (error) {
    console.log(error);
  }

  /* 
  try {
		if (await Dog.findByPk(id)) {
			if (id.includes("-")) {
				await Dog.destroy({ where: { id } });
				res.status(200).send("Dog deleted");
			} else res.status(400).send("This dog cannot be deleted");
		} else res.status(400).send("The dog does not exist");
	} catch (error) {
		next(error);
	} */
});

//POST
router.post("/dogs", async (req, res) => {
  let {
    name,
    height_min,
    height_max,
    weight_min,
    weight_max,
    life_span_min,
    life_span_max,
    image,
    createdInDb,
    temperament,
  } = req.body; // lo que me mandan por body

  try {
    let createdDog = await Dog.create({
      //creo el perrito
      name,
      height: `${height_min} - ${height_max}`,
      weight: `${weight_min} - ${weight_max}`,
      life_span: `${life_span_min} - ${life_span_max}`,
      image,
      createdInDb,
    });

    let tempDb = await Temperamento.findAll({
      //me lo traigo a los temps de los models
      where: { temperament: temperament },
    });
    createdDog.addTemperamento(tempDb); //uno perros con temps
    res.send("Perro creado");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

/* 
[ ] GET /dogs: ---------------query
[ ] GET /dogs?name="..." -------params
[ ] GET /dogs/{idRaza} -----params
[ ] POST /dogs---------body
[ ] GET /temperaments  ----------query
*/

/* 
/* 
const updateDog = async (req, res, next) => {
	const id = req.query.id;

	const {
		name,
		min_height,
		max_height,
		min_weight,
		max_weight,
		min_life_span,
		max_life_span,
		image,
		temperaments,
	} = req.body;
	console.log(name, temperaments);
	try {
		const updatedDog = await Dog.findByPk(id);
		if (updatedDog) {
			if (id.includes("-")) {
				const nameMayus = name[0].toUpperCase() + name.substring(1);
				const lifeSpan =
					min_life_span && max_life_span
						? `${min_life_span} - ${max_life_span} years`
						: min_life_span
						? `${min_life_span} years`
						: max_life_span
						? `${max_life_span} years`
						: "Unknown";
				const img = !image
					? "https://cdn.pixabay.com/photo/2016/10/10/14/13/dog-1728494_960_720.png"
					: image;

				await updatedDog.update({
					name: nameMayus,
					height: `${min_height} - ${max_height}`,
					weight: `${min_weight} - ${max_weight}`,
					life_span: lifeSpan,
					image: img,
				});
				await updatedDog.setTemperaments(temperaments.map(t => Number(t)));
				res.status(200).send(updatedDog);
			} else res.status(400).send("This dog cannot be updated");
		} else res.status(400).send("The dog does not exist");
	} catch (error) {
		next(error);
	}
};

*/
