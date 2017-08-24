import React, {Component} from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import Home from './pages/Home.js'
import Header from './views/components/Header.js'
import SlideBar from './views/components/SlideBar.js'
import Movies from './pages/Movies.js'
import Cinemas from './pages/Cinemas.js'
import Mall from './pages/Mall.js'
import Me from './pages/Me.js'
import Card from './pages/Card.js'
import City from './pages/City.js'
import Movie from './pages/Movie.js'
import Store from './store'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import './css/app.css'

let unsubscribe;
export default class App extends Component{
	constructor(){
		super();
		this.state={
			isMall: false,
			isSlideBarShow: false,
			headerTitle: '卖座电影'
		}
	}
	render(){
		return(
			<BrowserRouter>
				<div>
					<Header menuAction={this.menuAction.bind(this)} headerTitle={this.state.headerTitle}/>
					<Route path='/' render={
						({history, location})=>{
							return <SlideBar history={history} isMall={this.state.isMall}
								isSlideBarShow={this.state.isSlideBarShow}
								isBgCoverClick={this.isBgCoverClick.bind(this)}
								slideBarClick={this.slideBarClick.bind(this)}/>
						}
					}/>
					<Route path="/" exact component={Home}/>
					<Route path='/movies' component={Movies}/>
					<Route path='/cinemas' component={Cinemas}/>
					<Route path='/mall' component={Mall}/>
					<Route path='/me' component={Me}/>
					<Route path='/card' component={Card}/>
					<Route path='/city' component={City}/>
					<Route path='/movie' component={Movie}/>
				</div>
			</BrowserRouter>
		)
	}
	menuAction(){
		this.setState({isSlideBarShow: !this.state.isSlideBarShow});
	}
	isBgCoverClick(){
		this.setState({isSlideBarShow: false});
	}
	slideBarClick(val){
		this.setState({isSlideBarShow: false});
		this.setState({headerTitle: val.headerTitle});
		if(val.path == '/mall'){
			this.setState({isMall: true});
		}else{
			this.setState({isMall: false});
		}
	}
	componentWillMount(){
		unsubscribe = Store.subscribe(()=>{
			let title = Store.getState().title;
			if(title != '卖座电影' || title != '全部影院' || title != '卖座商城' || title != '登录' || title != '查询/绑定/激活卖座卡'){
				this.setState({headerTitle: title});
			}
		})
	}
}
