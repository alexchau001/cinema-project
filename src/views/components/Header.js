import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import store from '../../store'

let unsubscribe;
export default class Header extends Component{
	constructor(){
		super();
		this.state = {
			city: store.getState().city
		}
	}
	render(){
		console.log(this.props.headerTitle);
		return(
			<div class="header">
				<span class="iconfont-t icon-menu menu" onClick={this.menuClick.bind(this)}></span>
				<span class="header-title">{this.props.headerTitle}</span>
				<Link class="iconfont-t icon-arrow-down city" to='/city'>{this.state.city}</Link>
				<Link class="iconfont-t icon-person me" to='/me'></Link>
			</div>
		)
	}
	menuClick(){
		this.props.menuAction();
	}
	componentWillMount(){
		unsubscribe = store.subscribe(()=>{
			this.setState({city: store.getState().city});
		})
	}
	componentWillUnmount(){
		unsubscribe();
	}
}


