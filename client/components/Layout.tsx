import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Home from './Home'
import WellbeingArticles from './WellbeingArticles'

export default function Layout() {
  return (
    <>
      <div id="page-container">
        <div id="content-wrap">
          <Header />
          <Outlet />
          <Home />
          <WellbeingArticles />
        </div>
        <Footer />
      </div>
    </>
  )
}
