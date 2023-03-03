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
	const defaultShipPart = shipPartFactory({ x: 1, y: 2 });

	it('should be defined', () => {
		expect(shipPartFactory).toBeDefined();
	});

	it('should have all the prototype properties isSunk and hit()', () => {
		expect(defaultShipPart.isSunk).toBeDefined();
		expect(defaultShipPart.hit).toBeDefined();
		expect(defaultShipPart.cordinates).toBeDefined();
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
		expect(defaultShip.cordinates).toBeDefined();
		expect(defaultShip.shipParts).toBeDefined();
		expect(defaultShip.isSunk).toBeDefined();
	});
	test('if the cordinates are working correctly ', () => {
		expect(defaultShip.cordinates[0].x).toBe(1);
		expect(defaultShip.cordinates[1].x).toBe(2);
		expect(defaultShip.cordinates[2].x).toBe(3);

		expect(defaultShip.cordinates.length).toBe(defaultLength);

		const ship = shipFactory({ x: 4, y: 1 }, 4);
		expect(ship.cordinates[0].x).toBe(4);
		expect(ship.cordinates[1].x).toBe(5);
		expect(ship.cordinates[2].x).toBe(6);
		expect(ship.cordinates[3].x).toBe(7);

		const ship2 = shipFactory({ x: 3, y: 2 }, 2);
		expect(ship2.cordinates[0].x).toBe(3);
		expect(ship2.cordinates[1].x).toBe(4);
	});
	test('if the isvertical cordinates works ', () => {
		const defaultLength = 3;
		const defaultCordinates = { x: 1, y: 1 };
		const defaultShip = shipFactory(defaultCordinates, defaultLength, true);

		expect(defaultShip.cordinates[0].x).toBe(1);
		expect(defaultShip.cordinates[0].y).toBe(1);
		expect(defaultShip.cordinates[1].y).toBe(2);
		expect(defaultShip.cordinates[2].y).toBe(3);

		const ship = shipFactory({ x: 1, y: 4 }, 4, true);
		expect(ship.cordinates[0].y).toBe(4);

		expect(ship.cordinates[1].y).toBe(5);
		expect(ship.cordinates[2].y).toBe(6);
		expect(ship.cordinates[3].y).toBe(7);

		const ship2 = shipFactory({ x: 2, y: 3 }, 2, true);
		expect(ship2.cordinates[0].y).toBe(3);
		expect(ship2.cordinates[1].y).toBe(4);
	});
	test('if the shipParts are working correctly ', () => {
		expect(defaultShip.shipParts.length).toBe(defaultLength);
	});

	test('if the hit is working ', () => {
		defaultShip.hit({ x: 1, y: 1 });
		expect(defaultShip.shipParts[0].isSunk).toBe(true);
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
		expect(ship2.shipParts[1].isSunk).toBe(false);
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
		const ship = shipFactory(cordinates, 2);
		board.putPiece(ship, true);
		expect(board.board[0][0]).toEqual({ hit: false, ship });
	});

	// Test that attacks can be made on the board
	test('that receiveAttack works', () => {
		const board = gameboardFactory();
		const cordinates = { x: 1, y: 1 };
		const ship = shipFactory(cordinates, 2);
		board.putPiece(ship, true);
		expect(board.board[0][0]).toEqual({ hit: false, ship });
		board.receiveAttack({ x: 1, y: 1 });
		expect(board.board[0][0]).toEqual({ hit: true, ship });
	});

	// Test that the game can detect when all pieces are sunk
	test('that isLoose works', () => {
		const board = gameboardFactory();
		const cordinates = { x: 1, y: 1 };
		const ship = shipFactory(cordinates, 4);
		board.putPiece(ship, true);
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
