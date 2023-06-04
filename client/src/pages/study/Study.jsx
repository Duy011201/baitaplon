import React, { useState, useEffect, useMemo } from "react";
import Header from "../../components/header/Header";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { AddStudentDialog, ChangeStudyDialog, DeleteStudentDialog } from './Dialog';
import Popup from '../../components/popup/Popup';
import { getAllStudent } from './StudyService.js';
import moment from "moment";

export default function Study(props) {

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
        { field: "id", headerName: "STT", width: 70 },
        { field: "fullName", headerName: "Họ và tên", width: 160 },
        // { field: "course_code", headerName: "Mã Học Phần", width: 100 },
        { field: "course_name", headerName: "Tên Học Phần", width: 160 },
        //{ field: "exam_times", headerName: "Lần Thi", width: 80 },
        //{ field: "evaluate", headerName: "Đánh giá", width: 70 },
        { field: "gk_test", headerName: "Kiểm Tra GK", width: 100 },
        //{ field: "practice", headerName: "Thực Hành", width: 100 },
        { field: "exam_ends", headerName: "Thi Kết Thúc", width: 100 },
        { field: "hp_summary", headerName: "Tổng Kết HP", width: 100 },
        //{ field: "letter_poin", headerName: "Điểm chữ", width: 100 },
        {
            field: "action",
            headerName: "Action",
            description: "This column has action and is not sortable.",
            sortable: false,
            width: 260,
            renderCell: (params) => {
                const handleEdit = (e) => {
                    setOpenPopup(true), setAction('edit')
                    setDataSelect(params.row)
                };
                const handleRemove = (e) => {
                    setOpenPopup(true), setAction('delete')
                    setDataSelect(params.row)
                };
                const handleDetail = (e) => {
                    setOpenPopup(true), setAction('detail')
                    console.log(params)
                };
                return (
                    <>
                        <Button variant="outlined" color="secondary" sx={{ mr: 1 }} onClick={handleEdit}>
                            Sửa
                        </Button>
                        <Button variant="outlined" color="secondary" sx={{ mr: 1 }} onClick={handleRemove}>
                            Xóa
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={handleDetail}>
                            Chi tiết
                        </Button>
                    </>
                );
            },
        },
    ];

    async function getData() {
        let res = await getAllStudent();
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
                    {action === 'add' ? <Popup title="Thêm Điểm sinh viên" children={() => AddStudentDialog(setOpenPopup)} openPopup={openPopup} setOpenPopup={setOpenPopup} />
                        : action === 'edit' ? <Popup title="Sửa Điểm sinh viên" children={() => ChangeStudyDialog(dataSelect, setOpenPopup)} openPopup={openPopup} setOpenPopup={setOpenPopup} />
                            : action === 'delete' ? <Popup title="Xóa Điểm sinh viên" children={() => DeleteStudentDialog(dataSelect, setOpenPopup)} openPopup={openPopup} setOpenPopup={setOpenPopup} />
                                : <Popup title="Chi tiết Điểm sinh viên" children={AddStudentDialog} openPopup={openPopup} setOpenPopup={setOpenPopup} />
                    }
                </Box>
            </Container>
        </Box>
    );
}
