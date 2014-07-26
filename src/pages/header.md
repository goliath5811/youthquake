<div class="container">
    <div class="row">
        <p class="pull-left visible-xs">
            <button data-toggle="offcanvas" class="navbar-toggle" type="button">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
        </p>
        <div class="centeredtext">
            <a {{#is filename "index.html"}} href="#"{{else}}href="{{url}}"{{/is}}>
                <img id="logo" src="./images/logo.png"/>
            </a>
        </div>
    </div>
</div>