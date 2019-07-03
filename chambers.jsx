var active = app.activeDocument;
var data = loadChamberData();
var pathChar = '/';

var hexPosistions = [
	[ { "x": 0, "y": 0 }, { "x": 0, "y": 0 } ],
	[ { "x": 0, "y": 0 }, { "x": 0, "y": 0 }, { "x": 0, "y": 0 } ],
	[ { "x": 0, "y": 0 }, { "x": 0, "y": 0 } ]
];

var icons = 
{
	"BlockIcon": findArtLayerByPath( "Top/Icons/Block" ),
	"BlockHex": findArtLayerByPath( "Bottom/Hexs/Blue" ),
	"SwingIcon": findArtLayerByPath( "Top/Icons/Swing" )
};

for( i = 0; i < data.length; i++)
{
  createChamber();
}

//Find a layer by passing in an array of names
function findArtLayerByPath( layerPath ) { return findLayerByPath( layerPath, "ART" ); }
function findLayerSetByPath( layerPath ) { return findLayerByPath( layerPath, "SET" ); }
function findLayerByPath( layerPath, bottomLayerType )
{
  var currentLayer = active;
  var path = layerPath.split( pathChar );
  
  if( path.length > 0 )
  {
    for( i = 0; i < path.length; i++ )
	{
      if( i == path.length - 1 && bottomLayerType === "ART" )
      {
        currentLayer = currentLayer.artLayers.getByName( path[i] );
      }
      else
      {
        currentLayer = currentLayer.layerSets.getByName( path[i] );
      }
	}
  }
  
  return currentLayer;
}

function createChamber()
{
	
	flattenedHex = createHex();
	
	mirrorHex( flattenedHex );
	
	placeChamberIndicator();
}

function createHex( icons )
{
	var hexLayers = [];
	var hexRow = [];
	var hex;
	
	for( row = 0; row < hexPosistions.length; row++ )
	{
		hexRow = [];
		for( column = 0; column < hexPosistions[row].length; column++ )
		{
			hex = duplicateLayer();
		}
		hexLayers.push( hexRow );
	}
}

function duplicateLayer( targetLayer, newLayerName )
{
	return targetLayer.duplicate();
}

function MoveLayerTo( fLayer, fX, fY) {

  var Position = fLayer.bounds;
  Position[0] = fX - Position[0];
  Position[1] = fY - Position[1];

  fLayer.translate( -Position[0], -Position[1] );
}

function mirrorHex( flattenedHex )
{
	
}

function placeChamberIndicator()
{
	
}





function createStance( footingLayberName, stepLayerName, tempo ) 
{
  var tempoNames = [];

  for( t = 1; t <= tempo; t++ )
  {
    tempoNames.push( "Tempo " + t.toString() );
  }

  layerSetVisiblity( "Stance Drawings", footingLayberName, true );
  layerVisiblity( "Stance front", "Icons", stepLayerName, true );
  mutliLayerVisibilty( "Stance front", "Icons", tempoNames, true );
  saveDocHighQualityJpg( "/Users/fireball4/Desktop/stances/" + footingLayberName + "_" + stepLayerName + "Tempo" + tempo.toString() );
  layerSetVisiblity( "Stance Drawings", footingLayberName, false );
  layerVisiblity( "Stance front", "Icons", stepLayerName, false );
  mutliLayerVisibilty( "Stance front", "Icons", tempoNames, false );
}

function mutliLayerVisibilty( parentLayerName, subParentLayerName, layberNames, visible )
{
  var parentLayerSet = active.layerSets.getByName( parentLayerName );
  var subParentLayerSet = parentLayerSet.layerSets.getByName( subParentLayerName );

  if( visible )
  {
    parentLayerSet.visible = true;
    subParentLayerSet.visible = true;
  }

  var targetLayerSet;

  for( j = 0; j < layberNames.length; j++ )
  {
    targetLayerSet = subParentLayerSet.artLayers.getByName( layberNames[j] );

    targetLayerSet.visible = visible;
  }


}

function layerSetVisiblity( parentLayerName, layberName, visible )
{
  var parentLayerSet = active.layerSets.getByName( parentLayerName );
  var targetLayerSet = parentLayerSet.layerSets.getByName( layberName );
  if( visible )
  {
    parentLayerSet.visible = true;
  }
  targetLayerSet.visible = visible;
}

function layerVisiblity( parentLayerName, subParentLayerName, layberName, visible )
{
  var parentLayerSet = active.layerSets.getByName( parentLayerName );
  var subParentLayerSet = parentLayerSet.layerSets.getByName( subParentLayerName );
  var targetLayerSet = subParentLayerSet.artLayers.getByName( layberName );

  if( visible )
  {
    parentLayerSet.visible = true;
    subParentLayerSet.visible = true;
  }

  targetLayerSet.visible = visible;
}

function saveDocHighQualityJpg( filePath )
{
  var saveName = new File( filePath );
  var saveOptions = new JPEGSaveOptions();
  saveOptions.embedColorProfile = true;
  saveOptions.formatOptions = FormatOptions.OPTIMIZEDBASELINE;
  saveOptions.matte = MatteType.NONE;
  saveOptions.quality = 12;

  active.saveAs(saveName, saveOptions, true, Extension.LOWERCASE);
}

function loadStanceData()
{
  return [
    { "Footing": "Step_Right", "Step": "Right", "Tempo": 3 },
    { "Footing": "Step_Right", "Step": "Left", "Tempo": 1 },
    { "Footing": "Step_Right", "Step": "More Damage", "Tempo": 2 },
    { "Footing": "Step_Right", "Step": "Less Damage", "Tempo": 2 },
    { "Footing": "Step_Left", "Step": "Right", "Tempo": 1 },
    { "Footing": "Step_Left", "Step": "Left", "Tempo": 3 },
    { "Footing": "Step_Left", "Step": "More Damage", "Tempo": 2 },
    { "Footing": "Step_Left", "Step": "Less Damage", "Tempo": 2 },
    { "Footing": "Defensive", "Step": "Right", "Tempo": 2 },
    { "Footing": "Defensive", "Step": "Left", "Tempo": 2 },
    { "Footing": "Defensive", "Step": "More Damage", "Tempo": 1 },
    { "Footing": "Defensive", "Step": "Less Damage", "Tempo": 3 },
    { "Footing": "Agressive", "Step": "Right", "Tempo": 2 },
    { "Footing": "Agressive", "Step": "Left", "Tempo": 2 },
    { "Footing": "Agressive", "Step": "More Damage", "Tempo": 3 },
    { "Footing": "Agressive", "Step": "Less Damage", "Tempo": 1 }
  ];
};