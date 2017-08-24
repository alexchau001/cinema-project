import React, {Component} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

export default class Me extends Component{
	constructor(){
		super();
		this.state = {
			data: [],
			isShow: false
		}
	}
	render(){
		let isShowStyle = {display: this.state.isShow ? 'block' : 'none'}
		let vdom = !this.state.isShow ? null : (<div class='load-icon'></div>);
		return(
			<div class="page">
				<input class='username' placeholder='请输入手机号/邮箱'/>
				<input class='pwd' placeholder='请输入密码/验证码'/>
				<button class='btn-login'>立即购票</button><br/>
				{/* <button class='pull-load' onClick={this.btnAction.bind(this)}>上拉加载</button><br/> */}
				{/* <ReactCSSTransitionGroup
						transitionName='load-rotate'
						transitionAppear={true}
						transitionAppearTimeout={400}
						transitionEnter={false}
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={300}> */}
						{/* {vdom} */}
						{/* <div class={'load-icon' + (this.state.isShow ? ' active' : '')}></div> */}
						{/* <div class='load-icon active'></div> */}
						{/* {
							this.state.data.map((item, index)=>{
								return (
									<div class='load-icon' key={index}></div>
								)
							})
						{/* } */}
					
				{/* </ReactCSSTransitionGroup> */}
			</div>
		)
	}
	menuClick(){
		this.props.menuAction();
	}
	btnAction(){
		this.setState({data: this.state.data.concat(1), isShow: !this.state.isShow});
	}
}
