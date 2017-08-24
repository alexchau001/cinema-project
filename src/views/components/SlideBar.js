import React, {Component} from 'react'
import {BrowserRouter, Link} from 'react-router-dom'
import SlideBarData from '../../services/SlideBarData.js'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

export default class App extends Component{
	constructor(){
		super();
		this.state = {

		}
	}
	
	render(){
		var listData = this.props.isMall ? SlideBarData.mallSlideBarData : SlideBarData.commonSlideBarData;
//		var classSlideBar = 'slideBar' + (this.props.isSlideBarShow ? ' live' : '');
		var slideBarStyle = {transform: this.props.isSlideBarShow ? 'none' : 'translateX(-100%)'};
		var bgCoverStyle = {display: this.props.isSlideBarShow ? 'block' : 'none',
							 opacity: this.props.isSlideBarShow ? '1' : '0'}
		
		return(		<div>
						<div ref='bgCover' class="bgCover" style={bgCoverStyle} onClick={this.bgCoverAction.bind(this)}></div>
						<div class='slideBar' style={slideBarStyle}>
							{
								listData.map((item, index)=>{
									return <a key={index} class='slideBar-item iconfont-t icon-arrow-right' onClick={this.slideBarAction.bind(this, item)}>{item.name}</a>
								})
							}
						</div>
					</div>
		)
	}
	bgCoverAction(){
		this.props.isBgCoverClick();
	}
	slideBarAction(item){
		// console.log(this.props.history);
		
		this.props.slideBarClick(item);
		this.props.history.push(item.path);
	}
	componentWillReceiveProps(props){
		// console.log(props);
		if(!props.isSlideBarShow){
			setTimeout(()=>{
				this.refs.bgCover.style.display = 'none';
			},350);
		}else{
			this.refs.bgCover.style.display =  'block';
		}
	}
}