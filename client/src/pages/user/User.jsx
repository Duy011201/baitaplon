import React, { useState, useEffect, useMemo } from "react";
import Header from "../../components/header/Header";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { AddUserDialog, ChangeUserDialog, DeleteUserDialog } from './Dialog';
import Popup from '../../components/popup/Popup';
import { getAllUser } from './UserService';
import moment from "moment";

export default function Infomation(props) {

    const [rowData, setRowData] = useState([]);
    const [openPopup, setOpenPopup] = useState(false);
    const [action, setAction] = useState('');
    const [dataSelect, setDataSelect] = useState();

    useEffect(() => {
        getData();
    }, []);

    useMemo(() => getData(),
        [openPopup]
    );

    const columns = [
        { field: "id", headerName: "ID", width: 200 },
        { field: "fullName", headerName: "fullname", width: 150 },
        { field: "email", headerName: "email", width: 100 },
        {
            field: "username",
            headerName: "username",
            width: 150,
        },
        {
            field: "password",
            headerName: "password",
            width: 200
        },
        {
            field: "role",
            headerName: "role",
            width: 70,
        },
        {
            field: "updatedAt",
            headerName: "updatedAt",
            width: 100,
        },
        {
            field: "action",
            headerName: "Action",
            description: "This column has action and is not sortable.",
            sortable: false,
            width: 200,
            renderCell: (params) => {
                const handleEdit = (e) => {
                    setOpenPopup(true), setAction('edit')
                    setDataSelect(params.row)
                };
                const handleRemove = (e) => {
                    setOpenPopup(true), setAction('delete')
                    setDataSelect(params.row)
                };
                return (
                    <>
                        <Button variant="outlined" color="secondary" sx={{ mr: 1 }} onClick={handleEdit}>
                            Sửa
                        </Button>
                        <Button variant="outlined" color="secondary" sx={{ mr: 1 }} onClick={handleRemove}>
                            Xóa
                        </Button>
                    </>
                );
            },
        },
    ];

    async function getData() {
        let res = await getAllUser();
        if (res.status === 200) {
            let listData = res.data.rows;
            listData.map((item) => {
                item.dateOfBirth = moment(item.dateOfBirth).format('DD-MM-YYYY');
            })
            setRowData(listData);
        }
    }

    return (
        <Box
            sx={{
                backgroundColor: "#1b1b1b",
            }}
        >
            <Header />
            <Container maxWidth="lg">
                <Box
                    sx={{
                        height: "10vh",
                        backgroundColor: "primary.dark",
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "nowrap",
                        alignItems: "center",
                        justifyContent: "space-around",
                    }}
                >
                    <TextField
                        id="outlined-basic"
                        label="Search..."
                        variant="outlined"
                        size="small"
                        sx={{
                            marginRight: "10px",
                        }}
                        onChange={() => getData()}
                    />
                    <Box>
                        <Button sx={{ marginRight: "10px" }} variant="contained" onClick={() => { setOpenPopup(true), setAction('add') }}>
                            Thêm
                        </Button>
                    </Box>
                </Box>
                <Box
                    sx={{
                        height: "80vh",
                        backgroundColor: "primary.dark",
                    }}
                >
                    <div style={{ height: 400, width: "100%" }}>
                        <DataGrid
                            rows={rowData}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 5 },
                                },
                            }}
                            pageSizeOptions={[5, 10]}
                        />
                    </div>
                </Box>
                <Box>
                    {action === 'add' ? <Popup title="Thêm " children={() => AddUserDialog(setOpenPopup)} openPopup={openPopup} setOpenPopup={setOpenPopup} />
                        : action === 'edit' ? <Popup title="Sửa người dùng" children={() => ChangeUserDialog(dataSelect, setOpenPopup)} openPopup={openPopup} setOpenPopup={setOpenPopup} />
                            : action === 'delete' ? <Popup title="Xóa người dùng" children={() => DeleteUserDialog(dataSelect, setOpenPopup)} openPopup={openPopup} setOpenPopup={setOpenPopup} />
                                : <Popup title="Chi tiết người dùng" children={() => AddUserDialog(setOpenPopup)} openPopup={openPopup} setOpenPopup={setOpenPopup} />
                    }
                </Box>
            </Container>
        </Box>
    );
}
