import { describe, it, expect, test } from 'vitest';
import { shipFactory, shipPartFactory } from './battleship';

describe('shipBlock', () => {
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
	let defaultCordinates = { x: 1, y: 1 };
	const defaultShip = shipFactory({ cordinates: defaultCordinates });
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
	test('if the cordinates are working correctly cordinates', () => {});
	test('if the hit is working ', () => {});
	test('if the isSunk is working ', () => {});
});
