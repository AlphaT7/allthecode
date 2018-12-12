<template>
  <div>
            <div class="title">
                <div class="container flex">
                    <div class="logo">T<sup>3</sup></div>
                    <div class="spacer"></div>
                    <div class="flip" @click="flipcard"><i class="fas fa-cogs"></i></div>
                </div>
            </div>
            <div class="flip-container">
                <div class="flipper" :class="{ 'flip-container-flipped': flipped }">
                    <div class="cardfront">
                        <div class="container grid">
                            <div class="griditem" v-for="(item , index) in grid" :key="(index)" v-text="item">
                            </div>
                        </div>
                    </div>
                    <div class="cardback">
                        <div class="cardback_content">
                            <div class="tabs">
                                <div v-for="(tab, index) in tabs" class="tab" :key="index" :class="{ selectedtab: inittab(tab) }" v-text="tab" :id="(tab)" @click="selecttab(tab)"></div>
                            </div>
                            <!--<div class="panels" v-for="panel in panels" :key="(panel.name)" v-if="panel.name == selected" v-html="panel.content"></div>  -->
                            <div class="panels" v-if="selected == 'Create'">
                                <div class="ng_wrap flex">
                                    <input id="newgame" type="text" placeholder="Enter Your Game Name"/>
                                    <button @click="creategame" id="submit_cg" class="btn-green">Create</button>
                                </div>
                            </div>
                            <div class="panels" v-if="selected == 'Join'">
                                <div class="ng_wrap flex">
                                    <div class="ng_wrap flex">
                                        <select id="joingame">
                                            <option>Choose a Game</option>
                                        </select>
                                        <button id="submit_jg" class="btn-green">Join</button>
                                    </div>
                                </div>
                            </div>
                            <div class="panels" v-if="selected=='ReMatch'">
                                <div class="ng_wrap flex">
                                    <button id="submit_rm" class="btn-green">ReMatch</button>
                                </div>
                            </div>
                            <img class="ww" src="./assets/ww_logo.png"/>                              
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
import {db} from "./config.js";
export default {
  data: function() {
    return {
      tabs: ["Create", "Join", "ReMatch"],
      grid: ["T", "I", "C", "T", "A", "C", "T", "O", "E"],
      flipped: false,
      selected: "Join",
      games: {}
    };
  },
  firebase: {
    games: {
      source: db.ref("games/")
    }
  },
  methods: {
    flipcard: function() {
      this.flipped = !this.flipped;
    },
    inittab: function(selectedtab) {
      return this.selected == selectedtab;
    },
    showpanel: function(id) {
      return id.slice(0, -6) == this.selected ? true : false;
    },
    selecttab: function(selectedtab) {
      this.selected = selectedtab;
      this.tabs.forEach(tab => {
        if (tab == this.selected) {
          document.querySelector("#" + tab).classList.add("selectedtab");
        } else {
          document.querySelector("#" + tab).classList.remove("selectedtab");
        }
      });
    },
    creategame: function() {
      alert(this.games);
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
