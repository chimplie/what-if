<header>
    <div class="logo-container">
        <a href="https://chimplie.com" class="logo">
            <img alt="Chimplie" src="/logo.png" class="logo"/>
        </a>
    </div>
    <h1>What if?</h1>
    <p class="announcement">Let's imagine how your company will look like in the era of
        <a href="https://en.wikipedia.org/wiki/Large_language_model">large language models</a>.</p>
</header>

<div class="page-container">
<!--    <span class="spacing"></span>-->
    <div class="page-contents">
        <slot/>
    </div>
<!--    <span class="spacing"></span>-->
</div>

<style>
    :global(body) {
        font-family: "Quattrocento","Arial","Helvetica",sans-serif;
        color: #55595d;
    }

    :global(a) {
        color: #F36759FF;
    }

    header {
        margin-left: 5em;
        margin-right: 5em;
    }

    .logo-container {
        vertical-align: middle;
        display: inline-block;
        margin-top: 20px;
        margin-right: 20px;
    }

    .logo {
        width: 160px;
        height: auto;
    }

    h1 {
        font-size: xxx-large;
        margin-top: 0;

        text-align: center;
        white-space: nowrap;
    }

    .announcement {
        text-align: center;
    }

    .page-container {
        /*display: flex;*/
        justify-content: center;
    }

    .page-contents {
        margin: 0 auto;
        max-width: 70%;
        min-width: 400px;
    }
</style>
