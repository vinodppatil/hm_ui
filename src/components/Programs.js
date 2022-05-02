import Program from './Program'

const Programs = ({ programs, onDelete, onToggle }) => {
  return (
    <div className='container'>
      {programs.map((program, index) => (
        <Program key={index} program={program} onDelete={onDelete} onToggle={onToggle} />
      ))}
    </div>
  )
}

export default Programs
