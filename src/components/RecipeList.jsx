import React from 'react';

export default function RecipeList({recipes, onSelect, selected}){
  return (
    <div className="recipe-list">
      {recipes.map(r => (
        <div key={r.id} className="card" onClick={() => onSelect(r)} style={{border: selected && selected.id===r.id ? '1px solid rgba(245,158,11,0.6)':'none'}}>
          <img src={r.image} alt={r.name} />
          <div className="meta">
            <h3>{r.name}</h3>
            <p>{r.time} • Serves {r.serves}</p>
          </div>
        </div>
      ))}
    </div>
  )
}