// import React, { useEffect, useState } from 'react';

// const ResultsPage = () => {
//     const [userData, setUserData] = useState([]);

//     useEffect(() => {
//         fetch('/api/user-data')
//             .then((response) => response.json())
//             .then((data) => setUserData(data))
//             .catch((error) => console.error('Error fetching user data:', error));
//     }, []);

//     return (
//         <div>
//             <h1>User Input Results</h1>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Category</th>
//                         <th>Mild</th>
//                         <th>Moderate</th>
//                         <th>Severe</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {userData.map((row, rowIndex) => (
//                         <tr key={rowIndex}>
//                             <td>{row.category}</td>
//                             <td>{row[0] ? '✓' : ''}</td>
//                             <td>{row[1] ? '✓' : ''}</td>
//                             <td>{row[2] ? '✓' : ''}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default ResultsPage;
