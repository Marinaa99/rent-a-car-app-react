import React, {Suspense} from 'react';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import {I18nextProvider} from 'react-i18next';
import i18n from "./i18n.js";
import {QueryClient, QueryClientProvider} from "react-query";
import {reactQueryConfig} from "./config/config.js";
import UserProvider from "./hooksState/UserContext.jsx";
import ModalProvider from "./hooksState/ModalContext.jsx";
import './App.scss';
import AuthWrapper from "./pages/authWrapper/AuthWrapper.jsx";
import PageWrapper from "./pages/pageWrapper/PageWrapper.jsx";
import Login from "./pages/login/Login.jsx";
import Home from "./pages/home/Home.jsx";
import Clients from "./pages/clients/Clients.jsx";
import Vehicle from "./pages/vehicles/Vehicle.jsx";
import Reservation from "./pages/reservations/Reservation.jsx";
import AddReservation from "./pages/reservations/addReservation/AddReservation.jsx";
import FutureReservations from "./pages/clientReservations/futureReservations/FutureReservations.jsx";
import CurrentReservations from "./pages/clientReservations/currentReservations/CurrentReservations.jsx";
import PreviousReservations from "./pages/clientReservations/previousReservations/PreviousReservations.jsx";
import ClientReservations from "./pages/clientReservations/ClientReservations.jsx";
import ErrorPage from "./pages/errorPage/ErrorPage.jsx";


const queryClient = new QueryClient(reactQueryConfig);

const router = createBrowserRouter([

    {
        path: "/login",
        element: <Login/>,
    },

    {
        path: "/",
        element: <AuthWrapper
            redirectOnRole={{
                1: "/home",
                2: "/clients/reservations"
            }}
        />,
    },

    {
        path: "/home",
        element: <AuthWrapper allowedRoles={[1]}><PageWrapper><Home/></PageWrapper></AuthWrapper>,
    },

    {
        path: "/clients",
        element: <AuthWrapper allowedRoles={[1]}><PageWrapper><Clients/></PageWrapper></AuthWrapper>,
    },

    {
        path: "/vehicles",
        element: <AuthWrapper allowedRoles={[1]}><PageWrapper><Vehicle/></PageWrapper></AuthWrapper>,
    },
    {
        path: "/reservations",
        element: <AuthWrapper allowedRoles={[1]}><PageWrapper><Reservation/></PageWrapper></AuthWrapper>,
    },
    {
        path: "/add/reservation",
        element: <AuthWrapper allowedRoles={[1]}><PageWrapper><AddReservation/></PageWrapper></AuthWrapper>,
    },
    {
        path: "/clients/reservations",
        element: <AuthWrapper allowedRoles={[2]}><PageWrapper><ClientReservations /></PageWrapper></AuthWrapper>,
    },

    {
        path: "/previous/reservations",
        element: <AuthWrapper allowedRoles={[2]}><PageWrapper><PreviousReservations /></PageWrapper></AuthWrapper>,
    },
    {
        path: "/current/reservations",
        element: <AuthWrapper allowedRoles={[2]}><PageWrapper><CurrentReservations/></PageWrapper></AuthWrapper>,
    },
    {
        path: "/future/reservations",
        element: <AuthWrapper allowedRoles={[2]}><PageWrapper><FutureReservations/></PageWrapper></AuthWrapper>,
    },
    {
        path: "/error",
        element: <AuthWrapper><ErrorPage/></AuthWrapper>
    }

]);

function App() {

    return (
        <I18nextProvider i18n={i18n}>
            <Suspense fallback={<div>Loading...</div>}>
                <QueryClientProvider client={queryClient}>
                    <UserProvider>
                        <ModalProvider>
                            <RouterProvider router={router}/>
                        </ModalProvider>
                    </UserProvider>
                </QueryClientProvider>
            </Suspense>

        </I18nextProvider>
    )
}

export default App
