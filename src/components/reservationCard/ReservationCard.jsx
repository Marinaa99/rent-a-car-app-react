import React from 'react';
import { Card } from 'antd';
import { useTranslation } from 'react-i18next';
import classes from "../../pages/clientReservations/ClientReservations.module.scss";

const ReservationCard = ({ reservation, onClick, isModal = false }) => {
    const { t } = useTranslation();

    const {
        customer: { first_name, last_name },
        customer,
        vehicle,
        date_from,
        date_to,
        pickup_location,
        drop_off_location,
        price
    } = reservation;

    const fullContent = (
        <div>
            <div>
                <h3>{t('customerDetails')}</h3>
                <p><span>{t('form.firstName','form_lastName')}:</span> {first_name} {last_name}</p>

                <h3>{t('vehicleDetails')}</h3>
                <p><span>{t('form.plateNumber')}:</span> {vehicle.plate_number}</p>
                <p><span>{t('form.vehicleType')}:</span> {vehicle.type}</p>
                <p><span>{t('form.productionYear')}:</span> {vehicle.production_year}</p>
                <p><span>{t('form.numberOfSeats')}:</span> {vehicle.number_of_seats}</p>
                <p><span>{t('form.dailyRate')}:</span> {vehicle.daily_rate}</p>

                <h3>{t('reservation.reservationDetails')}</h3>
                <p><span>{t('table.dateFrom')}:</span> {date_from}</p>
                <p><span>{t('table.dateTo')}:</span> {date_to}</p>
                <p><span>{t('table.pickupLocation')}:</span> {pickup_location.name}</p>
                <p><span>{t('table.dropOffLocation')}:</span> {drop_off_location.name}</p>
                <p><span>{t('table.totalPrice')}:</span> {price}</p>

            </div>
        </div>
    );

    const shortContent = (
        <div>
            <h3>{first_name} {last_name}</h3>
            <p><span>{t('form.vehicleType')}:</span> {vehicle.type}</p>
            <p><span>{t('table.dateFrom')}:</span> {date_from}</p>
             <p> <span>{t('table.dateTo')}:</span> {date_to}</p>
            <p><span>{t('table.totalPrice')}:</span> {price}</p>
        </div>
    );

    if (isModal) {
        return fullContent;
    }

    return (
        <Card
            className ={classes["card"]}
            onClick={onClick}
            hoverable
        >
            {shortContent}
        </Card>
    );
}

export default ReservationCard;
