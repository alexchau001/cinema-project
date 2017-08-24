import {createStore} from 'redux'

function reducer(state, action){
    switch (action.type){
        case 'changeCity' :
            state.city = action.val;
            break;
        case 'changeTitle' :
            state.title = action.val;
            break;
        default:
            state = {
                city: '深圳',
                hotCity: ['北京','上海','广州','深圳'],
                title: '卖座电影'
            }
            break;
    } 
    return state;
}

export default createStore(reducer);