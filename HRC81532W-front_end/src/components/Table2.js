import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Checkbox } from '@mui/material';
import './Bar.css';
import { useState } from 'react';
import TablePagination from "@material-ui/core/TablePagination";


function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

export default function Table2(props) {
    const [checkbox, setCheck] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    //const [selectAll, setselectAll] = useState(true);
    const [order, setOrder] = useState()
    const [orderBy, setOrderBy] = useState()

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };




    const handleSortRequest = cellId => {
        const isAsc = orderBy === cellId && order === "asc";
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(cellId)
    }

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const ab = (e) => {
        console.log('aryan')
        setCheck(!checkbox);
        if (checkbox == true) {
            document.getElementById('editButton').style.cursor = "auto";
            document.getElementById('deleteButton').style.cursor = "auto";
        }
        else {
            {
                document.getElementById('editButton').style.cursor = "not-allowed";
                document.getElementById('deleteButton').style.cursor = "not=allowed"
            }
        }
    }


    const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, props.data.length - page * rowsPerPage);
    return (
        <TableContainer id="tablecontainer" sx={{ background: "none", padding: "0px", width: "1500px", height: "500px" }}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow sx={{ height: 10 }}>
                        <TableCell sx={{ color: "white" }} ><Checkbox sx={{ color: 'white' }}></Checkbox></TableCell>
                        <TableCell sx={{ color: "white" }} align="right">Sl No</TableCell>
                        <TableCell sx={{ color: "white" }} align="right">Business Code</TableCell>
                        <TableCell sx={{ color: "white" }} align="right">Customer Number</TableCell>
                        <TableCell sx={{ color: "white" }} align="right">Clear Date</TableCell>
                        <TableCell sx={{ color: "white" }} align="right">Business Year</TableCell>
                        <TableCell sx={{ color: "white" }} align="right">Document Id</TableCell>
                        <TableCell sx={{ color: "white" }} align="right">Posting Date</TableCell>
                        <TableCell sx={{ color: "white" }} align="right">Document Create Date</TableCell>
                        <TableCell sx={{ color: "white" }} align="right">Due Date</TableCell>
                        <TableCell sx={{ color: "white" }} align="right">Invoice Currency</TableCell>
                        <TableCell sx={{ color: "white" }} align="right">Document Type</TableCell>
                        <TableCell sx={{ color: "white" }} align="right">Posting Id</TableCell>
                        <TableCell sx={{ color: "white" }} align="right">Total Open amount</TableCell>
                        <TableCell sx={{ color: "white" }} align="right">Baseline Create Date</TableCell>
                        <TableCell sx={{ color: "white" }} align="right">Customer Payment Terms</TableCell>
                        <TableCell sx={{ color: "white" }} align="right">Invoice Id</TableCell>
                        <TableCell sx={{ color: "white" }} align="right">Is Open</TableCell>
                        <TableCell sx={{ color: "white" }} align="right">Aging Bucket</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        props.data
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((d, index) => (
                                <TableRow value={d.sl_no}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, height: 10 }}
                                >
                                    <TableCell sx={{ color: "white" }} ><Checkbox id="checkk" onClick={e => ab(e)} value={d.sl_no} sx={{ color: "white" }} /*{...label}*/ /></TableCell>
                                    <TableCell sx={{ color: "white" }} align="right">{d.sl_no}</TableCell>
                                    <TableCell sx={{ color: "white" }} align="right">{d.business_code}</TableCell>
                                    <TableCell sx={{ color: "white" }} align="right">{d.cust_number}</TableCell>
                                    <TableCell sx={{ color: "white" }} align="right">{d.clear_date}</TableCell>
                                    <TableCell sx={{ color: "white" }} align="right">{d.buisness_year}</TableCell>
                                    <TableCell sx={{ color: "white" }} align="right">{d.doc_id}</TableCell>
                                    <TableCell sx={{ color: "white" }} align="right">{d.posting_date}</TableCell>
                                    <TableCell sx={{ color: "white" }} align="right">{d.document_create_date}</TableCell>
                                    <TableCell sx={{ color: "white" }} align="right">{d.due_in_date}</TableCell>
                                    <TableCell sx={{ color: "white" }} align="right">{d.invoice_currency}</TableCell>
                                    <TableCell sx={{ color: "white" }} align="right">{d.document_type}</TableCell>
                                    <TableCell sx={{ color: "white" }} align="right">{d.posting_id}</TableCell>
                                    <TableCell sx={{ color: "white" }} align="right">{d.total_open_amount}</TableCell>
                                    <TableCell sx={{ color: "white" }} align="right">{d.baseline_create_date}</TableCell>
                                    <TableCell sx={{ color: "white" }} align="right">{d.cust_payment_terms}</TableCell>
                                    <TableCell sx={{ color: "white" }} align="right">{d.invoice_id}</TableCell>
                                    <TableCell sx={{ color: "white" }} align="right">{d.isOpen}</TableCell>
                                    <TableCell sx={{ color: "white" }} align="right">NaN</TableCell>
                                </TableRow>
                            ))}
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={props.data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </TableContainer >
    );
}
