import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ClientReservations from "../clientReservations/ClientReservations.jsx";
import FutureReservations from "../clientReservations/futureReservations/FutureReservations.jsx";
import CurrentReservations from "../clientReservations/currentReservations/CurrentReservations.jsx";
import PreviousReservations from "../clientReservations/previousReservations/PreviousReservations.jsx";
const ClientRoutes = () => {
    return (
        <Routes>
            <Route path="/clients/reservations" element={<ClientReservations />} />
            <Route path="/previous/reservations" element={<PreviousReservations />} />
            <Route path="/current/reservations" element={<CurrentReservations />} />
            <Route path="/future/reservations" element={<FutureReservations />} />
        </Routes>
    );
};

export default ClientRoutes;
