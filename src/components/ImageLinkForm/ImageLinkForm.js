import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm =({onInputChange, onButtonClick}) =>{
    return(
        <div>
        <p className='f3'>
            {'This magic brain will detect faces in your pictures. Give it a try '}
        </p>
        <div className='center'>
            <div className='center form pa2 br3 w-40 shadow-5'>
            <input type='tex' placeholder='Enter Link of the Image here' className='f4 pa2 w-70 center' onChange={onInputChange} ></input>
            <button className='w-30 grow f4 link center ph3 pv2 white bg-light-purple' onClick={onButtonClick}>Detect</button>
            </div>
        </div>
        </div>
    );
}

export default ImageLinkForm;
