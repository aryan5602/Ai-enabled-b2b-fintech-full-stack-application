import * as React from 'react';
import { getData } from "../services/data";
import { useEffect, useState } from 'react';
import Table2 from './Table2';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import RefreshIcon from '@mui/icons-material/Refresh';
import ButtonGroup from '@mui/material/ButtonGroup';
import TextField from '@mui/material/TextField';
import ABC from './abc.svg';
import High from './highradius.png';
import './Landing.css';

const searchData = async (sample) => {
    let url = "cust_number=" + sample;
    let response = await axios.get("http://localhost:8080/HRC81532W/search?" + url);
    let data = response.data.Bills;
    data.map((Bills, index) => ({ ...Bills, "id": index }))
    return data;
}

const getadvsearch = async (cust, business, doc, inv) => {
    console.log('inside')
    let url = "cust_number=" + cust + "&business_year=" + business + "&doc_id=" + doc + "&invoice_id=" + inv;
    let response = await axios.get("http://localhost:8080/HRC81532W/advsearch?" + url);
    let data = response.data.Bills;
    return data;
}

const edit = async (a, inc, cpt) => {
    let url = "id=" + a + "&invoice_currency=" + inc + "&cust_payment_terms=" + cpt;
    let response = await axios.get("http://localhost:8080/HRC81532W/update?" + url);
    return response;
}


const dele = async (a) => {
    let url = "id=" + a;
    let response = await axios.get("http://localhost:8080/HRC81532W/delete?" + url);
    return response.data;
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

const Addre = async (b_code, c_num, clear_date, b_year, doc_id, p_date, c_date, d_date, inv_cu, doc_type, post_id, total_open, base_date, cust_term, inv_id) => {
    let url = "business_code=" + b_code + "&clear_date=" + clear_date + "&posting_date=" + p_date + "&document_create_date=" + c_date + "&due_in_date=" + d_date + "&invoice_currency=" + inv_cu + "&document_type=" + doc_type + "&posting_id=" + post_id + "&total_open_amount=" + total_open + "&baseline_create_date=" + base_date + "&cust_payment_terms=" + cust_term + "&cust_number=" + c_num + "&buisness_year=" + b_year + "&doc_id=" + doc_id + "&invoice_id=" + inv_id;
    console.log("http://localhost:8080/HRC81532W/insert?" + url)
    let response = await axios.get("http://localhost:8080/HRC81532W/insert?" + url);
    return response.data;
}

export default function Landing() {

    const [data, setData] = useState([]);
    useEffect(async () => { setData(await getData()) }, []);
    const [isOpen, setIsOpen] = useState(false);

    async function getChecked() {
        const checkBox = document.getElementById('c_input').value;
        if (checkBox.length > 0) {
            setData(await searchData(checkBox))
        }
    }


    async function advsearch() {
        const cust = document.getElementById('cust').value;
        const business = document.getElementById('business').value;
        const doc = document.getElementById('doc').value;
        const inv = document.getElementById('inv').value;
        if (cust.length > 0 && business.length > 0 && doc.length > 0 && inv.length > 0) {
            setData(await getadvsearch(cust, business, doc, inv))
        }
    }

    async function Refresh() {
        setData(await getData());
        document.getElementById('c_input').value = "";
    }

    async function AddPopup() {
        document.querySelector('.bg-modal').style.display = 'flex';
    }
    async function closePopup() {
        document.querySelector('.bg-modal').style.display = 'none';
    }

    async function EditPopup() {
        document.querySelector('.bg-modal-edit').style.display = 'flex';
    }
    async function closeEditPopup() {
        document.querySelector('.bg-modal-edit').style.display = 'none';
    }

    async function DeletePopup() {
        document.querySelector('.bg-modal-delete').style.display = 'flex';
    }
    async function closeDeletePopup() {
        document.querySelector('.bg-modal-delete').style.display = 'none';
    }

    async function AdvPopup() {
        document.querySelector('.bg-modal-adv').style.display = 'flex';
    }
    async function closeAdvPopup() {
        document.querySelector('.bg-modal-adv').style.display = 'none';
    }


    async function editt() {
        let a = document.getElementById('checkk').value;
        let inc = document.getElementById('inc').value;
        let cpt = document.getElementById('cpt').value;
        if (a.length > 0 && inc.length && cpt.length > 0) {
            let res = await edit(a, inc, cpt)
            console.log(res.data);
            if (res.data == 'updated') {
                alert('Updated Successfully!')
            }
            else {
                alert('Error');
            }
        }
    }
    async function del() {
        let a = document.getElementById('checkk').value;
        let res = await dele(a);
        console.log(res);
        if (res == 'Deleted') {
            alert('Deleted Successfully!')
        }
        else {
            alert('Error');
        }
    }


    async function addRecord() {
        let b_code = document.getElementById('b_code').value;
        let c_num = document.getElementById('c_num').value;
        let clear_date = document.getElementById('clear_date').value;
        let b_year = document.getElementById('b_year').value;
        let doc_id = document.getElementById('doc_id').value;
        let p_date = document.getElementById('p_date').value;
        let c_date = document.getElementById('c_date').value;
        let d_date = document.getElementById('d_date').value;
        let inv_cu = document.getElementById('inv_cu').value;
        let doc_type = document.getElementById('doc_type').value;
        let post_id = document.getElementById('post_id').value;
        let total_open = document.getElementById('total_open').value;
        let base_date = document.getElementById('base_date').value;
        let cust_term = document.getElementById('cust_term').value;
        let inv_id = document.getElementById('inv_id').value;
        clear_date = formatDate(clear_date);
        p_date = formatDate(p_date);
        c_date = formatDate(c_date);
        d_date = formatDate(d_date);
        base_date = formatDate(base_date);
        let res = await Addre(b_code, c_num, clear_date, b_year, doc_id, p_date, c_date, d_date, inv_cu, doc_type, post_id, total_open, base_date, cust_term, inv_id);
        if (res == 'Inserted') {
            alert('Inserted Successfully!');
        }
        else {
            alert('Error');
        }
    }


    return (
        <div>
            <div style={{ backgroundColor: "#313640", height: 100 }}>
                <img style={{ paddingRight: 250, paddingTop: 20 }} src={High} height={50} width={250}></img>
                <img style={{ paddingLeft: 0, paddingTop: 20 }} src={ABC} height={50} width={250} hspace="20" align="left"></img>
            </div>

            <Stack style={{ paddingTop: 25 }} spacing={2} direction="row">
                <ButtonGroup variant="outlined" aria-label="outlined button group">
                    <Button style={{ minWidth: '150px', maxWidth: '150px', maxHeight: '40px', minHeight: '40px' }}>PREDICT</Button>
                    <Button style={{ minWidth: '150px', maxWidth: '150px', maxHeight: '40px', minHeight: '40px' }} onClick={() => { window.open() }} >ANALYTICS VIEW</Button>
                    <Button style={{ maxWidth: '150px', maxHeight: '40px', minWidth: '40px', minHeight: '40px' }} onClick={AdvPopup}>ADVANCE SEARCH</Button>
                </ButtonGroup>
                <Button style={{ maxHeight: '40px', minHeight: '40px' }} variant="outlined" onClick={Refresh}><RefreshIcon></RefreshIcon></Button>
                <TextField type="text" id="c_input" variant="outlined" placeholder='Enter Customer Number' onChange={getChecked} />
                <ButtonGroup variant="outlined" aria-label="outlined button group">
                    <ButtonGroup variant="outlined" aria-label="outlined button group"><Button onClick={AddPopup} style={{ maxWidth: '150px', maxHeight: '40px', minWidth: '150px', minHeight: '40px' }}>Add</Button></ButtonGroup>
                    <ButtonGroup variant="outlined" aria-label="outlined button group"><Button onClick={EditPopup} id="editButton" style={{ maxWidth: '150px', maxHeight: '40px', minWidth: '150px', minHeight: '40px', cursor: "not-allowed" }}>EDIT</Button></ButtonGroup>
                    <ButtonGroup variant="outlined" aria-label="outlined button group"><Button onClick={DeletePopup} id="deleteButton" style={{ maxWidth: '150px', maxHeight: '40px', minWidth: '150px', minHeight: '40px', cursor: "not-allowed" }}>DELETE</Button></ButtonGroup>
                </ButtonGroup>
            </Stack>
            <div class="bg-modal">
                <div class="modal-content">
                    <label>Add</label>
                    <Stack style={{ paddingTop: 25 }} spacing={2} direction="row">
                        <TextField id="b_code" type="text" label="Business code" variant="outlined" />
                        <TextField id="c_num" type="text" label="Customer Number" variant="outlined" />
                        <TextField id="clear_date" type="date" label="Clear Date" variant="outlined" />
                        <TextField id="b_year" type="text" label="Business year" variant="outlined" />
                    </Stack>
                    <Stack style={{ paddingTop: 25 }} spacing={2} direction="row">
                        <TextField id="doc_id" type="text" label="Doc Id" variant="outlined" />
                        <TextField id="p_date" type="date" label="Posting date" variant="outlined" />
                        <TextField id="c_date" type="date" label="Document Create Date" variant="outlined" />
                        <TextField id="d_date" type="date" label="Due in Date" variant="outlined" />
                    </Stack>
                    <Stack style={{ paddingTop: 25 }} spacing={2} direction="row">
                        <TextField id="inv_cu" type="text" label="Invoice Currency" variant="outlined" />
                        <TextField id="doc_type" type="text" label="Document Type" variant="outlined" />
                        <TextField id="post_id" type="text" label="Posting id" variant="outlined" />
                        <TextField id="total_open" type="text" label="Total Open Amount" variant="outlined" />
                    </Stack>
                    <Stack style={{ paddingTop: 25 }} spacing={2} direction="row">
                        <TextField id="base_date" type="date" label="Baseline Create Date" variant="outlined" />
                        <TextField id="cust_term" type="text" label="Customer Payment Terms" variant="outlined" />
                        <TextField id="inv_id" type="text" label="Invoice Id" variant="outlined" />
                    </Stack>
                    <Stack style={{ paddingTop: 25 }} spacing={2} direction="row">
                        <Button onClick={addRecord} variant="outlined" style={{ maxWidth: "390px", maxHeight: "50px", minWidth: "390px", minHeight: "30px" }} >ADD</Button>
                        <Button onClick={closePopup} variant="outlined" style={{ maxWidth: "390px", maxHeight: "50px", minWidth: "390px", minHeight: "30px" }} >CANCEL</Button>
                    </Stack>
                </div>
            </div>
            <div class="bg-modal-edit">
                <div class="modal-content-edit">
                    <label>Edit</label>
                    <Stack style={{ paddingTop: 25 }} spacing={2} direction="row">
                        <TextField id="inc" type="text" label="Invoice Currency" variant="outlined" />
                        <TextField id="cpt" type="text" label="Customer payment terms" variant="outlined" />
                    </Stack>
                    <Stack style={{ paddingTop: 25 }} spacing={2} direction="row">
                        <Button onClick={editt} variant="outlined" style={{ maxWidth: "225px", maxHeight: "50px", minWidth: "225px", minHeight: "30px" }}>UPDATE</Button>
                        <Button classname="close-btn" onClick={closeEditPopup} variant="outlined" style={{ maxWidth: "225px", maxHeight: "50px", minWidth: "225px", minHeight: "30px" }}>CANCEL</Button>
                    </Stack>
                </div>
            </div>
            <div class="bg-modal-delete">
                <div class="modal-content-delete">
                    <p>Delete Records?</p>
                    <p>Are you sure you want to delete these record[s] ?</p>
                    <Stack style={{ paddingTop: 25 }} spacing={2} direction="row">
                        <Button classname="close-btn" onClick={closeDeletePopup} variant="outlined" style={{ maxWidth: "240px", maxHeight: "50px", minWidth: "240px", minHeight: "30px" }}>CANCEL</Button>
                        <Button onClick={del} variant="outlined" style={{ maxWidth: "240px", maxHeight: "50px", minWidth: "240px", minHeight: "30px" }}>DELETE</Button>
                    </Stack>
                </div>
            </div>
            <div class="bg-modal-adv">
                <div class="modal-content-adv">
                    <label>Advance Search</label>
                    <Stack style={{ paddingTop: 25 }} spacing={2} direction="row">
                        <TextField id="doc" type="text" label="Document id" variant="outlined" />
                        <TextField id="inv" type="text" label="Invoice id" variant="outlined" />
                    </Stack>
                    <Stack style={{ paddingTop: 25 }} spacing={2} direction="row">
                        <TextField id="cust" type="text" label="Customer number" variant="outlined" />
                        <TextField id="business" type="text" label="Business year" variant="outlined" />
                    </Stack>
                    <Stack style={{ paddingTop: 25 }} spacing={2} direction="row">
                        <Button onClick={advsearch} variant="outlined" style={{ maxWidth: "225px", maxHeight: "50px", minWidth: "225px", minHeight: "30px" }}>SEARCH</Button>
                        <Button classname="close-btn" onClick={closeAdvPopup} variant="outlined" style={{ maxWidth: "225px", maxHeight: "50px", minWidth: "225px", minHeight: "30px" }}>CANCEL</Button>
                    </Stack>
                </div>
            </div>
            <Table2 id="landingGrid" data={data} />
            <div id="footer" style={{ paddingLeft: 60, display: "inline-table", width: "1450px", backgroundColor: "#313640", height: 40 }}>
                <p style={{ display: "table-cell", fontSize: 15 }}> <u style={{ color: "blue", fontSize: 15 }}>Privacy Policy</u> | 2022 HighRadius Corporation. All Rights Reserved.</p>
            </div>
        </div >

    );
}
