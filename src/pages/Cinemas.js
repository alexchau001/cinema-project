import React, {Component} from 'react'
import appService from '../services/appService.js'

export default class Cinema extends Component{
	constructor(){
		super();
		this.state = {
			cinemasData: [],
			isShowItems: []
		}
	}
	render(){
		var itemsStyle = this.state.isShowItems.map((item, index)=>{
			return {display: item ? 'block' : 'none'}; 
		});
		// console.log(itemsStyle);
		return(
			<div class="page">
				<ul class='cinemas-list'>
					{this.state.cinemasData.map((item, index)=>{
						var key = Object.keys(item)[0];
						return (
							<li class='cinemas-item' key={index}>
								<h2 onClick={this.clickAction.bind(this, index)}>{key}</h2>
								{item[key].map((item2, index2)=>{
									return (
										<div key={index2} style={itemsStyle[index]}>
												<h3>{item2.name}</h3>
												<p>{item2.address}</p>
										</div>)
								})}
							</li>)
						}
					)}
				</ul>
			</div>
		)
	}
	menuClick(){
		this.props.menuAction();
	}
	clickAction(index){
		this.state.isShowItems[index] = !this.state.isShowItems[index];
		this.setState({isShowItems: this.state.isShowItems})
	}
	componentWillMount(){
		appService.getCinemasData()
		.then(data=>{
			this.setState({cinemasData: data});
			var booleanArr = data.map((item, index)=>{
				return false;
			});
			booleanArr[0] = true;
			this.setState({isShowItems: booleanArr});
		})
	}
}
