import './Movements.css'
import Movement from './Movement'

function Movements({ movements }) {
  //{movements: [10, 100, -30]}

  return (
    <div className="movements">
      {movements.map((movement, index) => (
        <Movement key={index} position={index} amount={movement.amount} />
      ))}
    </div>
  )
}

export default Movements
