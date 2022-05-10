import React from 'react' 
import Die from './Die'
import { nanoid } from 'nanoid'

export default function App(){

    const [dice,setDice] = React.useState(setDie())
    const [tenzies,setTenzies] = React.useState(false)
    const [numRolls,setNumRolls] = React.useState(1)

    React.useEffect(()=>{
        const allHeld = dice.every(die => die.isHeld === true)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)

        if(allHeld && allSameValue){
            setTenzies(true)
            console.log("win with rolls : "+numRolls)
        }
    },[dice])

    function generate(){
        return {value:Math.floor((Math.random() * 6) + 1),isHeld:false,id:nanoid()}
    }

    function setDie(){
        let numbers = []
        
        for(let i = 1; i<=10;i++){
            numbers.push(generate())
        }

        return numbers

    }

    function roll(){
        if(!tenzies){
            setNumRolls(prev => prev+1)
            setDice(oldDie => oldDie.map(die =>{
                return die.isHeld === true ? die : generate()
            })) 
            console.log('current rolls : '+numRolls)
        }else{
            setNumRolls(1)
            setTenzies(false)
            setDice(setDie())
        }
    }

    function hold(id){
       const arr = dice.map(dice =>{
           if(dice.id == id){
               return {...dice,isHeld:!dice.isHeld}
           }else{
               return {...dice}
           }
       })
       setDice(arr)
    }

    const elements = dice.map((number)=>{
        return <Die num={number.value} key={number.id} id={number.id} isHeld={number.isHeld} hold={hold}/>
    })

    const btnText = tenzies === true ? "New Game" : "Roll"

    return(
        <main>
            <div className='dice-container'>
                {elements}
            </div>
            <button className='roll-btn' onClick={roll}>{btnText}</button>
        </main>
    )
}