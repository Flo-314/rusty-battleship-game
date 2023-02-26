import type { Board, Cell, Cordinates, Ship, ShipPart } from '$lib/types';
import { shipPartFactory, CellFactory } from './battleship';

export const generateCordinates = (cordinates: Cordinates, length: number): Cordinates[] => {
	const newCordinates: Cordinates[] = [];
	for (let i = 0; i < length; i++) {
		const newCordinate = { ...cordinates };
		newCordinate.x += i;
		newCordinates.push(newCordinate);
	}
	return newCordinates;
};

export const generateShipParts = (cordinates: Cordinates, length: number): ShipPart[] => {
	const Cordinates = generateCordinates(cordinates, length);

	return Cordinates.map((cordinates: Cordinates) => {
		return shipPartFactory(cordinates);
	});
};
export const getBoard = () => new Array(10).fill(new Array(10).fill(CellFactory()));
export const hitShip = (ship: Ship, cordinates: Cordinates, hitCordinates: Cordinates) => {
	const shipParts = ship.shipParts;
	const index = hitCordinates.x - cordinates.x;
	const shipPart = shipParts[index];

	shipPart.hit();
	return;
};
export const isShipSunk = (ship: Ship) => {
	let isSunk = true;
	ship.shipParts.forEach((shipPart) => {
		if (!shipPart.isSunk) {
			isSunk = false;
		}
	});
	return isSunk;
};
export const gameboardIsLoose = (board: Board) => {
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

export const gameboardreceiveAttack = (board: Board, cordinates: Cordinates) => {
	const targetSquare = board[cordinates.y - 1][cordinates.x - 1];
	targetSquare.hit = true;
	if (targetSquare.ship) {
		targetSquare.ship.hit(cordinates);
	}
	return;
};
export const gameboardputPiece = (board: Board, ship: Ship) => {
	const shipCordinates = ship.cordinates;
	shipCordinates.forEach((shipCordinate) => {
		const targetSquare = board[shipCordinate.y - 1][shipCordinate.x - 1];
		targetSquare.ship = ship;
	});

	return;
};
