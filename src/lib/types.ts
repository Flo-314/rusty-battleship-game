export type Board = Cell[][];

export interface Cell {
	hit: boolean;
	ship: Ship | null;
}

export interface Gameboard {
	receiveAttack(cordinates: Cordinates): void;
	putPiece(ship: Ship, horizontal: boolean): void;
	isLoose(): boolean;
	board: Board;
}
export interface Ship {
	shipParts: ShipPart[];
	hit(cordinates: Cordinates): void;
	isSunk(): boolean;
	cordinates: Cordinates[];
}
export interface ShipPart {
	hit(): void;
	isSunk: boolean;
	cordinates: Cordinates;
}

export interface Cordinates {
	x: number;
	y: number;
}
