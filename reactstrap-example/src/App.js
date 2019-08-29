import React, { useState, useEffect, useRef} from 'react';
import logo from './logo.svg';

import { RXForm, rootReducer, injectDataToComponent, useRXInput } from 'rx-forms';
import { setValueAction, useFocus } from 'rx-forms';

import { Col, Container, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import InputMask from 'react-input-mask';

import './App.css';


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

const validators = [];

 const BasicButtons = (props) => {

  const buttons = props.model.buttons;
  
  console.log(`found buttons: `, buttons);
  return (
    <React.Fragment>
      {buttons.map((button, index)=>{

        const color = button.color ? button.color : "primary";

        return <Button block color={color} key={index} type={`${button.type}`} onClick={(e)=>{e.preventDefault(); props.events.onButtonPress(e, button.name);}} >{`${button.label}`}</Button>
      })}
    </React.Fragment>
  )
}

const BasicLayout = (props) => {
  return (
    <div>

        {/* <Form> */}
          {props.model.groups.map((input, index)=> {
          
          const Component = props.components[input.type];

          return (
            <FormGroup row key={`${index}`}>
              <Label style={{textAlign: 'left'}} sm={2} for={`${input.name}`}>{input.label}</Label>
              <Col sm={10}>
                {props.components[input.type] !== undefined ? (
                    <Component model={input} store={props.store} />
                ):(
                  <Input type={`${input.type}`} name={`${input.name}`} id={`${input.name}`}></Input>
                )}
              </Col>
            </FormGroup>
            
          )})}

        {/* </Form> */}
    </div>
  )
}

const ReactStrapForm = (props) => {
  return (
    <React.Fragment>

      <span style={{color: 'black', marginTop: 40, marginBottom: 40, display: 'block'}}>RXForm Reactstrap</span>

      <div style={{backgroundColor: "#eeeeee", padding:12, borderTopLeftRadius: 12, borderTopRightRadius: 12, borderBottomLeftRadius: 12, borderBottomRightRadius: 12}}>
        <Form>
          {props.children}
        </Form>

      </div>

    </React.Fragment>
  )
}

const BasicTextComponent = (props) => {

  const [value, setValue, ref] = useRXInput(props.store, props.model);

  return (
    <React.Fragment>
        <Input innerRef={ref} type={`${props.model.type}`} name={`${props.model.name}`} id={`${props.model.name}`} value={value} onChange={(e) => setValue(e.target.value)}></Input>
    </React.Fragment>
  )
}

const PhoneNumberComponent = (props) => {

  const [value, setValue, ref] = useRXInput(props.store, props.model);

  console.log(`in render2 for `, props.model.name);
  return (
    <React.Fragment>
        <Input 
          innerRef={ref} 
          type="text"
          name={`${props.model.name}`} 
          id={`${props.model.name}`} 
          value={value} 
          onChange={(e) => setValue(e.target.value)}
          mask="+3\9 999 9999 999"
          maskChar="_"
          alwaysShowMask={true}
          tag={InputMask}
        />
    </React.Fragment>
  )
}

const layouts = {
  default: BasicLayout
}

const components = {
  text: BasicTextComponent,
  phone: PhoneNumberComponent
}

export const  App = () => { 

  const form = useRef(null);
  const[store, setStore] = useState(null);
  const [errors, setErrors] = useState([]);

  const onButtonClick = () => {
    // `current` points to the mounted text input element
    console.log(`in click with: `, form.current.submit());
  };

  useEffect(()=>{

    console.log(`form current: `, form.current);
    setStore(form.current.store.getState().errors)

  }, []);
  
  return (
    <Container className="App">
      <RXForm
        formComponent={ReactStrapForm}
        ref={form}
        layouts={layouts} 
        components={components} 
        model={model}
        buttonsComponent={BasicButtons}
        events={{
          onButtonPress: (e, name) => {
            console.log(`in onButtonPress with `, name);
          }
        }}
        data={{
          name: "Francesco",
          surname: "Cabras",
          email: "francesco.cabras@gmail.com",
        }} 
        validators={validators}
        onValidation={(errors)=>{
          console.log(`in onValidation: `, JSON.stringify(errors));
          setErrors(errors);
        }}
        onValuesChange={(values)=>{
          console.log('in onValuesChange: ', values);
        }}
      />
    </Container>
  );
}
