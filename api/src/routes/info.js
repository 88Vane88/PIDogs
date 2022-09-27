const axios = require("axios");
const { Dog, Temperamento, Dog_Temp } = require("../db.js");

const apiInfo = async () => {
  const api = await axios.get("https://api.thedogapi.com/v1/breeds");
  const solicitado = api.data.map((p) => {
    return {
      id: p.id,
      name: p.name,
      height: p.height.metric,
      weight: p.weight.imperial,
      life_span: p.life_span,
      image: p.image.url,
      temperament: p.temperament,
      createdInDb: false, //para la card
    };
  });
  return solicitado;
};

const bdInfo = async () => {
  return await Dog.findAll({
    include: {
      model: Temperamento,
      attributes: ["temperament"],
      through: {
        attributes: [],
      },
    },
  });
};

const getAll = async () => {
  const solicitado = await apiInfo();
  const dbInfo = await bdInfo();
  const infoTodos = solicitado.concat(dbInfo);
  return infoTodos;
};

module.exports = { apiInfo, bdInfo, getAll };
