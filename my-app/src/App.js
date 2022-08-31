import React, {useState, useEffect} from "react"
import Die from "./die";
import "./style.css";
import {nanoid} from "nanoid"



export default function App(){

    const [dice, setDice]= useState(allNewDice()) 
    const [tenzie, setTenzie] = useState(false)

    useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzie(true)
        }
    }, [dice])

    function diceGenerator(){
       return {
        value:Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
        }
    }

    function allNewDice(){
        const num = []
        for(let i = 0; i < 10; i++){
            num.push(diceGenerator())
        }
        return num
    }

    function rollDice(){
        if(!tenzie) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? 
                    die :
                    diceGenerator()
            }))
        } else {
            setTenzie(false)
            setDice(allNewDice())
        }
    }
    function holdDice(id){
        setDice(prevState => prevState.map(
            die => {
                return(
                    id === die.id ? {...die, isHeld: !die.isHeld} : die
                )
            }
        ))
    }

    // useEffect({
    //     console.log();
    // },[dice])

    const diceElements = dice.map(die => <Die 
        key={die.id} 
        value={die.value} 
        isHeld={die.isHeld} 
        holdDice={()=> holdDice(die.id)}
    />)

        const endGame = tenzie ? <span>New Game</span> : <span>Roll</span>
        
    
    return(
        <div className="main-body">
            <div className="inside-body">
            <div className="die-title">
                Tenzies
            </div>
            <p className="die-p">
            Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
            </p>
                <div className="container">
                    {diceElements}
                </div> 
            <button onClick={rollDice}>{endGame}</button>
            </div>
        </div>
    )
}