import React from 'react';
import DataTable from 'react-data-table-component';

var icon =  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-counterclockwise" viewBox="0 0 16 16">
<path fillRule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"></path>
<path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"></path>
</svg>;

const Transactions = ({transactions, applyTemplate}) => {
    let resultArr = [];

    if (transactions.length) {
        resultArr = transactions.map (
            item => {
                return {
                    id: item.id,
                    date: item.date,
                    username: item.username,
                    amount: item.amount,
                    balance: item.balance
                }
        });
    }

    const handleButtonClick = (name, amount) => {
        applyTemplate(name, amount);
	};

    const columns = [
        {
            name: 'Id',
            id: 'id',
            selector: row => row.id,
            sortable: true,
            compact: true,
            width: "60px",
        },
        {
            name: 'Date',
            selector: row => row.date,
            sortable: true,
            grow: 170,
        },
        {
            name: 'Name',
            selector: row => row.username,
            sortable: true,
            compact: true,
        },
        {
            name: 'Amount',
            selector: row => row.amount,
            sortable: true,
            compact: true,
        },
        {
            name: 'Balance',
            selector: row => parseFloat(row.balance).toFixed(2),
            sortable: true,
            compact: true,
        },
        {
            cell: (row) => {
                return (
                    <button
                        type="button" className="btn-sm btn-light-outline"
                        onClick={handleButtonClick.bind(this, row.username, row.amount)} title="Repeat Transaction">
                        {icon}
                    </button>
                )
            },
            ignoreRowClick: true,
            allowOverflow: true,
            right: true,
            compact: true,
            width: "10px",
        },
    ];

    return (
        <div>
            <DataTable
                title="Transactions Details"
                defaultSortAsc={false}
                defaultSortFieldId="id"
                columns={columns}
                data={resultArr}
                pagination
            />
        </div>
    );
}

export default Transactions;
