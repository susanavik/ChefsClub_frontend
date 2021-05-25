import React from 'react'

function MyCooksPage({cooked, cooks, setCooked, recipes}) {

    console.log(cooks)

    return (
        <div>
            <h1>My Cooks</h1>
            <p>{cooked}</p>

        </div>
    )
}


export default MyCooksPage;