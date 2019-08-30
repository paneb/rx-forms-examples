import React, { useState, useEffect, useRef} from 'react';

import { RXForm, useRXInput } from 'rx-forms';

import { Col, Container, Button, Form, FormGroup, Label, Input, FormFeedback, FormText } from 'reactstrap';

import InputMask from 'react-input-mask';

export const BasicButtons = (props) => {

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
  
export const BasicLayout = (props) => {
    return (
      <div>
  
          {/* <Form> */}
            {props.model.groups.map((input, index)=> {
            
            const Component = props.components[input.type] ? props.components[input.type] : props.components["default"];
  
            return (
              <FormGroup row key={`${index}`}>
                <Label style={{textAlign: 'left'}} sm={2} for={`${input.name}`}>{input.label}</Label>
                <Col sm={10}>
                    <Component model={input} store={props.store} />
                </Col>
              </FormGroup>
              
            )})}
  
          {/* </Form> */}
      </div>
    )
  }
  
export const ReactStrapForm = (props) => {
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
  
export const BasicTextComponent = (props) => {
  
    const [value, setValue, ref] = useRXInput(props.store, props.model, props.model.validators);
  
    return (
      <React.Fragment>
          <Input innerRef={ref} type={`${props.model.type}`} name={`${props.model.name}`} id={`${props.model.name}`} value={value} onChange={(e) => setValue(e.target.value)}></Input>
      </React.Fragment>
    )
  }
  
export const BasicNumberComponent = (props) => {
  
    const [value, setValue, ref, errors] = useRXInput(props.store, props.model, props.model.validators);
    console.log(`with errors: `, errors);

    const setNumberValue = (value)=>setValue(parseInt(value));
    const min = props.model.min ? props.model.min : 0;
  
    return (
      <React.Fragment>
          <Input invalid={errors? true : false} innerRef={ref} type={`${props.model.type}`} name={`${props.model.name}`} id={`${props.model.name}`} value={value} onChange={(e) => setNumberValue(e.target.value)} min={min}></Input>
          <FormFeedback>{JSON.stringify(errors)}</FormFeedback>
      </React.Fragment>
    )
  }
  
export const  PhoneNumberComponent = (props) => {
  
    const [value, setValue, ref, errors] = useRXInput(props.store, props.model, props.model.validators);
  
    console.log(`with errors: `, errors);

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
          <span>{JSON.stringify(errors)}</span>
      </React.Fragment>
    )
  }