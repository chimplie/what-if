<script>/** @type {string} */
    import { onMount } from "svelte";

    let message;
    let hasMessage = false;

    async function getMessage() {
        const response = await fetch('/greeting');
        message = await response.json();
        hasMessage = true;
    }

    onMount(async () => {
        await getMessage();
    })
</script>


<div class="chat">
    <div class="message">
        <div class="actor">
            <div class="actor-name">
                Consultant:
            </div>
        </div>
        {#if hasMessage}
            <div class="text">
                {message}
            </div>
        {/if}
        {#if !hasMessage}
            <div class="preloader">
                <img alt="..." src="/fontain-preloader.svg">
            </div>
        {/if}
    </div>
</div>

<style>
    .chat {
        border-color: #55595d;
        border-style: solid;
        height: 60%;
        padding: 2em;
    }

    .message {
        display: flex;
    }

    .message .actor {
        margin-right: 1em;
    }

    .message .actor .actor-name {
        vertical-align: center;
        display: block;
        border-color: #55595d;
        border-style: dashed;
        padding: 0.25em;
    }

    .message {
        font-family: monospace;
    }

    .preloader {
        text-align: center;
        flex-grow: 1;
    }
</style>
