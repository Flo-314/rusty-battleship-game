<script lang="ts">
	import Board from '$lib/components/board.svelte';
	import type { Game, Board as BoardType } from '$lib/types';
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
	let gameStatus: 'selectName' | 'piecePlacement' | 'Battleship' = 'selectName';
	let game: null | Game = null;
	let shipIndex = 0;

	const startGame = (inputIntroduceName: string) => {
		game = gameFactory(inputIntroduceName, 'computer');
		gameStatus = 'piecePlacement';
	};
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
					if (game && gameStatus === 'piecePlacement') {
						const ships = [5, 4, 3, 2];
						const cordinates = e.detail.cordinates;
						const gameBoard = game.players[0].gameboard;
						const ship = shipFactory(cordinates, ships[shipIndex]);
						gameBoard.putPiece(ship, cordinates);
						shipIndex += 1;
						game.players[0].gameboard.board = game.players[0].gameboard.board;
						if (shipIndex === ships.length) {
							gameStatus = 'Battleship';
						}
					}
				}}
				isPlacing={gameStatus === 'piecePlacement'}
				board={game.players[0].gameboard.board}
			/>
			<Board
				isBattleship={gameStatus === 'Battleship'}
				isPlacing={false}
				board={game?.players[1].gameboard.board}
			/>
		</div>
	{/if}
</div>

<style>
	.flex {
		display: flex;
		gap: 30px;
		justify-content: center;
	}
</style>
