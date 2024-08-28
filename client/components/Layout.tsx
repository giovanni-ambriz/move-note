import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

export default function Layout() {
  return (
    <>
      <div id="page-container">
        <div id="content-wrap">
          <Header />
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  )
}
