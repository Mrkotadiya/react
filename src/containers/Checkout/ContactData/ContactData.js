import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button'   
import classes from "./ContactData.css";
import axios from "../../../axios-order";
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/WithErrorHandler/WithErrorHandler';
import * as actions from "../../../store/actions/index";

export class ContactData extends Component {
    state={
        orderForm:{
          name: {
            elementType:"input",
            elementConfig:{
              type:'text',
              placeholder:"Your Name"
            },
            value:'',
            validation:{
              required: true
            },
            valid:false,
            touched:false

          },
          street:{
            elementType:"input",
            elementConfig:{
              type:'text',
              placeholder:"Street"
            },
            value:'',
            validation:{
              required: true
            },
            valid:false,
            touched:false
          },
          zipCode: {
            elementType:"input",
            elementConfig:{
              type:'text',
              placeholder:"ZIP Code"
            },
            value:'',
            validation:{
              required: true,
              minLength:5,
              maxLength:5
            },
            valid:false,
            touched:false
          },
          country: {
            elementType:"input",
            elementConfig:{
              type:'text',
              placeholder:"Country"
            },
            value:'',
            validation:{
              required: true
            },
            valid:false,
            touched:false
          },
          email:{
            elementType:"input",
            elementConfig:{
              type:'email',
              placeholder:" Your Email"
            },
            value:'',
            validation:{
              required: true
            },
            valid:false,
            touched:false
          },
          deliveryMethod: {
            elementType:"select",
            elementConfig:{
                options:[
                  {value:"fastest",displayValue:"fastest"},
                  {value:"slower",displayValue:"slower"},
              ]
            },
            value:'fastest',
            validation:{},  // diffenece way to validation 
            // validation:{
            //   required: true
            // },
            valid:true
          },
        },
        formIsValid:false    
    }
     orderHandler=(event)=>{
        event.preventDefault(); 

        const formData = {};
        for(let formElementIdentifier in this.state.orderForm){
          formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
          ingredients: this.props.ings,
          price: this.props.price,
          orderData : formData 
        }
        this.props.onOrderBurger(order);
      }  


         checkValidity(value,rules){
          
          let isValid = true;
          
          // if(!rules){
          //  return true; 
          // }
           
          if(rules.required){
              isValid = value.trim()!=='' && isValid;
            }
          
          if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid
          }
          
          if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid
          }
            return isValid;
         }

        inputChangedHandler=(event,inputIdentifier)=>{
          // console.log(event.target.value);
          const updatedOrderForm = {
            ...this.state.orderForm
          }
          const updatedFormElement={
            ...updatedOrderForm[inputIdentifier]
          };
          updatedFormElement.value = event.target.value;
          updatedFormElement.valid = this.checkValidity(updatedFormElement.value,updatedFormElement.validation);
          updatedFormElement.touched=true;
          updatedOrderForm[inputIdentifier] = updatedFormElement;
          
          let formIsValid = true;
          for(let inputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
          }
          console.log(formIsValid);
          this.setState({orderForm: updatedOrderForm,formIsValid:formIsValid})
        }

  render() {
    const formElementtsArray = [];
    for(let key in this.state.orderForm){
        formElementtsArray.push({
          id:key,
          config : this.state.orderForm[key]
        })
    }
    let form=(
        <form onSubmit={this.orderHandler}>
            {/* <Input elementType="..."  elementConfig="..." value="..." /> */}
            {formElementtsArray.map(formElement =>(
              <Input 
                  key={formElement.id}
                  elementType={formElement.config.elementType}
                  elementConfig={formElement.config.elementConfig}
                  value={formElement.config.value}
                  invalid={!formElement.config.valid}
                  shouldValidate={formElement.config.validation}
                  touched={formElement.config.touched}
                  changed={(event)=>this.inputChangedHandler(event,formElement.id)}
                  />
            ))}
            <Button btnType="Success" disabled={!this.state.formIsValid}> ORDER </Button>
        </form> 
    );
      if(this.props.loading){
          form = <Spinner/>
      }
    return (
      <div className={classes.ContactData}>
        <h4>Enter Your Contact data</h4>
        {form}
      </div>
    )
  }
}

const mapStateProps = state=>{
  return {
    ings:state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading:state.order.loading
  }
}

const mapDispatchToProps = dispatch =>{
  return{
    onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData))
  }
}   

export default connect(mapStateProps,mapDispatchToProps)(withErrorHandler(ContactData ,axios));