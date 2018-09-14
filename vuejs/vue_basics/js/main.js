let app = new Vue({
  el: "#container",

  data: {
    colorBlue: false,
    newData: "",
    message: "Hello World!",
    list: [
      { desc: "Task 1", complete: true },
      { desc: "Task 2", complete: false },
      { desc: "Task 3", complete: false },
      { desc: "Task 4", complete: false },
      { desc: "Task 5", complete: false }
    ],
    title: "This title has been set dynamically via JavaScript."
  },

  methods: {
    update() {
      this.list.push({ desc: this.newData, complete: false });
      this.newData = "";
    },
    toggleClass() {
      this.colorBlue = true;
    }
  },

  computed: {
    inCompleteTasks() {
      return this.list.filter(task => !task.complete);
    },
    completeTasks() {
      return this.list.filter(task => task.complete);
    }
  }
});

console.log("main.js loaded!");

Vue.component("task", {});
