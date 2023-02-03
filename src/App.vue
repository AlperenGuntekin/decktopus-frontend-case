
<template>
  <div id="app">
    <div class="tasks-box">
      <h3>SEO Checklists</h3>
      <div class="container">
        <Filter />
        <br>
        <Todos />
        <br>
        <New />
      </div>
    </div>
  </div>
</template>
<script>
import Filter from "./components/filter.vue";
import Todos from "./components/todos.vue";
import New from "./components/new.vue";
export default {
  name: "App",
  components: {
    New,
    Todos,
    Filter
  }
};
</script>
<style>
.app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  color: #2c3e50;
  display: flex;
}

.tasks-box {
  background-color: rgb(255, 255, 255);
  width: 85%;
  height: 85%;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tasks-box h3 {
  color: rgb(70, 70, 224);
  font-size: 48px;
  font-weight: 600;
  display: flex;
  justify-content: space-around;
  margin: 40px 0px 40px 0px;
}

.container {
  width: 95%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>