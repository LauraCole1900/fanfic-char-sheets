import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import { CharacterForm, CharSheet, Error, LandingPage, ListPage, LoginPage } from './components/pages';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <LandingPage />
      },
      {
        path: '/login',
        element: <LoginPage />
      },
      {
        path: 'characters/:fandomId',
        element: <ListPage />
      },
      {
        path: '/character/:fandomId/:charId',
        element: <CharSheet />
      },
      {
        path: '/new_character',
        element: <CharacterForm />
      },
      {
        path: '/edit_character/:charId',
        element: <CharacterForm />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
