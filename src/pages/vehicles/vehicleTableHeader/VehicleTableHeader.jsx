import React from "react";
import { useTranslation } from 'react-i18next';

import ActionButtons from "../../../components/table/actionButtons/ActionButtons.jsx";
import {Tag} from "antd";

const VehicleTableHeader = (openForm, onDelete) => {
    const { t } = useTranslation();

    const fixedColor = "#FABB18";

    return [
        { title: t('table.plateNumber'), index: 'plate_number' },
        { title: t('table.productionYear'), index: 'production_year' },
        { title: t('table.vehicleType'), index: 'type' },
        { title: t('table.numberOfSeats'), index: 'number_of_seats' },
        { title: t('table.dailyRate'), index: 'daily_rate' },
        {
            title: t('table.note'),
            dataIndex: 'note',
            render: (data) => <Tag color={fixedColor}>{data.note}</Tag>
        },
    {
        title: t('table.actions'),
        index: null,
        render: (data) => <ActionButtons data={data} openForm={openForm} onDelete={onDelete}/>,
    }
    ];
};
export default VehicleTableHeader;