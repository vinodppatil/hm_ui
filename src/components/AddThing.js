import { useState } from 'react'

const AddThing = ({ onAdd }) => {
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [criticality, setCriticality] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()

    if (!name) {
      alert('Please add a thing')
      return
    }

    onAdd({ name, location, criticality })

    setName('')
    setLocation('')
    setCriticality(false)
  }

  return (
    <form className='add-form' onSubmit={onSubmit}>
      <div className='form-control'>
        <label>Thing</label>
        <input
          type='name'
          placeholder='Add Thing'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className='form-control'>
        <label>Location </label>
        <input
          type='name'
          placeholder='Add Location '
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div className='form-control form-control-check'>
        <label>Set Reminder</label>
        <input
          type='checkbox'
          checked={criticality}
          value={criticality}
          onChange={(e) => setCriticality(e.currentTarget.checked)}
        />
      </div>

      <input type='submit' value='Save Thing' className='btn btn-block' />
    </form>
  )
}

export default AddThing