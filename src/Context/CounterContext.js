import React , {useState , createContext}from 'react'



export let CounterContext = createContext(0);

export default function CounterContextProvider(props){

    const [counter, setcounter] = useState(0)
    function changeCount(){
        setcounter(counter+1)
    }

    return<>
    <CounterContext.Provider value={{counter , changeCount}}>
        {props.children}
    </CounterContext.Provider>
    </>

}