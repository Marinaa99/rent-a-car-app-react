import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from "../home/Home.jsx";
import Clients from "../clients/Clients.jsx";
import Vehicle from "../vehicles/Vehicle.jsx";
import Reservation from "../reservations/Reservation.jsx";
import AddReservation from "../reservations/addReservation/AddReservation.jsx";

const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/vehicles" element={<Vehicle />} />
            <Route path="/reservations" element={<Reservation />} />
            <Route path="/add/reservation" element={<AddReservation />} />
        </Routes>
    );
};

export default AdminRoutes;
