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
                            <div class="panels">
                              <div v-for="tab in tabs" v-if="tab == selected" v-text="tab" :id="getid(tab)"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
	data: function() {
		return {
			tabs: ['Create', 'Join', 'ReMatch'],
			grid: ['T', 'I', 'C', 'T', 'A', 'C', 'T', 'O', 'E'],
			flipped: false,
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
		getid: function(selectedtab) {
			return 'panel_' + selectedtab;
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
			//document.querySelector('#' + tab).className = 'selectedtab';
		}
	},
	mounted: function() {
		/*
        document.querySelectorAll('.griditem').forEach(element => {
			element.style.height = element.offsetWidth + 'px';
		});
		window.addEventListener('resize', function() {
			document.querySelectorAll('.griditem').forEach(element => {
				element.style.height = element.offsetWidth + 'px';
			});
        });
        */
	}
});
let vm = new Vue({
	el: '#ww-app'
});
