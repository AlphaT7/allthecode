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
        <div class="container footer">

        </div>
    `
});
new Vue({
	el: '#root'
});
