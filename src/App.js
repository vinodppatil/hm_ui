import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Things from './components/Things'
import AddThing from './components/AddThing'
import Mapping from './components/Mapping'

const App = () => {
  const [showAddThing, setShowAddThing] = useState(false)
  const [things, setThings] = useState([])

  useEffect(() => {
    const getThings = async () => {
      const thingsFromServer = await fetchThings()
      setThings(thingsFromServer)
    }

    getThings()
  }, [])

  // Fetch Things
  const fetchThings = async () => {
    const res = await fetch(`http://localhost:8080/register/listHumans`)
    const data = await res.json()
    return data;
  }

  // Fetch Thing
  const fetchThing = async (id) => {
    const res = await fetch(`http://localhost:8080/register/resource/${id}`, {
      params: id
    })
    const data = await res.json()

    return data
  }

  // Add Thing
  const addThing = async (thing) => {
    const res = await fetch('http://localhost:8080/register/resource', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(thing),
    })

    const data = await res.json()

    setThings([...things, data])

    // const id = Math.floor(Math.random() * 10000) + 1
    // const newThing = { id, ...thing }
    // setThings([...things, newThing])
  }

  // Delete Thing
  const deleteThing = async (id) => {
    const res = await fetch(`http://localhost:8080/register/remove/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      }
    })
    //We should control the response status to decide if we will change the state or not.
    res.status === 200
      ? setThings(things.filter((thing) => thing.id !== id))
      : alert('Error Deleting This Thing')
  }

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const thingToToggle = await fetchThing(id)
    const updThing = { ...thingToToggle, reminder: !thingToToggle.reminder }

    const res = await fetch(`http://localhost:5000/things/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updThing),
    })

    const data = await res.json()

    setThings(
      things.map((thing) =>
        thing.id === id ? { ...thing, reminder: data.reminder } : thing
      )
    )
  }

  return (
    <Router>
      <div className='container'>
        <Header
          onAdd={() => setShowAddThing(!showAddThing)}
          showAdd={showAddThing}
        />
       
        <Route
          path='/'
          exact
          render={(props) => (
            <>
              {showAddThing && <AddThing onAdd={addThing} />}
              {things.length > 0 ? (
                <Things
                  things={things}
                  onDelete={deleteThing}
                  onToggle={toggleReminder}
                />
              ) : (
                'No Things To Show'
              )}
            </>
          )}
        />
        <Route path='/about' component={Mapping} />
       
        <Footer />
      </div>
    </Router>
  )
}

export default App
