<script>/** @type {string} */
    import Prompt from '../components/Prompt.svelte';
    import { Message, MessageType, ChatHistory } from "../models/";
    import { onMount, tick } from "svelte";

    let chatElement;
    let userInput = "";
    let chatHistory = new ChatHistory();

    async function handlePost(event) {
        chatHistory.add(new Message(event.detail.text, MessageType.HumanMessage));
        userInput = '';
        // Refresh history
        chatHistory = chatHistory;

        // Await UI update
        await tick();
        // Scroll to the very bottom of the chat
        chatElement.scrollTo(0, chatElement.scrollHeight);

        // Get response from AI
        await getAIResponse();
    }

    async function getAIResponse() {
        const response = await fetch('/chat', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(chatHistory.getHistory()),
        });
        const aiMessage = await response.json();

        chatHistory.add(new Message(aiMessage, MessageType.AIMessage));
        // Refresh history
        chatHistory = chatHistory;
        // Await UI update
        await tick();
        // Scroll to the very bottom of the chat
        chatElement.scrollTo(0, chatElement.scrollHeight);
    }

    async function resetHistory() {
        chatHistory.reset();
        // Refresh history
        chatHistory = chatHistory;
        // Await UI update
        await tick();

        // Get response from AI
        await getAIResponse();
    }

    onMount(async () => {
        if (chatHistory.isAITurn()) {
            await getAIResponse();
        }

        // Scroll to the very bottom of the chat
        chatElement.scrollTo(0, chatElement.scrollHeight);
    })
</script>

<div class="toolbar">
    <button on:click={resetHistory} class="reset-btn" disabled={chatHistory.isEmpty()}>
        {#if !chatHistory.isEmpty()}
            <img alt="reset" src="/reset-100.png"/>
        {/if}
        {#if chatHistory.isEmpty()}
            <img alt="reset" src="/reset-100-inactive.png"/>
        {/if}
    </button>
</div>

<div class="chat" bind:this={chatElement}>
    {#each chatHistory.getHistory() as message}
        <div class="message">
            <div class="actor">
                <div class="actor-name">
                    {#if message.type === MessageType.HumanMessage}
                        You:
                    {/if}
                    {#if message.type === MessageType.AIMessage}
                        Consultant:
                    {/if}
                </div>
            </div>
            <div class="text">
                {message.text}
            </div>
        </div>
    {/each}
    {#if chatHistory.isAITurn()}
        <div class="message">
            <div class="actor">
                <div class="actor-name">
                    Consultant:
                </div>
            </div>
            <div class="preloader">
                <!-- Free customized image from https://icons8.com/preloaders/en -->
                <img alt="..." src="/fontain-preloader.svg">
            </div>
        </div>
    {/if}
</div>

{#if chatHistory.isAITurn()}
    <div class="preloader">
        <!-- Free customized image from https://icons8.com/preloaders/en -->
        <img alt="..." src="/fontain-preloader.svg">
    </div>
{/if}

{#if chatHistory.isHumanTurn()}
    <Prompt bind:value={userInput}
            on:post={handlePost}
    />
{/if}

<style>
    .toolbar {
        text-align: right;
    }

    .reset-btn {
        cursor: pointer;
        border: none;
        background: none;
        margin-bottom: 6px;
        padding: 0;
    }

    .reset-btn:disabled {
        cursor: default;
    }

    .reset-btn, .reset-btn img {
        width: 25px;
        height: 25px;
    }

    .chat {
        border-color: #55595d;
        border-style: solid;
        height: 50%;
        max-height: 240px;
        padding: 2em;
        margin-bottom: 2em;
        overflow-y: scroll;
        scroll-behavior: smooth;
    }

    .message {
        display: flex;
        margin-bottom: 0.5em;
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

    .message .preloader {
        text-align: left;
    }
</style>
