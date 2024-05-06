import TopTable from './TopTable.jsx'
import BottomTable from './BottomTable.jsx'
import { useState } from 'react';
export default function Crud(){
  const[num, setNum] = useState(0);

  const renderBot = () => {
    setNum(num+1);
  }
  

  return(
    <>
      <TopTable renderBot={renderBot}/>
      <BottomTable theKey={num}/>
     </>

  )
}