// import { useState, useEffect } from 'react';
// import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Checkbox } from "@/components/ui/checkbox";
// import Image from 'next/image';
// import React from 'react';

// const columnNames = [
//   "Acne", "Dryness", "Oiliness", "Itchiness", "Redness"
// ];
// const imageSources = [
//   "/acne.jpg",
//   "/dryness.jpg",
//   "/oiliness.jpg",
//   "/itchiness.jpg",
//   "/redness.jpg"
// ];

// export function RJTable() {
//   const [tableData, setTableData] = useState([]);

//   useEffect(() => {
//     // Fetch initial data
//     const fetchData = async () => {
//       try {
//         const response = await fetch('/api/user-data');
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         // Ensure data is in expected format
//         if (Array.isArray(data)) {
//           setTableData(data);
//         } else {
//           console.error('Invalid data format:', data);
//         }
//       } catch (error) {
//         console.error('Failed to fetch user data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleCheckboxChange = async (rowIndex, colIndex) => {
//     const newData = tableData.map((row, rIdx) => 
//       row.map((col, cIdx) => 
//         rIdx === rowIndex ? (cIdx === colIndex ? true : false) : col // Uncheck other boxes in the row
//       )
//     );
    
//     setTableData(newData);
    
//     try {
//       const response = await fetch('/api/save-data', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newData),
//       });
//       if (!response.ok) {
//         throw new Error('Failed to save data');
//       }
//     } catch (error) {
//       console.error('Error saving data:', error);
//     }
//   };

//   // Handle case where tableData might be empty
//   if (!tableData.length) {
//     return <p>Loading...</p>; // You can customize this loading state
//   }

//   return (
//     <Table>
//       <TableCaption>"Healthy skin is just a tap away!"</TableCaption>
//       <TableHeader>
//         <TableRow>
//           <TableHead className="w-[150px]"></TableHead>
//           <TableHead className="w-[150px]">Mild</TableHead>
//           <TableHead className="w-[150px]">Moderate</TableHead>
//           <TableHead className="w-[150px]">Severe</TableHead>
//         </TableRow>
//       </TableHeader>
//       <TableBody>
//         {
//           tableData.map((row, rowIndex) => (
//             <TableRow key={rowIndex}>
//               <TableCell>
//                 {columnNames[rowIndex]}
//                 <Image src={imageSources[rowIndex]} alt={columnNames[rowIndex]} width={50} height={50} />
//               </TableCell>
//               {
//                 row.map((col, colIndex) => (
//                   <TableCell key={colIndex}>
//                     <Checkbox
//                       checked={col}
//                       onClick={() => handleCheckboxChange(rowIndex, colIndex)}
//                     />
//                   </TableCell>
//                 ))
//               }
//             </TableRow>
//           ))
//         }
//       </TableBody>
//     </Table>
//   );
// }
