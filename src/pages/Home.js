import React, {Component} from 'react'
import appService from '../services/appService.js'
import ReactSwipe from 'react-swipe'

var mySwiper = null;
export default class Home extends Component{
	constructor({history}){
		super();
		this.state = {
			homeBannerData: [],
			hotPlayingData: [],
			comingSoonData: [],
			history
		}
	}
	render(){
		var swipeVdom = this.state.homeBannerData.map((item, index)=>{
			// return <div class="swiper-slide" key={index}>
			// 			<img src={item.imageUrl}/>
			// 		</div>
			return <div key={index}>
						<img src={item.imageUrl}/>
					</div>
		});
		var hotPlayingVdom = this.state.hotPlayingData.map((item, index)=>{
			return	<li class='now-playing-item' key={index} onClick={this.movieAction.bind(this, item.id, item.name)}>
						<img class='now-playing-img' src={item.cover.origin}/>
						<div class='now-playing-info'>
							<p class='now-playing-name'>{item.name}</p>
							<p class='hot-level'>
								<span class='cinemaCount'>{item.cinemaCount}家影院上映</span><span class='watchCount'>{item.watchCount}人购票</span>
							</p>
							<span class='grade'>{item.grade}</span>
						</div>
					</li>
		});
		var comingSoonVdom = this.state.comingSoonData.map((item, index)=>{
			return	<li class='now-playing-item' key={index} onClick={this.movieAction.bind(this, item.id, item.name)}>
						<img class='now-playing-img' src={item.cover.origin}/>
						<div class='now-playing-info'>
							<p class='now-playing-name'>{item.name}</p>
							<span class='premiereAt'>{getSpecialTime(item.premiereAt)}上映</span>
						</div>
					</li>
		});
		function getSpecialTime(millis){
			var date = new Date(millis);
			return (date.getMonth() + 1) + '月' + (date.getDate()) + '日'
		}
		return(
			<div class="page">
				<ReactSwipe className="carousel" swipeOptions={{continuous: true}} key={this.state.homeBannerData.length}>
						{swipeVdom}
				</ReactSwipe>
				<div>
					<ul class='hot-playing-list'>
						{hotPlayingVdom}
					</ul>
					<p class='more-film'>更多热映电影</p>
				</div>
				<div>
					<p class='dividing-line'><span>即将上映</span></p>
					<ul class='hot-playing-list'>
						{comingSoonVdom}
					</ul>
					<p class='more-film'>更多即将上映电影</p>
				</div>
			</div>
		)
	}
	menuClick(){
		this.props.menuAction();
	}
	movieAction(id, name){
		this.state.history.push({
			pathname: '/movie',
			state:{
				id,
				name
			}
		});
	}
	componentWillMount(){
		appService.getHomeBannerData()
		.then(data=>{
			// console.log(data);
			if(data == null){

			}else{
				// //将最后一张添加到第一位置
				// data.splice(0, 0, data[data.length-1]);
				// //将第一张添加最后一个位置
				// data.push(data[1]);
				this.setState({homeBannerData: data});
				// mySwiper.update();
				// mySwiper.slideTo(1,0);
			}
		})
		appService.getNowPlayingData()
		.then(data=>{
			// console.log(this.data);
			if(data == null){

			}else{
				this.setState({hotPlayingData: data});
				
			}
		})
		appService.getComingSoonData()
		.then(data=>{
			// console.log(this.data);
			if(data == null){

			}else{
				this.setState({comingSoonData: data});
				
			}
		})
	}
	componentDidMount(){
		// mySwiper = new Swiper(this.refs.banner,{
		// 	loop: true
		// })
		// console.log('mySwiper',mySwiper);
		// this.forceUpdate();
	}
	shouldComponentUpdate(){
		// console.log('更新了')
		return true;
	}
}
