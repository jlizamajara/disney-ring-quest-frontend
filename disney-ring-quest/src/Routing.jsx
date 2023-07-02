import {
    createBrowserRouter,
    RouterProvider,
    redirect
  } from 'react-router-dom';

import Layout from './pages/Layout';
import LandingPage from './pages/LandingPage/LandingPage';
import MainPage from './pages/MainPage/MainPage';
import SignupLoginPage from './pages/SignupLoginPage/SignupLoginPage'
import SignUpPage from './pages/SignUpPage/SignUpPage';
import LogInPage from './pages/LogInPage/LogInPage';
import AboutUs from './pages/AboutUs/AboutUs'
import Lobby from './pages/Lobby/Lobby'
import Game from './pages/Game/Game'
import Rules from './pages/Rules/Rules'
import Profile from './pages/Profile/Profile'
import ChooseMatch from './pages/ChooseMatch/ChooseMatch';
import UserCheck from './protected/UserCheck';
import AdminCheck from './protected/AdminCheck';

function Routing() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '',
          element: <LandingPage />
        },
        {
          path: '/main',
          element: <MainPage />
        },

        {
          path: '/signup-login',
          element: <SignupLoginPage />
        },

        {
          path: '/signup',
          element: <SignUpPage />
        },

        {
          path: '/login',
          element: <LogInPage />
        },
        {
          path: '/rules',
          element: <Rules />
        },
        {
          path: '/about',
          element: <AboutUs />
        },
        {
          path: '/lobby/:matchId/:playerId',
          element: <Lobby />
        },
        {
          path: '/game/:matchId/:playerId',
          element: <Game />
        },
        {
          path: '/profile',
          element: <Profile />
        },
        {
          path: '/matches',
          element: <ChooseMatch />
        }, 
        {
          path: '/usercheck',
          element: <UserCheck />
        },
        {
          path: '/admincheck',
          element: <AdminCheck />
        }
      ]
    },
    {
      path: '*', 
      loader: () => {
        return redirect('/')
      }
    }
  ])

  return (
    <RouterProvider router={router} />
  );
}
  
  export default Routing;