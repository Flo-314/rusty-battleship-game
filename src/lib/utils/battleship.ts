import type { Cordinates, ShipPart, Ship } from '$lib/types';

export const shipFactory = (
	cordinates: Cordinates,
	length: number /*isVertical: boolean */
): Ship => {
	let ship: Ship;
	const generateCordinates = (cordinates: Cordinates, length: number): Cordinates[] => {
		return [];
	};
	const generateShipParts = (cordinates: Cordinates, length: number): ShipPart[] => {
		return [];
	};
	const hit = () => {
		return;
	};
	const isSunk = (): boolean => {
		return true;
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
	const isSunk = false;
	// eslint-disable-next-line prefer-const
	let shipPart: ShipPart;
	const hit = () => {
		shipPart.isSunk = true;
	};
	shipPart = { cordinates, isSunk, hit };
	return shipPart;
};

export const gameboardFactory = () => {
	return {};
};
export const playerFactory = () => {
	return {};
};
