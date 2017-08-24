import React, {Component, PropTypes} from 'react'
// import IScroll from 'iscroll/build/iscroll-probe'//npm安装这个，无法正常使用
// import ReactIScroll from 'reactjs-iscroll'
import appService from '../services/appService'

var myScroll = null;
export default class Movies extends Component{
	constructor({history}){
		super();
		this.state = {
			history,
			isTabActive: true,
			moviesData: [],
			comingSoonMoviesData: [],
			page: 2,
			comingSoonPage: 2,
			showNoMoreToast: false,
			noMoreDataToast: '没有更多数据了',
			isShowGoTop: false
		}
	}
	render(){
		var tab1Class = this.state.isTabActive ? ' active' : '';
		var tab2Class = this.state.isTabActive ? '' : ' active';
		var moviesVdom = !this.state.isTabActive ? null : this.state.moviesData.map((item, index)=>{
			return	<li class='movies-item' key={index} onClick={this.movieAction.bind(this, item.id, item.name)}>
						<div class='movies-img'>
							<img src={item.poster.origin}/>
						</div>
						<div class='movies-info'>
							<p class='movies-name'>{item.name}</p>
							<p class='movies-intro'>{item.intro}</p>
							<p class='movies-hot-level'>
								<span class='cinemaCount'>{item.cinemaCount}家影院上映</span><span class='watchCount'>{item.watchCount}人购票</span>
							</p>
							<span class='movies-grade iconfont-t icon-arrow-right'>{item.grade}</span>
						</div>
					</li>
		});
		var comingSoonVdom = this.state.isTabActive ? null : this.state.comingSoonMoviesData.map((item, index)=>{
			return	<li class='movies-item' key={index} onClick={this.movieAction.bind(this, item.id, item.name)}>
						<div class='movies-img'>
							<img src={item.poster.origin}/>
						</div>
						<div class='movies-info'>
							<p class='movies-name'>{item.name}</p>
							<p class='movies-intro'>{item.intro}</p>
							<p class='premiereAt'>{getSpecialTime(item.premiereAt)}上映</p>
						</div>
					</li>
		});
		function getSpecialTime(millis){
			var date = new Date(millis);
			return (date.getMonth() + 1) + '月' + (date.getDate()) + '日'
		}
		// var options = {mouseWheel: true};
		var showNoMoreToastStyle = {display: this.state.showNoMoreToast ? 'block' : 'none'};
		var showGoTopStyle = {display: this.state.isShowGoTop ? 'block' : 'none'};
		return(
			<div class="page movies-page">
				{/* <ReactIScroll iScroll={iScroll} class="movies-iScroll" options={options}> */}
					<div class='movies' id='wrapper'>
						<div class='container'>
							<nav class='movies-tabs'>
								<a class={'movies-tab'+tab1Class} onClick={this.tabAction.bind(this)}>正在热映</a>
								<a class={'movies-tab'+tab2Class} onClick={this.tabAction.bind(this)}>即将上映</a>
							</nav>
							<div class='movies-content'>
								
								<ul class='movies-list'>
									{moviesVdom}
								</ul>
								<ul class='movies-list'>
									{comingSoonVdom}
								</ul>
							</div>
							<p class="noMoreDataToast" style={showNoMoreToastStyle}>{this.state.noMoreDataToast}</p>
						</div>
					</div>
				{/* </ReactIScroll> */}
				 <div class='go-top iconfont-t icon-top' style={showGoTopStyle} onClick={this.goTopAction.bind(this)}></div> 
			</div>
		)
	}
	menuClick(){
		this.props.menuAction();
	}
	tabAction(){
		this.setState({isTabActive: !this.state.isTabActive, showNoMoreToast: false},()=>{
			myScroll.refresh();
			if(!this.state.isTabActive && this.state.comingSoonMoviesData.length == 0){
				appService.getComingSoonMoviesData(1, 10)
				.then(data=>{
					this.setState({comingSoonMoviesData: data},()=>{
						myScroll.refresh();
					});
				});
			}
			else{
				
			}
		});
	}
	movieAction(id, name){
		this.state.history.push({
			pathname: '/movie',
			state: {
				id,
				name
			}
		})
	}
	goTopAction(){
		myScroll.scrollTo(0, 0, 100);
	}
	componentWillMount(){
		if(this.state.isTabActive){
			appService.getMoviesData(1, 10)
			.then(data=>{
				this.setState({moviesData: data},()=>{
					myScroll.refresh();
				});
				console.log(data);
			});
		}else{
			
		}
	}
	componentDidMount(){
		myScroll = new IScroll('#wrapper',{
			mouseWheel: true,
			bounce: true,
			probeType:1
		});
		var that = this;
		function listeningScroll(){
			myScroll.on('scrollEnd',()=>{
				myScroll.off('scrollEnd');
				// console.log('关闭');
				// setTimeout(function() {
				// 	console.log('请求完数据');
				// 	listeningScroll();
				// }, 3000);
				let screenHeight = window.innerHeight;
				if(Math.abs(myScroll.y) >= screenHeight*0.5){
					that.setState({isShowGoTop: true});
				}else{
					that.setState({isShowGoTop: false});
				}
				var page = that.state.page;
				var comingSoonPage = that.state.comingSoonPage;
				console.log(myScroll.y);
				console.log(myScroll.maxScrollY);
				if(myScroll.y <= myScroll.maxScrollY + 560){
					that.setState({showNoMoreToast: true, noMoreDataToast: '正在加载...'});
					myScroll.refresh();
					if(that.state.isTabActive){
						appService.getMoviesData(page, 10)
						.then(data=>{
							that.setState({moviesData: that.state.moviesData.concat(data), page: ++page},()=>{
								myScroll.refresh();
								// that.setState({showNoMoreToast: false});
							});
							// console.log(data);
							if(data.length == 0){
								myScroll.off('scrollEnd');
								
								// myScroll.destroy();
								// alert('没有数据了');
								that.setState({showNoMoreToast: true, noMoreDataToast: '没有更多数据了'});
							}else{
								// listeningScroll();
							}
						});
					}else{
						appService.getComingSoonMoviesData(comingSoonPage, 10)
						.then(data=>{
							that.setState({comingSoonMoviesData: that.state.comingSoonMoviesData.concat(data), comingSoonPage: ++comingSoonPage},()=>{
								myScroll.refresh();
								that.setState({showNoMoreToast: false});
							});
							console.log(data);
							if(data.length == 0){
								myScroll.off('scrollEnd');
								that.setState({showNoMoreToast: true, noMoreDataToast: '没有更多数据了'});
							}else{
								
							}
						});
					}
					
				}
				
			})
		};
		// listeningScroll.call(this);
		listeningScroll();
	}
}
