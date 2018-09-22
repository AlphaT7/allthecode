console.log('Main.js Loaded!');
Vue.component('ww-header', {
	template: `
        <div class="container header">
            <img class="logo" src="" alt="logo"/>        
            <ul class="nav">
                <li>About</li>
                <li>Products</li>
                <li>Home</li>
            </ul>
        </div>
    `
});
Vue.component('ww-footer', {
	template: `
        <div class="container footer"></div>
    `
});
Vue.component('ww-data', {
	template: `
    <div class="container">
        <div class="pagination">
            <div class="pagination_button" @click="first">|&#171</div>
            <div class="pagination_button" @click="prev">&#171</div>
            <div class="pagination_numbers">
                <div class="pagination_button" v-for="number in numbers" v-text="number" @click="get_page(number)"></div>
            </div>
            <div class="pagination_button" @click="next">&#187;</div>
            <div class="pagination_button" @click="last">&#187;|</div>
        </div>
        <div v-for="item in active_items" :key="item.id">
            <div class="panel">
                <div class="panel_title" v-text="item.company"></div>
                <div class="panel_name">
                    <span v-text="item.fname"></span>&nbsp;<span v-text="item.lname"></span>
                </div>
                <div class="panel_email" v-text="item.email"></div>
            </div>
        </div>
    </div>
    `,
	data: function() {
		return {
			active_items: [],
			first_item: 0,
			last_item: 5,
			page: 1,
			pages: 0,
			numbers: [1, 2, 3, 4, 5],
			items_per_page: 5,
			items: []
		};
	},
	methods: {
		get_items: function() {
			this.active_items = this.items.slice(
				this.first_item,
				this.last_item
			);
		},
		get_page: function(page) {
			if (
				(page - 1) * this.items_per_page <=
				this.items.length - this.items_per_page * 5
			) {
				this.first_item = (page - 1) * this.items_per_page;
				this.last_item = this.first_item + this.items_per_page;
				this.numbers = [page, page + 1, page + 2, page + 3, page + 4];
				this.get_items();
			} else {
				this.first_item = (page - 1) * this.items_per_page;
				this.last_item = this.first_item + this.items_per_page;
				this.get_items();
			}
		},
		prev: function() {
			if (this.first_item - this.items_per_page >= 0) {
				this.first_item -= this.items_per_page;
				this.last_item -= this.items_per_page;
				this.get_items();
				this.numbers.unshift(this.numbers[0] - 1);
				this.numbers.pop();
			}
		},
		next: function() {
			if (this.last_item + this.items_per_page <= this.items.length) {
				this.first_item += this.items_per_page;
				this.last_item += this.items_per_page;
				this.get_items();
				this.numbers.push(this.numbers[this.numbers.length - 1] + 1);
				this.numbers.shift();
			}
		},
		first: function() {
			this.first_item = 0;
			this.last_item = 5;
			this.get_items();
			this.numbers = [1, 2, 3, 4, 5];
		},
		last: function() {
			this.first_item = this.items.length - this.items_per_page;
			this.last_item = this.items.length;
			this.get_items();
			this.numbers = [
				this.pages / this.items_per_page - 4,
				this.pages / this.items_per_page - 3,
				this.pages / this.items_per_page - 2,
				this.pages / this.items_per_page - 1,
				this.pages / this.items_per_page
			];
		}
	},
	mounted: function() {
		this.$nextTick(function() {
			axios
				.get('pdo.php')
				.then(response => (this.items = response.data))
				.then(() => {
					this.get_items();
					this.pages = this.items.length;
				});
		});
	}
});
new Vue({
	el: '#ww-app'
});
