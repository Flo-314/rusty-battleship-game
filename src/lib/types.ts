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
}

export interface Ship {
	shipParts: ShipPart[];
	hit(cordinates: Cordinates): void;
	isSunk(): boolean;
}

export interface Gameboard {
	receiveAttack(cordinates: Cordinates): boolean;
	putPiece(length: number, isVertical: boolean, cordinates: Cordinates): boolean;
	isLoose(): boolean;
	board: Board;
	putAutomaticlyAllPieces(): void;
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
	paused: boolean;
	switchPause(): void;
	switchPlayerTurn(): void;
}
