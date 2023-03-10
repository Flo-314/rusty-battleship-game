<script lang="ts">
	import type { Board, Cordinates } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	export let isComputer: boolean = false;
	export let board: Board;
	export let isPlacing: boolean;
	export let isBattleship: boolean;

	const placeShip = (cordinates: Cordinates) => {
		dispatch('placingShip', {
			cordinates
		});
	};

	const receiveAttack = (cordinates: Cordinates) => {
		dispatch('receivingAttack', {
			cordinates
		});
		console.log(board);
	};
</script>

<div class="grid">
	{#each board as yLine, i}
		{#each yLine as cell, j}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			{@const isSunk = cell?.ship?.isSunk()}

			<div
				on:click={() => {
					const cordinates = { x: j + 1, y: i + 1 };
					if (isPlacing) {
						placeShip(cordinates);
					}
					if (isBattleship) {
						receiveAttack(cordinates);
					}
				}}
				class="caja"
				class:sunked={isSunk}
				class:redColor={cell.hit && cell?.ship && !isSunk}
			>
				{!isComputer && cell.ship && cell.hit !== true ? 'O' : ''}
				{cell.hit ? 'X' : ''}
			</div>
		{/each}
	{/each}
</div>

<style>
	.caja {
		background-color: white;
		border: 1px solid black;
		padding: 40px;
		font-size: 20px;
		text-align: center;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(10, 1fr);
		grid-template-rows: repeat(10, 1fr);
		gap: 1px;
		background-color: black;
		padding: 5px;
		width: 45%;
	}
	.sunked {
		background-color: red;
	}
	.redColor {
		color: red;
	}
</style>
