import React from "react";
import { useTranslation } from 'react-i18next';

import ActionButtons from "../../../components/table/actionButtons/ActionButtons.jsx";
import {Tag} from "antd";

const ClientTableHeader = (openForm, onDelete) => {
    const { t } = useTranslation();
    const fixedColor = "#FABB18";

    return [
        {title: t("table.firstName"), index: "first_name"},
        {title: t("table.passportNumber"), index: "passport_number"},
        {title: t("table.phoneNumber"), index: "phone_number"},
        {title: t("table.email"), index: "email"},
        {
            title: t('table.note'),
            dataIndex: 'note',
            render: (data) => <Tag color={fixedColor}>{data.note}</Tag>
        },
        {
            title: t("table.actions"),
            index: null,
            render: (data) => <ActionButtons data={data} openForm={openForm} onDelete={onDelete}/>,
        }
    ];
};

export default ClientTableHeader;