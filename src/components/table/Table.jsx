import React from "react";
import {Table as AntdTable} from "antd";
import classes from "./Table.module.scss";

const Table = ({header, data, onRowClick, isLoading}) => {
    return <AntdTable
        className={classes["table"]}
        columns={header.map(item => ({...item, dataIndex: item.index}))}
        dataSource={data.map(item => ({ ...item, key: item.id }))}
        onRow={(record, rowIndex) => ({
            onClick: () => onRowClick && onRowClick(record, rowIndex),
        })}
    />
}


export default Table;
