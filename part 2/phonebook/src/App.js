import { useState } from 'react'
import { useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/filter'
import PersonForm from './components/personform'
import Persons from './components/persons'
import './index.css'


const App = () => {
  // states
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [notification, setNotification] = useState(null)
  
  // axios function
  const {getAll, create, update, remove} = personService


  useEffect(() => {
      getAll().then(intialPersons => setPersons(intialPersons))
    }, [getAll])


  const handleNotification = () => {setTimeout( () => setNotification(null), 5000)}
  const handleNameChange = event => setNewName(event.target.value)
  const handleNewNumber = event => setNewNumber(event.target.value)
  const handleSearch = event => setSearch(event.target.value)
  const deletePerson = id => () => {
    const deletePerson = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${deletePerson.name}`)) {
      remove(id)
      setPersons(persons.filter(person => person.id !== id))
      setNotification(`Removed ${deletePerson.name}`)
      handleNotification()
    }
  }


  const filteredNames = persons.filter(person =>  {
    return person.name.toLowerCase().includes(search.toLowerCase())
  })

  

  const addPerson = event => {
    event.preventDefault()
    
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }

    const findName = persons.find(person => person.name.toLowerCase() === newName.toLowerCase()) 
    if (findName) {
      const confirmUpdate = window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one`)
       return confirmUpdate ? 
       update(findName.id, newPerson)
       .then(returnedPerson => {
        setPersons(persons.map(person => person.id === findName.id ? returnedPerson : person))
        setNotification(`Updated ${returnedPerson.name}`)
        handleNotification()
      }).catch(() => {
        setNotification(`Information of ${newPerson.name} has already been removed from the server `)
        handleNotification()
      }) 
       : null
    }

    create(newPerson).then(returnedPerson => setPersons([...persons, returnedPerson]))
    setNotification(`Added ${newPerson.name}`)
    handleNotification()
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Filter handleSearch={handleSearch}/>
      <PersonForm handleNameChange={handleNameChange} handleNewNumber={handleNewNumber} onSubmit={addPerson} />
      <Persons filteredNames={filteredNames} onClick={deletePerson}/>
    </div>
  )
}

export default App