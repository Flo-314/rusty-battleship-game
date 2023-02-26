export interface Cordinates {
	x: number;
	y: number;
}

export interface Cell {
	hit: boolean;
	ship: Ship | null;
}

export type Board = Cell[][];
export interface ShipPart {
	hit(): void;
	isSunk: boolean;
	cordinates: Cordinates;
}

export interface Ship {
	shipParts: ShipPart[];
	hit(cordinates: Cordinates): void;
	isSunk(): boolean;
	cordinates: Cordinates[];
}

export interface Gameboard {
	receiveAttack(cordinates: Cordinates): void;
	putPiece(ship: Ship, horizontal: boolean): void;
	isLoose(): boolean;
	board: Board;
}
export interface Player {
	gameboard: Gameboard;
	name: string;
	isComputer: boolean;
	makeAMove(): Cordinates;
}
export interface Game {
	players: [Player, Player];
	isPlayerTurn: boolean;
}
