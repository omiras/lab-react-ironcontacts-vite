import { useState } from "react";
import "./App.css";
import contacts from "./contacts.json";


function App() {

  // Nos pide el enunciado que creemos una variable de estado para guardar todos los contactos. Copiamos el array de objetos con el operador de spread
  const [allContacts, setAllContants] = useState([...contacts]);

  return (
    <div className="App">
      <h1>LAB | React IronContacts</h1>
      <table>
        <thead>
          <th>Picture</th>
          <th>Name</th>
          <th>Popularity</th>
        </thead>
        <tbody>
          {allContacts.map(c => (<tr>
            <td><img style={{ width: 100 }} src={c.pictureUrl} alt={c.name}></img></td>
            <td>{c.name}</td>
            <td>{c.popularity.toFixed(2)}</td>
          </tr>))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
