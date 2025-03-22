// import { DataGrid, GridColDef } from '@mui/x-data-grid'
// import React, { useEffect, useState } from 'react'
// import { emirateColumns, sxStyles } from '../../../utils/constants'
// import { useDeleteEmirateMutation, useViewAllEmirateQuery } from '../../../features/emirate/emirateApi'
// import { Button } from '@mui/material'
// import { Breadcrumb } from '../../../components/Breadcrumb'
// import { useNavigate } from 'react-router'
// import SearchContainer from '../../../components/LeadsOverview/SearchComponent'

// type Props = {}

// function ViewEmirates({ }: Props) {

//     const { data } = useViewAllEmirateQuery();
//     const [deleteEmirate, { }] = useDeleteEmirateMutation();
//     const navigate = useNavigate();
//     const [breadcrumbs] = useState([
//         { link: "/dashboard", title: "Home" },
//         { link: "#", title: "Emirates" },
//     ]);
//     const [search, setSearch] = useState("");


//     const [emiratesData, setEmiratesData] = useState<[] | null>(null);


//     const emirateColumns: GridColDef[] = [
//         { field: 'id', headerName: 'Roll Number', width: 100 },
//         { field: 'name', headerName: 'Name', width: 200 },
//         {
//             field: 'actions',
//             headerName: 'Actions',
//             width: 200,
//             renderCell: (params) => (
//                 <>
//                     <Button
//                         variant="outlined"
//                         color="primary"
//                         size="small"
//                         onClick={() => handleEdit(params.row)}
//                     >
//                         Edit
//                     </Button>
//                     <Button
//                         variant="outlined"
//                         color="error"
//                         size="small"
//                         style={{ marginLeft: 8 }}
//                         onClick={() => handleDelete(params.row)}
//                     >
//                         Delete
//                     </Button>
//                 </>
//             )
//         }
//     ];

//     const handleEdit = (row: any) => {
//         console.log("Edit clicked for:", row);
//         navigate(`/edit-emirate/${row.slug}`)
//         // Add your edit logic here, e.g., navigate to an edit page
//     };

//     const handleDelete = (row: any) => {
//         // Confirmation dialog before deleting the row
//         // Confirmation dialog should contain an option to cancel the deletion
//         // If confirmed, call the delete mutation with the row's id
//         // If cancelled, do nothing
//         // Example:
//         if (window.confirm(`Are you sure you want to delete ${row.name}?`)) {
//             deleteEmirate(row._id);
//         }
//         console.log("Delete clicked for:", row);
//         // Add your delete logic here, e.g., show a confirmation dialog
//     };


//     useEffect(() => {
//         setEmiratesData(data?.data)
//     }, [data])

//     if (emiratesData === null) {
//         return 'Loading...';
//     }

//     const rowsWithRollNumber = emiratesData?.map((row, index) => ({
//         ...row,
//         id: index + 1,
//     }));


//     return (
//         <section className='p-2'>

//             <Breadcrumb items={breadcrumbs} />

//             <h2 className='text-base text-[#141824] font-bold '>All Emirates</h2>



// <section>
//     <div className="max-w-[300px] py-3 w-full">

//          <SearchContainer
//                         placeholder="Search something..."
//                         value={search}
//                         onChange={(e) => setSearch(e.target.value)}
//                         onClear={() => setSearch("")}
//                         onSearch={() => console.log("Searching for:", search)}
//                         />
//                         </div>
// </section>
//             <div className="w-full mt-1 overflow-x-auto">
//                 <DataGrid
//                     rows={rowsWithRollNumber}
//                     columns={emirateColumns}
//                     sx={sxStyles}
//                 />
//             </div>
//         </section>
//     )
// }

// export default ViewEmirates