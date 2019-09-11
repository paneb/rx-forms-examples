import React, { useState, useEffect } from 'react';


import { useRXInput } from 'rx-forms';
import { AsyncValidationWrapper} from '../components';
import { Input, FormFeedback } from 'reactstrap';

import Select from 'react-select'
import countryList from 'react-select-country-list'

export const CountrySelectComponent = (props) => {
  
  const [value, setValue, ref, errors, onValidation] = useRXInput(props.store, props.model, props.validators);
  
  const showValid = props.model.showValid ? props.model.showValid : false;
  
  const [options, ] = useState(countryList().getData());

  useEffect(() => {
    
    
    return () => {
      
    };
  }, [])

  return (
    <React.Fragment>
      <AsyncValidationWrapper onValidation={onValidation}>
        <Select
          options={options}
          value={value}
          onChange={(value) => setValue(value)}
        />
        {/* <Input valid={onValidation ? false : errors ? false : value === "" ? false : showValid ? true : false} invalid={onValidation ? false : errors ? true : false} innerRef={ref} type={`${props.model.type}`} name={`${props.model.name}`} id={`${props.model.name}`} value={value} onChange={(e) => setValue(e.target.value)}></Input> */}
        {errors && errors.map((error, index)=><FormFeedback key={index}>{props.events.onLocalize(error)}</FormFeedback>)}
      </AsyncValidationWrapper>
    </React.Fragment>
    )
  }