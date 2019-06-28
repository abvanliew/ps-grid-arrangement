class Coords
{
	constructor( x, y )
	{
		this.x = x;
		this.y = y;
	}
	
	get x()
	{
		return this.x;
	}
	
	get y()
	{
		return this.y;
	}
}

class HexData
{
	constructor( offset, horizontalOrientation, oddOffset )
	{
		this.offset = offset;
		this.horizontalOrientation = horizontalOrientation;
		this.oddOffset = oddOffset;
	}
	
	offset( row, col )
	{
		var coords = new Coords( 0, 0 );
		
		if horizontalOrientation
		{
			if ( row % 2 == 1 and oddOffset ) or ( row % 2 == 0 and not oddOffset )
			{
				coords.x = this.offset
			}
		}
		else
		{
			if ( col % 2 == 1 and oddOffset ) or ( col % 2 == 0 and not oddOffset )
			{
				coords.y = this.offset
			}
		}
		
		return coords;
	}
}

class Grid
{
	constructor( x, y, width, height, hexData )
	{
		
	}
}