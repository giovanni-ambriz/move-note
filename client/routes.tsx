import { createRoutesFromElements, Route } from 'react-router-dom'
import Layout from './components/Layout'
import SessionDetails from './components/SessionDetails'
import Sessions from './components/Sessions'
import SessionsByActivity from './components/SessionsByActivity'
import Home from './components/Home'

const routes = createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="/all-sessions/" element={<Sessions />} />
    <Route path="sessions/:id" element={<SessionDetails />} />
    <Route path="/activities/:activity_id/sessions" element={<SessionsByActivity />} />
  </Route>,
)

export default routes
