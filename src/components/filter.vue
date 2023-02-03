<template>
  <div class="row">
    <div class="col-md-3">
      <select v-model="selectedStatus" @change="updateSelectedStatus">
        <option v-for="status in statuses" :value="status.value">{{ status.value }}</option>
      </select>
    </div>
    <div class="col-md-3">
      <select v-model="selectedPriority" @change="updateSelectedPriority">
        <option v-for="priority in priorities" :value="priority.value">
          <i v-if="priority.value === 'low'" class="fa-chevron-down" aria-hidden="true"></i>
          <i v-if="priority.value === 'medium'" class="fa-grip-lines" aria-hidden="true"></i>
          <i v-if="priority.value === 'high'" class="fa-chevron-up" aria-hidden="true"></i>
          {{ priority.value }}
        </option>
      </select>
    </div>
    <div class="col-md-3">
      <select v-model="selectedDate" @change="updateSelectedDate">
        <option v-for="date in dates" :value="date.value">{{ date.value }}</option>
      </select>
    </div>
  </div>
  
</template>
<script >
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'selectedStatus',
      'selectedPriority',
      'selectedDate',
      'filteredTodos',
      'statuses',
      'priorities',
      'dates',
    ]),
  },
  methods: {
    updateSelectedStatus(event) {
      this.$store.commit("SET_SELECTED_STATUS", event.target.value);
    },
    updateSelectedPriority(event) {
      this.$store.commit("SET_SELECTED_PRIORITY", event.target.value);
    },
    updateSelectedDate(event) {
      this.$store.commit("SET_SELECTED_DATE", event.target.value);
    },
  },
};
</script>
<style>
.col-md-3 select {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  gap: 20px;
  width: 147.5px;
  height: 47px;
  background: #F6F6F8;
  border-radius: 5px;
}
</style>
