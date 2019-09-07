import React from 'react';

import { useRXInput } from 'rx-forms';

import { Col, Button, Form, FormGroup, Label, Input, FormFeedback, Row, Spinner } from 'reactstrap';

import InputMask from 'react-input-mask';

export const BasicButtons = (props) => {

    const buttons = props.model.buttons;
    
    console.log(`found buttons: `, buttons);
    return (
      <React.Fragment>
        <Row>
        {buttons.map((button, index)=>{
  
          const color = button.color ? button.color : "primary";
  
          return (
            <Col key={index}>
              <Button block color={color} type={`${button.type}`} onClick={(e)=>{e.preventDefault(); props.events.onButtonPress(e, button.name);}} >{`${props.events.onLocalize(button.label)}`}</Button>
            </Col>
          )
        })}
        </Row>
      </React.Fragment>
    )
  }
  
export const BasicLayout = (props) => {
    return (
      <div>
            <Row>
              <Col md={10}></Col>
              <Col md={2} className="mb-2">
                <Button className="float-right" onClick={()=>props.events.onChangeCurrentLocale("en-US")}>EN</Button>
                <Button className="float-right" href="#" onClick={()=>props.events.onChangeCurrentLocale("it-IT")}>IT</Button>
              </Col>
            </Row>
            {props.model.groups.map((input, index)=> {
            
            const Component = props.components[input.type] ? props.components[input.type] : props.components["default"];
  
            return (
              <FormGroup row key={`${index}`}>
                <Label style={{textAlign: 'left'}} sm={2} for={`${input.name}`}>{props.events.onLocalize(input.label)}</Label>
                <Col sm={10}>
                    <Component model={input} store={props.store} validators={props.validators} events={props.events} />
                </Col>
              </FormGroup>
              
            )})}
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

export const AsyncValidationWrapper = (props) => {

  return (
    // <div style={{borderWidth: 1, borderStyle: "solid", borderColor: "red", backgroundColor: "red"}}>
    <div>
      {props.onValidation &&
        <Spinner color="secondary" size="sm" style={{zIndex: 1000, position: 'absolute', marginTop: 'auto', marginBottom: 'auto', top: 0, bottom: 0, right: 26}} />
      }
      {props.children}
    </div>

  )
}

  
export const BasicTextComponent = (props) => {
  
    const [value, setValue, ref, errors, onValidation] = useRXInput(props.store, props.model, props.validators);
  
    const showValid = props.model.showValid ? props.model.showValid : false;

    return (
      <React.Fragment>
        <AsyncValidationWrapper onValidation={onValidation}>
          <Input valid={onValidation ? false : errors ? false : value === "" ? false : showValid ? true : false} invalid={onValidation ? false : errors ? true : false} innerRef={ref} type={`${props.model.type}`} name={`${props.model.name}`} id={`${props.model.name}`} value={value} onChange={(e) => setValue(e.target.value)}></Input>
          {/* <FormFeedback>{JSON.stringify(errors)}</FormFeedback> */}
          {errors && errors.map((error, index)=><FormFeedback key={index}>{props.events.onLocalize(error)}</FormFeedback>)}
        </AsyncValidationWrapper>
      </React.Fragment>
    )
  }
  
export const BasicNumberComponent = (props) => {
  
    const [value, setValue, ref, errors] = useRXInput(props.store, props.model, props.validators);
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
  
    const [value, setValue, ref, errors, onValidation] = useRXInput(props.store, props.model, props.validators);
  
    console.log(`with errors in phonenumber: `, errors);

    console.log(`in render2 for `, props.model.name);
    return (
      <React.Fragment>
        <InputMask mask="+3\9 999 9999 999" alwaysShowMask={true} maskChar="_" value={value} name={`${props.model.name}`} id={`${props.model.name}`} onChange={(e) => setValue(e.target.value)}>
          {(inputProps) => 
            <Input 
              invalid={errors? true : false} 
              type="text"
              innerRef={ref} 
              name={`${props.model.name}`} 
              id={`${props.model.name}`} 
          />
          }
        </InputMask>
        <FormFeedback>{JSON.stringify(errors)}</FormFeedback>
        <span></span>
          {/* <Input 
            inputRef={ref} 
            type="text"
            name={`${props.model.name}`} 
            id={`${props.model.name}`} 
            value={value} 
            onChange={(e) => setValue(e.target.value)}
            mask="+3\9 999 9999 999"
            maskChar="_"
            alwaysShowMask={true}
            tag={InputMask}
          /> */}





          {onValidation &&
            <div><span>Valido </span><Spinner color="warning" size="sm" /></div>
          }
      </React.Fragment>
    )
  }