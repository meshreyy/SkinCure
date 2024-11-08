// import React, { useState } from 'react';
// import { useRouter } from 'next/router';
// import { RJTable } from '../components/RJTable';

// const HomePage = () => {
//     const [tableData, setTableData] = useState([
//         [false, false, false],
//         [false, false, false],
//         [false, false, false],
//         [false, false, false],
//         [false, false, false],
//     ]);
//     const router = useRouter();

//     const handleSubmit = () => {
//         fetch('/api/save-data', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(tableData),
//         })
//             .then(() => {
//                 router.push('/results');
//             })
//             .catch((error) => console.error('Error saving user data:', error));
//     };

//     return (
//         <div>
//             <RJTable tableData={tableData} setTableData={setTableData} />
//             <button onClick={handleSubmit}>Next</button>
//         </div>
//     );
// };

// export default HomePage;
