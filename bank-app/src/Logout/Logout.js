import React from 'react'

function Logout({ token }) {
  const handleLogout = (event) => {
    event.preventDefault()
    localStorage.removeItem(token)
    window.location.reload()
  }

  return (
    <div className="operation operation--close">
      <h2>Log Out</h2>
      <form className="form" onSubmit={handleLogout}>
        <button className="form__btn">&rarr;</button>
      </form>
    </div>
  )
}

export default Logout
