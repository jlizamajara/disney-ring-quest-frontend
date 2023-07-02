import Routing from './Routing'
import AuthProvider from './auth/authProvider'


function App() {

  return (
    <>
    <AuthProvider>
      <Routing />
    </AuthProvider>  
    </>
  )
}

export default App

