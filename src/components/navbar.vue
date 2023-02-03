<template>
  <div class="navbar">
    <ul class="priority-list">
      <li class="priority-item" v-for="priority in priorities" :key="priority">
        <a @click="changePriority(priority)" class="priority-link">{{ priority }}</a>
      </li>
    </ul>
  </div>
</template>

<script >
export default {
  data() {
    return {
      priorities: ["Low", "Medium", "High"]
    };
  },
  methods: {
    changePriority(priority) {
      this.$emit("change", priority);
    }
  }
};
</script>