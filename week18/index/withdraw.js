function Withdraw(){
  const ctx = React.useContext(UserContext);
  return (
    <>
    <h1>Withdraw</h1>
    <h5>All Data in Store
    {JSON.stringify(ctx)}<br/></h5>
    </>
  )
}
