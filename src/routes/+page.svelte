<script lang="ts">
	import Board from '$lib/components/board.svelte';
	import type { Game, Board as BoardType, Cordinates } from '$lib/types';
	import { gameFactory, shipFactory } from '$lib/utils/battleship';

	/* 
		BOTON JUGAR.
			INTRODUCIR NOMBRE EN INPUT. BOTON INTRODUCIR.
				TE DA PARA PONER PIEZAS. *1
					UNA VEZ PUESTAS LAS PIEZAS COMIENZA EL JUEGO Y TENES QUE CLICKEAR EL OTRO CAMPO.
					(cada vez que se clickea tiene que checkear si alguien gano)
						RESPUESTA AUTOMATICA DE LA MAQUINA. SI NO ES VALIDO EL MOVIMIENTO VOLVER A HACER UNO NUEVO. *2
							CUANDO ALGUIEN GANA PROMPT DE QUIEN GANO, Y UN RESTART O SALIR.



						*1(PLUS: CLICK DERECHO ROTA LA DIRECION,PLUS+: PODES ELEGIR CUAL QUERES VOS PLUS+++: DRAG AN DROP)
						*2(PLUS: QUE EVALUE ANTES SI ES VALIDO EL MOVIMIENTO. PLUS++ QUE SEA UNA IA QUE EVALUE EL MEJOR MOVIMIENTO)
						*3(BOTON SALIR O REINICIAR)
	*/

	//juego
	let inputIntroduceName = '';
	let gameStatus: 'selectName' | 'piecePlacement' | 'battleship' | 'results' = 'piecePlacement';
	let game: null | Game = null;
	let shipIndex: number = 0;
	let isVertical: boolean = false;
	const ships = [5, 4, 3, 2];

	const startGame = (inputIntroduceName: string) => {
		game = gameFactory(inputIntroduceName, 'computer');
		gameStatus = 'piecePlacement';
	};
	const placingShip = (cordinates: Cordinates) => {
		if (game) {
			const isPieceValid = game.placeShip(
				cordinates,
				isVertical,
				ships[shipIndex],
				shipIndex === ships.length - 1
			);
			if (isPieceValid) {
				game.players[0].gameboard.board = game?.players[0].gameboard.board;
				shipIndex += 1;
				if (shipIndex === 4) {
					gameStatus = 'battleship';
				}
			}
		}
	};
	const onAttacking = (cordinates: Cordinates) => {
		if (game) {
			const isUserAttackValid = game.attack(cordinates);
			if (isUserAttackValid === true) {
				game.players[1].gameboard.board = game.players[1].gameboard.board;
				if (typeof isUserAttackValid === 'string') {
					prompt(isUserAttackValid);
				}
			}
		}
	};

	startGame('asd');
</script>

<div>
	{#if gameStatus === 'selectName'}
		<input type="text" placeholder="introduce name" bind:value={inputIntroduceName} />
		<button
			on:click={() => {
				startGame(inputIntroduceName);
			}}>play</button
		>
	{:else if game?.players[0]}
		<div class="flex">
			<Board
				isBattleship={false}
				on:placingShip={(e) => {
					const cordinates = e.detail.cordinates;
					placingShip(cordinates);
				}}
				isPlacing={gameStatus === 'piecePlacement'}
				board={game.players[0].gameboard.board}
			/>
			<Board
				on:receivingAttack={(e) => {
					const cordinates = e.detail.cordinates;
					onAttacking(cordinates);
				}}
				isBattleship={gameStatus === 'battleship'}
				isPlacing={false}
				board={game?.players[1].gameboard.board}
				isComputer={true}
			/>
		</div>
	{/if}

	{#if gameStatus === 'piecePlacement'}
		<button
			on:click={() => {
				isVertical = !isVertical;
			}}>put pieces {isVertical ? 'vertically' : 'horizontal'}</button
		>
	{/if}
</div>

<style>
	.flex {
		display: flex;
		gap: 30px;
		justify-content: center;
	}
</style>
