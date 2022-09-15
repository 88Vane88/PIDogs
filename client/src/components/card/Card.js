import React from "react";

export default function Dogs({ image, name, temperament, weight }) {
  return (
    <div>
      <img src={image} alt="img not found" width="200px" height="250px" />
      <h2>{name}</h2>
      <h3>Temperamento: {temperament}</h3>
      <h4>Peso: {weight} kg</h4>
    </div>
  );
}

/* img, nombre, temp, weigth */
