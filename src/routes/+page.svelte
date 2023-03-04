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

	const startGame = (inputIntroduceName: string) => {
		game = gameFactory(inputIntroduceName, 'computer');
		gameStatus = 'piecePlacement';
	};
	const placingShip = (cordinates: Cordinates) => {
		const ships = [5, 4, 3, 2];
		if (game && gameStatus === 'piecePlacement') {
			const gameBoard = game?.players[0].gameboard;
			const isPieceValid = gameBoard.putPiece(ships[shipIndex], isVertical, cordinates);
			if (isPieceValid) {
				shipIndex += 1;
				game.players[0].gameboard.board = game.players[0].gameboard.board;
				if (shipIndex === ships.length) {
					gameStatus = 'battleship';
					game?.players[1].gameboard.putAutomaticlyAllPieces();
				}
			}
		}
	};
	const onAttacking = (cordinates: Cordinates) => {
		if (game && gameStatus === 'battleship') {
			const gameBoard = game?.players[1].gameboard;
			const computer = game.players[1];
			const isUserAttackValid = gameBoard?.receiveAttack(cordinates);
			if (isUserAttackValid === true) {
				game.players[1].gameboard.board = game.players[1].gameboard.board;

				const playergameBoard = game?.players[0].gameboard;
				let isComputerMoveValid;
				if (computer.gameboard.isLoose() === true) {
					gameStatus = 'results';
					prompt('person wins');

					return;
				}
				do {
					isComputerMoveValid = playergameBoard.receiveAttack(computer.makeAMove());
				} while (isComputerMoveValid === false);

				if (gameBoard.isLoose() === true) {
					gameStatus = 'results';
					prompt('comptuer wins');
					return;
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
