import { useState } from "react";
import "./App.css";
import contacts from "./contacts.json";



function App() {


  // Nos pide el enunciado que creemos una variable de estado para guardar todos los contactos. Copiamos el array de objetos con el operador de spread
  const [selectedContacts, setSelectedContacts] = useState([...contacts.slice(0, 5)]);
  const [orderBy, setOrderBy] = useState('name');

  function getRandomContact() {
    let randomIndex;
    let randomContact;

    do {
      randomIndex = Math.floor(Math.random() * contacts.length);
      randomContact = contacts[randomIndex];
    } while (selectedContacts.some(c => c.id == randomContact.id));


    return randomContact;
  }


  const handleNewContact = () => {

    const newContact = getRandomContact();

    setSelectedContacts([...selectedContacts, newContact])
  }

  const handleDelete = (id) => {
    const newContacts = selectedContacts.filter(c => c.id !== id);
    setSelectedContacts(newContacts);
  }

  switch (orderBy) {
    case 'name':
      selectedContacts.sort(function (a, b) {
        var textA = a.name.toUpperCase();
        var textB = b.name.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      break;

    case 'popularity':
      selectedContacts.sort((a, b) => b.popularity - a.popularity);
      break;
  }

  return (
    <div className="App">
      <h1> React IronContacts</h1>
      <h2> Contacts remaining:  {contacts.length - selectedContacts.length}</h2>
      <button disabled={selectedContacts.length == contacts.length} onClick={handleNewContact}>Add New Contact</button>
      <button disabled={orderBy == 'name'} onClick={() => setOrderBy('name')}>By Name</button>
      <button disabled={orderBy == 'popularity'} onClick={() => setOrderBy('popularity')}>Popularity</button>

      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won Oscar
            </th>
            <th>Won Emmy</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {selectedContacts.map(c => (<tr key={c.id}>
            <td><img style={{ width: 100 }} src={c.pictureUrl} alt={c.name}></img></td>
            <td>{c.name}</td>
            <td>{c.popularity.toFixed(2)}</td>
            <td>{c.wonOscar ? '🏆' : ''}</td>
            <td>{c.wonEmmy ? '⭐' : ''}</td>
            <td><button onClick={() => handleDelete(c.id)}>Delete</button></td>
          </tr>))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
