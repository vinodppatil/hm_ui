import Thing from './Thing'

const Things = ({ things, onDelete, onToggle }) => {
  return (
    <>
      {things.map((thing, index) => (
        <Thing key={index} thing={thing} onDelete={onDelete} onToggle={onToggle} />
      ))}
    </>
  )
}

export default Things