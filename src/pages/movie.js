import React, {Component} from 'react'
import appService from '../services/appService.js'
import Store from '../store'

export default class Movie extends Component{
    constructor({location}){
        super();
        this.state = {
            location,
            movieData: {}
        }
    }
    render(){
        let movieVdom = this.state.movieData.id == null ? null : <div class='movie'>
                                                                    <img src={this.state.movieData.cover.origin}/>
                                                                    <h2><i></i><span>影片简介</span></h2>
                                                                    <div class='movie-content'>
                                                                        <p><i>导演&nbsp;:&nbsp;</i>{this.state.movieData.director}</p>
                                                                        <p class='movie-actors'><i>主演&nbsp;:&nbsp;</i>{
                                                                            this.state.movieData.actors.map((item, index)=>{
                                                                                return <span key={index}>{item.name}|</span>
                                                                            }) 
                                                                            }</p>
                                                                        <p><i>地区语言&nbsp;:&nbsp;</i>{this.state.movieData.language}</p>
                                                                        <p><i>类型&nbsp;:&nbsp;</i>{this.state.movieData.category}</p>
                                                                        <p><i>上映日期&nbsp;:&nbsp;</i>{getMonthAndDate(this.state.movieData.premiereAt)}上映</p>
                                                                        <article class='synopsis'>{this.state.movieData.synopsis}</article>
                                                                    </div>
                                                                     <button class='btn-buy'>立即购票</button>
                                                                </div>
        return(
            <div class="page">
                {movieVdom}
            </div>
        )
        function getMonthAndDate(millis){
            var date = new Date(millis);
			return (date.getMonth() + 1) + '月' + (date.getDate()) + '日'
        }
    }
    componentWillMount(){
        appService.getMovieData(this.state.location.state.id)
        .then(data=>{
            this.setState({movieData: data});
        });
        Store.dispatch({
            type: 'changeTitle',
            val: this.state.location.state.name
        })
    }
}