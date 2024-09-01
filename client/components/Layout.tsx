import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import WellbeingArticles from './WellbeingArticles'

export default function Layout() {
  return (
    <>
      <div>
        <div>
          <Header />
          <Outlet />
          <WellbeingArticles />
        </div>
        <Footer />
      </div>
    </>
  )
}
