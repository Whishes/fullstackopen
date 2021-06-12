import React from 'react'

const Total = ({countParts}: {countParts: number}) => {
    return (
        <div>
            <p>
                Number of exercises{" "}
                {countParts}
            </p>
        </div>
    )
}

export default Total
