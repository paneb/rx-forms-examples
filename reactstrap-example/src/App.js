import React, { useState, useEffect, useRef} from 'react';

import { RXForm } from 'rx-forms';

import { Container } from 'reactstrap';

// import InputMask from 'react-input-mask';

import { BasicLayout, BasicButtons, BasicNumberComponent, BasicTextComponent, PhoneNumberComponent, ReactStrapForm} from './components'

import intl from 'react-intl-universal';

import './App.css';

// common locale data
require('intl/locale-data/jsonp/it.js');
require('intl/locale-data/jsonp/en.js');

// app locale data
const locales = {
  "en-US": require('./locales/en-US.js'),
  "it-IT": require('./locales/it-IT.js'),
};

const model = {
  groups: [
    {name: "surname", type: "text", label: "Cognome:"},
    {name: "name", type: "text", label: "Nome:"},
    {name: "email", type: "text", label: "Mail:"},
    {name: "phone", type: "phone", label: "Numero di Telefono:"},
    {name: "age", type: "number", label: "Età:", min: 18, validators: ["rated18"]},
  ],
  buttons: [
    {name: "submit", type: "submit", label: "Invia", color: "primary"},
    {name: "clear", type: "submit", label: "Cancella", color: "success"},
  ]
}

const validators = {
  rated18: (value, name)=>{
    console.log(`in rated18 with value`, value, ` and name `, name);
    if(value<18){
      console.log(`error`)
      return {result: false, error: "rated18 fail"};
    }
    console.log('success')
    return {result: true};
  }
};

 

const layouts = {
  default: BasicLayout
}

const components = {
  text: BasicTextComponent,
  phone: PhoneNumberComponent,
  number: BasicNumberComponent
}

const loadLocales = (setInitDone) => {
    // init method will load CLDR locale data according to currentLocale
    // react-intl-universal is singleton, so you should init it only once in your app
    intl.init({
      currentLocale: 'en-US', // TODO: determine locale here
      locales,
    })
    .then(() => {
      // After loading CLDR locale data, start to render
      setInitDone(true);
      console.log('after set init done');
    });
}

export const  App = () => { 

  const form = useRef(null);
  const[store, setStore] = useState(null);
  const [errors, setErrors] = useState([]);
  const [ initDone, setInitDone] = useState(false);

  
  useEffect(()=>{

      loadLocales(setInitDone);

      if(form.current){
        console.log(`form current: `, form.current);
        setStore(form.current.store.getState().errors);
      }

    


  }, []);
  
  return (
    
    <Container className="App">
      {initDone &&
        <RXForm
          formComponent={ReactStrapForm}
          ref={form}
          layouts={layouts} 
          components={components} 
          model={model}
          buttonsComponent={BasicButtons}
          events={{
            onButtonPress: (e, name) => {
              console.log(`in onButtonPress with `, name, form.current.submit());
            },
            onValidation: (errors)=>{
              console.log(`in onValidation: `, JSON.stringify(errors));
              setErrors(errors);            
            },
            onValuesChange:(values)=>{
              console.log('in onValuesChange: ', values);
            },
            onLocalize:(value, params)=>{
              return intl.get(value).d(value);
            }
          }}
          data={{
            name: "Francesco",
            surname: "Cabras",
            email: "francesco.cabras@gmail.com",
            age: 39
          }} 
          validators={validators}
        />
      }
    </Container>
  );
}
