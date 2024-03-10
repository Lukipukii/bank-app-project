import React, { useEffect, useState } from 'react'
import './App.css'
import Welcome from './Welcome/Welcome'
import Login from './Login/Login'
import Summary from './Summary/Summary'
import Movements from './Movements/Movements'
import Balance from './Balance/Balance'
import Transfer from './Transfer/Transfer'
import AccountData from './AccountData/AccountData'
import Withdraw from './Withdraw/Withdraw'
import Logout from './Logout/Logout'
import Deposit from './Deposit/Deposit'

function App() {
  const [account, setAccount] = useState({})
  const [token, setToken] = useState()
  const { movements = [], owner: user = '' } = account

  useEffect(() => {
    // Función para obtener los datos del usuario
    const fetchUserData = () => {
      if (!token) return // No hay token, no se puede obtener datos

      fetch('http://localhost:4000/user?token=' + token)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          return response.json()
        })
        .then((data) => {
          setAccount(data.account)
        })
        .catch((error) => {
          console.error('There was a problem with the fetch operation:', error)
        })
    }

    // Obtener los datos del usuario inicialmente
    fetchUserData()

    // Configurar una función para obtener los datos cuando se detecta una transferencia
    const handleTransfer = () => {
      fetchUserData()
    }

    // Agregar un event listener para manejar las transferencias
    document.addEventListener('transfer', handleTransfer)

    // Limpiar el event listener cuando el componente se desmonte
    return () => {
      document.removeEventListener('transfer', handleTransfer)
    }
  }, [token]) // Se ejecuta solo cuando cambia el token

  const handleLogin = (user, pin) => {
    const url = `http://localhost:4000/login?username=${user}&pin=${pin}`

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then((data) => {
        setToken(data.token)
        setAccount(data.account)
        console.log(data)
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error)
      })
  }

  return (
    <>
      <nav>
        <Welcome user={user} />
        <Login onLogin={handleLogin} />
      </nav>
      {user && (
        <main className="app">
          <AccountData account={account} />
          <Balance movements={movements} />
          <Movements movements={movements} />
          <Summary movements={movements} />

          <Transfer token={token} />
          <Deposit token={token} />

          <Logout token={token} />

          <p className="logout-timer">
            You will be logged out in <span className="timer">05:00</span>
          </p>
        </main>
      )}
    </>
  )
}

export default App
