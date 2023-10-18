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
  export default {
    data() {
      return {
        matching: false,
        timeLeft: 10,
        timerId: null
      };
    },
    methods: {
      startMatching() {
        this.matching = true;
        this.timerId = setInterval(() => {
          if (this.timeLeft === 0) {
            this.endMatching(); // Extracted the logic to a method for reusability
            this.findMatch();
          } else {
            this.timeLeft--;
          }
        }, 1000);
      },
      findMatch() {
        console.log("Finding a match...");
        // Here you could emit an event to your socket server to find a match.
      },
      cancelMatching() {
        this.endMatching(); // Using the extracted method
        console.log("Matching cancelled");
        // Optionally, inform the server about the cancellation here
      },
      endMatching() {
        this.matching = false;
        clearInterval(this.timerId);
        this.timeLeft = 10; // Reset the timer
      }
    },
    beforeUnmount() {
      clearInterval(this.timerId); // Clean up the timer
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