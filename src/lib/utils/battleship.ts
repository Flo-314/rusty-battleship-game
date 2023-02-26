import type { Cordinates, ShipPart, Ship, Gameboard, Board, Cell } from '$lib/types';
import {
	generateCordinates as GenerateCordinates,
	generateShipParts as GenerateShipParts,
	hitShip,
	isShipSunk
} from './utils';

export const shipFactory = (
	cordinates: Cordinates,
	length: number /*isVertical: boolean */
): Ship => {
	// eslint-disable-next-line prefer-const
	let ship: Ship;
	const generateCordinates = GenerateCordinates;
	const generateShipParts = GenerateShipParts;
	const hit = (hitCordinates: Cordinates): void => {
		hitShip(ship, cordinates, hitCordinates);
	};
	const isSunk = (): boolean => {
		return isShipSunk(ship);
	};

	const shipCordinates = generateCordinates(cordinates, length);
	const shipParts = generateShipParts(cordinates, length);
	// eslint-disable-next-line prefer-const
	ship = {
		cordinates: shipCordinates,
		hit,
		isSunk,
		shipParts
	};
	return ship;
};
export const shipPartFactory = (cordinates: Cordinates): ShipPart => {
	// eslint-disable-next-line prefer-const
	let shipPart: ShipPart;

	const isSunk = false;

	const hit = () => {
		shipPart.isSunk = true;
	};
	shipPart = { cordinates, isSunk, hit };
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
	const putPiece = (ship: Ship): void => {
		const shipCordinates = ship.cordinates;
		shipCordinates.forEach((shipCordinate) => {
			const targetSquare = board[shipCordinate.y - 1][shipCordinate.x - 1];
			targetSquare.ship = ship;
		});

		return;
	};
	const receiveAttack = (cordinates: Cordinates) => {
		const targetSquare = board[cordinates.y - 1][cordinates.x - 1];
		targetSquare.hit = true;
		if (targetSquare.ship) {
			targetSquare.ship.hit(cordinates);
		}
		return;
	};
	const isLoose = (): boolean => {
		let status = true;
		for (let i = 0; i < board.length; i++) {
			for (let j = 0; j < board[i].length; j++) {
				const cell: Cell = board[i][j];
				if (cell.ship && cell.hit === false) {
					status = false;
				}
			}
		}

		return status;
	};

	const gameBoard: Gameboard = { board, putPiece, isLoose, receiveAttack };

	return gameBoard;
};
export const playerFactory = () => {
	return {};
};
