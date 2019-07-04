var active = app.activeDocument;
var data = loadChamberData();
var pathChar = '/';

var slashIndex = 0;
var parryIndex = 0;
var thrustIndex = 0;

var chamberIndex = 0;
var blockIndex = 0;

var hexDeltas = [
  [ { "x": -.098, "y": -.18 }, { "x": .11, "y": -.18 } ],
  [ { "x": -.2, "y": 0 }, { "x": 0, "y": 0 }, { "x": .21, "y": 0 } ],
  [ { "x": -.098, "y": .183 }, { "x": .11, "y": .183 } ]
];

var icons = 
{
  "ThrustDamageIcon": [
    findLayerSetByPath( "Top/Damage/Thrust 1" ),
    findLayerSetByPath( "Top/Damage/Thrust 2" ),
    findLayerSetByPath( "Top/Damage/Thrust 3" )
  ],
  "SlashDamageIcon": [
    findLayerSetByPath( "Top/Damage/Slash 1" ),
    findLayerSetByPath( "Top/Damage/Slash 2" ),
    findLayerSetByPath( "Top/Damage/Slash 3" )
  ],
  "ParryDamageIcon": [
    findLayerSetByPath( "Top/Damage/Parry 1" ),
    findLayerSetByPath( "Top/Damage/Parry 2" ),
    findLayerSetByPath( "Top/Damage/Parry 3" )
  ],
  "ThrustIcon": findArtLayerByPath( "Top/Top Icons/Thrust" ),
  "SlashIcon": findArtLayerByPath( "Top/Top Icons/Slash" ),
  "ParryIcon": findArtLayerByPath( "Top/Top Icons/Parry" ),
  "BlockIcon": findArtLayerByPath( "Top/Top Icons/Block" ),
  "ThurstBackground": findArtLayerByPath( "Top/Bottom Colors/Green" ),
  "SlashBackground": findArtLayerByPath( "Top/Bottom Colors/Orange" ),
  "ParryBackground": findArtLayerByPath( "Top/Bottom Colors/Purple" ),
  "BlockBackground": findArtLayerByPath( "Top/Bottom Colors/Blue" ),
  "BlankBackground": findArtLayerByPath( "Top/Bottom Colors/Gray" ),
  "BlankBackground": findArtLayerByPath( "Top/Bottom Colors/Gray" ),
  "ChamberIcons": {
    1: {
      "Art": findLayerSetByPath( "Chambers/Up_Right" ),
      "VisibleChamber": findArtLayerByPath( "Top/Enemy Hex/Splash Top Right" ),
      "BlockBrushStroke": [ 
        findLayerSetByPath( "Top/Mid Lines/1-5c" ),
        findLayerSetByPath( "Top/Mid Lines/1-7" ),
        findLayerSetByPath( "Top/Mid Lines/1-9c" )
      ]
    },
    3: {
      "Art": findLayerSetByPath( "Chambers/Center_Right" ),
      "VisibleChamber": findArtLayerByPath( "Top/Enemy Hex/Splash Right" ),
      "BlockBrushStroke": [ 
        findLayerSetByPath( "Top/Mid Lines/3-7c" ),
        findLayerSetByPath( "Top/Mid Lines/3-9" ),
        findLayerSetByPath( "Top/Mid Lines/3-11c" )
      ]
    },
    5: {
      "Art": findLayerSetByPath( "Chambers/Low_Right" ),
      "VisibleChamber": findArtLayerByPath( "Top/Enemy Hex/Splash Bottom Right" ),
      "BlockBrushStroke": [ 
        findLayerSetByPath( "Top/Mid Lines/5-9c" ),
        findLayerSetByPath( "Top/Mid Lines/5-11" ),
        findLayerSetByPath( "Top/Mid Lines/5-1c" )
      ]
    },
    7: {
      "Art": findLayerSetByPath( "Chambers/Low_Left" ),
      "VisibleChamber": findArtLayerByPath( "Top/Enemy Hex/Splash Bottom Left" ),
      "BlockBrushStroke": [ 
        findLayerSetByPath( "Top/Mid Lines/7-11c" ),
        findLayerSetByPath( "Top/Mid Lines/7-1" ),
        findLayerSetByPath( "Top/Mid Lines/7-3c" )
      ]
    },
    9: {
      "Art": findLayerSetByPath( "Chambers/Center_Left" ),
      "VisibleChamber": findArtLayerByPath( "Top/Enemy Hex/Splash Left" ),
      "BlockBrushStroke": [ 
        findLayerSetByPath( "Top/Mid Lines/9-1c" ),
        findLayerSetByPath( "Top/Mid Lines/9-3" ),
        findLayerSetByPath( "Top/Mid Lines/9-5c" )
      ]
    },
    11: {
      "Art": findLayerSetByPath( "Chambers/Up_Left" ),
      "VisibleChamber": findArtLayerByPath( "Top/Enemy Hex/Splash Top Left" ),
      "BlockBrushStroke": [ 
        findLayerSetByPath( "Top/Mid Lines/11-3c" ),
        findLayerSetByPath( "Top/Mid Lines/11-5" ),
        findLayerSetByPath( "Top/Mid Lines/11-7c" )
      ]
    }
  }
};

//alert( data.length );

for( x = 0; x < data.length; x++)
{
  createChamber( data[x], x + 1 );
}

//Find a layer by passing in an array of names
function findArtLayerByPath( layerPath ) { return findLayerByPath( layerPath, "ART" ); }
function findLayerSetByPath( layerPath ) { return findLayerByPath( layerPath, "SET" ); }
function findLayerByPath( layerPath, bottomLayerType )
{
  var currentLayer = active;
  var path = layerPath.split( pathChar );
  
  //alert( path );

  if( path.length > 0 )
  {
    for( i = 0; i < path.length; i++ )
	{
      //alert( "Path Depth: " + i.toString() + " = " + path[i] );
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

function createChamber( chamberCard, cardNumber )
{
  slashIndex = chamberCard.SlashDamage - 1;
  parryIndex = chamberCard.ParryDamage - 1;
  thrustIndex = chamberCard.ThrustDamage - 1;

  chamberIndex = chamberCard.ChamberPosistion;
  blockIndex = chamberCard.BlockDirection;

  icons.SlashDamageIcon[slashIndex].visible = true;
  icons.ParryDamageIcon[parryIndex].visible = true;
  icons.ThrustDamageIcon[thrustIndex].visible = true;

  icons.ChamberIcons[ chamberIndex ].Art.visible = true;
  icons.ChamberIcons[ chamberIndex ].VisibleChamber.visible = true;
  icons.ChamberIcons[ chamberIndex ].BlockBrushStroke[ blockIndex ].visible = true;

  createHex( chamberCard.ChamberHex, cardNumber );

  icons.SlashDamageIcon[slashIndex].visible = false;
  icons.ParryDamageIcon[parryIndex].visible = false;
  icons.ThrustDamageIcon[thrustIndex].visible = false;

  icons.ChamberIcons[ chamberIndex ].Art.visible = false;
  icons.ChamberIcons[ chamberIndex ].VisibleChamber.visible = false;
  icons.ChamberIcons[ chamberIndex ].BlockBrushStroke[ blockIndex ].visible = false;
  
}

function prepLayer( parentLayer, row, column )
{
  var newLayer = parentLayer.duplicate();
  newLayer.visible = true;
  newLayer.translate( hexDeltas[row][column].x, hexDeltas[row][column].y );

  return newLayer;
}

function createHex( chamberTypes, cardNumber )
{
  var hexLayers = [];
  var hexRow = [];
  var hex = {};

  for( row = 0; row < hexDeltas.length; row++ )
  {
    hexRow = [];
    for( column = 0; column < hexDeltas[row].length; column++ )
    {
      if( chamberTypes[row][column] === "SLASH" )
      {
        hex = {
          "Icon": prepLayer( icons.SlashIcon, row, column ),
          "Background": prepLayer( icons.SlashBackground, row, column )
        };
      }
      else if( chamberTypes[row][column] === "THRUST" )
      {
        hex = {
          "Icon": prepLayer( icons.ThrustIcon, row, column ),
          "Background": prepLayer( icons.ThurstBackground, row, column )
        };
      }
      else if( chamberTypes[row][column] === "PARRY" )
      {
        hex = {
          "Icon": prepLayer( icons.ParryIcon, row, column ),
          "Background": prepLayer( icons.ParryBackground, row, column )
        };
      }
      else if( chamberTypes[row][column] === "BLOCK" )
      {
        hex = {
          "Icon": prepLayer( icons.BlockIcon, row, column ),
          "Background": prepLayer( icons.BlockBackground, row, column )
        };
      }
      else
      {
        hex = {
          "Icon": null,
          "Background": prepLayer( icons.BlankBackground, row, column )
        };
      }
      hexRow.push( hex );
    }
    hexLayers.push( hexRow );
  }

  var newHexLayerSet = app.activeDocument.layerSets.add();
  newHexLayerSet.name = "New Hex";
  var basementLayer = findLayerSetByPath( "Top/Basement" ).duplicate().merge();
  var backgroundsLayer = findLayerSetByPath( "Top/Bottom Colors" ).duplicate().merge();
  var linesLayer = findLayerSetByPath( "Top/Mid Lines" ).duplicate().merge();
  var iconsLayer = findLayerSetByPath( "Top/Top Icons" ).duplicate().merge();

  basementLayer.move( newHexLayerSet, ElementPlacement.INSIDE );
  backgroundsLayer.move( newHexLayerSet, ElementPlacement.INSIDE );
  backgroundsLayer.blendMode = BlendMode.MULTIPLY;
  linesLayer.move( newHexLayerSet, ElementPlacement.INSIDE );
  iconsLayer.move( newHexLayerSet, ElementPlacement.INSIDE );

  var flattenedHex = newHexLayerSet.merge();

  flattenedHex.translate( 1.373, 0 );
  flattenedHex.resize( null, -100, AnchorPosition.MIDDLECENTER );

  saveDocHighQualityJpg( "/Users/fireball4/Desktop/chambers/chamber-" + cardNumber.toString() );

  flattenedHex.remove();

  for( row = 0; row < hexLayers.length; row++ )
  {
    for( column = 0; column < hexLayers[row].length; column++ )
    {
      if( hexLayers[row][column].Icon !== null ) { hexLayers[row][column].Icon.remove(); }
      if( hexLayers[row][column].Background !== null ) { hexLayers[row][column].Background.remove(); }
    }
  }
}

function saveDocHighQualityJpg( filePath )
{
  var saveName = new File( filePath );
  var saveOptions = new JPEGSaveOptions();
  saveOptions.embedColorProfile = true;
  saveOptions.formatOptions = FormatOptions.OPTIMIZEDBASELINE;
  saveOptions.matte = MatteType.NONE;
  saveOptions.quality = 12;

  active.saveAs( saveName, saveOptions, true, Extension.LOWERCASE );
}

function loadChamberData()
{
  return [
    { 
      "ChamberPosistion": 9,  //1 o'clock, 3 o'clock, etc
      "BlockDirection": 1, //0: CLOCKWISE, 1: STRAIGHT, 2: COUNTER
      "SlashDamage": 3,
      "ThrustDamage": 2,
      "ParryDamage": 1,
      "ChamberHex": [
        [ "SLASH", null ],
        [ "SLASH", "THRUST", "BLOCK" ],
        [ "PARRY", "PARRY" ]
      ]
    },
    { 
      "ChamberPosistion": 3,
      "BlockDirection": 0, //0: CLOCKWISE, 1: STRAIGHT, 2: COUNTER
      "SlashDamage": 2,
      "ThrustDamage": 3,
      "ParryDamage": 2,
      "ChamberHex": [
        [ "PARRY", "PARRY" ],
        [ null, "SLASH", "SLASH" ],
        [ "BLOCK", "THRUST" ]
      ]
    }
  ];
};



















