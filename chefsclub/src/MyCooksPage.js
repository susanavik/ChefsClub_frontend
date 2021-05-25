import React from 'react'

function MyCooksPage({cooks, setCooks, recipes}) {

    console.log(recipes)

    return (
        <div>
            <h1>My Cooks</h1>
            <p>{cooks}</p>

        </div>
    )
}


export default MyCooksPage;