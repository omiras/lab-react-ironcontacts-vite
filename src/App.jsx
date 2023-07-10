import { useState } from "react";
import "./App.css";
import contacts from "./contacts.json";



function App() {


  // Iteración 1: Utilizamos el operador de spread para copiar el array, pero tan 
  const [selectedContacts, setSelectedContacts] = useState(contacts.slice(0, 5));
  const [orderBy, setOrderBy] = useState('name');

  // TODO: podríamos parametrizar la función para que no sea dependiente de la variable global 'contacts' ni 'selectedContacts' 
  function getRandomContact() {
    let randomIndex;
    let randomContact;

    do {
      randomIndex = Math.floor(Math.random() * contacts.length);
      randomContact = contacts[randomIndex];
    } while (selectedContacts.some(c => c.id == randomContact.id));


    return randomContact;
  }

  // Iteration 3: Añadimos un nuevo contacto entre todos los que no hemos añadido hasta ahora. 
  const handleNewContact = () => {

    const newContact = getRandomContact();

    setSelectedContacts([...selectedContacts, newContact])
  }

  const handleDelete = (id) => {
    // eliminamos el contacto del array usando filter (caso de uso típico)
    const newContacts = selectedContacts.filter(c => c.id !== id);

    // actualizamos la variable de estado 
    setSelectedContacts(newContacts);
  }

  // no debemos mutar directamente la variable de estado...
  const orderedContacts = [...selectedContacts];

  // Iteration 4: En función de la variable de estado orderBy, ordenamos el array de contactos que renderizaremos más tarde
  switch (orderBy) {
    case 'name':
      orderedContacts.sort(function (a, b) {
        var textA = a.name.toUpperCase();
        var textB = b.name.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      break;

    case 'popularity':
      orderedContacts.sort((a, b) => b.popularity - a.popularity);
      break;
  }

  return (
    <div className="App">
      <h1> React IronContacts</h1>
      <h2> Contacts remaining:  {contacts.length - orderedContacts.length}</h2>
      <button disabled={orderedContacts.length == contacts.length} onClick={handleNewContact}>Add New Contact</button>
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
          {/**  Iteration 2: Iteramos la lista de contactos. Todo es simplemente JSX condicional y evaluación de expresiones JSX. Importante establecer la key de cada contacto con el id único del contacto */}
          {orderedContacts.map(c => (<tr key={c.id}>
            <td><img style={{ width: 100 }} src={c.pictureUrl} alt={c.name}></img></td>
            <td>{c.name}</td>
            <td>{c.popularity.toFixed(2)}</td>
            <td>{c.wonOscar ? '🏆' : ''}</td>
            <td>{c.wonEmmy ? '⭐' : ''}</td>
            {/** Iteración 5: Invocamos la función handleDelete con el id del contacto que queremos eliminar como parámetro */}
            <td><button onClick={() => handleDelete(c.id)}>Delete</button></td>
          </tr>))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
