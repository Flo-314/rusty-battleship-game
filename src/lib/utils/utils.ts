import type { Board, Cell, Cordinates, Ship, ShipPart } from '$lib/types';
import { shipPartFactory, CellFactory, shipFactory } from './battleship';

export const generateCordinates = (
	cordinates: Cordinates,
	length: number,
	isVertical: boolean,
	board: Board
): Cordinates[] | null => {
	const newCordinates: Cordinates[] = [];
	let isValid = true;
	for (let i = 0; i < length; i++) {
		const newCordinate = { ...cordinates };
		if (!isVertical) {
			newCordinate.x += i;
		} else {
			newCordinate.y += i;
		}
		const areValidCordinates = areCordinatesValid(newCordinate, board);
		if (areValidCordinates) {
			newCordinates.push(newCordinate);
		} else {
			isValid = false;
			break;
		}
	}
	if (isValid) {
		return newCordinates;
	} else {
		return null;
	}
};

export const generateShipParts = (length: number): ShipPart[] => {
	const shipParts = new Array(length).fill(null).map(() => shipPartFactory());
	return shipParts;
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
export const gameboardputPiece = (
	board: Board,
	length: number,
	isVertical: boolean,
	cordinates: Cordinates
): boolean => {
	const Cordinates = generateCordinates(cordinates, length, isVertical, board);
	const ship = shipFactory(cordinates, length);
	if (Cordinates) {
		Cordinates.forEach((cordinate) => {
			const targetSquare = board[cordinate.y - 1][cordinate.x - 1];
			targetSquare.ship = ship;
		});
	} else {
		return false;
	}
	return true;
};

export const areCordinatesValid = (cordinates: Cordinates, board: Board): boolean => {
	const yBoardLines = board[cordinates.y - 1];
	if (yBoardLines) {
		const targetCell = yBoardLines[cordinates.x - 1];
		console.log(targetCell?.ship === null, targetCell !== undefined, targetCell);
		if (targetCell !== undefined && targetCell.ship === null) {
			return true;
		}
	}
	return false;
};
