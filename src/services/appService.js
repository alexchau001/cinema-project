import axios from 'axios'
import Api from '../api'

function getCityData(){
    return new Promise((resolve,reject)=>{
        axios.get(Api.CityApi)
        .then(res=>{
            // console.log(res.data.data.cities);
            resolve(res.data.data.cities);
        })
        .catch(error=>{
            console.log(error);
        })
    })
}

function getHomeBannerData(){
    return new Promise((resolve, reject)=>{
        axios.get(Api.HomeBannerApi + (new Date).getTime())
        .then(res=>{
            resolve(res.data.data.billboards);
        })
        .catch(error=>{
            console.log(error);
        })
    })
}

function getNowPlayingData(){
    return new Promise((resolve,reject)=>{
        axios.get(Api.NowPlayingApi + (new Date).getTime())
        .then(res=>{
            // console.log((new Date).getTime());
            // console.log(res.data.data);
            resolve(res.data.data.films)
        })
        .catch(error=>{
            console.log(error);
        })
    })
}

function getComingSoonData(){
    return new Promise((resolve,reject)=>{
        axios.get(Api.ComingSoonApi + (new Date).getTime())
        .then(res=>{
            // console.log((new Date).getTime());
            // console.log(res.data.data);
            resolve(res.data.data.films)
        })
        .catch(error=>{
            console.log(error);
        })
    })
}

function getMoviesData(page, count){
    return new Promise((resolve,reject)=>{
        axios.get(Api.NowPlayingMoviesApi + (new Date).getTime() + '&page=' + page + '&count=' + count)
        .then(res=>{
            resolve(res.data.data.films)
        })
        .catch(error=>{
            console.log(error);
        })
    })
}

function getComingSoonMoviesData(page, count){
    return new Promise((resolve,reject)=>{
        axios.get(Api.ComingSoonMoviesApi + 'page=' + page + '&count=' + count)
        .then(res=>{
            resolve(res.data.data.films)
        })
        .catch(error=>{
            console.log(error);
        })
    })
}

function getCinemasData(){
    return new Promise((resolve,reject)=>{
        axios.get(Api.CinameApi + (new Date).getTime())
        .then(res=>{
            var arr = res.data.data.cinemas;
            var districtArr = [];
            arr.map((item, index)=>{
                if(districtArr.indexOf(item.district.name) == -1){
                    districtArr.push(item.district.name);
                }
            });
            var newArr = districtArr.map((item, index)=>{
                var obj = {};
                obj[item] = [];
                return obj;
            })
            newArr.map((item, index)=>{
                var key = Object.keys(item)[0];
                for(var i=0; i<arr.length; i++){
                    if(arr[i].district.name == key){
                        item[key].push(arr[i]);
                    }
                }
            })
            resolve(newArr)
        })
        .catch(error=>{
            console.log(error);
        })
    })
}

function getMallListData(){
    return new Promise((resolve, reject)=>{
        axios.get(Api.MallListApi)
        .then(res=>{
            resolve(res.data.data);
        })
        .catch(error=>{
            console.log(error);
        })
    })
}

function getMallHomeData(page, num){
    return new Promise((resolve, reject)=>{
        axios.get(`${Api.MallRecommendApi}page=${page}&num=${num}`)
        .then(res=>{
            resolve(res.data.data.list);
        })
        .catch(error=>{
            console.log(error);
        })
    })
}

function getMovieData(id){
    return new Promise((resolve, reject)=>{
        axios.get(`${Api.MovieApi}${id}?__t=${(new Date).getTime()}`)
        .then(res=>{
            // console.log(res.data.data.film);
            resolve(res.data.data.film);
        })
        .catch(error=>{
            console.log(error);
        })
    })
}
export default{
    getCityData,
    getHomeBannerData,
    getNowPlayingData,
    getComingSoonData,
    getMoviesData,
    getComingSoonMoviesData,
    getCinemasData,
    getMallListData,
    getMallHomeData,
    getMovieData
}