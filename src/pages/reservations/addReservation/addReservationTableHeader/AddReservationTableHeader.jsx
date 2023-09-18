import React from "react";
import {useTranslation} from "react-i18next";

const AddReservationTableHeader = (openForm, onDelete) =>{
    const { t } = useTranslation();

    return [
        { title: t('table.plateNumber'), index: 'plate_number' },
        { title: t('table.productionYear'), index: 'production_year' },
        { title: t('table.numberOfSeats'), index: 'number_of_seats' },
        { title: t('table.dailyRate'), index: 'daily_rate' },

    ];
};
export default AddReservationTableHeader;