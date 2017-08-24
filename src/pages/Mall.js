import React, {Component} from 'react'
import appService from '../services/appService.js'
import ReactSwipe from 'react-swipe'

var timer = null;
export default class Mall extends Component{
	constructor(){
		super();
		this.state = {
			mallListData: [],
			mallHomeData: [],
			page: 2,
			showNoMoreToast: false,
			noMoreDataToast: '没有更多数据了'
		}
	}
	render(){
		// console.log(this.state.mallListData)
		// let tddsArr = (this.state.mallListData[12] == undefined ? [] : this.state.mallListData[12].products);
		// let xcmArr = (this.state.mallListData[13] == undefined ? [] : this.state.mallListData[13].products);
		// let xhrArr = (this.state.mallListData[14] == undefined ? [] : this.state.mallListData[14].products);
		// let kingkongArr = (this.state.mallListData[15] == undefined ? [] : this.state.mallListData[15].products);
		// let disneyArr = (this.state.mallListData[16] == undefined ? [] : this.state.mallListData[16].products);
		let tddsArr = this.state.mallListData.length == 0 ? [] : this.state.mallListData.slice(12);
		let homeArr = this.state.mallHomeData.length == 0 ? [] : this.state.mallHomeData;
		var showNoMoreToastStyle = {display: this.state.showNoMoreToast ? 'block' : 'none'};
		return(
			<div ref='mallPage' class="page mall-page">
				<ReactSwipe class='mall-banner' swipeOptions={{continuous: true}} key='2'>
					<div class='mall-banner-img'>
						<img src="http://mall.s.maizuo.com/041182a65a83235af256ef47c0eca869.jpg"/>
					</div>
					<div class='mall-banner-img'>
						<img src="http://mall.s.maizuo.com/c32a841cc845c4d482d9d2fbd1c8404f.jpg"/>
					</div>
				</ReactSwipe>
				<div ref='mallList' class='mall-list'>
					<ul class='mall-list-ul'>
						{this.state.mallListData.slice(0,8).map((item, index)=>{
							return <li class='mall-list-item' key={index}>
										<img src={item.imageSrc}/>
										<span>{item.name}</span>
									</li>
						})}
					</ul>
					<div class='mall-list-39fengding'>
						<div><img src={this.state.mallListData[10] == undefined ? null : this.state.mallListData[10].imageSrc}/></div>
						<div><img src={this.state.mallListData[11] == undefined ? null : this.state.mallListData[11].imageSrc}/></div>
					</div>
					{
						tddsArr.map((item, index)=>{
							return (
								<div class='mall-list-tdds' key={index}>
									<img src={item.imageSrc}/>
									<div class='mall-list-tdds-list'>	
										{
											item.products.map((item2, index2)=>{
												return (
													<li class='mall-list-tdds-item' key={index2}>
														<img class='tdds-item-img' src={item2.image}/>
														<p class='tdds-item-name'>{item2.name}</p>
														<p class='tdds-item-price'>&yen;{item2.price/100}</p>
													</li>
												)
											})
										}
									</div>
								</div>
							)
						})
					}
					<div class='mall-home'>
						<h2>好货精选</h2>
						<ul class='mall-home-list'>
							{
								homeArr.map((item, index)=>{
									return (
										<li class='mall-home-item' key={index}>
											<img src={item.skuList[0].image}/>
											<h3>{item.masterName}</h3>
											<p>
												<span>&yen;{item.maxPrice/100}</span><span>已售{item.displaySalesCount}</span>
											</p>
										</li>
									)
								})
							}
						</ul>
						<p class="noMoreDataToast" style={showNoMoreToastStyle}>{this.state.noMoreDataToast}</p>
					</div>
				</div>
			</div>
		)
	}
	menuClick(){
		this.props.menuAction();
	}
	componentWillMount(){
		appService.getMallListData()
		.then(data=>{
			// console.log(data);
			this.setState({mallListData: data});
		})
		appService.getMallHomeData(1, 20)
		.then(data=>{
			this.setState({mallHomeData: data});
		})
	}
	componentDidMount(){
		this.refs.mallPage.addEventListener('scroll',this.mallPageScroll.bind(this));
	}
	mallPageScroll(ev){
		// console.log(ev.target.scrollTop);
		// var that = this;
		let scrollTop = ev.target.scrollTop;
		let clientHeight = ev.target.clientHeight;
		let scrollHeight = ev.target.scrollHeight;
		if(scrollTop >= scrollHeight - clientHeight - 300){
			if(timer == null){
				timer = setTimeout(()=>{
					console.log(timer);
					clearTimeout(timer);
					console.log(timer);
					timer = null;
				},2000);
				// this.refs.mallPage.removeEventListener('scroll', this.mallPageScroll.bind(this));
				this.setState({showNoMoreToast: true, noMoreDataToast: '正在加载...'});
				console.log('触发了数据请求第' + this.state.page + '次');
				appService.getMallHomeData(this.state.page, 20)
				.then(data=>{
					this.setState({mallHomeData: this.state.mallHomeData.concat(data), page: ++(this.state.page)});
					// this.refs.mallPage.addEventListener('scroll',this.mallPageScroll.bind(this));
					this.setState({showNoMoreToast: false, noMoreDataToast: '正在加载...'});
					if(data.length == 0){
						this.setState({showNoMoreToast: true, noMoreDataToast: '没有更多数据了'});
					}
				})
			}else{

			}
			
		}
		
	}
}
