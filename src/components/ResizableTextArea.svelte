<!-- Inspired by: https://svelte.dev/repl/40f4c7846e6f4052927ff5f9c5271b66?version=3.6.8 -->
<script>
    /* eslint-disable svelte/no-at-html-tags */
    export let value = '';
    export let minRows = 1;
    export let maxRows;

    $: minHeight = `${1 + minRows * 1.2}em`;
    $: maxHeight = maxRows ? `${1 + maxRows * 1.2}em` : `auto`;
</script>

<div class="container">
	<div
            class="hidden-value"
            aria-hidden="true"
            style="min-height: {minHeight}; max-height: {maxHeight}"
    >
        <p>{@html (value).replace('\n', '<p/><p>')}</p>
    </div>

    <textarea bind:value></textarea>
</div>

<style>
    .container {
        position: relative;
    }

    .hidden-value p {
        font-family: inherit;
        line-height: 1.2em;
        overflow: clip;
        margin: 0;
        padding: 0;
    }

    .hidden-value, textarea {
        font-family: inherit;
        padding: 0.5em;
        box-sizing: border-box;
        border: 1.5px solid #eee;
        line-height: 1.2em;
        overflow: hidden;
    }

    textarea {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        resize: none;
        outline: none !important;
        color: #55595d;
        overflow-y: scroll;
    }

    textarea:focus {
        border-color: #55595d;
        outline: none !important;
    }
</style>
