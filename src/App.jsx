import { useState } from "react";
import "./App.css";
import contacts from "./contacts.json";


function App() {

  // Nos pide el enunciado que creemos una variable de estado para guardar todos los contactos. Copiamos el array de objetos con el operador de spread
  const [allContacts, setAllContants] = useState([...contacts]);
  const [orderBy, setOrderBy] = useState('name');

  // ¿Cómo ordeno el array de tal manera que si orderBy === 'popularity' entonces ordeno allContacts por su popularidad?

  // si la variable de estado orderBY === 'name' quiero ordenar los contactos allContacts por nombre


  return (
    <div className="App">
      <h1> React IronContacts</h1>
      <button>By Name</button>
      <button>Popularity</button>

      <table>
        <thead>
          <th>Picture</th>
          <th>Name</th>
          <th>Popularity</th>
          <th>Won Oscar
          </th>
          <th>Won Emmy</th>
        </thead>
        <tbody>
          {allContacts.map(c => (<tr id={c.id}>
            <td><img style={{ width: 100 }} src={c.pictureUrl} alt={c.name}></img></td>
            <td>{c.name}</td>
            <td>{c.popularity.toFixed(2)}</td>
            <td>{c.wonOscar ? '🏆' : ''}</td>
            <td>{c.wonEmmy ? '⭐' : ''}</td>
          </tr>))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
