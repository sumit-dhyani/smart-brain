import Navigation from './components/Navigation/Navigation';
import Logo from './components/LOgo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import './App.css';
import Rank from './components/Rank/Rank';
import Particles from 'react-tsparticles';
import { loadFull } from "tsparticles";
import React, { Component } from 'react';

import Facedetection from './components/Facedetection/Facedetection';
import Signin from './components/signin/signin';
import Register from './components/Register/Register';



const initialstate={
  input:'',
  imageurl:'',
  box:{},
  route:'signin',
  isloggedin:false,
  user:{
        id:'',
        name:'',
        email:'',
        entries:0,
        joined:''
  }
}
class App extends Component {
  constructor(){
    super();
    this.state=initialstate;
  }
  loadUser=(data)=>{
    this.setState({user:
      { id:data.id,
        name:data.name,
        email:data.email,
        entries:data.entries,
        joined:data.joined}})
  }
  calculatefunc=(data)=>{
    const ClarifaiFace=data.outputs[0].data.regions[0].region_info.bounding_box;
    const Image=document.getElementById("inputimage");
    const width =Number(Image.width);
    const height=Number(Image.height);
    return {
      leftcol:ClarifaiFace.left_col * width,
      toprow:ClarifaiFace.top_row * height,
      rightcol:width-(ClarifaiFace.right_col * width),
      bottomrow:height-(ClarifaiFace.bottom_row * height)

    }
  }
  displayFace=(data)=>{
   
    this.setState({box:data});
    
  }
  onInputChange=(event)=>{
    this.setState({input:event.target.value});
  }  
  onButtonClick=()=>{
    this.setState({imageurl:this.state.input});
    
    fetch("https://ancient-shelf-78015.herokuapp.com/imageapicall",{
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input:this.state.input })})
    .then(response=>response.json())
    .then(response=>{

      const url="https://ancient-shelf-78015.herokuapp.com/image"
      const requestOptions = {
          method: 'put',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id:this.state.user.id })}
      fetch(url,requestOptions)
      .then(response=>response.json())
      .then(count=>{
          this.setState(Object.assign(this.state.user,{entries:count}))
          })
      this.displayFace(this.calculatefunc(response))}
      
      )
    .catch(err=>console.log(err))
          }
  onSignin=(param)=>{
    if(param==='signout'){
      this.setState(initialstate)
    }
    else if(param==='home'){
      this.setState({isloggedin:true})
    }
    this.setState({route:param})
  }       

  render(){ 
    const particlesInit = async (main) => {
      console.log(main);
  
      
      await loadFull(main);
    };
  
    const particlesLoaded = (container) => {
      console.log(container);
    };
        return (
          <div className="App">
            <Particles className='particles'
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={{
              background: {
                color: {
                  value: "#ac73da",
                },
              },
              fpsLimit: 120,
              interactivity: {
                events: {
                  onClick: {
                    enable: true,
                    mode: "push",
                  },
                  onHover: {
                    enable: true,
                    mode: "repulse",
                  },
                  resize: true,
                },
                modes: {
                  push: {
                    quantity: 4,
                  },
                  repulse: {
                    distance: 200,
                    duration: 0.4,
                  },
                },
              },
              particles: {
                color: {
                  value: "#ffffff",
                },
                links: {
                  color: "#ffffff",
                  distance: 150,
                  enable: true,
                  opacity: 0.5,
                  width: 1,
                },
                collisions: {
                  enable: true,
                },
                move: {
                  direction: "none",
                  enable: true,
                  outModes: {
                    default: "bounce",
                  },
                  random: false,
                  speed: 4,
                  straight: false,
                },
                number: {
                  density: {
                    enable: true,
                    area: 800,
                  },
                  value: 80,
                },
                opacity: {
                  value: 0.5,
                },
                shape: {
                  type: "circle",
                },
                size: {
                  value: { min: 1, max:5 },
                },
              },
              detectRetina: true,
            }}
          />
            <Navigation routechange={this.onSignin} isloggedin={this.state.isloggedin} />
            
            { this.state.route === 'home'
              ?<div>
                  
                  <Logo/>
                  <Rank name={this.state.user.name.toUpperCase()} entries={this.state.user.entries}/>
                  <ImageLinkForm onInputChange={this.onInputChange} onButtonClick={this.onButtonClick}/>
                  <Facedetection box={this.state.box} imageurl={this.state.imageurl} />
                </div>
              
              :(this.state.route ==='signin'|| this.state.route==='signout'
                ?<Signin loadUser={this.loadUser} routechange={this.onSignin}/>
                :<Register loadUser={this.loadUser} routechange={this.onSignin}/>
              )
              }
            </div>  
          );
            }
}

export default App;
