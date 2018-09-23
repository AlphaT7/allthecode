Vue.component('ww-game', {
	template: `
       <div>
            <div class="title">
                <div class="container flex">
                    <div class="logo">T<sup>3</sup></div>
                    <div class="brand"></div>
                    <div class="flip" @click="flipcard"><i class="fas fa-cogs"></i></div>
                </div>
            </div>
            <div class="flip-container">
                <div class="flipper" :class="{ 'flip-container-flipped': flipped }">
                    <div class="cardfront">
                        <div class="container grid">
                            <div
                                class="griditem" 
                                v-for="item in grid"
                                v-text="item">
                            </div>
                        </div>
                    </div>
                    <div class="cardback">
                        <div class="cardback_content">
                            <div class="tabs">
                                <div v-for="tab in tabs" class="tab" :class="{ selectedtab: inittab(tab) }" v-text="tab" :id="(tab)" @click="selecttab(tab)"></div>
                            </div>
                            <div class="panels" v-for="panel in panels" v-if="panel.name == selected" v-html="panel.content"></div>  
                            <img class="ww" src="./img/ww_logo.png"/>                              
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
	data: function() {
		return {
			tabs: ['Create', 'Join', 'ReMatch'],
			panels: [
				{
					name: 'Create',
					content: `<div class="ng_wrap flex"><input id="newgame" type="text" placeholder="Enter Your Game Name"/><button id="submit_cg" class="btn-green">Create</button></div>`
				},
				{
					name: 'Join',
					content: `<div class="ng_wrap flex"><select id="joingame"><option>Choose a Game</option></select><button id="submit_jg" class="btn-green">Join</button></div>`
				},
				{
					name: 'ReMatch',
					content: `<div class="ng_wrap flex"><button id="submit_rm" class="btn-green">ReMatch</button></div>`
				}
			],
			grid: ['T', 'I', 'C', 'T', 'A', 'C', 'T', 'O', 'E'],
			flipped: true,
			selected: 'Join'
		};
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
					document
						.querySelector('#' + tab)
						.classList.add('selectedtab');
				} else {
					document
						.querySelector('#' + tab)
						.classList.remove('selectedtab');
				}
			});
		}
	}
});
let vm = new Vue({
	el: '#ww-app'
});
