<script lang="ts">
	import { onMount } from 'svelte';
  import Typed from 'typed.js';
	import User from './User.svelte';
	import { fade } from 'svelte/transition';

  let textbox: HTMLSpanElement;
  let hidden = true;
  let username = "";

  const sleep = async (ms: number) => new Promise(rv => setTimeout(rv,ms))

  export const say = (name: string, ...msg: string[]) => 
    new Promise<void>(async (resolve) => {
      username = name ?? "";
      hidden = false;
      await sleep(500);
      new Typed(textbox, {
        strings: msg,
        typeSpeed: 15,
        showCursor: false,
        onComplete: async (self) => {
         await sleep(1500)
         hidden = true;
         await sleep(500)
         self.destroy()
         resolve()
        },
      })
    })
  
</script>

{#if !hidden}
  <div transition:fade class="narration">
    <User name={username} />
    <span class="textbox" bind:this={textbox}></span>
  </div>
{/if}

<style>
 .narration {
  position: absolute;
  bottom: 70px;
  left: 0;
  right: 0;
  display: grid;
  grid-template-columns: 100px calc(100% - 100px);
  place-items: center;
  min-height: 100px;
  width: calc(100% - 10px);
  padding: 5px;
  background-color: #0005;
 } 
</style>