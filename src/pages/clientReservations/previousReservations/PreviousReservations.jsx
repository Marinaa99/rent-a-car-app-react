import React, {useEffect, useState} from 'react';

import ReservationCard from "../../../components/reservationCard/ReservationCard.jsx";
import {useQuery} from "react-query";
import {reservationService} from "../../../services/ReservationService.js";
import moment from "moment/moment.js";
import classes from "../ClientReservations.module.scss";
import {useModal} from "../../../hooksState/ModalContext.jsx";
import {useTranslation} from "react-i18next";

const PreviousReservations = () => {
    const [previousReservations, setPreviousReservations] = useState([]);
    const {open} = useModal();
    const {t} = useTranslation();


    const {data: reservations, isLoading} = useQuery(['reservations', ""],
        () => reservationService.getAll(""), {
            enabled: true,
            initialData: [],
        });

    useEffect(() => {
        if (!isLoading && reservations) {
            const now = moment();
            setPreviousReservations(reservations.filter(r => moment(r.date_from).isAfter(now)));
        }
    }, [reservations, isLoading]);

    const openModal = (reservation) => {
        open(t('reservation.reservationDetails'), <ReservationCard reservation={reservation} isModal={true}/>);

    };

    return (
        <div>
            <div className={classes["container"]}>
                {previousReservations.length > 0 ? (
                    previousReservations.map(r => (
                        <ReservationCard key={r.id} reservation={r} onClick={() => openModal(r)}/>
                    ))
                ) : (
                    <p>Nema prethodnih rezervacija.</p>
                )}
            </div>
        </div>
    );

}

export default PreviousReservations;

