import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Programs from './Programs'
//import AddThing from './AddThing'

const Mapping = () => {
  const [programs, setPrograms] = useState([])

  useEffect(() => {
    const getPrograms = async () => {
      const programsFromServer = await fetchPrograms()
      setPrograms(programsFromServer)
    }

    getPrograms()
  }, [])

  // Fetch Programs
  const fetchPrograms = async () => {
    const res = await fetch(`http://localhost:8080/register/listprograms`)
    const data = await res.json()
    return data;
  }
  
   // Fetch program
   const fetchProgram = async (id) => {
    const res = await fetch(`http://localhost:8080/register/resource/${id}`, {
      params: id
    })
    const data = await res.json()

    return data
  }
   // Add Program
 //  const addProgram = async (program) => {
  //  const res = await fetch('http://localhost:8080/register/resource', {
   //   method: 'POST',
    //  headers: {
     //   'Content-type': 'application/json',
     // },
     // body: JSON.stringify(program),
    //})

    //const data = await res.json()

    //setPrograms([...programs, data])

    // const id = Math.floor(Math.random() * 10000) + 1
    // const newThing = { id, ...program }
    // setPrograms([...programs, newThing])
  //}

  // Delete Thing
  const deleteProgram = async (id) => {
    const res = await fetch(`http://localhost:8080/register/remove/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      }
    })
    //We should control the response status to decide if we will change the state or not.
    res.status === 200
      ? setPrograms(programs.filter((program) => program.id !== id))
      : alert('Error Deleting This Thing')
  }

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const programToToggle = await fetchProgram(id)
    const updProgram = { ...programToToggle, reminder: !programToToggle.reminder }

    const res = await fetch(`http://localhost:5000/programs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updProgram),
    })
    const data = await res.json()

    setPrograms(
      programs.map((program) =>
        program.id === id ? { ...program, reminder: data.reminder } : program
      )
    )
  }
  return (
    <div>
      
      <div className='container'>
       
       
       
            <>
              
              {programs.length > 0 ? (
                <Programs
                  programs={programs}
                  onDelete={deleteProgram}
                  onToggle={toggleReminder}
                />
              ) : (
                'No Program To Show'
              )}
            </>
          
        
       
       
      
      </div>
    
    <Link to='/'>Go Back</Link>
    </div>
  )
}
export default Mapping