<script>/** @type {string} */
    import Prompt from '../components/Prompt.svelte';
    import { Message, MessageType, ChatHistory } from "../models/";
    import { onMount, tick } from "svelte";

    let chatElement;
    let userInput = "";
    let chatHistory = new ChatHistory();

    onMount(async () => {
        if (chatHistory.isAITurn()) {
            await receiveAIResponse();
        }

        // Scroll to the very bottom of the chat
        chatElement.scrollTo(0, chatElement.scrollHeight);
    })

    async function handleMessagePost(event) {
        chatHistory.addMessage(new Message(event.detail.text, MessageType.HumanMessage));
        userInput = '';
        // Refresh history
        chatHistory = chatHistory;

        // Await UI update
        await tick();
        // Scroll to the very bottom of the chat
        chatElement.scrollTo(0, chatElement.scrollHeight);

        // Get response from AI
        await receiveAIResponse();
    }

    async function receiveAIResponse() {
        const response = await fetch('/chat', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                messages: chatHistory.getMessages(),
                metadata: chatHistory.getMetadata(),
            }),
        });

        const data = await response.json();
        const aiMessage = data['message'];
        const metadata = data['metadata'];

        chatHistory.addMessage(new Message(aiMessage, MessageType.AIMessage));
        chatHistory.setMetadata(metadata);
        // Refresh history
        chatHistory = chatHistory;
        // Await UI update
        await tick();
        // Scroll to the very bottom of the chat
        chatElement.scrollTo(0, chatElement.scrollHeight);
    }

    async function resetState() {
        chatHistory.reset();
        // Refresh history
        chatHistory = chatHistory;
        // Await UI update
        await tick();

        // Get response from AI
        await receiveAIResponse();
    }
</script>

<div class="toolbar">
    <button on:click={resetState} class="reset-btn" disabled={chatHistory.isEmpty()}>
        {#if !chatHistory.isEmpty()}
            <img alt="reset" src="/reset-100.png"/>
        {/if}
        {#if chatHistory.isEmpty()}
            <img alt="reset" src="/reset-100-inactive.png"/>
        {/if}
    </button>
</div>

<div class="chat" bind:this={chatElement}>
    {#each chatHistory.getMessages() as message}
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
            on:post={handleMessagePost}
    />
{/if}

<style>
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
