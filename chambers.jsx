var active = app.activeDocument;
var data = loadChamberData();
var pathChar = '/';

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
      ],
	  "VerticalOffset": [ 0, 0, 0 ]
    },
    3: {
      "Art": findLayerSetByPath( "Chambers/Center_Right" ),
      "VisibleChamber": findArtLayerByPath( "Top/Enemy Hex/Splash Right" ),
      "BlockBrushStroke": [ 
        findLayerSetByPath( "Top/Mid Lines/3-7c" ),
        findLayerSetByPath( "Top/Mid Lines/3-9" ),
        findLayerSetByPath( "Top/Mid Lines/3-11c" )
      ],
	  "VerticalOffset": [ 0, 0, 0 ]
    },
    5: {
      "Art": findLayerSetByPath( "Chambers/Low_Right" ),
      "VisibleChamber": findArtLayerByPath( "Top/Enemy Hex/Splash Bottom Right" ),
      "BlockBrushStroke": [ 
        findLayerSetByPath( "Top/Mid Lines/5-9c" ),
        findLayerSetByPath( "Top/Mid Lines/5-11" ),
        findLayerSetByPath( "Top/Mid Lines/5-1c" )
      ],
	  "VerticalOffset": [ 0, 0, 0 ]
    },
    7: {
      "Art": findLayerSetByPath( "Chambers/Low_Left" ),
      "VisibleChamber": findArtLayerByPath( "Top/Enemy Hex/Splash Bottom Left" ),
      "BlockBrushStroke": [ 
        findLayerSetByPath( "Top/Mid Lines/7-11c" ),
        findLayerSetByPath( "Top/Mid Lines/7-1" ),
        findLayerSetByPath( "Top/Mid Lines/7-3c" )
      ],
	  "VerticalOffset": [ 0, 0, 0 ]
    },
    9: {
      "Art": findLayerSetByPath( "Chambers/Center_Left" ),
      "VisibleChamber": findArtLayerByPath( "Top/Enemy Hex/Splash Left" ),
      "BlockBrushStroke": [ 
        findLayerSetByPath( "Top/Mid Lines/9-1c" ),
        findLayerSetByPath( "Top/Mid Lines/9-3" ),
        findLayerSetByPath( "Top/Mid Lines/9-5c" )
      ],
	  "VerticalOffset": [ 0, 0, 0 ]
    },
    11: {
      "Art": findLayerSetByPath( "Chambers/Up_Left" ),
      "VisibleChamber": findArtLayerByPath( "Top/Enemy Hex/Splash Top Left" ),
      "BlockBrushStroke": [ 
        findLayerSetByPath( "Top/Mid Lines/11-3c" ),
        findLayerSetByPath( "Top/Mid Lines/11-5" ),
        findLayerSetByPath( "Top/Mid Lines/11-7c" )
      ],
	  "VerticalOffset": [ 0, -.12, 0 ]
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
  var slashIndex = chamberCard.SlashDamage - 1;
  var parryIndex = chamberCard.ParryDamage - 1;
  var thrustIndex = chamberCard.ThrustDamage - 1;

  var chamberIndex = chamberCard.ChamberPosistion;
  var blockIndex = chamberCard.BlockDirection;

  icons.SlashDamageIcon[slashIndex].visible = true;
  icons.ParryDamageIcon[parryIndex].visible = true;
  icons.ThrustDamageIcon[thrustIndex].visible = true;

  icons.ChamberIcons[ chamberIndex ].Art.visible = true;
  icons.ChamberIcons[ chamberIndex ].VisibleChamber.visible = true;
  icons.ChamberIcons[ chamberIndex ].BlockBrushStroke[ blockIndex ].visible = true;

  createHex( chamberCard.ChamberHex, cardNumber, icons.ChamberIcons[ chamberIndex ].VerticalOffset[ blockIndex ] );

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

function createHex( chamberTypes, cardNumber, verticalOffset )
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

  flattenedHex.translate( 1.373, verticalOffset );
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
    { // card # 1
      "ChamberPosistion": 9, 
      "BlockDirection": 1, 
      "SlashDamage": 3, 
      "ParryDamage": 1, 
      "ThrustDamage": 2, 
      "ChamberHex": [ 
        [ "SLASH", null ], 
        [ "SLASH", "THRUST", "BLOCK" ], 
        [ "PARRY", "PARRY" ] 
      ] 
    },
    { // card # 2
      "ChamberPosistion": 9, 
      "BlockDirection": 1, 
      "SlashDamage": 3, 
      "ParryDamage": 1, 
      "ThrustDamage": 1, 
      "ChamberHex": [ 
        [ "PARRY", "PARRY" ], 
        [ "SLASH", "BLOCK", "THRUST" ], 
        [ "SLASH", null ] 
      ] 
    },
    { // card # 3
      "ChamberPosistion": 9, 
      "BlockDirection": 1, 
      "SlashDamage": 2, 
      "ParryDamage": 2, 
      "ThrustDamage": 1, 
      "ChamberHex": [ 
        [ "PARRY", "THRUST" ], 
        [ "PARRY", "BLOCK", "BLOCK" ], 
        [ "SLASH", "SLASH" ] 
      ] 
    },
    { // card # 4
      "ChamberPosistion": 9, 
      "BlockDirection": 1, 
      "SlashDamage": 2, 
      "ParryDamage": 2, 
      "ThrustDamage": 1, 
      "ChamberHex": [ 
        [ "SLASH", "SLASH" ], 
        [ "PARRY", "BLOCK", "BLOCK" ], 
        [ "PARRY", "THRUST" ] 
      ] 
    },
    { // card # 5
      "ChamberPosistion": 9, 
      "BlockDirection": 0, 
      "SlashDamage": 3, 
      "ParryDamage": 1, 
      "ThrustDamage": 2, 
      "ChamberHex": [ 
        [ "THRUST", "BLOCK" ], 
        [ "SLASH", "SLASH", null ], 
        [ "PARRY", "PARRY" ] 
      ] 
    },
    { // card # 6
      "ChamberPosistion": 9, 
      "BlockDirection": 2, 
      "SlashDamage": 2, 
      "ParryDamage": 2, 
      "ThrustDamage": 2, 
      "ChamberHex": [ 
        [ "SLASH", "SLASH" ], 
        [ "PARRY", "PARRY", null ], 
        [ "THRUST", "BLOCK" ] 
      ] 
    },
    { // card # 7
      "ChamberPosistion": 9, 
      "BlockDirection": 0, 
      "SlashDamage": 2, 
      "ParryDamage": 1, 
      "ThrustDamage": 3, 
      "ChamberHex": [ 
        [ "BLOCK", "BLOCK" ], 
        [ "THRUST", "PARRY", "PARRY" ], 
        [ "SLASH", "SLASH" ] 
      ] 
    },
    { // card # 8
      "ChamberPosistion": 9, 
      "BlockDirection": 2, 
      "SlashDamage": 2, 
      "ParryDamage": 1, 
      "ThrustDamage": 3, 
      "ChamberHex": [ 
        [ "PARRY", "PARRY" ], 
        [ "THRUST", "SLASH", "SLASH" ], 
        [ "BLOCK", "BLOCK" ] 
      ] 
    },
    { // card # 9
      "ChamberPosistion": 11, 
      "BlockDirection": 1, 
      "SlashDamage": 3, 
      "ParryDamage": 1, 
      "ThrustDamage": 2, 
      "ChamberHex": [ 
        [ "SLASH", "SLASH" ], 
        [ "PARRY", "THRUST", null ], 
        [ "PARRY", "BLOCK" ] 
      ] 
    },
    { // card # 10
      "ChamberPosistion": 11, 
      "BlockDirection": 1, 
      "SlashDamage": 3, 
      "ParryDamage": 1, 
      "ThrustDamage": 1, 
      "ChamberHex": [ 
        [ "SLASH", "PARRY" ], 
        [ "SLASH", "BLOCK", "PARRY" ], 
        [ null, "THRUST" ] 
      ] 
    },
    { // card # 11
      "ChamberPosistion": 11, 
      "BlockDirection": 1, 
      "SlashDamage": 2, 
      "ParryDamage": 2, 
      "ThrustDamage": 1, 
      "ChamberHex": [ 
        [ "PARRY", "PARRY" ], 
        [ "SLASH", "BLOCK", "THRUST" ], 
        [ "SLASH", "BLOCK" ] 
      ] 
    },
    { // card # 12
      "ChamberPosistion": 11, 
      "BlockDirection": 1, 
      "SlashDamage": 2, 
      "ParryDamage": 2, 
      "ThrustDamage": 1, 
      "ChamberHex": [ 
        [ "PARRY", "SLASH" ], 
        [ "PARRY", "BLOCK", "SLASH" ], 
        [ "THRUST", "BLOCK" ] 
      ] 
    },
    { // card # 13
      "ChamberPosistion": 11, 
      "BlockDirection": 0, 
      "SlashDamage": 3, 
      "ParryDamage": 1, 
      "ThrustDamage": 2, 
      "ChamberHex": [ 
        [ "SLASH", "THRUST" ], 
        [ "PARRY", "SLASH", "BLOCK" ], 
        [ "PARRY", null ] 
      ] 
    },
    { // card # 14
      "ChamberPosistion": 11, 
      "BlockDirection": 2, 
      "SlashDamage": 2, 
      "ParryDamage": 2, 
      "ThrustDamage": 2, 
      "ChamberHex": [ 
        [ "PARRY", "SLASH" ], 
        [ "THRUST", "PARRY", "SLASH" ], 
        [ "BLOCK", null ] 
      ] 
    },
    { // card # 15
      "ChamberPosistion": 11, 
      "BlockDirection": 0, 
      "SlashDamage": 2, 
      "ParryDamage": 1, 
      "ThrustDamage": 3, 
      "ChamberHex": [ 
        [ "THRUST", "BLOCK" ], 
        [ "SLASH", "PARRY", "BLOCK" ], 
        [ "SLASH", "PARRY" ] 
      ] 
    },
    { // card # 16
      "ChamberPosistion": 11, 
      "BlockDirection": 2, 
      "SlashDamage": 2, 
      "ParryDamage": 1, 
      "ThrustDamage": 3, 
      "ChamberHex": [ 
        [ "THRUST", "PARRY" ], 
        [ "BLOCK", "SLASH", "PARRY" ], 
        [ "BLOCK", "SLASH" ] 
      ] 
    },
    { // card # 17
      "ChamberPosistion": 1, 
      "BlockDirection": 1, 
      "SlashDamage": 3, 
      "ParryDamage": 1, 
      "ThrustDamage": 2, 
      "ChamberHex": [ 
        [ "PARRY", "SLASH" ], 
        [ "PARRY", "THRUST", "SLASH" ], 
        [ "BLOCK", null ] 
      ] 
    },
    { // card # 18
      "ChamberPosistion": 1, 
      "BlockDirection": 1, 
      "SlashDamage": 3, 
      "ParryDamage": 1, 
      "ThrustDamage": 1, 
      "ChamberHex": [ 
        [ "SLASH", "SLASH" ], 
        [ null, "BLOCK", "PARRY" ], 
        [ "THRUST", "PARRY" ] 
      ] 
    },
    { // card # 19
      "ChamberPosistion": 1, 
      "BlockDirection": 1, 
      "SlashDamage": 2, 
      "ParryDamage": 2, 
      "ThrustDamage": 1, 
      "ChamberHex": [ 
        [ "SLASH", "PARRY" ], 
        [ "SLASH", "BLOCK", "PARRY" ], 
        [ "BLOCK", "THRUST" ] 
      ] 
    },
    { // card # 20
      "ChamberPosistion": 1, 
      "BlockDirection": 1, 
      "SlashDamage": 2, 
      "ParryDamage": 2, 
      "ThrustDamage": 1, 
      "ChamberHex": [ 
        [ "PARRY", "PARRY" ], 
        [ "THRUST", "BLOCK", "SLASH" ], 
        [ "BLOCK", "SLASH" ] 
      ] 
    },
    { // card # 21
      "ChamberPosistion": 1, 
      "BlockDirection": 0, 
      "SlashDamage": 3, 
      "ParryDamage": 1, 
      "ThrustDamage": 2, 
      "ChamberHex": [ 
        [ "PARRY", "SLASH" ], 
        [ "PARRY", "SLASH", "THRUST" ], 
        [ null, "BLOCK" ] 
      ] 
    },
    { // card # 22
      "ChamberPosistion": 1, 
      "BlockDirection": 2, 
      "SlashDamage": 2, 
      "ParryDamage": 2, 
      "ThrustDamage": 2, 
      "ChamberHex": [ 
        [ "THRUST", "PARRY" ], 
        [ "BLOCK", "PARRY", "SLASH" ], 
        [ null, "SLASH" ] 
      ] 
    },
    { // card # 23
      "ChamberPosistion": 1, 
      "BlockDirection": 0, 
      "SlashDamage": 2, 
      "ParryDamage": 1, 
      "ThrustDamage": 3, 
      "ChamberHex": [ 
        [ "SLASH", "THRUST" ], 
        [ "SLASH", "PARRY", "BLOCK" ], 
        [ "PARRY", "BLOCK" ] 
      ] 
    },
    { // card # 24
      "ChamberPosistion": 1, 
      "BlockDirection": 2, 
      "SlashDamage": 2, 
      "ParryDamage": 1, 
      "ThrustDamage": 3, 
      "ChamberHex": [ 
        [ "BLOCK", "THRUST" ], 
        [ "BLOCK", "SLASH", "PARRY" ], 
        [ "SLASH", "PARRY" ] 
      ] 
    },
    { // card # 25
      "ChamberPosistion": 3, 
      "BlockDirection": 1, 
      "SlashDamage": 3, 
      "ParryDamage": 1, 
      "ThrustDamage": 2, 
      "ChamberHex": [ 
        [ "PARRY", "PARRY" ], 
        [ "BLOCK", "THRUST", "SLASH" ], 
        [ null, "SLASH" ] 
      ] 
    },
    { // card # 26
      "ChamberPosistion": 3, 
      "BlockDirection": 1, 
      "SlashDamage": 3, 
      "ParryDamage": 1, 
      "ThrustDamage": 1, 
      "ChamberHex": [ 
        [ null, "SLASH" ], 
        [ "THRUST", "BLOCK", "SLASH" ], 
        [ "PARRY", "PARRY" ] 
      ] 
    },
    { // card # 27
      "ChamberPosistion": 3, 
      "BlockDirection": 1, 
      "SlashDamage": 2, 
      "ParryDamage": 2, 
      "ThrustDamage": 1, 
      "ChamberHex": [ 
        [ "SLASH", "SLASH" ], 
        [ "BLOCK", "BLOCK", "PARRY" ], 
        [ "THRUST", "PARRY" ] 
      ] 
    },
    { // card # 28
      "ChamberPosistion": 3, 
      "BlockDirection": 1, 
      "SlashDamage": 2, 
      "ParryDamage": 2, 
      "ThrustDamage": 1, 
      "ChamberHex": [ 
        [ "THRUST", "PARRY" ], 
        [ "BLOCK", "BLOCK", "PARRY" ], 
        [ "SLASH", "SLASH" ] 
      ] 
    },
    { // card # 29
      "ChamberPosistion": 3, 
      "BlockDirection": 0, 
      "SlashDamage": 3, 
      "ParryDamage": 1, 
      "ThrustDamage": 2, 
      "ChamberHex": [ 
        [ "PARRY", "PARRY" ], 
        [ null, "SLASH", "SLASH" ], 
        [ "BLOCK", "THRUST" ] 
      ] 
    },
    { // card # 30
      "ChamberPosistion": 3, 
      "BlockDirection": 2, 
      "SlashDamage": 2, 
      "ParryDamage": 2, 
      "ThrustDamage": 2, 
      "ChamberHex": [ 
        [ "BLOCK", "THRUST" ], 
        [ null, "PARRY", "PARRY" ], 
        [ "SLASH", "SLASH" ] 
      ] 
    },
    { // card # 31
      "ChamberPosistion": 3, 
      "BlockDirection": 0, 
      "SlashDamage": 2, 
      "ParryDamage": 1, 
      "ThrustDamage": 3, 
      "ChamberHex": [ 
        [ "SLASH", "SLASH" ], 
        [ "PARRY", "PARRY", "THRUST" ], 
        [ "BLOCK", "BLOCK" ] 
      ] 
    },
    { // card # 32
      "ChamberPosistion": 3, 
      "BlockDirection": 2, 
      "SlashDamage": 2, 
      "ParryDamage": 1, 
      "ThrustDamage": 3, 
      "ChamberHex": [ 
        [ "BLOCK", "BLOCK" ], 
        [ "SLASH", "SLASH", "THRUST" ], 
        [ "PARRY", "PARRY" ] 
      ] 
    },
    { // card # 33
      "ChamberPosistion": 5, 
      "BlockDirection": 1, 
      "SlashDamage": 3, 
      "ParryDamage": 1, 
      "ThrustDamage": 2, 
      "ChamberHex": [ 
        [ "BLOCK", "PARRY" ], 
        [ null, "THRUST", "PARRY" ], 
        [ "SLASH", "SLASH" ] 
      ] 
    },
    { // card # 34
      "ChamberPosistion": 5, 
      "BlockDirection": 1, 
      "SlashDamage": 3, 
      "ParryDamage": 1, 
      "ThrustDamage": 1, 
      "ChamberHex": [ 
        [ "THRUST", null ], 
        [ "PARRY", "BLOCK", "SLASH" ], 
        [ "PARRY", "SLASH" ] 
      ] 
    },
    { // card # 35
      "ChamberPosistion": 5, 
      "BlockDirection": 1, 
      "SlashDamage": 2, 
      "ParryDamage": 2, 
      "ThrustDamage": 1, 
      "ChamberHex": [ 
        [ "BLOCK", "SLASH" ], 
        [ "THRUST", "BLOCK", "SLASH" ], 
        [ "PARRY", "PARRY" ] 
      ] 
    },
    { // card # 36
      "ChamberPosistion": 5, 
      "BlockDirection": 1, 
      "SlashDamage": 2, 
      "ParryDamage": 2, 
      "ThrustDamage": 1, 
      "ChamberHex": [ 
        [ "BLOCK", "THRUST" ], 
        [ "SLASH", "BLOCK", "PARRY" ], 
        [ "SLASH", "PARRY" ] 
      ] 
    },
    { // card # 37
      "ChamberPosistion": 5, 
      "BlockDirection": 0, 
      "SlashDamage": 3, 
      "ParryDamage": 1, 
      "ThrustDamage": 2, 
      "ChamberHex": [ 
        [ null, "PARRY" ], 
        [ "BLOCK", "SLASH", "PARRY" ], 
        [ "THRUST", "SLASH" ] 
      ] 
    },
    { // card # 38
      "ChamberPosistion": 5, 
      "BlockDirection": 2, 
      "SlashDamage": 2, 
      "ParryDamage": 2, 
      "ThrustDamage": 2, 
      "ChamberHex": [ 
        [ null, "BLOCK" ], 
        [ "SLASH", "PARRY", "THRUST" ], 
        [ "SLASH", "PARRY" ] 
      ] 
    },
    { // card # 39
      "ChamberPosistion": 5, 
      "BlockDirection": 0, 
      "SlashDamage": 2, 
      "ParryDamage": 1, 
      "ThrustDamage": 3, 
      "ChamberHex": [ 
        [ "PARRY", "SLASH" ], 
        [ "BLOCK", "PARRY", "SLASH" ], 
        [ "BLOCK", "THRUST" ] 
      ] 
    },
    { // card # 40
      "ChamberPosistion": 5, 
      "BlockDirection": 2, 
      "SlashDamage": 2, 
      "ParryDamage": 1, 
      "ThrustDamage": 3, 
      "ChamberHex": [ 
        [ "SLASH", "BLOCK" ], 
        [ "PARRY", "SLASH", "BLOCK" ], 
        [ "PARRY", "THRUST" ] 
      ] 
    },
    { // card # 41
      "ChamberPosistion": 7, 
      "BlockDirection": 1, 
      "SlashDamage": 3, 
      "ParryDamage": 1, 
      "ThrustDamage": 2, 
      "ChamberHex": [ 
        [ null, "BLOCK" ], 
        [ "SLASH", "THRUST", "PARRY" ], 
        [ "SLASH", "PARRY" ] 
      ] 
    },
    { // card # 42
      "ChamberPosistion": 7, 
      "BlockDirection": 1, 
      "SlashDamage": 3, 
      "ParryDamage": 1, 
      "ThrustDamage": 1, 
      "ChamberHex": [ 
        [ "PARRY", "THRUST" ], 
        [ "PARRY", "BLOCK", null ], 
        [ "SLASH", "SLASH" ] 
      ] 
    },
    { // card # 43
      "ChamberPosistion": 7, 
      "BlockDirection": 1, 
      "SlashDamage": 2, 
      "ParryDamage": 2, 
      "ThrustDamage": 1, 
      "ChamberHex": [ 
        [ "THRUST", "BLOCK" ], 
        [ "PARRY", "BLOCK", "SLASH" ], 
        [ "PARRY", "SLASH" ] 
      ] 
    },
    { // card # 44
      "ChamberPosistion": 7, 
      "BlockDirection": 1, 
      "SlashDamage": 2, 
      "ParryDamage": 2, 
      "ThrustDamage": 1, 
      "ChamberHex": [ 
        [ "SLASH", "BLOCK" ], 
        [ "SLASH", "BLOCK", "THRUST" ], 
        [ "PARRY", "PARRY" ] 
      ] 
    },
    { // card # 45
      "ChamberPosistion": 7, 
      "BlockDirection": 0, 
      "SlashDamage": 3, 
      "ParryDamage": 1, 
      "ThrustDamage": 2, 
      "ChamberHex": [ 
        [ "BLOCK", null ], 
        [ "THRUST", "SLASH", "PARRY" ], 
        [ "SLASH", "PARRY" ] 
      ] 
    },
    { // card # 46
      "ChamberPosistion": 7, 
      "BlockDirection": 2, 
      "SlashDamage": 2, 
      "ParryDamage": 2, 
      "ThrustDamage": 2, 
      "ChamberHex": [ 
        [ "SLASH", null ], 
        [ "SLASH", "PARRY", "BLOCK" ], 
        [ "PARRY", "THRUST" ] 
      ] 
    },
    { // card # 47
      "ChamberPosistion": 7, 
      "BlockDirection": 0, 
      "SlashDamage": 2, 
      "ParryDamage": 1, 
      "ThrustDamage": 3, 
      "ChamberHex": [ 
        [ "BLOCK", "PARRY" ], 
        [ "BLOCK", "PARRY", "SLASH" ], 
        [ "THRUST", "SLASH" ] 
      ] 
    },
    { // card # 48
      "ChamberPosistion": 7, 
      "BlockDirection": 2, 
      "SlashDamage": 2, 
      "ParryDamage": 1, 
      "ThrustDamage": 3, 
      "ChamberHex": [ 
        [ "PARRY", "SLASH" ], 
        [ "PARRY", "SLASH", "BLOCK" ], 
        [ "THRUST", "BLOCK" ] 
      ] 
    }
  ];
};