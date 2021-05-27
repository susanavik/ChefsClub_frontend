import React from 'react'

function MyCooksCard(props) {

    console.log(props) 

    return (
        <li>
            Hello
            {/* <div className="image">
                <img src={mycooks.image} alt={mycooks.name} width="400" height="240" frameBorder="0" 
                    className='post-image'/>
            </div> */}
        </li>
    )
}

export default MyCooksCard;