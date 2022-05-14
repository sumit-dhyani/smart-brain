
import React, {Component} from "react";

class Signin extends Component{
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
            failure:false
        }
    }
    onEmailchange=(event)=>{
        this.setState({email:event.target.value})
    }
    onPasswordchange=(event)=>{
        this.setState({password:event.target.value})
    }
    onSubmit=()=>{
        const url="https://ancient-shelf-78015.herokuapp.com/signin"
        const requestOptions = {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: this.state.email, password: this.state.password })}
        fetch(url,requestOptions)
        .then(response=>response.json())
        .then(user=>{
            if(user.id){
            this.props.loadUser(user);
            this.props.routechange('home');
            }
        })
        
    }
    render(){ 
        const {routechange} =this.props;
        
         return(
                    <article className="br3 m4 w-100 w-50 w-25-1 ba b--black-10 mw6 shadow-5 center mt1"> 
                            <main className="pa4 black-80">
                            <div className="measure center">
                            <fieldset
                            id="sign_up"
                            className="ba b--transparent ph0 mh0"
                            >
                            <legend className="f1 fw6 ph0 mh0">
                            Sign In
                            </legend>
                            <div className="mt3">
                            <label
                            className="db fw6 lh-copy f6"
                            htmlFor="email-address"
                            >
                            Email
                            </label>
                            <input
                            onChange={this.onEmailchange}
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                            type="email"
                            name="email-address"
                            id="email-address"
                            />
                            </div>
                            <div className="mv3">
                            <label
                            className="db fw6 lh-copy f6"
                            htmlFor="password"
                            >
                            Password
                            </label>
                            <input
                            onChange={this.onPasswordchange}
                            className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                            type="password"
                            name="password"
                            id="password"
                            />
                            </div>

                            
                            <div className="">
                            <input
                            onClick={this.onSubmit}
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                            type="submit"
                            value="Sign in"
                            />
                            </div>
                            <div className="lh-copy mt3">
                            <p
                            onClick={()=>routechange('register')}
                            className="f6 link dim black db pointer"
                            >
                            Register
                            </p>

                    </div>
                   </fieldset>
                    </div>
                    </main></article>
                );
    }
}
export default Signin;