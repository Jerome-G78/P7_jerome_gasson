<template>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link>
  </div> -->
  <router-view/>
</template>

<style>
/* CUSTOM BOOTSTRAP START */
:root {
    --blue: #182643;
    --red: #d2515b;
    --white: #fff;
    --gray: #6c757d;
    --gray-dark: #343a40;
    --primary: #0e2042;
    --secondary: #6c757d;
    --success: #28a745;
    --info: #17a2b8;
    --warning: #ffc107;
    --danger: #dc3545;
    --light: #f8f9fa;
    --dark: #343a40;
    --font-family-sans-serif: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    --font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}

.btn-danger {
    color: #fff;
    background-color: #d2515b;
    border-color: #dc3545;
  }
  
  .btn-danger:hover {
    color: #fff;
    background-color: #d0989c;
    border-color: #bd2130;
  }
  
  .btn-danger:focus, .btn-danger.focus {
    box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.5);
  }
  
  .btn-danger.disabled, .btn-danger:disabled {
    color: #fff;
    background-color: #dc3545;
    border-color: #dc3545;
  }
  
  .btn-danger:not(:disabled):not(.disabled):active, .btn-danger:not(:disabled):not(.disabled).active,
  .show > .btn-danger.dropdown-toggle {
    color: #fff;
    background-color: #bd2130;
    border-color: #b21f2d;
  }
  
  .btn-danger:not(:disabled):not(.disabled):active:focus, .btn-danger:not(:disabled):not(.disabled).active:focus,
  .show > .btn-danger.dropdown-toggle:focus {
    box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.5);
  }

  .btn-primary {
    color: #fff;
    background-color: #0e2042;
    border-color: #0062cc;
  }
  
  .btn-primary:hover {
    color: #fff;
    background-color: #456dbc;
    border-color: #0062cc;
  }
  
  .btn-primary:focus, .btn-primary.focus {
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.5);
  }
  
  .btn-primary.disabled, .btn-primary:disabled {
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
  }
  
  .btn-primary:not(:disabled):not(.disabled):active, .btn-primary:not(:disabled):not(.disabled).active,
  .show > .btn-primary.dropdown-toggle {
    color: #fff;
    background-color: #0062cc;
    border-color: #005cbf;
  }
  
  .btn-primary:not(:disabled):not(.disabled):active:focus, .btn-primary:not(:disabled):not(.disabled).active:focus,
  .show > .btn-primary.dropdown-toggle:focus {
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.5);
  }

  .btn-success {
    color: #fff;
    background-color: #28a745;
    border-color: #28a745;
  }
  
  .btn-success:hover {
    color: #fff;
    background-color: #218838;
    border-color: #1e7e34;
  }
  
  .btn-success:focus, .btn-success.focus {
    box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.5);
  }
  
  .btn-success.disabled, .btn-success:disabled {
    color: #fff;
    background-color: #28a745;
    border-color: #28a745;
  }
  
  .btn-success:not(:disabled):not(.disabled):active, .btn-success:not(:disabled):not(.disabled).active,
  .show > .btn-success.dropdown-toggle {
    color: #fff;
    background-color: #1e7e34;
    border-color: #1c7430;
  }
  
  .btn-success:not(:disabled):not(.disabled):active:focus, .btn-success:not(:disabled):not(.disabled).active:focus,
  .show > .btn-success.dropdown-toggle:focus {
    box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.5);
  }

  .bg-info {
    background-color: #2c3653 !important;
  }
  
  a.bg-info:hover, a.bg-info:focus,
  button.bg-info:hover,
  button.bg-info:focus {
    background-color: #117a8b !important;
  }

  .text-primary {
    color: #0e2042 !important;
  }
  
  a.text-primary:hover, a.text-primary:focus {
    color: #0062cc !important;
  }



/* CUSTOM BOOTSTRAP END */

header
{
    position: -webkit-sticky;
    z-index: 1;
    position: sticky;
    top: 0em;
    text-align: center;
}

nav
{
    position: -webkit-sticky;
    z-index: 2;
    position: sticky;
    top: -0.5em;
}

footer
{
    position: -webkit-sticky;
    z-index: 1;
    position: sticky;
    top: -1em;
    text-align: center;
}

.Menu ul
{
    list-style-type: none;
}

.Menu a
{
    text-decoration: none;
}

#Mur
{
    background-image: url("assets/icon-left-font.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    border : 1px solid black;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
