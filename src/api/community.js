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

// 获取自己的匹配列表
export function getMyMatches(userId) {
        return axios({
                method: "GET",
                url:"/api1/users/"+userId+"/matches"
        })
}

// 查看具体代码
export function codeDetail(userId, problemId) {
        return axios({
                method: "GET",
                url:"/api1/users/"+userId+"/matches/"+problemId
        })
}