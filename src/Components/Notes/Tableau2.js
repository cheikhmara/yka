import React from 'react';
import Thead2 from './Thead2';
import Tbody2 from './Tbody2';

const Tableau2 = ({eleves}) => {
    //console.log(eleves);
  return (
    <table className="table table-hover">
        <Thead2 />
        <Tbody2 eleves={eleves} />
    </table>
)
}

export default Tableau2;