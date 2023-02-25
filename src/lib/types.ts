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
