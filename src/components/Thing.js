import { FaTimes, FaHandHoldingMedical, FaHospital, FaUserNurse } from 'react-icons/fa'
import { GiVacuumCleaner } from 'react-icons/gi'
import { GrUserAdmin } from 'react-icons/gr'

const Thing = ({ thing, onDelete, onToggle }) => {
  return (
    <div className={`thing ${thing.livingType && 'reminder'}`} onDoubleClick={() => onToggle(thing.id)}>
      <h3>
        {thing.name}{' '}
        {(() => {
                switch(thing.staffType) {
                  case 'DOCTOR':
                    return <FaHandHoldingMedical />
                  case 'NURSE':
                    return <FaUserNurse />
                    case 'JANITOR':
                      return <GiVacuumCleaner />
                    case 'ADMIN':
                      return <GrUserAdmin />
                  default:
                    return <FaHospital />
                }
            })()}
        <FaTimes
          style={{ color: 'red', cursor: 'pointer' }}
          onClick={() => onDelete(thing.id)}
        />
      </h3>
      <p>{thing.location}</p>
     

      

      
    </div>
  )
}

export default Thing