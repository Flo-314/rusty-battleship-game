import type { Cordinates, ShipPart, Ship } from '$lib/types';

export const shipFactory = (
	cordinates: Cordinates,
	length: number /*isVertical: boolean */
): Ship => {
	// eslint-disable-next-line prefer-const
	let ship: Ship;
	const generateCordinates = (cordinates: Cordinates, length: number): Cordinates[] => {
		const newCordinates: Cordinates[] = [];
		for (let i = 0; i < length; i++) {
			const newCordinate = { ...cordinates };
			newCordinate.x += i;
			newCordinates.push(newCordinate);
		}
		return newCordinates;
	};
	const generateShipParts = (cordinates: Cordinates, length: number): ShipPart[] => {
		const Cordinates = generateCordinates(cordinates, length);

		return Cordinates.map((cordinates: Cordinates) => {
			return shipPartFactory(cordinates);
		});
	};
	const hit = (hitCordinates: Cordinates) => {
		const shipParts = ship.shipParts;
		const index = hitCordinates.x - cordinates.x;
		const shipPart = shipParts[index];

		shipPart.hit();
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
