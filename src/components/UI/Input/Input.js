import React from 'react';
import classes from "./Input.css"; 


const Input = (props) => {

    let inputElement= null;
    const inputClassses = [classes.InputElement];

    if(props.invalid && props.shouldValidate && props.touched){
        inputClassses.push(classes.Invalid);
    }


    switch(props.elementType){
        case('input'):
            inputElement= <input  
                        // className={classes.InputElement} 
                        className={inputClassses.join(' ')} 
                        {...props.elementConfig}  
                        value={props.value}
                        onChange={props.changed }
                        />;
            break;
        case('textarea'):
            inputElement = <textarea 
            // className={classes.InputElement} 
                            className={inputClassses}
                            {...props.elementConfig} 
                            value={props.value}
                            onChange={props.changed }
                            />;
            break;
        case('select'):
            inputElement = (
                        <select
                        //  className={classes.InputElement} 
                        className={inputClassses}
                            // className='selectBox'
                            value={props.value}
                            onChange={props.changed }
                            >
                                {props.elementConfig.options.map(option=>(
                                    <option key={option.value} value={option.value}>
                                        {option.displayValue}
                                    </option>
                                ))}
                        </select>
                    );
            break;
        default:
                inputElement = <input 
                // className={classes.InputElement} 
                                className={inputClassses} 
                                {...props.elementConfig} 
                                value={props.value}
                                onChange={props.changed }
                                />
    }

  return (
    <div className={classes.Input}>
        <label className={classes.Label}>{props.label}</label>
        {inputElement}
    </div>
  )
}

export default Input