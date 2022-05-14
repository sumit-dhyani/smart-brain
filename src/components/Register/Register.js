import React, {Component} from "react";


class Register extends Component{
    constructor(props){
        super(props);
        this.state={
            name:'',
            email:'',
            password:''
        }
    }
    onNamechange=(event)=>{
        this.setState({name:event.target.value})
        
    }
    onEmailchange=(event)=>{
        this.setState({email:event.target.value})
    }
    onPasswordchange=(event)=>{
        this.setState({password:event.target.value})}
    
    onSubmit=()=>{
            const url="https://ancient-shelf-78015.herokuapp.com/register"
            const requestOptions = {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name:this.state.name,email: this.state.email, password: this.state.password })}
            fetch(url,requestOptions)
            .then(response=>response.json())
            .then(user=>{
                console.log(user)
                if(user.email){
                    this.props.loadUser(user);
                    this.props.routechange('home');
                }
                })
                
            }
    render(){
        
        return(
            <article className="br3 m4 w-100 w-50 w-25-1 ba b--black-10 mw6 shadow-5 center mt1"> 
                    <main className="pa4 black-80">
                    <div className="measure center">
                    <fieldset
                    id="sign_up"
                    className="ba b--transparent ph0 mh0"
                    >
                    <legend className="f2 fw6 ph0 mh0">
                    User Registration
                    </legend>
                    <div className="mt3">
                    <label
                    className="db fw6 lh-copy f6"
                    htmlFor="Username"
                    >
                    Name
                    </label>
                    <input
                    onChange={this.onNamechange}
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="text"
                    name="user-name"
                    id="user-name"
                    />
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
                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 "
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
                    value="Register"
                    />
                    </div>
                    
                    

            </div></fieldset>
            </div>
            </main></article>
            );
    }
}

export default Register;