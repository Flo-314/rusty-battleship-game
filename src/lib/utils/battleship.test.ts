/* eslint-disable @typescript-eslint/no-empty-function */
import type { Player } from '$lib/types';
import { describe, it, expect, test } from 'vitest';
import {
	gameboardFactory,
	gameFactory,
	playerFactory,
	shipFactory,
	shipPartFactory
} from './battleship';

describe('Ship Parts', () => {
	const defaultShipPart = shipPartFactory();

	it('should be defined', () => {
		expect(shipPartFactory).toBeDefined();
	});

	it('should have all the prototype properties isSunk and hit()', () => {
		expect(defaultShipPart.isSunk).toBeDefined();
		expect(defaultShipPart.hit).toBeDefined();
	});

	it('test that the hit function works properly', () => {
		defaultShipPart.hit();
		expect(defaultShipPart.isSunk).toBe(true);
	});
});

describe('Ship', () => {
	const defaultLength = 3;
	const defaultCordinates = { x: 1, y: 1 };
	const defaultShip = shipFactory(defaultCordinates, defaultLength);
	it('should be  defined', () => {
		expect(defaultShip).toBeDefined();
	});
	it('should have all the prototypes', () => {
		expect(defaultShip).toBeDefined();
		expect(defaultShip.hit).toBeDefined();
		expect(defaultShip).toBeDefined();
		expect(defaultShip.shipParts).toBeDefined();
		expect(defaultShip.isSunk).toBeDefined();
	});

	test('if the shipParts are working correctly ', () => {
		expect(defaultShip.shipParts.length).toBe(defaultLength);
	});

	test('if the hit is working ', () => {
		defaultShip.hit({ x: 1, y: 1 });
		/* expect(defaultShip.shipParts[0].isSunk).toBe(true);
		defaultShip.hit({ x: 3, y: 1 });
		expect(defaultShip.shipParts[2].isSunk).toBe(true);

		const ship = shipFactory({ x: 4, y: 1 }, 4);
		ship.hit({ x: 4, y: 1 });
		ship.hit({ x: 5, y: 1 });
		ship.hit({ x: 7, y: 1 });

		expect(ship.shipParts[0].isSunk).toBe(true);
		expect(ship.shipParts[1].isSunk).toBe(true);
		expect(ship.shipParts[3].isSunk).toBe(true);

		const ship2 = shipFactory({ x: 3, y: 2 }, 2);

		expect(ship2.shipParts[0].isSunk).toBe(false);
		expect(ship2.shipParts[1].isSunk).toBe(false); */
	});

	test('if the is sunk is working ', () => {
		defaultShip.hit({ x: 1, y: 1 });
		defaultShip.hit({ x: 2, y: 1 });
		defaultShip.hit({ x: 3, y: 1 });
		expect(defaultShip.isSunk()).toBe(true);

		const ship = shipFactory({ x: 4, y: 1 }, 1);
		expect(ship.isSunk()).toBe(false);

		const ship2 = shipFactory({ x: 6, y: 1 }, 3);
		ship2.hit({ x: 7, y: 1 });
		ship2.hit({ x: 8, y: 1 });
		expect(ship.isSunk()).toBe(false);

		const ship3 = shipFactory({ x: 6, y: 1 }, 3);
		ship3.hit({ x: 6, y: 1 });
		ship3.hit({ x: 8, y: 1 });
		expect(ship3.isSunk()).toBe(false);
	});
});
describe('GameBoard', () => {
	// Test that the class is defined
	it('should be defined', () => {
		const board = gameboardFactory();

		expect(board).toBeDefined();
	});

	// Test that all the parts are defined
	it('should have all the parts defined', () => {
		const board = gameboardFactory();
		expect(board.receiveAttack).toBeDefined();
		expect(board.putPiece).toBeDefined();
		expect(board.isLoose).toBeDefined();
		expect(board.board).toBeDefined();
	});

	// Test that the board is initialized correctly
	test('that the board is initialized correctly', () => {
		const board = gameboardFactory();
		expect(board.board.length).toBe(10);
		expect(board.board[0].length).toBe(10);
		expect(board.board[0][0]).toEqual({ hit: false, ship: null });
	});

	// Test that pieces can be placed on the board
	test('that put piece works', () => {
		const board = gameboardFactory();
		const cordinates = { x: 1, y: 1 };
		board.putPiece(2, false, cordinates);
		expect(board.board[0][0].ship).toBeDefined();
		expect(board.board[1][0].ship).toBe(null);
	});

	// Test that attacks can be made on the board
	test('that receiveAttack works', () => {
		const board = gameboardFactory();
		const cordinates = { x: 1, y: 1 };
		board.putPiece(2, false, cordinates);
		expect(board.board[0][0].hit).toBe(false);
		board.receiveAttack({ x: 1, y: 1 });
		expect(board.board[0][0].hit).toBe(true);
	});

	// Test that the game can detect when all pieces are sunk
	test('that isLoose works', () => {
		const board = gameboardFactory();
		const cordinates = { x: 1, y: 1 };
		board.putPiece(4, false, cordinates);
		board.receiveAttack({ x: 1, y: 1 });
		expect(board.isLoose()).toBe(false);
		board.receiveAttack({ x: 2, y: 1 });
		board.receiveAttack({ x: 3, y: 1 });
		board.receiveAttack({ x: 4, y: 1 });
		expect(board.isLoose()).toBe(true);
	});
});

describe('playerFactory', () => {
	it('should create a human player', () => {
		const name = 'Bob';
		const isComputer = false;

		const player: Player = playerFactory(name, isComputer);

		expect(player.name).toBe(name);
		expect(player.isComputer).toBe(isComputer);
		expect(typeof player.makeAMove).toBe('function');
		expect(player.gameboard).toBeDefined();
	});

	it('should create a computer player ', () => {
		const name = 'Alice';
		const isComputer = true;

		const player: Player = playerFactory(name, isComputer);

		expect(player.name).toBe(name);
		expect(player.isComputer).toBe(isComputer);
		expect(typeof player.makeAMove).toBe('function');
		expect(player.gameboard).toBeDefined();
	});

	it('should create a computer player ', () => {
		const name = 'Alice';
		const isComputer = true;

		const player: Player = playerFactory(name, isComputer);

		const result = player.makeAMove();

		expect(result).toHaveProperty('x');
		expect(result).toHaveProperty('y');
		expect(typeof result.x).toBe('number');
		expect(typeof result.y).toBe('number');
	});
});

describe('gameFactory', () => {
	const game = gameFactory('Player 1', 'Player 2');

	it('should create a game object', () => {
		expect(game).toBeDefined();
		expect(game.players[0]).toBeDefined();
		expect(game.players[1]).toBeDefined();
		expect(game.isPlayerTurn).toBe(true);
		expect(game.paused).toBe(false);
	});

	it('should switch pause status when switchPause is called', () => {
		game.switchPause();
		expect(game.paused).toBe(true);
		game.switchPause();
		expect(game.paused).toBe(false);
	});

	it('should switch player turn when switchPlayerTurn is called', () => {
		game.switchPlayerTurn();
		expect(game.isPlayerTurn).toBe(false);
		game.switchPlayerTurn();
		expect(game.isPlayerTurn).toBe(true);
	});
});
