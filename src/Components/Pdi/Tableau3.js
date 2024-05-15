import React from 'react';
import Thead3 from './Thead3';
import Tbody3 from './Tbody3';

const Tableau3 = ({evaluations}) => {
  //console.log(evaluations);
  return (
    <table className="table table-hover" id="myTable">
        <Thead3 />
        <Tbody3 evaluations={evaluations} />
    </table>
)
}

export default Tableau3;