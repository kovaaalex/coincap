import './App.css'
import { AppRoutes } from './routes/AppRoutes'
import { AppProviders } from './providers/AppProvides';

function App() {
  return (
    <AppProviders>
      <AppRoutes />
    </AppProviders>
  )
}

export default App
