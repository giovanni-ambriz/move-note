import { createRoutesFromElements, Route } from 'react-router-dom'
import Layout from './components/Layout'
import SessionDetails from './components/SessionDetails'
import Sessions from './components/Sessions'

const routes = createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<Sessions />} />
    <Route path="sessions/:id" element={<SessionDetails />} />

  </Route>,
)

export default routes
