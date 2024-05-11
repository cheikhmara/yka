import React from 'react';
import Thead3 from './Thead3';
import Tbody3 from './Tbody3';

const Tableau3 = ({eleves}) => {
    //console.log(eleves);
  return (
    <table className="table table-hover">
        <Thead3 />
        <Tbody3 eleves={eleves} />
    </table>
)
}

export default Tableau3;