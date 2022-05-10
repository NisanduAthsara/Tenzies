import React from 'react'

export default function Die(props){
    const color = props.isHeld === true ? "#59E391" : "white"
    const style = {
        backgroundColor:color
    }
    return(
        <div className='die-face' style={style} onClick={()=>props.hold(props.id)}>
            <h2>{props.num}</h2>
        </div>
    )
}