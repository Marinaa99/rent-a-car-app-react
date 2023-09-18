import React, { useEffect, useState } from 'react';
import { useQuery } from "react-query";
import {useTranslation} from "react-i18next";
import moment from "moment";

import ReservationCard from "../../../components/reservationCard/ReservationCard.jsx";
import {reservationService} from "../../../services/ReservationService.js";
import {useModal} from "../../../hooksState/ModalContext.jsx";
import classes from "../ClientReservations.module.scss";

const FutureReservations = () => {
    const {t} = useTranslation();
    const {open} = useModal();
    const [futureReservations, setFutureReservations] = useState([]);

    const { data: reservations, isLoading } = useQuery(['reservations', ""],
        () => reservationService.getAll(""), {
            enabled: true,
            initialData: [],
        });

    useEffect(() => {
        if (!isLoading && reservations) {
            const now = moment();
            setFutureReservations(reservations.filter(r => moment(r.date_from).isAfter(now)));
        }
    }, [reservations, isLoading]);

    const openModal = (reservation) => {
        open(t('reservation.reservationDetails'), <ReservationCard reservation={reservation} isModal={true}/>);

    };

    return (
        <>
            <div className={classes["container"]}>
                {futureReservations.length > 0 ? (
                    futureReservations.map(r => (
                        <ReservationCard key={r.id} reservation={r} onClick={() => openModal(r)}/>
                    ))
                ) : (
                    <p>Nema budućih rezervacija.</p>
                )}
            </div>
        </>
    );

}

export default FutureReservations;
