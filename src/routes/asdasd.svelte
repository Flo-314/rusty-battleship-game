<script lang="ts">
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

	const game = gameFactory('player1', 'compu');
	console.log(game);
	let gameboard1 = game.players[0].gameboard;
	let board1 = game.players[0].gameboard.board;

	gameboard1.putPiece(shipFactory({ x: 1, y: 2 }, 3), true);

	let gameboard2 = game.players[1].gameboard;
	let board2 = game.players[1].gameboard.board;

	gameboard2.putPiece(shipFactory({ x: 3, y: 2 }, 3), true);
	console.log(board2);

	gameboard1.receiveAttack({ x: 1, y: 2 });
	gameboard1.receiveAttack({ x: 3, y: 2 });

	gameboard2.receiveAttack({ x: 3, y: 2 });
	gameboard2.receiveAttack({ x: 5, y: 2 });
</script>

<div class="flex">
	<div class="grid">
		{#each board1 as yLine}
			{#each yLine as cell}
				<div class="caja" class:shipGood={cell.ship}>
					{cell.hit ? 'x' : ''}
				</div>
			{/each}
		{/each}
	</div>

	<div class="grid">
		{#each board2 as yLine}
			{#each yLine as cell}
				<div class="caja" class:shipBad={cell.ship}>{cell.hit ? 'x' : ''}</div>
			{/each}
		{/each}
	</div>
</div>

<style>
	.flex {
		display: flex;
		gap: 30px;
		justify-content: center;
	}
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
	.shipGood {
		border-color: blue;
		background-color: blue;
		color: black;
		font-size: 30px;
	}
	.shipBad {
		border-color: red;
		background-color: red;
		color: black;
		font-size: 30px;
	}
</style>
