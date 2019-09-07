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
    {name: "username", type: "text", label: "Username:", showValid: false, validators: ["empty", "async"]},
    {name: "surname", type: "text", label: "Cognome:", showValid: false, validators: ["empty"]},
    {name: "name", type: "text", label: "Nome:", showValid: true, validators: ["empty"]},
    {name: "email", type: "text", label: "Mail:", validators: ["empty"]},
    {name: "emailconfirm", type: "text", label: "Conferma Mail:", validators: ["emailCheck", "empty"]},
    {name: "phone", type: "phone", label: "Numero di Telefono:", validators: []},
    {name: "age", type: "number", label: "Età:", min: 18, validators: ["rated18"]},
  ],
  buttons: [
    {name: "submit", type: "submit", label: "Invia", color: "primary"},
    {name: "clear", type: "submit", label: "Cancella", color: "success"},
  ]
}

const validators = {
  rated18: (value, name, values)=>{
    console.log(`in rated18 with value`, value, ` and name `, name);
    if(value<18){
      console.log(`error`)
      return {valid: false, error: "rated18 fail"};
    }
    console.log('success')
    return {valid: true};
  },
  empty: (value)=>value?{valid: true}:{valid:false, error: 'ERROR_EMPTY'},
  async: (value, name, values)=>new Promise(resolve => {
    setTimeout(() => {
      const rand = Boolean(Math.round(Math.random()));
      if(rand){
        resolve({valid:true});
      }else{
        resolve({valid:false, error: "USERNAME_EXISTS_ERROR"});
      }
    }, 2000);
  }),
  emailCheck: (value, name, values)=>{

    console.log(`in emailCheck: `, value, values)
    if (value!==values.email){
      return {valid:false, error: "ERROR_EMAIL"}
    }else{
      return {valid: true};
    }
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

const loadLocales = (setInitDone, currentLocale, forceUpdate) => {

    console.log(`in loadLocales with `, currentLocale);

    // init method will load CLDR locale data according to currentLocale
    // react-intl-universal is singleton, so you should init it only once in your app
    intl.init({
      currentLocale: currentLocale, // TODO: determine locale here
      locales,
    })
    .then(() => {
      // After loading CLDR locale data, start to render
      setInitDone(true);
      console.log('after set init done');
      forceUpdate(currentLocale);
    });
}

export const  App = () => { 

  const form = useRef(null);
  const[, setStore] = useState(null);
  const [, setErrors] = useState([]);
  const [ initDone, setInitDone] = useState(false);
  const [ currentLocale, setCurrentLocale ] = useState("en-US");
  const [, forceUpdate] = useState();

  useEffect(()=>{

      // setCurrentLocale("en-US");
      console.log(`before loadLocales`);
      
      loadLocales(setInitDone, currentLocale, forceUpdate);

      if(form.current){
        console.log(`form current: `, form.current);
        setStore(form.current.store.getState().errors);
      }
  }, [currentLocale]);
  
  return (
    
    <Container className="App">
      {initDone &&
        <React.Fragment>
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
            },
            onChangeCurrentLocale:(value)=>{
              console.log(`in onChangeCurrentLocale with `, value);
              setCurrentLocale(value)
            }
          }}
          data={{
            name: "",
            surname: "Cabras",
            email: "francesco.cabras@gmail.com",
            age: 39
          }} 
          validators={validators}
        />
        </React.Fragment>
      }
    </Container>
  );
}
