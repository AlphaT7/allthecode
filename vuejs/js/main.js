console.log("main.js loaded!");

let app = new Vue({
  el: "#container",

  data: {
    newData: "",
    message: "Hello World!",
    list: ["obj1", "obj2", "obj3", "obj4", "obj5"],
    title: "This title has been set dynamically via JavaScript."
  },

  methods: {
    update() {
      this.list.push(this.newData);
      this.newData = "";
    }
  }
});
