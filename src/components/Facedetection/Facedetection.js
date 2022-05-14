import React from 'react';
import './Facedetection.css';
const Facedetection=({imageurl, box})=>{
    return(
        <div className='center ma'>
        <div className='absolute mt2'>
            <img  alt='' id='inputimage'  src={imageurl} width='500px' height='auto'/>
            <div className='bounding-box' style={{top:box.toprow,right:box.rightcol,bottom:box.bottomrow,left:box.leftcol}} ></div>
            </div>
        </div>
    );
}
export default Facedetection;