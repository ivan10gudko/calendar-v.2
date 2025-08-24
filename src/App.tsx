import { useSession } from '@supabase/auth-helpers-react'
import LoginPage from './pages/LoginPage'
import CalendarPage from './pages/CalendarPage';
import ProfilePage from './pages/ProfilePage'

export default function App() {
  const session = useSession()
  return session ? <CalendarPage /> : <LoginPage />;
}
