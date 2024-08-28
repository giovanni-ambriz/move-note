import { createRoutesFromElements, Route } from 'react-router-dom'
import Layout from './components/Layout'
import SessionDetails from './components/SessionDetails'
import Sessions from './components/Sessions'
import SessionsByActivity from './components/SessionsByActivity'

const routes = createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<Sessions />} />
    <Route path="sessions/:id" element={<SessionDetails />} />
    <Route path="/activities/:activity_id/sessions" element={<SessionsByActivity />} />
  </Route>,
)

export default routes
