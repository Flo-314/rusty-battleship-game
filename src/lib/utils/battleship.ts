import type { Cordinates, ShipPart, Ship, Gameboard, Board, Cell, Player, Game } from '$lib/types';
import {
	gameboardIsLoose,
	gameboardPutAutomaticlyAllPieces,
	gameboardputPiece,
	gameboardreceiveAttack,
	generateShipParts,
	hitShip,
	isShipSunk
} from './utils';

export const shipFactory = (cordinates: Cordinates, length: number): Ship => {
	// eslint-disable-next-line prefer-const
	let ship: Ship;

	const hit = (hitCordinates: Cordinates): void => {
		hitShip(ship, cordinates, hitCordinates);
	};
	const isSunk = (): boolean => {
		return isShipSunk(ship);
	};

	const shipParts = generateShipParts(length);
	// eslint-disable-next-line prefer-const

	ship = {
		hit,
		isSunk,
		shipParts
	};
	return ship;
};
export const shipPartFactory = (): ShipPart => {
	// eslint-disable-next-line prefer-const
	let shipPart: ShipPart;

	const isSunk = false;

	const hit = () => {
		shipPart.isSunk = true;
	};
	shipPart = { isSunk, hit };
	return shipPart;
};

export const CellFactory = (): Cell => {
	return { hit: false, ship: null };
};
export const boardFactory = (): Board => {
	const board = new Array(10).fill(null).map(() => new Array(10).fill(null).map(CellFactory));
	return board;
};
export const gameboardFactory = (): Gameboard => {
	const board = boardFactory();
	const putPiece = (length: number, horizontal: boolean, cordinates: Cordinates): boolean => {
		return gameboardputPiece(board, length, horizontal, cordinates);
	};
	const isLoose = (): boolean => {
		return gameboardIsLoose(board);
	};
	const receiveAttack = (cordinates: Cordinates) => {
		return gameboardreceiveAttack(board, cordinates);
	};
	const putAutomaticlyAllPieces = () => {
		return gameboardPutAutomaticlyAllPieces(putPiece);
	};
	const gameBoard: Gameboard = { board, putPiece, isLoose, receiveAttack, putAutomaticlyAllPieces };

	return gameBoard;
};
export const playerFactory = (name: string, isComputer: boolean): Player => {
	const gameboard = gameboardFactory();
	const makeAMove = () => {
		return { x: Math.floor(Math.random() * 10) + 1, y: Math.floor(Math.random() * 10) + 1 };
	};

	const player = { name, isComputer, makeAMove, gameboard };
	return player;
};

export const gameFactory = (player1Name: string, player2Name: string): Game => {
	// eslint-disable-next-line prefer-const
	let game: Game;
	const switchPlayerTurn = () => {
		game.isPlayerTurn = !game.isPlayerTurn;
	};

	const player1 = playerFactory(player1Name, false);
	const player2 = playerFactory(player2Name, true);
	const startGame = () => {
		return;
	};
	const placeShip = () => {
		return;
	};
	const attack = () => {
		return;
	};
	game = {
		attack,
		startGame,
		placeShip,
		players: [player1, player2],
		isPlayerTurn: true,
		paused: false
	};
	return game;
};
