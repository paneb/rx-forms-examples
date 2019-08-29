import React, { useState, useEffect, useRef} from 'react';

import logo from './logo.svg';
import './App.css';

import { RXForm } from 'rx-forms';

const model = {
  groups: [
    {name: "surname", type: "text", label: "Cognome:"},
    {name: "name", type: "text", label: "Nome:"},
    {name: "email", type: "text", label: "Mail:"},
    {name: "phone", type: "phone", label: "Numero di Telefono:"},
    {name: "age", type: "number", label: "Età:"},
  ],
  buttons: [
    {name: "submit", type: "submit", label: "Invia", color: "primary"},
    {name: "clear", type: "submit", label: "Cancella", color: "success"},
  ]
}

export const App = () => {

  const form = useRef(null);
  const[store, setStore] = useState(null);
  const [errors, setErrors] = useState([]);

  const onButtonClick = () => {
    // `current` points to the mounted text input element
    console.log(`in click with: `, form.current.submit());
  };

  useEffect(()=>{

    console.log(`form current: `, form.current);
    // setStore(form.current.store.getState().errors)

  }, []);

  // var form = null;
  useEffect(()=>{
    console.log(`with form: `, form);
  },[])  

  return (
    <div className="App">
      <span>Test2</span>
      <RXForm
        // ref={form}
        model={model}
        data={{
          name: "Francesco",
          surname: "Cabras",
          email: "francesco.cabras@gmail.com"
        }}
        onValidation={(errors)=>{
          console.log(`in onValidation: `, JSON.stringify(errors));
          setErrors(errors);
        }}
        onValuesChange={(values)=>{
          console.log('in onValuesChange: ', values);
        }}                
      />
    </div>
  );
}

export default App;
