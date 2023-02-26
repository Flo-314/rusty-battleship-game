import type { Cordinates, Ship, ShipPart } from '$lib/types';
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
