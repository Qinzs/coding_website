<template>
    <div class="card">
      <button @click="startMatching" :disabled="matching">Match a player</button>
      <div v-if="matching" class="timer">
        Matching in: <span>{{ timeLeft }}</span> seconds

        <button @click="cancelMatching" class="cancel-button">X</button>
      </div>
    </div>
  </template>
  
<script>
  import { computed } from 'vue';
  import { useStore } from 'vuex';

    export default {
      props: {
      socket: {
        type: [Object, null],
        required: true
      },
      problem: {
        type: Object,
        default: null
      },
      matchId: {
        type: [String, Number],
        default: null
      }
    },
    data() {
      return {
        matching: false,
        timeLeft: 30,
        timerId: null
      };
    },
    setup() {
      const store = useStore();
      const userId = computed(() => store.state.userId);

      return {
        userId
      };
    },
    methods: {
    startMatching() {
      this.matching = true;
      this.findMatch();
      this.timerId = setInterval(() => {
        if (this.timeLeft === 0) {
          this.endMatching();
        } else {
          this.timeLeft--;
        }
      }, 1000);
    },
    findMatch() {
      if (!this.problem) {
        console.error("Problem data is not available yet.");
        return;
      }

      console.log("Finding a match...");
      const message = {
        userId: this.userId,
        matchId: this.matchId,
        problemId: this.problem.id,
        inputFormat: this.problem.inputFormat,
        outputFormat: this.problem.outputFormat,
        problemSolutions: "YOUR_SOLUTION_HERE"
      };
      this.socket.send(JSON.stringify(message));
    },
    cancelMatching() {
      this.endMatching();
      console.log("Matching cancelled");
    },
    endMatching() {
      this.matching = false;
      clearInterval(this.timerId);
      this.timeLeft = 10;
    }
  },
  beforeUnmount() {
    clearInterval(this.timerId);
  }
};
</script>
  
  <style scoped>
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