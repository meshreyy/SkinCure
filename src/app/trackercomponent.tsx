import React from 'react';
import { RJTable } from "./data-table";
import { Button } from "@/components/ui/button";

const trackercomponent = ({ tableData, setTableData, onNext }) => {
  const handleNextClick = () => {
    console.log("table data", tableData);
    onNext(); // Call the onNext function passed as a prop
  };

  return (
    <>
      <RJTable tableData={tableData} setTableData={setTableData} />
      <Button onClick={handleNextClick}>Next</Button>
    </>
  );
};

export default trackercomponent;
