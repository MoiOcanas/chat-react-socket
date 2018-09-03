import React, { Component } from 'react'
import { MdChevronLeft}  from 'react-icons/md'
import { FaBars } from 'react-icons/fa'
import { FaSearch } from 'react-icons/fa'
import SideBarOption  from './SideBarOption'
import { get, last, differenceBy } from 'lodash'
import { createChatNameFromUsers } from '../../Factories'
import './indes.scss'

class SideBar extends Component {
	static type= {
		CHATS: "chats",
		USERS: "useres"
	}
	constructor(props){
		super(props)

		this.state = {
			reciever:'',
			activeSideBar: SideBar.type.CHATS
		}
	}

	handleSubmit = (e) => {
		e.preventDefault()
		const { reciever } = this.state
		const { onSendOpenPrivateMessage } = this.props

		onSendOpenPrivateMessage(reciever)
		this.setState({
			reciever:''
		})
	}

	addChatForUser = (username) => {
		this.props.onSendOpenPrivateMessage(username)
		this.props.setActiveSideBar(SideBar.type.CHATS)
	}

	setActiveSideBar = (newSideBar) =>{
		 this.setState({
			 activeSideBar: newSideBar
		 })
	}

    render() {
        const { chats, activeChat, user, setActiveChat, logout, users } = this.props	
        const { reciever, activeSideBar } = this.state
        return(
            <div id="side-bar">
					<div className="heading">
						<div className="app-name">Zanjo Chat <MdChevronLeft /></div>
						<div className="menu">
							<FaBars />
						</div>
					</div>
					<form onSubmit={this.handleSubmit} className="search">
						<i className="search-icon"><FaSearch /></i>
						<input placeholder="Search" type="text"  
						value={reciever}
						onChange={(e)=> { this.setState({reciever: e.target.value}) }}/>
						<div className="plus"></div>
					</form>

					<div className="side-bar-select">
						<div 
							onClick = { ()=>{ this.setActiveSideBar(SideBar.type.CHATS) } }
							className={`side-bar-select__option ${ activeSideBar === SideBar.type.CHATS ? 'active':''}`}>
							<span>Chats</span>
						</div>
						<div 
							onClick = { ()=>{ this.setActiveSideBar(SideBar.type.USERS) } }
							className={`side-bar-select__option ${ activeSideBar === SideBar.type.USERS ? 'active':''}`}>
							<span>Users</span>
						</div>
					</div>

					<div 
						className="users" 
						ref='users' 
						onClick={(e)=>{ (e.target === this.refs.user) && setActiveChat(null) }}>
						
						{
						activeSideBar === SideBar.type.CHATS ?
						chats.map((chat)=>{
							if(chat.name){
								const lastMessage = chat.messages[chat.messages.length - 1];
								const chatSideName = chat.users.find((name)=>{
									return name !== user.name
								}) || "Community" 
								const classNames = (activeChat && activeChat.id === chat.id) ? 'active' : ''
								return(
								<SideBarOption 
									key = { chat.id }
									name= { chat.isCommunity ? chat.name : createChatNameFromUsers(chat.users, user.name) }
									lastMessage = { get(last(chat.messages), 'message', '') }
									active = { activeChat.id === chat.id }
									onClick = { () => { this.props.setActiveChat(chat) } }
								/>
							)
							}

							return null
						})	
						:
							differenceBy(users, [user], 'name').map((otherUser) => {
								return(
									<SideBarOption 
									key = { otherUser.id }
									name= { otherUser.name }
									onClick = { () => { this.addChatForUser( otherUser.name ) } }
								/>
								)
							})
						}
					</div>
					<div className="current-user">
						<span>{user.name}</span>
						<div onClick={()=>{logout()}} title="Logout" className="logout">
							Salir	
						</div>
					</div>
				</div>
        )
    }
}

export default SideBar