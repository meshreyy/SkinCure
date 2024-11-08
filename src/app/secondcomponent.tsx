import React from 'react';


const SecondComponent = ({ tableData }) => {
  return (
    <div>
      <p>This is where the results will be displayed.</p>
      <pre>{JSON.stringify(tableData, null, 2)}</pre> {/* Display the table data for now */}
    </div>
  );
};

export default SecondComponent;
