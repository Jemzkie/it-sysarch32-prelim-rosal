import React from 'react';

const Pokemon = ({ id, name, type, image, HP, Attack, Defense, Speed, Sp_Attack, Sp_Defense }) => {
  return (
    <div className="pokemon">
      <div className="card">
        <div className="img-name-poke">
          <img src={image} alt={name} />
          <div className="text-poke">
            <div>ID: {id}</div>
            <div>Name: {name} </div>
            <div>Types: {type.join(', ')}</div>
            <div>HP: {HP}</div>
            <div>Attack: {Attack}</div>
            <div>Defense: {Defense}</div> 
            <div>Speed {Speed}</div>
            <div>Sp. Attack: {Sp_Attack}</div>
            <div>SP. Defense: {Sp_Defense}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pokemon;

