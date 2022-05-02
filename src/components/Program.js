import { FcList } from 'react-icons/fc'


const Program = ({ program, onDelete, onToggle }) => {

  /*
  const [collection, setCollection] = useState([])

  useEffect(() => {
    const getCollection = async () => {
      const allThingsFromServer = await fetchThings()
      setCollection(allThingsFromServer)
    }

    getCollection()
  }, [])

  // Fetch Programs
  const fetchThings = async (id) => {
    const res = await fetch(`http://localhost:8080/register/listAllocations`)
    const data = await res.json()
    return data;
  }
  */

  return (
    <div className={`thing ${'reminder'}`} onDoubleClick={() => onToggle(program.id)}>
      <h3>
        {program.programName}{' '}
        
        <FcList
          style={{ color: 'red', cursor: 'pointer' }}
          
        />
      </h3>
      <p>{program.programClassification}</p>
    
      
    
      
    </div>
  )
}

export default Program