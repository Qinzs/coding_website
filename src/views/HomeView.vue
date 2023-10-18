<template>
  <div class = "container">
    <main>
      <el-row :gutter="24">
        <el-col :span="0.5"><div class="grid-content ep-bg-purple" /></el-col>
        <el-col :span="8"><div class="grid-content ep-bg-purple" />

          <el-carousel :interval="5000"
          height="450px"
          :autoplay="true"
          >
            <el-carousel-item v-for="item in imageSet" :key="item">
              <img :src="item" />
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

            <match-card />
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
import MatchCard from "../components/HomePage/MatchCard.vue";

import { useRouter } from 'vue-router';

export default {
  components: {
    RankingTable,
    InfoCard,
    MatchCard,
  },
  data() {
    return {
      img1,
      img2,
      img3,
      imageSet: [img1, img2, img3]
    };
  },
  setup() {
    const router = useRouter();

    const moveToCodingPage = () => {
      router.push({ name: 'codePartComponent' });
    };

    return {
      moveToCodingPage,
    };
  },
  methods: {
    checkMatch() {
      const isMatched = true;

      if (isMatched) {
        this.moveToPlayingPage();
      }
    },
  },
  moveToCodingPage() {
    this.$router.push({ name: 'codePartComponent' });
  },
};

</script>
  

<style lang="scss">
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
  margin-top: 60px;
}

.status-text {
  color: #ffffff;  /* Set color to white */
  text-align: left; /* Align text to the left */
}
</style>
