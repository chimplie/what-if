<!-- Inspired by: https://svelte.dev/repl/40f4c7846e6f4052927ff5f9c5271b66?version=3.6.8 -->
<script>
    import { createEventDispatcher } from 'svelte';
    import ResizableTextArea from "./ResizableTextArea.svelte";

    export let value = '';

    const dispatch = createEventDispatcher();

    function post() {
        dispatch('post', {
            text: value
        });
    }
</script>

<div class="component">
    <div class="input-container">
        <ResizableTextArea
                bind:value={value}
                minRows={2}
                maxRows={10}
        />
    </div>
    <div class="send-container">
        <button
                title="Send message"
                class="send-btn"
                on:click={post}
                disabled="{value === ''}"
        >
        </button>
    </div>
</div>

<style>
    .component {
        font-family: monospace;
        text-align: left;
    }

    .input-container {
        display: inline-block;
        margin: 0 auto;
        width: 100%;
    }

    .send-container {
        display: inline-block;
        width: 100%;
        overflow-x: visible;
    }

    .send-btn {
        position: relative;
        bottom: 48px;
        right: -56px;
        float: right;
        cursor: pointer;
        border: none;
        width: 48px;
        height: 48px;
        vertical-align: bottom;
        margin: 0;
        padding: 0;
        overflow: hidden;
        background-color: unset;
        background-image: url("/send-96-rotated.png");
        background-size: 48px;
    }

    .send-btn:hover {
        background-image: url("/send-96.png");
    }

    .send-btn:disabled {
        cursor: default;
        background-image: url("/send-96-rotated-inactive.png");
    }
</style>
