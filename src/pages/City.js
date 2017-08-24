import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import appService from '../services/appService.js'
import store from '../store'

let charArr =  ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
let newArr =  [{'A': []},{'B': []},{'C': []},{'D': []},{'E': []},{'F': []},{'G': []},{'H': []},{'I': []},{'J': []},{'K': []},{'L': []},{'M': []},{'N': []},{'O': []},{'P': []},{'Q': []},{'R': []},{'S': []},{'T': []},{'U': []},{'V': []},{'W': []},{'X': []},{'Y': []},{'Z': []}];
export default class City extends Component{
	constructor({history}){
        super();
        this.state = {
            history,
            hotCity: store.getState().hotCity,
            cityData: [],
            charArrModify: [],
            newArrModify: [],
            isCityLeave: false
        }
	}
	render(){
        var subObj = {};
        var k = '';
        var charsVdom = (
                <div class='charArrModify'>
                    <h2>按字母顺序</h2>
                    <p>
                        {
                            this.state.charArrModify.map((item,index)=>{
                                return <a key={index} href={'#charIndex' + index}>{item}</a>
                             })
                        }
                    </p>
                </div>
        );
        var vdom = (this.state.newArrModify.map((item1, index1)=>{
            subObj = item1;
            k = this.state.charArrModify[index1];
            return (<li key={index1} class='newArrModify-item' id={'charIndex' + index1}>
                    <h2>{this.state.charArrModify[index1]}</h2>
                    <p>
                        {
                            subObj[k].map((item2, index2)=>{
                                return <span key={index2} to='/city' onClick={this.cityAction.bind(this, item2.name)}>{item2.name}</span> 
                            })
                        } 
                    </p> 
                    </li>)
        }));
        return(
            <ReactCSSTransitionGroup
                transitionName="city"
				transitionAppear={true}
				transitionAppearTimeout={400}
				transitionEnter={false}
	      		transitionLeave={true}
	      		transitionLeaveTimeout={1000}>
                <div class={'page city-page' + (this.state.isCityLeave ? ' leave' : '')}>
                    <div class='gps-city newArrModify-item'>
                        <h2>GPS定位你所在城市</h2>
                        <p>
                            <span onClick={this.cityAction.bind(this, '深圳')}>深圳</span>
                        </p>
                    </div>
                    <div class='hot-city'>
                        <h2>热门城市</h2>
                        <p>
                            {
                                this.state.hotCity.map((item, index)=>{
                                    return (
                                        <span key={index} onClick={this.cityAction.bind(this, item)}>{item}</span>
                                    )
                                })
                            }
                        </p>
                    </div>
                    {
                        charsVdom
                        }
                    {
                        vdom
                    }
                </div>
            </ReactCSSTransitionGroup>
		)
	}
	menuClick(){
		this.props.menuAction();
    }
    cityAction(city){
        store.dispatch({
            type: 'changeCity',
            val: city
        });
        this.setState({isCityLeave: true});
        setTimeout(()=>{
            this.state.history.push('/');
        },400);
    }
    componentWillMount(){
        appService.getCityData()
        .then(data=>{
            this.state.cityData = data;
            var dataArr = this.state.cityData;
            for(var i=0; i<dataArr.length; i++){
                for(var j=0; j<newArr.length; j++){
                    if(dataArr[i].pinyin.substring(0,1) == charArr[j]){
                        var key = charArr[j]
                        newArr[j][key].push(dataArr[i]);
                        continue;
                    }
                }
            }
            for(var j=0; j<newArr.length; j++){
                var key = Object.keys(newArr[j])[0];
                if(newArr[j][key].length == 0){
                    newArr.splice(j, 1);
                    charArr.splice(j, 1);
                    j--;
                }
            }
            this.setState({newArrModify: newArr, charArrModify: charArr});
        })
    }
}
