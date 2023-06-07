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
                maxRows={5}
        />
    </div>
    <div class="send-container">
        <button on:click={post} class="send-btn" disabled="{value === ''}">
            {#if value !== ''}
                <img alt="send" src="/send-96.png"/>
            {/if}
            {#if value === ''}
                <img alt="send" src="/send-96-inactive.png"/>
            {/if}
        </button>
    </div>
</div>

<style>
    .component {
        display: flex;
        font-family: monospace;
        text-align: left;
    }

    .input-container {
        flex-grow: 1;
        max-width: 95%;
    }

    .send-container {
        display: block;
        margin-left: 8px;
        width: 48px;
        overflow-x: clip;
        position: relative;
    }

    .send-btn {
        position: absolute;
        bottom: 0;
        display: block;
        cursor: pointer;
        border: none;
        background: none;
        width: 48px;
        height: 48px;
        vertical-align: bottom;
        margin: 0;
        padding: 0;
        overflow: hidden;
    }

    .send-btn:disabled {
        cursor: default;
    }

    .send-btn img {
        height: 48px;
        width: auto;
        vertical-align: bottom;
    }
</style>
