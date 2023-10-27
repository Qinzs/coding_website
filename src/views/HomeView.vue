<template>
  <div class = "container">
    <main>
      <el-row :gutter="24">
        <el-col :span="0.5"><div class="grid-content ep-bg-purple" /></el-col>
        <el-col :span="8"><div class="grid-content ep-bg-purple" />

          <el-carousel :interval="5000" height="450px" :autoplay="true">
            <el-carousel-item v-for="(item, index) in imageSet" :key="item">
              <div class="carousel-container">
                <img :src="item" class="carousel-image" />
                <div class="carousel-text">{{ carouselTexts[index] }}</div>
              </div>
            </el-carousel-item>
          </el-carousel>
        </el-col>
        
        <el-col :span="1"><div class="grid-content ep-bg-purple" /></el-col>

        <el-col :span="8">
          <div class="grid-content ep-bg-purple">
            <el-col :span="0.5"><div class="grid-content ep-bg-purple" /> </el-col>
            <div style="height: 50%; margin-bottom: 3.5%; font-weight: bold; font-size: 24px; color: rgb(201, 214, 214); margin-right: 60%;">Your status</div>
            <!-- <el-text tag="b" class="status-text">Your status</el-text>   -->
            <info-card />

            <el-col :span="2"><div class="grid-content ep-bg-purple" /> </el-col>

            <div class="card">
              <button @click="startMatching" :disabled="matching">Match a player</button>
              <div v-if="matching" class="timer">
                Matching in: <span>{{ timeLeft }}</span> seconds
                <button @click="cancelMatching" class="cancel-button">X</button>
              </div>
            </div>
          </div>
        </el-col>
        
        <el-col :span="6"><div class="grid-content ep-bg-purple" />
          <div id="ranking">
            <ranking-table />
          </div>
          
        </el-col>

      </el-row>
    </main>
  </div>
</template>

<script>
import img1 from "../assets/carousel-1.jpg";
import img2 from "../assets/carousel-2.jpg";
import img3 from "../assets/carousel-3.jpg";

import RankingTable from "../components/HomePage/RankingTable.vue";
import InfoCard from "../components/HomePage/InfoCard.vue";

import { ref, watchEffect, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';


export default {
  
  components: {
    RankingTable,
    InfoCard,
  },
  data() {
    return {
      img1,
      img2,
      img3,
      imageSet: [img1, img2, img3],
      matching: false,
      timeLeft: 30,
      timerId: null,
      socket: null,
      problem: null,  // 初始化为null
      matchId: null,
      carouselTexts: ["KOC is a cutting-edge platform designed to elevate your coding skills. Dive deep into challenges, sharpen your expertise, and climb the ranks among the world's top programmers.", 
        "KOC offers a curated journey through the vast world of programming. With personalized pathways and real-world challenges, we ensure you're always at the forefront of the coding arena.", 
        "With KOC, you're not just coding; you're crafting your future. Our platform bridges the gap between learning and real-world application, propelling you towards coding mastery."]
    };
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const userId = ref(store.state.user?.id);
    const socket = ref(null);

    const navigateToCodePartComponent = () => {
      router.push({ name: 'code' });
    };

    const initWebSocket = () => {
      socket.value = new WebSocket(`ws://localhost:3000/ws/match?userId=${userId.value}`);

      
      socket.value.onmessage = (event) => {
        const data = JSON.parse(event.data);

        // 打印接收到的消息
        console.log("Received WebSocket message:", data);

        if (data.problem) {
          store.commit('SET_CODING_PROBLEM', data.problem);
          navigateToCodePartComponent();
        }

        // 使用mutation更新store中的matchId
        store.commit('SET_MATCH_ID', data.matchId);
      };

      socket.value.onclose = () => {
        console.log("WebSocket closed");
      };
    };

    watchEffect(() => {
      if (store.state.matchedPlayer) {
        navigateToCodePartComponent();
      }
    });

    onUnmounted(() => {
      if (socket.value) {
        socket.value.close();
      }
    });

    return {
      initWebSocket,
    };
  },
  methods: {
    startMatching() {
      this.matching = true;
      this.initWebSocket();

      this.timerId = setInterval(() => {
        if (this.timeLeft === 0) {
          this.endMatching();
        } else {
          this.timeLeft--;
        }
      }, 1000);
    },
    cancelMatching() {
      this.endMatching();
      console.log("Matching cancelled");
    },
    endMatching() {
      this.matching = false;
      clearInterval(this.timerId);
      this.timeLeft = 30;
      if (this.socket) {
        this.socket.close();
      }
    },
  },
};

</script>
  

<style lang="scss" scoped>
  main {
    background-image: url('../assets/home_background.png');
    background-size: cover;
  }
  
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
  border-radius: 8px;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
  border-radius: 8px;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
  border-radius: 8px;
}

.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.el-header {
  background-color: #2f3338;
  color: #d3dce6;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}


.box-card {
  width: 480px;
}


#ranking {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  // margin-top: 60px;
}

.status-text {
  color: #ffffff;  /* Set color to white */
  text-align: left; /* Align text to the left */
}

.carousel-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.carousel-image {
  width: 100%;
  height: 100%;
  display: block;
}

.carousel-text {
  position: absolute;
  bottom: 10px;  // 调整这个值以改变文本的位置
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.5);  // 半透明的黑色背景
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
}

.card {
  width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  text-align: center;
  margin: auto;
}
.timer {
  margin-top: 20px;
  position: relative;
}
.cancel-button {
  position: absolute;
  right: 0;
  top: 0;
  background-color: #e44;
  color: #fff;
  border: none;
  padding: 5px 8px;
  cursor: pointer;
}
.cancel-button:hover {
  background-color: #c33;
}
</style>
