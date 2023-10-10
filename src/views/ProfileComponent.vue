<template>
    <div class="profileBase">
        <el-row :gutter="20">
            <el-col :span="5" style="background-color:white; margin-left: 5%; height: 100%;">
                <!-- 头像区域 -->
                <div class="grid-content avatar" style="display: flex; flex-direction: column;">
                    <div class="showProfile" style="margin: 0%; width: 100%; height:75%; display: flex;">
                        <div class="showIcon" style="margin: 0%; width: 100px;">
                            <el-avatar shape="square" :size="100" fit="fill"
                                src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" />
                        </div>
                        <div class="showName" style="width: calc(100% - 100px); position: relative; margin-left: 5%;">
                            <div style="color: #262626; font-weight: 600; font-size:1rem">
                                {{ UserInfo.name  }}
                            </div>
                            <!-- 让ranking：1紧贴着父级元素 -->
                            <div style=" bottom: 0%; position: absolute; color:#262626bf;font-weight: 500;">
                                Ranking: {{ UserInfo.ranking  }}
                            </div>
                            <span style="color: white; width: 2px;height:2px; margin-top:5px">

                            </span>
                        </div>
                    </div>
                    <div class="showEdit" style="width: 100%;height: 25%; margin-top: 2%;">
                        <el-button type="success" style="width: 85%; margin-left: 7.5%;">Edit Profile</el-button>
                    </div>
                </div>
                <el-divider border-style="dashed" />

                <div class="grid-content personal-info"
                    style="display: flex; flex-direction: column; color: #262626; font-weight: 600; font-size:1rem">
                    Personal Info
                    <div style="margin-top: 5%; color:#262626bf;font-weight: 500;">
                        Email: {{ UserInfo.email}}
                    </div>
                    <div style="margin-top: 5%;color:#262626bf;font-weight: 500;">
                        Phone: {{ UserInfo.phone}}
                    </div>
                    <div style="margin-top: 5%;color:#262626bf;font-weight: 500;">
                        Last login: {{ UserInfo.lastLogin}}
                    </div>
                </div>
                <el-divider border-style="dashed" />
                <!-- 社交情况区域 -->
                <div class="grid-content social"
                    style="display: flex; flex-direction: column; color: #262626; font-weight: 600; font-size:1rem">
                    Coomunity stats
                    <avue-data-icons :option="communityIcon"></avue-data-icons>

                </div>
                <!-- <el-divider border-style="dashed" /> -->


            </el-col>

            <el-col :span="16" style="background-color: #f7f8fa; margin-left: 5%;">
                <div
                    style="width:fit-content; height:43%; display:flex; flex-direction:row; position: relative; background-color: #f7f8fa;">
                    <div
                        style="width:500px; align-items: center; display:flex; flex-direction:row; background-color: white;">
                        <div style="width:150px; padding-right: 0%; margin-left: 3%; margin-top: -5%;">
                            <div style="margin-bottom: 15% ;color:#262626bf;">Solved Questions:</div>

                            <el-progress type="circle" :percentage="Math.round((UserInfo.overallsoved/300) * 100)">
                                <template #default="{ percentage }">
                                    <span class="percentage-value">{{ percentage }}%</span>
                                    <span class="percentage-label">Solved</span>
                                </template>
                            </el-progress>
                        </div>
                        <div style="width:55%; margin-top: 2%;">
                            <div style="color:#262626bf;">Easy: {{ UserInfo.easy }}/{{ total_num }}</div>
                            <el-progress :text-inside="true" :stroke-width="24" :percentage="Math.round((UserInfo.easy/100) * 100)" status="success"
                                style="margin-bottom: 5%;" />
                            <div style="color:#262626bf;">Medium: {{ UserInfo.medium }}/{{ total_num }}</div>
                            <el-progress :text-inside="true" :stroke-width="22" :percentage="Math.round((UserInfo.medium/100) * 100)" status="warning"
                                style="margin-bottom: 5%;" />
                            <div style="color:#262626bf;">Hard: {{ UserInfo.hard}}/{{ total_num }}</div>
                            <el-progress :text-inside="true" :stroke-width="20" :percentage="Math.round((UserInfo.hard/100) * 100)" status="exception"
                                style="margin-bottom: 5%;" />
                        </div>
                    </div>
                    <!-- <div style="position:absolute; scale: 0.62; top: -87px; left: 380px; margin-left: 50px; height:400px;width: 600px; display: flex; background-color: #fff;"> -->
                    <avue-data-price :option="subscribeInfo"></avue-data-price>

                    <!-- </div> -->

                </div>
                <div style="background-color: white; margin-top: 5%; height: 260px;">
                    <el-tabs type="card" class="demo-tabs">
                        <el-tab-pane>
                            <template #label>
                                <span class="custom-tabs-label">
                                    <el-icon>
                                        <calendar />
                                    </el-icon>
                                    <span>Recent Matches</span>
                                </span>
                            </template>
                            <div v-for="(item, index) in recentMatch" :key="index" style="width: 95%; height: 100%; background-color: #f7f7f8;margin: 0% 0% 2% 2.5%; border-radius:10px;padding: 8px; font-size: 20px;   display: flex;
  align-items: center; justify-content: space-between;">

                                {{ item.questionname }}
                                <div style="width: 30%; display: flex; align-items: center;">
                                    <div style="margin-right: 30%;">
                                        {{ item.date }}
                                    </div>
                                    <!-- 根据item.result，如果是1，就渲染SuccessFilled，如果是0，就渲染CircleCloseFilled -->
                                    <div v-if="item.result == 1">
                                        <el-icon color="green" size="20">
                                            <SuccessFilled />
                                        </el-icon>
                                    </div>
                                    <div v-else>
                                        <el-icon color="red" size="20">
                                            <CircleCloseFilled />
                                        </el-icon>
                                    </div>
                                </div>
                            </div>

                        </el-tab-pane>
                        <el-tab-pane>
                            <template #label>
                                <span class="custom-tabs-label">
                                    <el-icon>
                                        <FolderChecked />
                                    </el-icon>
                                    <span>Solutions</span>
                                </span>
                            </template>
                            <div v-for="(item, index) in recentSolutions" :key="index" style="width: 95%; height: 100%; background-color: #f7f7f8;margin: 0% 0% 2% 2.5%; border-radius:10px;padding: 8px; font-size: 20px;   display: flex;
  align-items: center; justify-content: space-between;">

                                {{ item.questionname }}
                                <div style="width: 30%; display: flex; align-items: center;">
                                    <div style="margin-right: 15%;">
                                        {{ item.date }}
                                    </div>
                                    <div style="color: red; margin-right: 2%;">
                                        {{ item.likes }}
                                    </div>
                                    <el-icon color="red" size="20">
                                        <Star />
                                    </el-icon>
                                </div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane>
                            <template #label>
                                <span class="custom-tabs-label">
                                    <el-icon>
                                        <ChatDotRound />
                                    </el-icon>
                                    <span>Discussions</span>
                                </span>
                            </template>
                            <div v-for="(item, index) in recentDiscussions" :key="index" style="width: 95%; height: 100%; background-color: #f7f7f8;margin: 0% 0% 2% 2.5%; border-radius:10px;padding: 8px; font-size: 20px;   display: flex;
  align-items: center; justify-content: space-between;">

                                {{ item.questionname }}
                                <div style="width: 30%; display: flex; align-items: center;">
                                    <div style="margin-right: 15%;">
                                        {{ item.date }}
                                    </div>
                                    <div style="margin-right: 2%; color: #f2a53f;">
                                        {{ item.replies }}
                                    </div>

                                    <el-icon color="#f2a53f" size="20">
                                        <ChatDotRound />
                                    </el-icon>

                                </div>
                            </div>
                        </el-tab-pane>

                    </el-tabs>
                </div>

            </el-col>
        </el-row>
    </div>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue'
import { Calendar, FolderChecked, ChatDotRound, SuccessFilled, Star, CircleCloseFilled } from '@element-plus/icons-vue'
import { useStore } from 'vuex';
const store = useStore();
if (store.state.user) {
  console.log(store.state.user.name);
} else {
  console.log('User is not defined');
}



const total_num = ref(100)
//maximum num for recentMatch is 3
const recentMatch = ref([
    { questionname: "Question1: Minimum Score By Changing Two Elements", result: 0, date: "2021/10/10 22:99" },
    { questionname: "Question2: Maximum Score By Changing Two Elements", result: 1, date: "2021/10/10 22:99" },
    { questionname: "Question1: Minimum Score By Changing Two Elements", result: 0, date: "2021/10/10 22:99" },
])
const recentSolutions = ref([
    { questionname: "Question1: Minimum Score By Changing Two Elements", result: 0, likes: 88, date: "2021/10/10 22:99" },
    { questionname: "Question2: Maximum Score By Changing Two Elements", result: 1, likes: 100, date: "2021/10/10 22:99" },
    { questionname: "Question1: Minimum Score By Changing Two Elements", result: 0, likes: 99, date: "2021/10/10 22:99" },
])
const recentDiscussions = ref([
    { questionname: "Question1: Minimum Score By Changing Two Elements", result: 0, replies: 88, date: "2021/10/10 22:99" },
    { questionname: "Question2: Maximum Score By Changing Two Elements", result: 1, replies: 100, date: "2021/10/10 22:99" },
    { questionname: "Question1: Minimum Score By Changing Two Elements", result: 0, replies: 99, date: "2021/10/10 22:99" },
])
let UserInfo = ref({
    name: 'Qinzs',
    ranking: 1,
    email: '159xxxx@qq.com',
    phone: '159xxxxxxx',
    lastLogin: '2021-10-10 10:10:10',
    view: 12877,
    discussions: 200,
    answered: 200,
    easy: 80,
    medium: 33,
    hard: 45,
    overallsoved: 0,
})
UserInfo.value.overallsoved = UserInfo.value.easy + UserInfo.value.medium + UserInfo.value.hard

// 
const communityIcon = ref({
    span: 7,
    data: [
        {
            title: 'views',
            count: UserInfo.value.view,
            decimals: 0,
            icon: 'el-icon-view',
            color: '#3478f6',
            target: '_blank'
        },
        {
            title: 'discussions',
            count: UserInfo.value.discussions,
            decimals: 0,
            icon: 'el-icon-comment',
            color: '#f2a53f',
            target: '_blank'
        },
        {
            title: 'answered',
            count: UserInfo.value.answered,
            decimals: 0,
            icon: 'el-icon-tickets',
            color: '#78c5f5',
            target: '_blank'
        },
    ]
}
)
const subscribeInfo = ref({
    span: 6,
    data: [
        {
            title: 'month',
            price: 20,
            append: '',
            list: ['30 days vip', 'support ', 'support all  services', 'support  vip services']
        },
        {
            title: 'season',
            price: 50,
            append: '',
            list: ['90 days vip', 'support all vip services', 'support all vip services', 'support all vip services']
        },
        {
            title: 'year',
            price: 90,
            append: '',
            list: ['365 days vip', 'support all vip services', 'support all vip services', 'support all vip services']
        },
    
    ]
}
)

//change the subscribeInfo to the following format
document.addEventListener('DOMContentLoaded', function () {
    let divs1 = document.querySelectorAll('.data-price');
    let targetDiv1 = divs1[0];  // 选择第一个div

    if (targetDiv1) {
        targetDiv1.style.position = "absolute";
        targetDiv1.style.transform = "scale(0.72)";
        targetDiv1.style.top = "-87px";
        targetDiv1.style.left = "392px";
        targetDiv1.style.marginLeft = "50px";
        targetDiv1.style.height = "405px";
        targetDiv1.style.width = "600px";
        targetDiv1.style.display = "flex";
        targetDiv1.style.backgroundColor = "#fff";
        targetDiv1.style.alignItems = "center";
    }
    let targetDiv = document.querySelector('.data-price div.el-row:first-of-type');

    if (targetDiv) {
        targetDiv.style.width = "100%";
        let targetDiv2 = targetDiv.querySelectorAll('.el-col.el-col-24.el-col-xs-12.el-col-sm-6.el-col-md-6');
        targetDiv2.forEach(function (targetDiv3) {
            targetDiv3.style.maxWidth = "33%";
            targetDiv3.style.flex = "0 0 33%";
        });
        //show something for current subscription
    //     let targetDiv3 = targetDiv.querySelectorAll('.el-col.el-col-24.el-col-xs-12.el-col-sm-6.el-col-md-6');
    //     let targetDiv4 = targetDiv3[0];
    //     if (targetDiv4) {
    //         let listElement = targetDiv4.querySelector('.title');
    //         if (listElement) {
    //     let icon = document.createElement('el-icon');
        
    //     // 设置样式

    //     icon.style.display = "inline-block";
    //     icon.setAttribute('color', 'red');
    //     icon.setAttribute('size', '20');
    //     // 设置内部内容
    //     icon.innerHTML = '<successfilled></successfilled>';
        
    //     listElement.appendChild(icon);
    // }
    //     }

    }

});


</script>
  
<style scoped>
.profileBase {
    height: 100%;
    overflow: scroll;
    background-color: #f7f8fa;
}

.el-row {
    width: 100%;
    height: 100%;
}

.el-row:last-child {
    margin-bottom: 0;
}

.el-col {
    border-radius: 4px;
    height: 100%;
}

.grid-content {
    border-radius: 4px;
    display: flex;
    width: 100%;
    height: 100%
}

.avatar {
    height: 25%;
}

.personal-info {
    height: 25%;
}

.social {
    height: calc(50% - 100px);
}

.el-button.el-button--success {
    background-color: #f2f9f3;
    /* 或您想要的其他颜色 */
    color: #5bb266
}

.percentage-value {
    display: block;
    margin-top: 10px;
    font-size: 28px;
}

.percentage-label {
    display: block;
    margin-top: 10px;
    font-size: 12px;
}

.demo-tabs>.el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
}

.demo-tabs .custom-tabs-label .el-icon {
    vertical-align: middle;
}

.demo-tabs .custom-tabs-label span {
    vertical-align: middle;
    margin-left: 4px;
}</style>
<!-- <style>.data-price .item .title {
    color: red !important;
}</style> -->

  