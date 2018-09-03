import React, { Component } from 'react'
import { VERIFY_USER } from '../Events'

class LoginForm extends Component {
    constructor(props){
        super(props)

        this.state = {
            nickname:'',
            error:''    
        }
    }


   handleSubmit = (e) => {
        e.preventDefault()

        const { socket } = this.props
        const { nickname } = this.state 
        socket.emit(VERIFY_USER, nickname, this.setUser)
   }

   handleChange = (e) => {
        this.setState({
           nickname: e.target.value
        })
   }

   setUser = ({user, isUser}) => {
       console.log(user, isUser)
        if(isUser){
            this.setError("User name taken")
        } else {
            this.setError("")   
            this.props.setUser(user)     }
   }

   setError = (error) => {
        this.setState({
            error
        })
   }

    render(){
        const { nickname, error } = this.state  
        return(
            <div className="login">
                <form onSubmit={this.handleSubmit} className="login-form">
                    <label>
                        <h2> Gor a nickname: </h2>
                    </label>     
                    <input 
                        type="text"
                        ref={(input) => { this.textInput = input } } 
                        id='nickname'
                        value={nickname}
                        onChange={this.handleChange}
                        placeholder="Username"
                        />
                </form>
            </div>
        )
    }
}

export default LoginForm