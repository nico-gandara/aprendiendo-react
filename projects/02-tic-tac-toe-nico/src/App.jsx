import { useState } from "react"
import confetti from "canvas-confetti"
import { Square } from "./components/Square"
import { TURNS, WINNER_COMBOS } from "./constants"
import { checkWinnerFrom, checkEndGame } from "./logic/board"
import { WinnerModal } from "./components/WinnerModal"

function App() {
    const [board, setBoard] = useState(Array(9).fill(null))

    const [turn, setTurn] = useState(TURNS.X)

    const [winner, setWinner] = useState(null)

    

    const resetGame = () => {
        setBoard(Array(9).fill(null))
        setTurn(TURNS.X)
        setWinner(null)
    }

    const updateBoard = (index) => {

        if (board[index] || winner) return
        
        //actualizo tablero
        const newBoard =[...board]
        newBoard[index]= turn
        setBoard(newBoard)

        //actualizo turno
        const newTurn = turn == TURNS.X ? TURNS.O : TURNS.X
        setTurn(newTurn)

        const newWinner = checkWinnerFrom(newBoard)
        if (newWinner) {
            confetti()
            setWinner(newWinner)
        } else if (checkEndGame(newBoard)) 
            setWinner(false)
    }
    
    return (
    <main className='board'>
        <h1>Tic tac toe</h1>
        <button onClick={resetGame}>Empezar de nuevo</button>
        <section className='game'>
            {
                board.map((_, index) => {
                    return (
                        <Square
                          key={index}
                          index={index}
                          updateBoard={updateBoard}
                        >
                            {board[index]}
                        </Square>
                    )
                })
            }
        </section>
        <section className="turn">
            <Square isSelected={turn==TURNS.X}>
                {TURNS.X}
            </Square>
            <Square isSelected={turn==TURNS.O}>
                {TURNS.O}
            </Square>
        </section>
        
        <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
 )
}
export default App

