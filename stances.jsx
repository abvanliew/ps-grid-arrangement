var active = app.activeDocument;
var data = loadStanceData();

for( i = 0; i < data.length; i++)
{
  createStance( data[i].Footing, data[i].Step, data[i].Tempo );
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