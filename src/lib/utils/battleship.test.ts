/* eslint-disable @typescript-eslint/no-empty-function */
import { describe, it, expect, test } from 'vitest';
import { shipFactory, shipPartFactory } from './battleship';

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
});
