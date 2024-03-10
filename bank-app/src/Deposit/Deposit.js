import { useState } from 'react'

function Deposit({ token }) {
  const [amount, setAmount] = useState('')

  const handleAmountChange = (event) => {
    setAmount(event.target.value)
  }

  const handleDeposit = (event) => {
    event.preventDefault() // Prevents the form from submitting and refreshing the page

    const url = `http://localhost:3000/movements?token=${token}`

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        movement: {
          // Aquí envolvemos el objeto de movimiento dentro de una propiedad 'movement'
          amount: Number(amount),
          date: new Date(),
        },
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then((data) => {
        console.log(data)
        // Emitir un evento personalizado de transferencia completada
        const transferEvent = new CustomEvent('transfer', {
          detail: { type: 'transfer' },
        })
        document.dispatchEvent(transferEvent)
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error)
      })
  }

  return (
    <div className="operation operation--loan">
      <h2>Deposit</h2>
      <form className="form form--loan" onSubmit={handleDeposit}>
        <input
          type="number"
          className="form__input form__input--loan-amount"
          name="deposit"
          value={amount}
          onChange={handleAmountChange}
        />
        <button className="form__btn form__btn--loan">&rarr;</button>
        <label className="form__label form__label--loan">Amount</label>
      </form>
    </div>
  )
}

export default Deposit
