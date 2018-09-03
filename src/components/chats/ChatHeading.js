import React, { Component } from 'react';
import { FaVideo }  from 'react-icons/fa'
import { FaPlus }  from 'react-icons/fa'
import { MdForward } from 'react-icons/md'

class ChatHeading extends Component {
	render() {
		const { name, online, numberOfUsers } = this.props
		const onlineText = online ? 'online':'offline'
		return (
			<div className="chat-header">
				<div className="user-info">
					<div className="user-name">{name}</div>
					<div className="status">
						<div className={`indicator ${onlineText}`}></div>
						<span>{numberOfUsers ? numberOfUsers : null} online</span>
					</div>
				</div>
				<div className="options">
					<FaVideo />
					<FaPlus />
					<MdForward  />
				</div>
			</div>
		);
	}
}

export default ChatHeading