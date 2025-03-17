import { Outlet } from "react-router-dom"
import Header from "./component/Header/Header"
import Footer from "./component/Footer/Footer"


const App = () => {
  

  return (
    <>
    <Header/>
    <main className="min-h-[78vh]">
    <Outlet/>
    </main>
      <Footer/>
    </>
  )
}

export default App
