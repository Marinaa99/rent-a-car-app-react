import React, { useEffect, useState } from 'react';
import { useQuery } from "react-query";
import moment from "moment";
import { useTranslation } from 'react-i18next';

import ReservationCard from "../../../components/reservationCard/ReservationCard.jsx";
import { useModal } from "../../../hooksState/ModalContext.jsx";

import { reservationService } from "../../../services/ReservationService.js";
import classes from "../ClientReservations.module.scss";
const CurrentReservations = () => {
    const {t} = useTranslation();
    const {open} = useModal();

    const [currentReservations, setCurrentReservations] = useState([]);

    const { data: reservations, isLoading } = useQuery(['reservations', ""],
        () => reservationService.getAll(""), {
            enabled: true,
            initialData: [],
        });

    useEffect(() => {
        if (!isLoading && reservations) {
            const now = moment();
            setCurrentReservations(reservations.filter(r => moment(r.date_from).isBefore(now) && moment(r.date_to).isAfter(now)));
        }
    }, [reservations, isLoading]);

    const openModal = (reservation) => {
        open(t('reservation.reservationDetails'), <ReservationCard reservation={reservation} isModal={true}/>);

    };

    return (
        <>
            <div className={classes["container"]}>
                {currentReservations.length > 0 ? (
                    currentReservations.map(r => (
                        <ReservationCard key={r.id} reservation={r} onClick={() => openModal(r)}/>
                    ))
                ) : (
                    <p>Nema trenutnih rezervacija.</p>
                )}
            </div>
        </>
    );

}

export default CurrentReservations;
