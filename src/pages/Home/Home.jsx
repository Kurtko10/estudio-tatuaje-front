import { useEffect, useState } from "react"

export const Home = () => {

    const [count, setCount] = useState(0)
    const [inputData, setInputData] = useState("")
   
  
    
    const addCountButtonHandler = () => {
      setCount(count + 1)
      console.log("la cuenta sin useEffect",count);
    }
  
    const inputHandler =(e)=>{
      
      setInputData(e.target.value)
      console.log(e.target.value);
    }
  
    const logearInputData = () =>{
      console.log(inputData);
    }
    useEffect(
      logearInputData, [inputData, count])
  
    useEffect(()=>{
      console.log("Así está la cuenta de useEffect", count);
    },[count])


    return (

        <>
         <h1>Vite + React</h1>
      <h3>Subtítulo</h3>
      <div className="card">
        <button onClick={() => addCountButtonHandler()}>
          count is {count}
        </button>
        <input type='text' name='inputDePrueba' onChange={(e)=>inputHandler(e)} ></input>  
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
            </>

    )
}