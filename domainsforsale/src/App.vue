<template>
  <div id="app">
    <div id="container">
        <div id="nav">
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/domainsforsale">Domains for Sale</router-link>
        </div>
        <router-view/>
    </div>
  </div>
</template>

<style>
html,
body {
	width: 100%;
	height: 100%;
	padding: 0;
	margin: 0;
}
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	width: 100%;
	height: 100%;
	background-image: url('assets/wave.jpg');
}
#container {
	background: rgba(0, 0, 0, 0.75);
	max-width: 1000px;
	width: 100%;
	margin: 0 auto;
}
#nav {
	background: rgba(255, 255, 255, 0.75);
	width: 150px;
	height: 100%;
}

#nav a {
	font-weight: bold;
	color: #2c3e50;
	display: block;
}

#nav a.router-link-exact-active {
	color: #42b983;
}
</style>
