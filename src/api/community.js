import axios from "axios";
axios.defaults.baseURL="http://localhost:3000";

export function getCommunity(){
        return axios({
                method:"GET",
                url:"/community",
        })
}

export function addNew(params) {
        return axios({
                method: "POST",
                url: "/askQuestions",
                data:params
        })
}

export function searchByxx(key1, key2) {
        return axios({
                method: "GET",
                url:"/community?key1="+key1+"?key2="+key2
        })
}

export function getCommunityAnswers(publishID) {
        return axios({
                method: "GET",
                url:"/communities?publishID="+publishID
        })
}

export function addAnswer(publishID,params) {
        return axios({
                method: "POST",
                url:"/addAnswer?publishID="+publishID,
                data:params
        })
}