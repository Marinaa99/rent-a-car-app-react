import React from "react";
import { useTranslation } from 'react-i18next';

import ActionButtons from "../../../components/table/actionButtons/ActionButtons.jsx";

const ReservationTableHeader = (openForm, onDelete) => {
    const { t } = useTranslation();

    return [
        {title: t("table.firstName"), index: "first_name"},
        {title: t("table.lastName"), index: "last_name"},
        {title: t("table.plateNumber"), index: "plate_number"},
        {title: t("table.dateFrom"), index: "date_from"},
        {title: t("table.dateTo"), index: "date_to"},
        {title: t("table.pickupLocation"), index: "pickup_location"},
        {title: t("table.dropOffLocation"), index: "drop_off_location"},
        {title: t("table.totalPrice"), index: "price"},
    {
        title: t("table.actions"),
        index: null,
        render: (data) => <ActionButtons data={data} openForm={openForm} onDelete={onDelete}/>,
    }
    ];
};

export default ReservationTableHeader;