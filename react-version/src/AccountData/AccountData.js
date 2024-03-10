import './AccountData.css'

function AccountData({ account }) {
  const { owner, username, numberAccount, address, country, nationalIdNumber } =
    account

  return (
    <div className="account-data">
      <p>Owner: {owner}</p>
      <p>Username: {username}</p>
      <p>Number Account: {numberAccount}</p>
      <p>Address: {address}</p>
      <p>Country: {country}</p>
      <p>National ID Number: {nationalIdNumber}</p>
    </div>
  )
}

export default AccountData
