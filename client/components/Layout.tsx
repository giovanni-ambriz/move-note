import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import SessionForm from './AddSessionForm'

export default function Layout() {
  return (
    <>
      <div id="page-container">
        <div id="content-wrap">
          <Header />
          <Outlet />
          <SessionForm />
        </div>
        <Footer />
      </div>
    </>
  )
}
