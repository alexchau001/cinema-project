import React, {Component} from 'react'

export default class Card extends Component{
	constructor(){
		super();
		this.state = {
			ispwdCard: true
		}
	}
	render(){
		var tab1Class = this.state.ispwdCard ? ' active' : '';
		var tab2Class = this.state.ispwdCard ? '' : ' active';
		let cardVdom = this.state.ispwdCard ? (<div>
													<input class='username' placeholder='请输入卡号'/>
													<input class='pwd' placeholder='请输入密码'/>
													<button class='btn-login'>查询</button>
												</div>) : (<div>
																<input class='username' placeholder='请输入15位电子卖座卡号'/>
																<button class='btn-login'>查询</button>
															</div>)
		return(
			<div class="page">
				<nav class='movies-tabs'>
					<a class={'movies-tab'+tab1Class} onClick={this.tabAction.bind(this)}>卖座卡</a>
					<a class={'movies-tab'+tab2Class} onClick={this.tabAction.bind(this)}>电子卖座卡</a>
				</nav>
				<div class='movies-content'>
					{cardVdom}
				</div>
			</div>
		)
	}
	menuClick(){
		this.props.menuAction();
	}
	tabAction(){
		this.setState({ispwdCard: !this.state.ispwdCard});
	}
}
