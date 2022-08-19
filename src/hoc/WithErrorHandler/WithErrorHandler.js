import React, { Component } from "react";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Aux1";

const withErrorHandler = (WrappedComponent ,axios) => {
  return class extends Component {

    state={
        error:null
    }

    // componentDidMount(){
    componentWillMount(){
        this.reqInterceptor = axios.interceptors.request.use(req=>{
            this.setState({error:null});
            return req; 
        })
        this.resInterceptor =  axios.interceptors.response.use(res => res,error =>{
            this.setState({error:error});
        });
    }
 
    componentWillUnmount(){
        // console.log('will Unmount',this.reqInterceptor,this.resInterceptor);
        axios.interceptors.request.eject(this.reqInterceptor);
        axios.interceptors.request.eject(this.resInterceptor);
    }

    errorConfirmedHandler =()=>{
        this.setState({error:null});
    }

    render() {
      return (
        <Aux>
          <Modal show={this.state.error}
            clicked={this.errorConfirmedHandler}
            >
            {this.state.error ? this.state.error.message:null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };

  // return(props)=>{
  //     return(
  // <Aux>
  //     <Modal show>
  //         Somthing Didn't Work!
  //     </Modal>
  //     <WrappedComponent/>
  // </Aux>
  //     )
  // }
};

export default withErrorHandler;

// const withErrorHandler =(WrappedComponent)=>{
//     return(props)=>{
//         return(
//             <Aux>
//                 <Modal show>
//                     Somthing Didn't Work!
//                 </Modal>
//                 <WrappedComponent {...props}/>
//             </Aux>
//         )
//     }

// }
