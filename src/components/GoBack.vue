<template>
  <span class="go-back">
    <button @click="goBack">Go Back</button>
  </span>
</template>

<script>
export default {
  name: "GoBack",
  methods: {
    goBack() {
      return this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.go-back {
  display: flex;
  cursor: pointer;
}
button {
  border: 0;
  background-color: #d40ad4;
  border-radius: 25px;
  padding: 15px;
}
button:hover {
  cursor: pointer;
  background-color: #ff00ff;
}
</style>
