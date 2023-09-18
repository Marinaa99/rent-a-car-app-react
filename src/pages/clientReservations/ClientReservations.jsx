import React, {useState} from 'react';
import {useQuery} from "react-query";
import ReservationCard from "../../components/reservationCard/ReservationCard.jsx";
import {reservationService} from "../../services/ReservationService.js";

import {useModal} from "../../hooksState/ModalContext.jsx";
import {useTranslation} from 'react-i18next';
import classes from "../clientReservations/ClientReservations.module.scss";



const ClientReservations = () => {

    const {t} = useTranslation();
    const {open} = useModal();
    const [query, setQuery] = useState("")

    const {data: reservations, isLoading} = useQuery(['reservations', query],
        () => reservationService.getAll(query), {

            enabled: true,
            initialData: [],
        });


    const openModal = (reservation) => {
        open(t('reservation.reservationDetails'), <ReservationCard reservation={reservation} isModal={true}/>);

    };

    const sortedReservations = reservations.sort((a, b) => {
        const dateA = Date.parse(a.created_at);
        const dateB = Date.parse(b.created_at);
        return dateB - dateA;
    });

    return (
        <>
            <div className={classes["container"]}>
            {sortedReservations.map(r => (
                <ReservationCard key={r.id} reservation={r} onClick={() => openModal(r)}/>

            ))}
            </div>
        </>
    );
}

export default ClientReservations;
