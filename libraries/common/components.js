/********************************************************************************************/
/********************************************************************************************/
/*******************************            COMMON             ******************************/
/********************************************************************************************/
/********************************************************************************************/

/************************************* COMMON COMPONENT VARIABLES AND PROPERTIES *************************************/
var _library = 'common';
/*
prx.icons = [{value: '',displayValue: 'None'},{value: 'arrow-l',displayValue: 'Arrow left'},{value: 'arrow-r',displayValue: 'Arrow right'},{value: 'arrow-u',displayValue: 'Arrow up'},{value: 'arrow-d',displayValue: 'Arrow down'}
	,{value: 'delete',displayValue: 'Delete'}
	,{value: 'plus',displayValue: 'Plus'}
	,{value: 'minus',displayValue: 'Minus'}
	,{value: 'check',displayValue: 'Check'}
	,{value: 'gear',displayValue: 'Gear'}
	,{value: 'refresh',displayValue: 'Refresh'}
	,{value: 'forward',displayValue: 'Forward'}
	,{value: 'back',displayValue: 'Back'}
	,{value: 'grid',displayValue: 'Grid'}
	,{value: 'star',displayValue: 'Star'}
	,{value: 'alert',displayValue: 'Alert'}
	,{value: 'info',displayValue: 'Info'}
	];
*/
prx.comps={};
prx.comps.onetoten = [{value: '1',displayValue: '1'},{value: '2',displayValue: '2'},{value: '3',displayValue: '3'},{value: '4',displayValue: '4'},{value: '5',displayValue: '5'}
				,{value: '6',displayValue: '6'},{value: '7',displayValue: '7'},{value: '8',displayValue: '8'},{value: '9',displayValue: '9'},{value: '10',displayValue: '10'}
				];
prx.comps.defaultcolor = "666666";
prx.comps.fonts = [{optgroup: true, displayValue: 'Webfonts', value: 'webfonts', options: prx.fonts.concat([{ displayValue: 'Manage project webfonts...', value: 'manage-project-webfonts'}])},{ optgroup: true, displayValue: 'Web-safe fonts', options: [{ value: 'sans-serif,Helvetica Neue,Arial', displayValue: 'Default' },{ value: 'Arial,sans-serif', displayValue: 'Arial' }, { value: 'Arial Black,sans-serif', displayValue: 'Arial Black' }, { value: 'Comic Sans MS,cursive', displayValue: 'Comic Sans MS' }, { value: 'Courier New,monospace', displayValue: 'Courier New' }, { value: 'Helvetica,sans-serif', displayValue: 'Helvetica' }, { value: 'Impact,sans-serif', displayValue: 'Impact' }, { value: 'Georgia,serif', displayValue: 'Georgia' }, { value: 'Times New Roman,serif', displayValue: 'Times New Roman' }, { value: 'Trebuchet MS,sans-serif', displayValue: 'Trebuchet MS' }, { value: 'Verdana,sans-serif', displayValue: 'Verdana' }, { value: 'serif', displayValue: 'serif' }, { value: 'sans-serif', displayValue: 'sans-serif' }, { value: 'cursive', displayValue: 'cursive' }, { value: 'monospace', displayValue: 'monospace' }] }, { optgroup: true, displayValue: 'Android fonts', options: [{value: 'Roboto Regular, sans-serif', displayValue: 'Roboto Regular, sans-serif' }] }, { optgroup: true, displayValue: 'Metro fonts', options: [{value: 'Segoe UI, sans-serif', displayValue: 'Segoe UI' }] }]
prx.comps.textsize = [{ value: "8", displayValue: "8"}, { value: "10", displayValue: "10"}, { value: "12", displayValue: "12"}, { value: "14", displayValue: "14"}, { value: "18", displayValue: "18"}, { value: "24", displayValue: "24"}, { value: "36", displayValue: "36"}];

prx.commonproperties = {};
prx.commonproperties.backgroundColor = { caption: 'Background color', name: 'backgroundColor', type: 'colorpicker', value: function(item,name) { return item.backgroundColor; } };
prx.commonproperties.actions = { caption: 'Interactions', name: 'actions', type: 'action', value: function(item,name) { if (typeof(item.actions) == "undefined") { item.actions = []; } return item.actions.length; } };
prx.commonproperties.borderWidth = { caption: 'Border (px)', name: 'borderWidth', type: 'slider-select', value: function(item,name) { return item.borderWidth; }, values: { min: 0, max: 20, step: 1 } };
prx.commonproperties.borderColor = { caption: 'Border color', name: 'borderColor', type: 'colorpicker', value: function(item,name) { return item.borderColor; } };
prx.commonproperties.borderRadius = { caption: 'Border Radius (px)', name: 'borderRadius', type: 'slider-select', value: function(item,name) { return item.borderRadius; }, values: { min: 0, max: 20, step: 1 } };
prx.commonproperties.text = { caption: 'Text', name: 'text', type: 'input', value: function(item,name) { return item.text; } };
prx.commonproperties.textFont = { caption: 'Font', name: 'textFont', type: 'select', value: function(item,name) { return item.textFont; }, values: function(){ return prx.comps.fonts } };
prx.commonproperties.textSize = { caption: 'Text Size', name: 'textSize', type: 'combo-select', value: function(item,name) { return item.textSize; }, values: prx.comps.textsize };
prx.commonproperties.textColor = { caption: 'Text Color', name: 'textColor', type: 'colorpicker', value: function(item,name) { return item.textColor; } };
prx.commonproperties.textProperties = { caption: 'Text properties', name: 'textProperties', type: 'checkbox', value: function(item,name) { if(typeof(item.textProperties) == "undefined") {item.textProperties = [];} return item.textProperties; }, values: [{ value: 'bold', displayValue: '<b style="font-family: Georgia">B</b>'}, { value: 'italic', displayValue: '<i style="font-family: Georgia">I</i>'}, { value: 'underline', displayValue: '<u style="font-family: Georgia">U</u>'}] };
prx.commonproperties.textAlign = { caption: 'Text align', name: 'textAlign', type: 'radio', value: function(item,name) { return item.textAlign; }, values: [{ value: 'left', displayValue: 'Left'}, { value: 'center', displayValue: 'Center'}, { value: 'right', displayValue: 'Right'}] };

prx.tabbargradient = '-webkit-gradient(linear, 38% 0%, 60% 70%, from(#dde9f0), to(#3fc5f8), color-stop(.6,#79b2ec),color-stop(.7,#2e91e5))';


/************************************* COMPONENT TYPES *************************************/

/***** SPECIAL COMPONENTS *****/

// TYPE: SYMBOL
prx.types.symbol = {
	name: "symbol"	
	,onDisplay: function(item,containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		var _symbolindex = prx.getSymbolIndexFromId(item.symbolid);

		var cReturn ="";
		if (_symbolindex > -1) {
			var _symbol_width="100%";
			var _symbol_height="100%";
			
			if (item.scroll!='') {
				if (item.scroll=='horizontal' || item.scroll=='omni') {
					_symbol_width = prx.symbols[_symbolindex].dimensions[0]+'px';
				}
				if (item.scroll=='vertical' || item.scroll=='omni') {
					_symbol_height = prx.symbols[_symbolindex].dimensions[1]+'px';
				}	
			}
			
			
			/* ADDED THESE LINES IN ORDER TO MAKE SYMBOLS BEHAVE RESPONSIVELY */
			if (item.scroll == 'vertical') {
				var _symbol_dims = getRealDims (item);
				_symbol_width = _symbol_dims.width+'px';
			}
			
			if (item.scroll == 'horizontal') {
				var _symbol_dims = getRealDims (item);
				_symbol_height = _symbol_dims.height+'px';
			}
			/* /ADDED THESE LINES IN ORDER TO MAKE SYMBOLS BEHAVE RESPONSIVELY */
			
			
			 
			cReturn='<div id="' + _id + '" class="box type-symbol" style="position: absolute;"><div id="'+_id+'-inner" style="position: absolute; overflow: hidden !important; height: 100%; width: 100%; background-color: #'+prx.symbols[_symbolindex].background+';"><div id="' + _id + '-scroll" class="symbol-scroll" style="width: '+_symbol_width+'; height: '+_symbol_height+'; position: absolute; overflow: hidden;">' + prx.renderSymbol(item,containerid) + '</div></div></div>';
			//cReturn='<div id="' + _id + '" class="box type-symbol" style="position: absolute; overflow: hidden;"><div id="' + _id + '-scroll" style="width: '+_symbol_width+'; height: '+_symbol_height+'; position: absolute; overflow: hidden;">' + prx.renderSymbol(item,containerid) + '</div></div>';
		} else {
			_appenditem = false;
			if(prx.editor) {
				return prx.types.missingComponent.onDisplay(item,containerid)
			}
		}
		return cReturn;
	}
	,onResizeStop: function(item, containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		prx.refreshPanel();
		//$('#' + _id).click();
		prx.triggerProperties(_id);
	} 
	,afterDisplay: function(item, containerid, pageid) {
		prx.loadRecursiveSymbolAfterDisplay(item,containerid, pageid);
	}
	,properties: [
              		{
              			caption: 'Scroll'
              			,name: 'scroll'
              			,type: 'select'
              			,value: function(item,name) {
              				return item.scroll;
              			}
      					,values: [{value: '',displayValue: 'No'},{value: 'horizontal',displayValue: 'Horizontally'},{value: 'vertical',displayValue: 'Vertically'},{value: 'omni',displayValue: 'Omni-directional'}]
      					,onChange: function(item){
	      					if(item.scroll == '') {
	      						$('#property-scrollsnap, #property-pinchzoom, #property-momentum, #property-hscrollbar, #property-vscrollbar, #property-lockdirection').hide();
	      					} else {
	      						$('#property-scrollsnap, #property-pinchzoom, #property-momentum').show();
	      						if(item.scroll == 'omni') {
	      							$('#property-hscrollbar, #property-vscrollbar, #property-lockdirection').show();
	      						} else if(item.scroll == 'horizontal') {
	      							$('#property-vscrollbar, #property-lockdirection').hide();
	      							$('#property-hscrollbar').show();
	      						} else {
	      							$('#property-hscrollbar, #property-lockdirection').hide();
	      							$('#property-vscrollbar').show();
	      						}
	      					}
	      				}
	      			},
	      			{
              			caption: 'Treat scroll container as snap (carousel)'
              			,name: 'scrollsnap'
              			,type: 'onoff'
              			,value: function(item,name) {
              				return item.scrollsnap;
              			}
	      				,hiddenByDefault: function(item){
	      					return (item.scroll=='');
	      				}
	      			},
	      			{
              			caption: 'Enable Pinch / Zoom'
              			,name: 'pinchzoom'
              			,type: 'onoff'
              			,value: function(item,name) {
              				return item.pinchzoom;
              			}
	      				,hiddenByDefault: function(item){
	      					return (item.scroll=='');
	      				}
	      			},
	      			{
              			caption: 'Enable Inertia'
              			,name: 'momentum'
              			,type: 'onoff'
              			,value: function(item,name) {
              				return item.momentum;
              			}
	      				,hiddenByDefault: function(item){
	      					return (item.scroll=='');
	      				}
	      			},
	      			{
              			caption: 'Show horizontal scrollbar'
              			,name: 'hscrollbar'
              			,type: 'onoff'
              			,value: function(item,name) {
              				return item.hscrollbar;
              			}
	      				,hiddenByDefault: function(item){
	      					return (item.scroll=='' || item.scroll == 'vertical');
	      				}
	      			},
	      			{
              			caption: 'Show vertical scrollbar'
              			,name: 'vscrollbar'
              			,type: 'onoff'
              			,value: function(item,name) {
              				return item.vscrollbar;
              			}
	      				,hiddenByDefault: function(item){
	      					return (item.scroll=='' || item.scroll == 'horizontal');
	      				}
	      			},
	      			{
              			caption: 'Lock direction on scroll'
              			,name: 'lockdirection'
              			,type: 'onoff'
              			,value: function(item,name) {
              				if(typeof(lockdirection) == "undefined") {
              					return true
              				}
	      					return item.lockdirection;
              			}
	      				,hiddenByDefault: function(item){
	      					return (item.scroll!='omni');
	      				}
	      			},
	              	prx.commonproperties.actions
	              ]
};


prx.types.missingComponent = {
	name: "missingComponent"
	,onDisplay: function(item,containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		var cErr = 'Component "'+item.type+'" is missing.'
		if(item.type == "symbol") {
			cErr = 'Container "'+item.caption+'" is missing.'
		}
		var cR = '<div id="'+_id+'" class="box pos type-missingComponent" style="background: red;">';
		cR += '<div class="error-msg">'+cErr+'</div>'
		cR += '</div>';
		return cR;
	} 
}

/***** /SPECIAL COMPONENTS *****/

/***** BASIC COMPONENTS *****/

//TYPE: TEXT
prx.types.text = {
	name: "text"
	,onDisplay: function(item,containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		var _bold = (jQuery.inArray("bold",item.textProperties)>-1) ? " font-weight: bold;" : "";
		var _italic = (jQuery.inArray("italic",item.textProperties)>-1) ? " font-style: italic;" : "";
		var _underline = (jQuery.inArray("underline",item.textProperties)>-1) ? " text-decoration: underline;" : "";
		var _shadow = (item.enableShadow) ? " text-shadow: 0 1px 0 #FFFFFF;" : "";
		var cReturn = '<div id="' + _id + '" class="box pos type-text" style="line-height: 1.231; color: #'+item.textColor+'; '+getFontCssFromFontFamily(item.textFont)+' font-size: '+item.textSize+'px; background-color: #'+item.backgroundColor+'; '+_bold+_italic+_underline+_shadow+' text-align: '+item.textAlign+';"><div style="overflow: hidden; width: 100%; height: 100%;">'+item.text+'</div></div>';
		return cReturn;
	}
	,properties: [
      	{ caption: 'Text', name: 'text', type: 'textarea', value: function(item,name) { return item.text; } }
      	,{
			caption: 'Use lorem ipsum text',
			name: 'loremIpsum',
			type: 'link',
			onClick: function(item) {
				item.text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce convallis pellentesque metus id lacinia. Nunc dapibus pulvinar auctor. Duis nec sem at orci commodo viverra id in ipsum. Fusce tellus nisl, vestibulum sed rhoncus at, pretium non libero. Cras vel lacus ut ipsum vehicula aliquam at quis urna. Nunc ac ornare ante. Fusce lobortis neque in diam vulputate quis semper sem elementum."
				return item;
			}
		}
		,{ 
			caption: 'Font', 
			name: 'textFont', 
			type: 'select', 
			value: function(item,name) { return item.textFont; }, 
			values: function(){ return prx.comps.fonts },
      		onChange: function(item) {
      			if(item.autoResize) {
      				prx.updateItem(item);
      				$('#property-text textarea').keyup();
      			}
      		}
			 
		},
		{ 
			caption: 'Text Size', 
			name: 'textSize', 
			type: 'combo-select', 
			value: function(item,name) { return item.textSize; }, 
			values: prx.comps.textsize ,
      		onChange: function(item) {
      			if(item.autoResize) {
      				prx.updateItem(item);
      				$('#property-text textarea').keyup();
      			}
      		}
		}
      	,prx.commonproperties.textColor
		,{ 
			caption: 'Text properties', 
			name: 'textProperties', 
			type: 'checkbox', 
			value: function(item,name) { if(typeof(item.textProperties) == "undefined") {item.textProperties = [];} return item.textProperties; }, 
			values: [{ value: 'bold', displayValue: '<b style="font-family: Georgia">B</b>'}, { value: 'italic', displayValue: '<i style="font-family: Georgia">I</i>'}, { value: 'underline', displayValue: '<u style="font-family: Georgia">U</u>'}],
      		onChange: function(item) {
      			if(item.autoResize) {
      				prx.updateItem(item);
      				$('#property-text textarea').keyup();
      			}
      		} 
		}
  		,prx.commonproperties.textAlign
		,prx.commonproperties.backgroundColor
		,{
      		caption: 'Enable Shadow',
      		name: 'enableShadow',
      		type: 'onoff',
      		value: function(item,name) {
      			return item.enableShadow;
      		}
		}
		,{
      		caption: 'Fit size to text',
      		name: 'autoResize',
      		type: 'onoff',
      		value: function(item,name) {
      			if(typeof(item.autoResize)== "undefined") { item.autoResize = false; }
      			return item.autoResize;
      		},
      		onChange: function(item) {
      			if(item.autoResize) {
      				$('#property-text textarea').keyup();
      			}
      		}
		}
      	,prx.commonproperties.actions
    ]
};

//TYPE: RICHTEXT
prx.types.richtext = {
	name: 'richtext'
		,onDisplay: function(item,containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		var cR = '';
		cR += '<div id="' + _id + '" class="box pos type-richtext"><div style="overflow: hidden; width: 100%; height: 100%;">' + item.text + '</div></div>';
		return cR;
	}
	,properties: [
      {
	    	caption: 'Text'
	    	,name: 'text'
	    	,type: 'wysiwyg'
	    	,value: function(item,name) {
	    		return item.text;
	    	}
	    }
	  ,{
			caption: 'Use lorem ipsum text',
			name: 'loremIpsum',
			type: 'link',
			onClick: function(item) {
				item.text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce convallis pellentesque metus id lacinia. Nunc dapibus pulvinar auctor. Duis nec sem at orci commodo viverra id in ipsum. Fusce tellus nisl, vestibulum sed rhoncus at, pretium non libero. Cras vel lacus ut ipsum vehicula aliquam at quis urna. Nunc ac ornare ante. Fusce lobortis neque in diam vulputate quis semper sem elementum."
				return item;
			}
		}
	               
   ]
};

//TYPE: RECTANGLE
prx.types.rectangle = {
	name: ""
	,onDisplay: function(item,containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		if(item.borderRadius == parseInt(item.borderRadius)) { item.borderRadius += 'px'; }
		var cReturn = '<div id="' + _id + '" class="box pos type-rectangle"><div id="rec-' + _id + '" class="inner-rec" style="background-color: #'+item.backgroundColor+'; border: '+item.borderWidth+'px solid #' + item.borderColor + '; -moz-border-radius: '+item.borderRadius+'; -webkit-border-radius: '+item.borderRadius+'; border-radius: '+item.borderRadius+';"></div></div>';
		return cReturn;
	}
	,properties: [
	      			prx.commonproperties.backgroundColor
	      			,prx.commonproperties.borderWidth
	      			,prx.commonproperties.borderColor
	      			,{ 
	      				caption: 'Border Radius', 
	      				name: 'borderRadius', 
	      				type: 'combo-select', 
	      				value: function(item,name) { 
	      					if(item.borderRadius == parseInt(item.borderRadius)) { return item.borderRadius += 'px'; }
	      					return item.borderRadius; 
	      				},
	      				values: [{ value: "0px", displayValue: "0px"}, { value: "1px", displayValue: "1px"}, { value: "2px", displayValue: "2px"}, { value: "3px", displayValue: "3px"}, { value: "4px", displayValue: "4px"}, { value: "5px", displayValue: "5px"}, { value: "6px", displayValue: "6px"}, { value: "7px", displayValue: "7px"}, { value: "8px", displayValue: "8px"}, { value: "9px", displayValue: "9px"}, { value: "10px", displayValue: "10px"}, { value: "11px", displayValue: "11px"}, { value: "12px", displayValue: "12px"}, { value: "13px", displayValue: "13px"}, { value: "14px", displayValue: "14px"}, { value: "15px", displayValue: "15px"}, { value: "16px", displayValue: "16px"}, { value: "17px", displayValue: "17px"},{ value: "18px", displayValue: "18px"}, { value: "19px", displayValue: "19px"}, { value: "20px", displayValue: "20px"}] 
	      			}
		      		,prx.commonproperties.actions
	      		]
	
};

/* TYPE = CIRCLE */
prx.types.circle = cloneobject(prx.types.rectangle);
prx.types.circle.name = 'circle';
removeProperties(prx.types.circle.properties, ['borderRadius'])

//TYPE: HORIZONTAL LINE
prx.types.horizontalline = {
	name: "horizontalline"
	,onDisplay: function(item,containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		item.height = item.weight;
		if (item.locked) {var xtra='onmousedown="if (event.preventDefault) event.preventDefault()"';} else {var xtra=""}; // prevent default drag
		var cReturn = '<div id="' + _id + '" class="box pos type-horizontalline" style="height: '+item.weight+'px;"><div class="inner" style="background-color: #'+item.color+';"></div></div>';
		return cReturn;
	}
	,properties: [
	      			{
	      				caption: 'Color'
	      				,name: 'color'
	      				,type: 'colorpicker'
	      				,value: function(item,name) {
	      					return item.color;
	      				}
	      			},
	      			{
            			caption: 'Thickness'
            			,name: 'weight'
            			,type: 'slider-select'
            			,value: function(item,name) {
            				return item.weight;
            			}
    					,values: { min: 1, max: 10, step: 1 }
	      			}
	      			
	      		]
	
};

//TYPE: VERTICAL LINE
prx.types.verticalline = {
	name: "verticalline"
	,onDisplay: function(item,containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		item.width = item.weight;
		if (item.locked) {var xtra='onmousedown="if (event.preventDefault) event.preventDefault()"';} else {var xtra=""}; // prevent default drag
		var cReturn = '<div id="' + _id + '" class="box pos type-verticalline" style="width: '+item.weight+'px;"><div class="inner" style="background-color: #'+item.color+';"></div></div>';
		return cReturn;
	}
	,properties: [
	      			{
	      				caption: 'Color'
	      				,name: 'color'
	      				,type: 'colorpicker'
	      				,value: function(item,name) {
	      					return item.color;
	      				}
	      			},
	      			{
            			caption: 'Thickness'
            			,name: 'weight'
            			,type: 'slider-select'
            			,value: function(item,name) {
            				return item.weight;
            			}
    					,values: { min: 1, max: 10, step: 1 }
	      			}
	      		]
	
};

//TYPE: ACTION AREA
prx.types.actionarea = {
	name: "actionarea"
	,onDisplay: function(item,containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		
		var cReturn = '<div id="' + _id + '" class="box pos type-actionarea"><div id="rec-' + _id + '" class="inner-rec" ><div></div></div></div>';
		return cReturn;
	}
	,properties: [
	              prx.commonproperties.actions
	      		]
	
};

//TYPE: IMAGE
prx.types.image = {
	name: "image"
	,onDisplay: function(item,containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		if(typeof(item.overlay) == "undefined") { item.overlay = false; }
		if(typeof(item.repeat) == "undefined") { item.repeat = false; }
		
		var cR = '<div id="' + _id + '" class="box pos type-image '+(item.propagateEvents ? 'pointer-events-none' : '')+'" '+((item.overlay)? 'data-overlay="1"': '')+'>'
		cR += '<div class="type-image-wrapper '+((item.repeat) ? 'type-image-repeater': '') + ' '+((item.imgSrc.url.slice(-4) == '.svg') ? 'type-image-svg' : '')+'" style="background-image: url(' +getAssetUrl(item.imgSrc)+');">'
		cR += '<img src="' + ((item.imgSrc.url=="") ? "data:image/gif;base64,R0lGODlhAQABAPAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" : getAssetUrl(item.imgSrc)) + '" width="100%" height="100%" />'
		cR +='</div>'
		cR += '</div>';
		
		return cR;
	}
	,properties: [
	      			{
	      				caption: 'Image Source'
	      				,name: 'imgSrc'
	      				,type: 'combo-asset'
	      				,displayValue: function(item,name) {
	      					if(item.imgSrc.url == '') {
	      						return 'No asset selected.';
	      					}
	      					return item.imgSrc.name;
	      				}
	      				,value: function(item,name) {
	      					return $.toJSON({
	      						allow: 'image',
	      						asset: item.imgSrc
	      					});
	      				}
	      			},
	      			{
	      				caption: 'Repeat image instead of stretch'
	      				,name: 'repeat'
	      				,type: 'onoff'
	      				,value: function(item,name) {
	      					if(typeof(item.repeat) == "undefined") {
	      						return false;
	      					}
	      					return item.repeat;
	      				}
	      			},
	      			{
	      				caption: 'Propagate all events to the component below'
	      				,name: 'propagateEvents'
	      				,type: 'onoff'
	      				,value: function(item,name) {
	      					if(typeof(item.propagateEvents) == "undefined") {
	      						return false;
	      					}
	      					return item.propagateEvents;
	      				}
	      				,onChange: function(item){
	      					if(item.propagateEvents) {
	      						$('#property-actions').hide();
	      					} else {
	      						$('#property-actions').show();
	      					}
	      				}
	      			},
	      	      	{
	    				caption: 'Position fixed on transitions'
	    				,name: 'overlay'
	    				,type: 'onoff'
	    				,value: function(item,name) {
	    					if(typeof(item.overlay)=="undefined") {
	    						return false;
	    					}
	    					return item.overlay;
	    				}
	      	      	},
	      			{ 
	      				caption: 'Interactions', 
	      				name: 'actions', 
	      				type: 'action', 
	      				value: function(item,name) { 
	      					if (typeof(item.actions) == "undefined") { 
	      						item.actions = [];
	      					}
	      					return item.actions.length; 
	      				},
	      				hiddenByDefault: function(item){
	      					if(typeof(item.propagateEvents) != "undefined" && item.propagateEvents) {
	      						return true;
	      					}
	      					return false;
	      				}
	      			}
	      		]
};

//TYPE: PLACEHOLDER
prx.types.placeholder = {
	name: 'placeholder'
	,onDisplay: function(item,containerid,pageid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		
		var _real = getRealDims(item, symbol);
		var _realh = _real.height;
		var _realw = _real.width;
		
		var _width = Math.sqrt(Math.pow(_realw,2) + Math.pow(_realh,2)) - item.thickness;
		var _angle1 = 90 - Math.atan((_realw-10)/(_realh-10)) * (180/Math.PI);
		
		//needs the width patenta to correctly calculate width on afterdisplay
		var cR = '<div id="' + _id + '" class="pos box type-placeholder" style="width: '+_realw+'px;">';
		cR += '<div class="bg" style="background-color: #'+item.backgroundColor+'; border-color: #'+item.borderColor+'; border-width: '+item.thickness+'px;"></div>';
		cR += '<div class="diagonal diagonal1" style="border-color: #'+item.borderColor+'; width: '+_width+'px; -moz-transform: rotate('+_angle1+'deg); -webkit-transform: rotate('+_angle1+'deg); -o-transform: rotate('+_angle1+'deg); transform: rotate('+_angle1+'deg);  border-top-width: '+item.thickness+'px; left: '+item.thickness/2+'px;"></div>'
		cR += '<div class="diagonal diagonal2" style="border-color: #'+item.borderColor+'; width: '+_width+'px; -moz-transform: rotate(-'+_angle1+'deg); -webkit-transform: rotate(-'+_angle1+'deg); -o-transform: rotate(-'+_angle1+'deg); transform: rotate(-'+_angle1+'deg); border-top-width: '+item.thickness+'px; right: '+item.thickness/2+'px;"></div>'
		if(item.text != "") {
			cR += '<div class="contents"><span style="text-align: '+item.textAlign+'; font-size: '+item.textSize+'px; background-color: #'+item.backgroundColor+'; color: #'+item.borderColor+';">' + item.text + '</span></div>';
		}
		cR += '</div>';
		return cR;
	}
	/*,afterDisplay: function(item,containerid,pageid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		var _real = getRealDims(item);
		var $span = $('#' + _id + ' .contents span')
		$span.css({
			'left': parseInt((_real.width - $span.innerWidth())/2) + 'px',
			'top': parseInt((_real.height - $span.innerHeight())/2) + 'px'
		})
	}*/
	,onResize: function(item,containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		
		var _real = getRealDims(item);
		var _realh = _real.height;
		var _realw = _real.width;
		
		var _width = Math.sqrt(Math.pow(_realw,2) + Math.pow(_realh,2)) - item.thickness;
		var _angle1 = 90 - Math.atan((_realw-10)/(_realh-10)) * (180/Math.PI);
		
		$('#' + _id + ' .diagonal1')
			.width(_width)
			.css('-moz-transform', 'rotate(' + _angle1 + 'deg)')
			.css('-webkit-transform', 'rotate(' + _angle1 + 'deg)')
			.css('-o-transform', 'rotate(' + _angle1 + 'deg)')
			.css('transform', 'rotate(' + _angle1 + 'deg)');
		$('#' + _id + ' .diagonal2')
			.width(_width)
			.css('-moz-transform', 'rotate(-' + _angle1 + 'deg)')
			.css('-webkit-transform', 'rotate(-' + _angle1 + 'deg)')
			.css('-o-transform', 'rotate(-' + _angle1 + 'deg)')
			.css('transform', 'rotate(-' + _angle1 + 'deg)');
		
		/*var $span = $('#' + _id + ' .contents span')
		$span.css({
			'left': parseInt((_realw - $span.innerWidth())/2) + 'px',
			'top': parseInt((_realh - $span.innerHeight())/2) + 'px'
		})*/
	}
	,properties: [
	    {
	    	caption: 'Text'
	    	,name: 'text'
	    	,type: 'textarea'
	    	,value: function(item,name) {
	    		return item.text;
	    	}
	    }
	    ,prx.commonproperties.textSize
	    ,prx.commonproperties.textAlign
	    ,prx.commonproperties.backgroundColor
	    ,prx.commonproperties.borderColor
	    ,{
	    	caption: 'Line thickness'
	    	,name: 'thickness'
	    	,type: 'slider-select'
	    	,value: function(item,name) {
	    		return item.thickness
	    	}
	    	,values: prx.comps.onetoten
	    }
	    ,prx.commonproperties.actions
	]
}

//TYPE: WEBVIEW
prx.types.webview = {
	name: 'webview'
	,onDisplay: function(item,containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		var cR = '';
		cR += '<div id="' + _id + '" class="box pos type-webview"><div style="overflow: hidden; height: 100%; width: 100%;"><iframe src='+item.url+' scrolling="no" style="border: none; width: 100%; height: 100%;"></iframe></div></div>';
		return cR;
	}
	,properties: [
      {
	    	caption: 'URL'
	    	,name: 'url'
	    	,type: 'input'
	    	,value: function(item,name) {
	    		return item.url;
	    	}
	    }           
   ]
};

//TYPE: HTML
prx.types.html = {
	name: 'html'
	,onDisplay: function(item,containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		var cR = '';
		cR += '<div id="' + _id + '" class="box pos type-html"></div>';
		return cR;
	}
	,afterDisplay: function(item, containerid, pageid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		var iframe = new IFrame($('#'+_id).get(0));
		iframe.doc.body.style.margin = "0px";
	    var div = iframe.doc.createElement("div");
	    div.innerHTML = item.html;
	    iframe.doc.body.appendChild(div);
	}
	,properties: [
      {
	    	caption: 'HTML code'
	    	,name: 'html'
	    	,type: 'textarea'
	    	,value: function(item,name) {
	    		return item.html;
	    	}
	    }           
   ]
};

//TYPE: AUDIO
prx.types.audio = {
	name: 'audio'
		,onDisplay: function(item,containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		var cR = '';
		cR += '<div id="' + _id + '" class="box pos type-audio">';
		cR += '<audio '+ ((item.controls) ? 'controls' : '') +' '+ ((item.preload) ? 'preload' : '') +' '+ ((item.autoplay) ? 'autoplay' : '') +'>';
		if(item.audioFileMP3.url != '') cR += '<source src="'+getAssetUrl(item.audioFileMP3)+'" type="audio/mpeg" />';
		if(item.audioFileOGG.url != '') cR += '<source src="'+getAssetUrl(item.audioFileOGG)+'" type="audio/ogg" />';
		if(item.audioFileWAV.url != '') cR += '<source src="'+getAssetUrl(item.audioFileWAV)+'" type="audio/x-wav" />';
		if(item.audioFileAAC.url != '') cR += '<source src="'+getAssetUrl(item.audioFileAAC)+'" type="audio/x-m4a" />';
		cR += '</audio>';
		cR += '</div>';
		return cR;
	}
	,properties: [
	{
		caption: 'Audio file MP3'
		,name: 'audioFileMP3'
		,type: 'asset'
		,displayValue: function(item,name) {
			if(item.audioFileMP3.url == '') {
				return 'No asset selected.';
			}
			return item.audioFileMP3.name;
		}
		,value: function(item,name) {
			return $.toJSON({
				allow: 'audio',
				asset: item.audioFileMP3
			});
		}
	},
	{
		caption: 'Audio file OGG'
		,name: 'audioFileOGG'
		,type: 'asset'
		,displayValue: function(item,name) {
			if(item.audioFileOGG.url == '') {
				return 'No asset selected.';
			}
			return item.audioFileOGG.name;
		}
		,value: function(item,name) {
			return $.toJSON({
				allow: 'audio',
				asset: item.audioFileOGG
			});
		}
	},
	{
    	caption: 'Audio file WAV'
    	,name: 'audioFileWAV'
    	,type: 'asset'
		,displayValue: function(item,name) {
			if(item.audioFileWAV.url == '') {
				return 'No asset selected.';
			}
			return item.audioFileWAV.name;
		}
		,value: function(item,name) {
			return $.toJSON({
				allow: 'audio',
				asset: item.audioFileWAV
			});
		}
    },
    {
    	caption: 'Audio file AAC'
    	,name: 'audioFileAAC'
    	,type: 'asset'
		,displayValue: function(item,name) {
			if(item.audioFileAAC.url == '') {
				return 'No asset selected.';
			}
			return item.audioFileAAC.name;
		}
		,value: function(item,name) {
			return $.toJSON({
				allow: 'audio',
				asset: item.audioFileAAC
			});
		}
    },
    {
    	caption: 'Display controls?'
    	,name: 'controls'
    	,type: 'onoff'
    	,value: function(item,name){
    		return item.controls;
    	}
    },
    {
    	caption: 'Preload audio?'
    	,name: 'preload'
    	,type: 'onoff'
    	,value: function(item,name){
    		return item.preload;
    	}
    }
    ,
    {
    	caption: 'Autoplay?'
    	,name: 'autoplay'
    	,type: 'onoff'
    	,value: function(item,name){
    		return item.autoplay;
    	}
    }
   ]
};

//TYPE: VIDEO
prx.types.video = {
	name: 'video'
	,onDisplay: function(item,containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		if(typeof(item.vimeoid)=="undefined") { item.vimeoid = '' }
		var cR = '';
		cR += '<div id="' + _id + '" class="box pos type-video">';
		switch(item.videoType) {
		case 'html5':
			cR += '<video width="100%" height="100%" '+ ((item.controls) ? 'controls' : '') + ((item.placeholder.url != '') ? ' poster='+getAssetUrl(item.placeholder) : '' )+' '+ ((!item.preload) ? 'preload="none"' : '') +' '+ ((item.autoplay) ? 'autoplay' : '') +'>';
			if(item.videoFileMP4.url != '') cR += '<source src="'+getAssetUrl(item.videoFileMP4)+'" type="video/mp4" />';
			if(item.videoFileWEBM.url != '') cR += '<source src="'+getAssetUrl(item.videoFileWEBM)+'" type="video/webm" />';
			if(item.videoFileOGG.url != '') cR += '<source src="'+getAssetUrl(item.videoFileOGG)+'" type="video/ogg" />';
			cR += '</video>';
			break;
		case 'youtube':
			cR += '<iframe width="100%" height="100%" src="http://www.youtube.com/embed/'+item.youtubeid+'?wmode=transparent'+((item.autoplay && !prx.editor) ? '&autoplay=1' : '')+((!item.controls) ? '&controls=0' : '')+'" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
			break;
		case 'vimeo':
			cR += '<iframe width="100%" height="100%" src="http://player.vimeo.com/video/'+item.vimeoid+'?title=0&amp;byline=0&amp;portrait=0&wmode=transparent'+((item.autoplay && !prx.editor) ? '&autoplay=1' : '')+'" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
			break;
		}
		cR += '</div>';
		return cR;		
	}
	,properties: [
      {
    	  	caption: 'Video type'
    		,name: 'videoType'
    		,type: 'select'
    		,value: function(item,name){
    	  		return item.videoType;
      		}
      		,values: [{ displayValue: 'HTML5 video', value: 'html5' }, { displayValue: 'YouTube video', value: 'youtube' }, { displayValue: 'Vimeo video', value: 'vimeo' }]
      		,onChange: function(item){
      			//if(item.videoType == 'youtube') {
      			switch(item.videoType) {
      			case 'youtube':
  					$('#property-videoFileMP4, #property-videoFileOGG, #property-videoFileWEBM, #property-placeholder, #property-removePlaceholder, #property-preload, #property-vimeoid').hide();
					$('#property-youtubeid, #property-controls').show();
					break;
      			case 'vimeo':
      				$('#property-videoFileMP4, #property-videoFileOGG, #property-videoFileWEBM, #property-placeholder, #property-removePlaceholder, #property-preload, #property-youtubeid, #property-controls').hide();
					$('#property-vimeoid').show();
      				break;
      			case 'html5':
					$('#property-videoFileMP4, #property-videoFileOGG, #property-videoFileWEBM, #property-placeholder, #property-removePlaceholder, #property-preload, #property-controls').show();
					$('#property-youtubeid, #property-vimeoid').hide();
					break;
      			}
  				return false;
      		}
      },
      {
	    	caption: 'YouTube Video ID'
	    	,name: 'youtubeid'
	    	,type: 'input'
	    	,value: function(item,name) {
	    		return item.youtubeid;
	    	}
	    	,hiddenByDefault: function(item) {
	    		return !(item.videoType == 'youtube');
	    	}
	    },
      {
	    	caption: 'Vimeo Video ID'
	    	,name: 'vimeoid'
	    	,type: 'input'
	    	,value: function(item,name) {
	    		return item.vimeoid;
	    	}
	    	,hiddenByDefault: function(item) {
	    		return !(item.videoType == 'vimeo');
	    	}
	    },
      {
	    	caption: 'MP4 Video file'
	    	,name: 'videoFileMP4'
	    	,type: 'asset'
			,displayValue: function(item,name) {
				if(item.videoFileMP4.url == '') {
					return 'No asset selected.';
				}
				return item.videoFileMP4.name;
			}
			,value: function(item,name) {
				return $.toJSON({
					allow: 'video',
					asset: item.videoFileMP4
				});
			}
	    	,hiddenByDefault: function(item) {
	    		return !(item.videoType == 'html5');
	    	}
	    },
	    {
	    	caption: 'WebM Video file'
	    	,name: 'videoFileWEBM'
	    	,type: 'asset'
			,displayValue: function(item,name) {
				if(item.videoFileWEBM.url == '') {
					return 'No asset selected.';
				}
				return item.videoFileWEBM.name;
			}
			,value: function(item,name) {
				return $.toJSON({
					allow: 'video',
					asset: item.videoFileWEBM
				});
			}
	    	,hiddenByDefault: function(item) {
	    		return !(item.videoType == 'html5');
	    	}
	    },
	    {
	    	caption: 'OGG Video file'
	    	,name: 'videoFileOGG'
	    	,type: 'asset'
			,displayValue: function(item,name) {
				if(item.videoFileOGG.url == '') {
					return 'No asset selected.';
				}
				return item.videoFileOGG.name;
			}
			,value: function(item,name) {
				return $.toJSON({
					allow: 'video',
					asset: item.videoFileOGG
				});
			}
	    	,hiddenByDefault: function(item) {
	    		return !(item.videoType == 'html5');
	    	}
	    },
	    {
	    	caption: 'Display controls?'
	    	,name: 'controls'
	    	,type: 'onoff'
	    	,value: function(item,name){
	    		return item.controls;
	    	}
	    	,hiddenByDefault: function(item) {
	    		return (item.videoType == 'vimeo');
	    	}
	    },
	    {
	    	caption: 'Preload video?'
	    	,name: 'preload'
	    	,type: 'onoff'
	    	,value: function(item,name){
	    		return item.preload;
	    	}
	    	,hiddenByDefault: function(item) {
	    		return !(item.videoType == 'html5');
	    	}
	    },
	    {
	    	caption: 'Autoplay?'
	    	,name: 'autoplay'
	    	,type: 'onoff'
	    	,value: function(item,name){
	    		return item.autoplay;
	    	}
	    },
	    {
	    	caption: 'Placeholder image'
	    	,name: 'placeholder'
	    	,type: 'combo-asset'
			,displayValue: function(item,name) {
				if(item.placeholder.url == '') {
					return 'No asset selected.';
				}
				return item.placeholder.name;
			}
			,value: function(item,name) {
				return $.toJSON({
					allow: 'image',
					asset: item.placeholder
				});
			}
	    	,hiddenByDefault: function(item) {
	    		return !(item.videoType == 'html5');
	    	}
	    }
   ]
};

prx.types.animationtarget = {
	name: 'animationtarget'
	,onDisplay: function(item,containerid,pageid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		var _dims = getRealDims(item,symbol);
		var cR = '<div id="'+_id+'" class="pos box type-animationtarget '+((typeof(item.fixPositioning) != "undefined" && item.fixPositioning) ? 'type-animatiotarget-fixed-positioning' : '')+'">'
		//cR += '<div class="animationtarget-circle"></div>'
		cR += '<div class="animationtarget-horizontal"></div>'
		cR += '<div class="animationtarget-vertical"></div>'
		cR += '</div>';
		return cR;
	}
}

//TYPE: tooltip
prx.types.tooltip = {
	name: "tooltip"
	,onDisplay: function(item,containerid,pageid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		var _height, _width, _pos, _margin;
		var _dims = getRealDims(item,symbol);
		
		var _ttBg = item.backgroundColor;
		if(_ttBg == 'none') { _ttBg = item.borderColor; }
		
		var _props = (jQuery.inArray("bold",item.textProperties)>-1) ? " font-weight: bold;" : "";
		_props += (jQuery.inArray("italic",item.textProperties)>-1) ? " font-style: italic;" : "";
		_props += (jQuery.inArray("underline",item.textProperties)>-1) ? " text-decoration: underline;" : "";
		
		switch (item.ttDirection) {
		case 'top':
		case 'bottom':
			_width = '100%';
			_height = parseInt(_dims.height) - 12 + 'px';
			_margin = '9px 0 9px -7px'
			_pos = 'width: 25px; height: '+(12 + parseInt(item.borderWidth))+'px; left: ' + eval((_dims.width * item.ttPosition/100) - (25 * item.ttPosition/100)) + 'px;';
			break;
		case 'left':
		case 'right':
			_height = '100%';
			_width = parseInt(_dims.width) - 12 + 'px';
			_margin = '-7px 9px 0';
			_pos = 'width: '+(12 + parseInt(item.borderWidth))+'px; height: 25px; top: ' + eval((_dims.height * item.ttPosition/100) - (25 * item.ttPosition/100)) + 'px;';
			break;
		case 'none':
			_height = '100%';
			_width = '100%';
			_margin: '0';
			_pos = 'width: 0px; height: 0px';
			break;
		}
		
		
		var cR = '<div id="'+_id+'" class="box pos type-tooltip">'
		
		cR += '<style>'
		cR += '#'+_id+' .tooltip-content-outer { padding-'+item.ttDirection+': 12px; }'
		cR += '#'+_id+' .tooltip-content { border-radius: '+item.borderRadius+'px; border: '+item.borderWidth+'px solid #'+item.borderColor+'; background-color: #'+item.backgroundColor+'; }'
		cR += '#'+_id+' .tooltip-text { '+_props+' '+getFontCssFromFontFamily(item.textFont)+'; font-size: '+item.textSize+'px; text-align: '+item.textAlign+'; color: #'+item.textColor+'; }'
		cR += '#'+_id+' .tooltip-outer { '+item.ttDirection+': 0; '+_pos+' }'
		cR += '#'+_id+' .tooltip { background: #'+_ttBg+'; '+item.ttDirection+': 0; border: '+item.borderWidth+'px solid #'+item.borderColor+'; margin: '+_margin+'; }'
		cR += '</style>'
		
		cR += '<div class="tooltip-content-outer">';
		cR += '<div class="tooltip-content">';
		cR += '<div class="tooltip-text">'+item.text+'</div>'
		cR += '</div>';
		cR += '</div>';
		cR += '<div class="tooltip-outer">';
		cR += '<div class="tooltip"></div>'
		cR += '</div>'
		cR += '</div>';
		
		return cR;
	}
	,onResize: function(item,containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		
		var _height, _height2, _width;
		var _dims = getRealDims(item);
		
		switch (item.ttDirection) {
		case 'top':
		case 'bottom':
			_width = '100%';
			_height = eval(_dims.height - 12) + 'px';
			$("#" + _id + " .tooltip-outer").first().css("left", eval((_dims.width * item.ttPosition/100) - (25 * item.ttPosition/100)) + 'px')
			break;
		case 'left':
		case 'right':
			_height = '100%';
			_width = eval(_dims.width - 12) + 'px';
			$("#" + _id + " .tooltip-outer").first().css("top", eval((_dims.height * item.ttPosition/100) - (25 * item.ttPosition/100)) + 'px')
			break;
		case 'none':
			_height = '100%';
			_width = '100%';
			break;
		}
	}
	,properties: [
		{
			caption: 'Tooltip Direction'
			,name: 'ttDirection'
			,type: 'select'
			,value: function(item,name) {
				return item.ttDirection;
			}
			,values: [{ value: 'top', displayValue: 'Top' }, { value: 'bottom', displayValue: 'Bottom' }, { value: 'left', displayValue: 'Left' }, { value: 'right', displayValue: 'Right' }, { value: 'none', displayValue: 'No tooltip' }]
		},
       	{
  			caption: 'Tooltip Position (0-100) (%)'
  			,name: 'ttPosition'
  			,type: 'slider-select'
  			,value: function(item,name) {
    			return item.ttPosition;
    		}
			,values: { min: 0, max: 100, step: 5 }
		}
		,{ caption: 'Border (px)', name: 'borderWidth', type: 'slider-select', value: function(item,name) { return item.borderWidth; }, values: { min: 0, max: 10, step: 1 } }
     	,prx.commonproperties.borderColor
       	,prx.commonproperties.borderRadius
		,prx.commonproperties.backgroundColor
       	,{ caption: 'Text', name: 'text', type: 'textarea', value: function(item,name) { return item.text; } }
		,prx.commonproperties.textFont
		,prx.commonproperties.textSize
		,prx.commonproperties.textColor
		,prx.commonproperties.textProperties
		,prx.commonproperties.textAlign
    ]
	
};

/***** /BASIC COMPONENTS *****/

/***** TOOLBAR COMPONENTS *****/
//TYPE: BASIC TABBAR
prx.types.basic_tabbar = {
	name: 'basic_tabbar'
	,onDisplay: function(item,containerid,pageid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		var _dims = getRealDims(item,symbol);
		if(typeof(item.overlay) == "undefined") { item.overlay = false; }
		var _props = (jQuery.inArray("bold",item.textProperties)>-1) ? " font-weight: bold;" : "";
		_props += (jQuery.inArray("italic",item.textProperties)>-1) ? " font-style: italic;" : "";
		_props += (jQuery.inArray("underline",item.textProperties)>-1) ? " text-decoration: underline;" : "";
		
		
		var cR = '<div id="'+_id+'" class="pos box type-basic-tabbar type-basic-tabbar-icon-'+item.iconpos+'" '+((item.overlay)? 'data-overlay="1"': '')+'>';
		var _tabWidth = Math.floor((_dims.width - item.borderWidth*(item.tabs.length-1))/item.tabs.length); 
		
		cR += '<style>';
		cR += '#'+_id+' ul { background-color: #'+item.backgroundColor+'; }'
		cR += '#'+_id+' li { width: '+_tabWidth+'px; border-left: '+item.borderWidth+'px solid #'+item.borderColor+'; }'
		cR += '#'+_id+' label .caption { color: #'+item.textColor+'; '+getFontCssFromFontFamily(item.textFont)+' '+_props+'; font-size: '+item.textSize+'px; }'
		cR += '#'+_id+' input:checked + label { background-color: #'+item.activeBackgroundColor+'; }'
		cR += '#'+_id+' input:checked + label .caption { color: #'+item.activeTextColor+'; }'
		if(item.maskEnabled && $.browser.webkit) {
			cR += '#'+_id+' .icon { background-color: #'+item.maskInactive+'; -webkit-mask-size: auto '+(item.iconSize * 20)+'%; }'
			cR += '#'+_id+' input:checked + label .icon { background-color: #'+item.maskActive+' }'
		}
		switch (item.iconpos) {
			case 'top': 
				cR += '#'+_id+' .caption { line-height: '+parseInt(_dims.height*0.25)+'px; }';
				break;
			case '': 
				cR += '#'+_id+' .caption { line-height: '+_dims.height+'px; }';
				break;
			default: break;
		}
		cR += '</style>';
		
		cR += '<ul>';
		$.each(item.tabs, function(i,elm){
			cR += '<li id="'+_id+'-tabs-'+i+'">'
			cR += '<input type="radio" name="'+_id+'-radio-input" id="'+_id+'-radio-'+i+'" '+((item.activeTab == i) ? 'checked' : '')+' data-role="none">'
			cR += '<label for="'+_id+'-radio-'+i+'">'
			if(item.iconpos != "") {
				cR += '<style>'
				if(item.maskEnabled && $.browser.webkit) {
					cR += '#'+_id+' label[for='+_id+'-radio-'+i+'] .icon { -webkit-mask-image: url('+getAssetUrl(elm.icon)+'); }'
				} else {
					cR += '#'+_id+' label[for='+_id+'-radio-'+i+'] .icon { background-image: url('+getAssetUrl(elm.icon)+'); background-size: auto '+(item.iconSize * 20)+'%; }'
					if(!item.maskEnabled && elm.activeicon.url != '' && getAssetUrl(elm.activeicon) != getAssetUrl(elm.icon) &&  getAssetUrl(elm.activeicon) != '') {
						cR += '#'+_id+' input:checked + label[for='+_id+'-radio-'+i+'] .icon { background-image: url('+getAssetUrl(elm.activeicon)+'); background-size: auto '+(item.iconSize * 20)+'%; }'
					}
				}
				cR += '</style>'
				cR += '<div class="icon"></div>';
			}
			if(item.iconpos != "notext") {
				cR += '<span class="caption">'+elm.text+'</span>'
			}
			cR += '</li>'
		});
		cR += '</ul></div>'
		return cR;
	}
	,onResize: function(item,containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		var _dims = getRealDims(item);
		var _tabWidth = Math.floor((_dims.width - item.borderWidth*(item.tabs.length-1))/item.tabs.length); 
		switch (item.iconpos) {
			case 'top': 
				$('#'+_id+' .caption').css('line-height', parseInt(_dims.height*0.25)+'px')
				break;
			case '': 
				$('#'+_id+' .caption').css('line-height', _dims.height+'px')
				break;
			default: break;
		}
		
		$('#'+_id+' li').width(_tabWidth);
	}
	,properties: [
              prx.commonproperties.backgroundColor
              ,prx.commonproperties.borderWidth
              ,prx.commonproperties.borderColor
              ,{ 
            	  caption: 'Font', 
            	  name: 'textFont', 
            	  type: 'select', 
            	  value: function(item,name) { return item.textFont; }, 
            	  values:function() { return prx.comps.fonts; },
            	  hiddenByDefault: function(item) { return (item.iconpos == "notext"); }
              }
              ,{ 
            	  caption: 'Text Size', 
            	  name: 'textSize', 
            	  type: 'combo-select', 
            	  value: function(item,name) { return item.textSize; }, 
            	  values: prx.comps.textsize,
            	  hiddenByDefault: function(item) { return (item.iconpos == "notext"); }
              }
              ,{ 
            	  caption: 'Text Color', 
            	  name: 'textColor', 
            	  type: 'colorpicker', 
            	  value: function(item,name) { return item.textColor; } ,
                  hiddenByDefault: function(item) { return (item.iconpos == "notext"); }
              }
              ,{ 
            	  caption: 'Text properties', 
            	  name: 'textProperties', 
            	  type: 'checkbox', 
            	  value: function(item,name) { if(typeof(item.textProperties) == "undefined") {item.textProperties = [];} return item.textProperties; }, 
            	  values: [{ value: 'bold', displayValue: '<b style="font-family: Georgia">B</b>'}, { value: 'italic', displayValue: '<i style="font-family: Georgia">I</i>'}, { value: 'underline', displayValue: '<u style="font-family: Georgia">U</u>'}],
     	          hiddenByDefault: function(item) { return (item.iconpos == "notext"); }
   	           }
              ,{
      			caption: 'Active background Color'
      				,name: 'activeBackgroundColor'
      				,type: 'colorpicker'
      				,value: function(item, name){
      					return item.activeBackgroundColor;
      				}
      			}
      			,{
      				caption: 'Active Text Color'
      				,name: 'activeTextColor'
      				,type: 'colorpicker'
      				,value: function(item, name){
      					return item.activeTextColor;
      				}
      				,hiddenByDefault: function(item) { return (item.iconpos == "notext"); }
      			}
            	,{
        			caption: 'Icon position'
        			,name: 'iconpos'
        			,type: 'select'
        			,value: function(item,name) {
	      				return item.iconpos;
	            		}
	      			,values: [{value: '',displayValue: 'No icon'},{value: 'top',displayValue: 'Top'},{value: 'notext',displayValue: 'Icon only (no text)'}]
	      		    ,onChange: function(item){
	      				if(item.iconpos == '') {
	      					$('[id=property-icon], [id=property-activeicon], #property-iconSize').hide();
	      				} else {
	      					$('[id=property-icon], [id=property-activeicon], #property-iconSize').show();
	      				}
	      				if(item.iconpos == 'notext') {
	      					$('[id=property-text], #property-textSize, #property-textFont, #property-textColor, #property-textProperties').hide();
	      				} else {
	      					$('[id=property-text], #property-textSize, #property-textFont, #property-textColor, #property-textProperties').show();
	      				}
	      				return false;
	      			}
            	}
	      		,
	      		{
	      			caption: 'Icon Size'
	      			,name: 'iconSize'
	      			,type: 'slider-select'
	      			,value: function(item,name) {
	      				return item.iconSize;
	      			}
	      			,values: [{ value: '1', displayValue: 'Very small'}, { value: '2', displayValue: 'Small'}, { value: '3', displayValue: 'Normal'}, { value: '4', displayValue: 'Large'}, { value: '5', displayValue: 'Full'}]
	      			,hiddenByDefault: function(item,name){
	      				return (item.iconpos == '');
	      			}
	      		}
	      		,
	      		{
	      			caption: 'Mask icons'
	      			,name: 'maskEnabled'
	      			,type: 'onoff'
	      			,value: function(item,name) { return item.maskEnabled; }
		      		,hiddenByDefault: function(item,name){
	      				return (item.iconpos == '');
	      			}
		      		,onChange: function(item) {
	      				if(item.maskEnabled) {
	      					$('#property-maskInactive, #property-maskActive').show();
	      					$('[id=property-activeicon]').hide();
	      				} else {
	      					$('#property-maskInactive, #property-maskActive').hide();
	      					$('[id=property-activeicon]').show();
	      				}
	      			}
	      		}
	      		,
	      		{
	      			caption: 'Inactive tab mask'
	      			,name: 'maskInactive'
	      			,type: 'colorpicker'
	      			,value: function(item,name) { return item.maskInactive; }
		      		,hiddenByDefault: function(item,name){
	      				return (!item.maskEnabled);
	      			}
	      		}
	      		,
	      		{
	      			caption: 'Active tab mask'
	      			,name: 'maskActive'
	      			,type: 'colorpicker'
	      			,value: function(item,name) { return item.maskActive; }
		      		,hiddenByDefault: function(item,name){
	      				return (!item.maskEnabled);
	      			}
	      		}
	      		,
	  			{
	  	  			caption: 'Active tab'
	  	  			,name: 'activeTab'
	  	  			,type: 'select'
	  	  			,value: function(item,name) {
	  	      			return item.activeTab;
	  	      		}
	  	      		,values: function(item,name) {
	  	      			//var _rA = []; 
	  	      			var _rA = [{value: '999',displayValue: 'None'}];
	  	      			for (var n = 0; n < item.tabs.length; n++) {
	  	      				_rA.push({value: n,displayValue: item.tabs[n].text});
	  	      			}	
	  	      			return _rA;
	  	      		} 
	  			}
	      		,
	  	      	{
	  					caption: 'Position fixed on transitions'
	  					,name: 'overlay'
	  					,type: 'onoff'
	  					,value: function(item,name) {
	  						if(typeof(item.overlay)=="undefined") {
	  							return false;
	  						}
	  						return item.overlay;
	  					}
	  	      	}
           ]
           ,dynamicProperties: {
       		data: 'tabs'
       		,propertyCaption: 'Tabs'
        	,propertyName: 'Tab'
       		,addCaption: 'Add tab'
       		,deleteCaption: 'Delete'
       		,blankItem: {
       			text: 'Label',
       			icon: {"fileId":"7f4301fa16336a8be7eb2323accc0d54.png","folderId":"f1304072873692","assetType":"gallery","url":"f1304072873692/7f4301fa16336a8be7eb2323accc0d54.png","name":"028-star@2x.png"},
				activeicon: { fileId: '', folderId: '', url: '', assetType: '', name: '' },
       			actions: []
       		}
       		,captionProperty: 'text'
      		,properties: [
      			{
      				caption: 'Text'
      				,name: 'text'
      				,type: 'input'
      				,value: function(item,name,index) {
      					return item.tabs[index].text;
      				}
      				,hiddenByDefault: function(item,name){
      					return (item.iconpos == 'notext');
      				}
      			}
      			,
      			{
      				caption: 'Icon'
      				,name: 'icon'
      				,type: 'combo-asset'
      				,displayValue: function(item,name,index) {
      					if(item.tabs[index].icon.url == '') {
      						return 'No icon selected';
      					}
      					return item.tabs[index].icon.name;
      				}
      				,value: function(item,name,index) {
      					return $.toJSON({
      						allow: 'image',
      						asset: item.tabs[index].icon
      					});
      				}
    				,hiddenByDefault: function(item,name,index){
    					return (item.iconpos == '');
    				}
      			}
      			,
      			{
      				caption: 'Active Icon (optional)'
      				,name: 'activeicon'
      				,type: 'combo-asset'
      				,displayValue: function(item,name,index) {
      					if(item.tabs[index].activeicon.url == '') {
      						return 'No icon selected';
      					}
      					return item.tabs[index].activeicon.name;
      				}
      				,value: function(item,name,index) {
      					return $.toJSON({
      						allow: 'image',
      						asset: item.tabs[index].activeicon
      					});
      				}
    				,hiddenByDefault: function(item,name,index){
    					if(item.iconpos == '') {
    						return true;
    					}
    					return (item.maskEnabled);
    				}
      			}
      			,
      			{
      				caption: 'Interactions'
      				,name: 'actions'
      				,type: 'action'
      				,value: function(item,name,index) {
      					if (typeof(item.tabs[index].actions) == "undefined") {
      						item.tabs[index].actions = [];
      					}		
      				
      					return item.tabs[index].actions.length;
      				}
      			}    
              ]
	}
}

/***** /TOOLBAR COMPONENTS *****/


/***** /FORM COMPONENTS *****/
//TYPE: GENERIC ONOFF SWITCH
prx.types.generic_onoffswitch = {
	name: 'generic_onoffswitch'
	,onDisplay: function(item,containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		
		var _active = ''
		if(item.active) {
			_active = 'checked="checked"';
		}
		
		var cR = '<div id="' + _id + '" class="box pos type-generic-onoffswitch">'
		
		cR += '<style>';
		cR += '#'+_id+' label { border-radius: '+item.borderRadius+'px;}'
		cR += '#'+_id+' .onoffswitch-inner div { line-height: '+(item.height-4)+'px; }'
		cR += '#'+_id+' .onoffswitch-inner .active { background-color: #'+item.activeLabelColor+'; color: #'+item.activeLabelTextColor+'; }'
		cR += '#'+_id+' .onoffswitch-inner .inactive { background-color: #'+item.inactiveLabelColor+'; color: #'+item.inactiveLabelTextColor+'; }'
		cR += '#'+_id+' .onoffswitch-switch { background-color: #'+item.switchColor+'; width: '+item.switchSize+'px; border-radius: '+item.borderRadius+'px; margin: '+((item.height - item.switchSize)/2)+'px; right: '+(item.width-(Number(item.switchSize) + 4 + (item.height - Number(item.switchSize))))+'px; }'
		cR += '</style>'
		
		cR += '<input type="checkbox" '+_active+ ' id="'+_id+'-onoffswitch" data-role="none" >'
		cR += '<label for="'+_id+'-onoffswitch">'
		cR += '<div class="onoffswitch-inner">'
		cR += '<div class="active">'+item.activeLabelText+'</div>'
		cR += '<div class="inactive">'+item.inactiveLabelText+'</div>'
		cR += '</div>'
		cR += '<div class="onoffswitch-switch"></div>'
		cR += '</label>'
		cR += '</div>'
		
		return cR;
	}
	,properties: [
	        { 
	        	caption: 'Border Radius (px)', 
	        	name: 'borderRadius', 
	        	type: 'slider-select', value: function(item,name) { return item.borderRadius; }, 
	        	values: { min: 0, max: 50, step: 1 } 
	        },
      		{
      			caption: 'Switch color'
      			,name: 'switchColor'
      			,type: 'colorpicker'
      			,value: function(item,name) {
      				return item.switchColor;
      			}
      		},
	        { 
	        	caption: 'Switch size', 
	        	name: 'switchSize', 
	        	type: 'slider-select', value: function(item,name) { return item.switchSize; }, 
	        	values: { min: 5, max: 60, step: 1 } 
	        }
      		,
      		{
      			caption: 'Active Label Text'
      			,name: 'activeLabelText'
      			,type: 'input'
      			,value: function(item,name) {
      				return item.activeLabelText;
      			}
      		}
      		,
      		{
      			caption: 'Active Label Color'
      			,name: 'activeLabelColor'
      			,type: 'colorpicker'
      			,value: function(item,name) {
      				return item.activeLabelColor;
      			}
      		}
      		,
      		{
      			caption: 'Active Label Text Color'
      			,name: 'activeLabelTextColor'
      			,type: 'colorpicker'
      			,value: function(item,name) {
      				return item.activeLabelTextColor;
      			}
      		}
      		,
      		{
      			caption: 'Inactive Label Text'
      			,name: 'inactiveLabelText'
      			,type: 'input'
      			,value: function(item,name) {
      				return item.inactiveLabelText;
      			}
      		}
      		,
      		{
      			caption: 'Inactive Label Color'
      			,name: 'inactiveLabelColor'
      			,type: 'colorpicker'
      			,value: function(item,name) {
      				return item.inactiveLabelColor;
      			}
      		}
      		,
      		{
      			caption: 'Inactive Label Text Color'
      			,name: 'inactiveLabelTextColor'
      			,type: 'colorpicker'
      			,value: function(item,name) {
      				return item.inactiveLabelTextColor;
      			}
      		}
      		,
      		{
      			caption: 'Active'
      			,name: 'active'
      			,type: 'onoff'
      			,value: function(item,name) {
      				return item.active;
      			}
      		}
      		,{ 
      			caption: 'Interactions on activation', 
      			name: 'flipswitchActionsOnActive', 
      			type: 'action',
      			value: function(item,name) {
	      			if(typeof(item.flipswitchActionsOnActive) == "undefined") {
	      				item.flipswitchActionsOnActive = []; 
	      			}
	      			return item.flipswitchActionsOnActive.length; 
      			} 
      		}
      		,{ 
      			caption: 'Interactions on deactivation', 
      			name: 'flipswitchActionsOnDeactive', 
      			type: 'action', 
      			value: function(item,name) {
      				if(typeof(item.flipswitchActionsOnDeactive) == "undefined") {
  						item.flipswitchActionsOnDeactive = []; 
      				}
      				return item.flipswitchActionsOnDeactive.length; 
      			}  
      		}
      	]
}
/***** /FORM COMPONENTS *****/







/************************************* COMPONENTS (OBJECTS) *************************************/

/***** BASIC COMPONENTS *****/
prx.components.text = {
	name: 'text'
	,type: 'text'
	,lib: _library
	,caption: 'Text'
	,icon: '0 0'
	,helper: prx.url.devices+'/common/text/helper.png'		
	,text: 'Sample text'
	,textFont: 'sans-serif,Helvetica Neue,Arial'
	,textSize: "16"
	,textColor:  '000000'
	,backgroundColor:  'none'
	,width:"82"
	,height:"20"
	,textProperties: []
	,textAlign: 'left'
	,enableShadow: false
	,autoResize: true
}

prx.components.richtext = {
	name: 'richtext'
	,type: 'richtext'
	,lib: _library
	,caption: 'Rich Text'
	,icon: '-80px 0'
	,helper: prx.url.devices+'/common/richtext/helper.png'		
	,text: 'Sample text'
	,width:"200"
	,height:"150"
}

prx.components.rectangle = {
	name: 'rectangle'
	,type: 'rectangle'
	,lib: _library
	,caption: 'Rectangle'
	,icon: '-160px 0'
	,helper: prx.url.devices+'/common/rectangle/helper.png'
	,backgroundColor: 'CCCCCC'
	,borderWidth: '1'
	,borderColor: '4c4c4c'
	,borderRadius: 0
	,width:"100"
	,height:"100"
	,actions:[]
}

prx.components.circle = {
	name: 'circle'
	,type: 'circle'
	,lib: _library
	,caption: 'Circle'
	,icon: '-240px 0'
	,helper: prx.url.devices+'/common/circle/helper.png'
	,backgroundColor: 'CCCCCC'
	,borderWidth: '1'
	,borderColor: '4c4c4c'
	,borderRadius: '50%'
	,width:"100"
	,height:"100"
	,actions:[]
}

prx.components.horizontalline = {
	name: 'horizontalline'
	,type: 'horizontalline'
	,lib: _library
	,caption: 'Horizontal line'
	,icon: '-320px 0'
	,helper: prx.url.devices+'/common/horizontalline/helper.png'
	,width:"100"
	,height:"1"
	,resizable : true
	,resizeHandles : "e,w"
	,color: prx.comps.defaultcolor
	,weight: 1
	,properties: "v,l,o,hpos,vpos,w"
}

prx.components.verticalline = {
	name: 'verticalline'
	,type: 'verticalline'
	,lib: _library
	,caption: 'Vertical line'
	,icon: '-400px 0'
	,helper: prx.url.devices+'/common/verticalline/helper.png'
	,width:"1"
	,height:"100"
	,resizable : true
	,resizeHandles : "n,s"
	,color: prx.comps.defaultcolor
	,weight: 1
	,properties: "v,l,o,hpos,vpos,h"
}

prx.components.actionarea = {
	name: 'actionarea'
	,type: 'actionarea'
	,lib: _library
	,caption: 'Interaction Area'
	,icon: '-480px 0'
	,helper: prx.url.devices+'/common/actionarea/helper.png'
	,width:"100"
	,height:"100"
}

prx.components.image = {
	name: 'image'
	,type: 'image'
	,lib: _library
	,caption: 'Image'
	,icon: '-640px 0'
	,helper: prx.url.devices+'/common/image/helper.png'
	,imgSrc: {"fileId":"486ce0359016fcae76b332576ac4fa95.png","folderId":"f1353077251107","assetType":"gallery","url":"f1353077251107/486ce0359016fcae76b332576ac4fa95.png","bucketsource":"main","name":" barbados_small.png"}
	,repeat: false
	,width:"200"
	,height:"125"
	,propagateEvents: false
	,actions:[]
  	,overlay: false
  	,autoResize: true
}

prx.components.icon = {
	name: 'icon'
	,type: 'image'
	,lib: _library
	,caption: 'Icon'
	,icon: '-800px 0'
	,helper: prx.url.devices+'/common/icon/helper.png'
	,imgSrc: {"fileId":"f870b75c7ca176f7edefab7f79b0d24b.svg","name":"circle-star.svg","assetType":"icon","bucketsource":"static","url":"f1352971179296/f870b75c7ca176f7edefab7f79b0d24b.svg","folderId":"f1352971179296"}
	,repeat: false
	,width:"100"
	,height:"100"
	,propagateEvents: false
	,actions:[]
  	,overlay: false
}


prx.components.placeholder = {
	name: 'placeholder'
	,type: 'placeholder'
	,lib: _library
	,caption: 'Placeholder'
	,icon: '-720px 0'
	,helper: prx.url.devices+'/common/placeholder/helper.png'
	,width:"200"
	,height:"100"
	,text: 'Placeholder'
	,textSize: 16
	,textAlign: 'center'
	,backgroundColor: 'ffffff'
	,borderColor: '333333'
	,thickness: 5
	,actions:[]
}

prx.components.webview = {
	name: 'webview'
	,type: 'webview'
	,lib: _library
	,caption: 'Web View'
	,icon: '0 -80px'
	,helper: prx.url.devices+'/common/webview/helper.png'		
	,url: 'about:blank'
	,width:"100"
	,height:"100"
}

prx.components.html = {
	name: 'html'
	,type: 'html'
	,lib: _library
	,caption: 'HTML Code'
	,icon: '-80px -80px'
	,helper: prx.url.devices+'/common/html/helper.png'		
	,width:"100"
	,height:"100"
	,html: ''
}

prx.components.audio = {
	name: 'audio'
	,type: 'audio'
	,lib: _library
	,caption: 'Audio'
	,icon: '-240px -80px'
	,helper: prx.url.devices+'/common/audio/helper.png'		
	,width:"300"
	,height:"65"
	,audioFileWAV: { fileId: '', folderId: '', url: '', assetType: '', name: '' }
	,audioFileMP3: { fileId: '', folderId: '', url: '', assetType: '', name: '' }
	,audioFileOGG: { fileId: '', folderId: '', url: '', assetType: '', name: '' }
	,audioFileAAC: { fileId: '', folderId: '', url: '', assetType: '', name: '' }
	,controls: true
	,preload: false
	,autoplay: false
}

prx.components.video = {
	name: 'video'
	,type: 'video'
	,lib: _library
	,caption: 'Video'
	,icon: '-160px -80px'
	,helper: prx.url.devices+'/common/video/helper.png'		
	,width:"250"
	,height:"180"
	,videoType: 'html5'
	,videoFileMP4: { fileId: '', folderId: '', url: '', assetType: '', name: '' }
	,videoFileOGG: { fileId: '', folderId: '', url: '', assetType: '', name: '' }
	,videoFileWEBM: { fileId: '', folderId: '', url: '', assetType: '', name: '' }
	,controls: true
	,preload: false
	,autoplay: false
	,placeholder: { fileId: '', folderId: '', url: '', assetType: '', name: '' }
	,youtubeid: ''
	,vimeoid: ''
}

prx.components.animationtarget = {
	name: 'animationtarget'
	,type: 'animationtarget'
	,lib: _library
	,caption: 'Animation target'
	,icon: '-560px 0'
	,helper: prx.url.devices+'/common/animationtarget/helper.png'
	,width:"20"
	,height:"20"
	,resizable : false
	,properties: "v,l,hpos,vpos"
	,fixPositioning: true
}

prx.components.tooltip = {
	name: 'tooltip'
	,type: 'tooltip'
	,lib: _library
	,caption: 'Tooltip'
	,icon: '-320px -80px'
	,helper: prx.url.devices+ '/common/tooltip/helper.png'
	,width: '250'
	,height: '150'
	,resizable : true
	,borderColor: '333333'
	,backgroundColor: 'ffffff'
	,borderWidth: 3
	,borderRadius: 5
	,ttDirection: 'bottom'
	,ttPosition: '50'
	,text: ''
	,textFont: 'sans-serif,Helvetica Neue,Arial'
	,textSize: '12'
	,textColor: '333333'
	,textProperties: [] 
	,textAlign: 'left'
};

/***** /BASIC COMPONENTS *****/

/***** TOOLBAR COMPONENTS *****/
prx.components.basic_tabbar = {
	name: 'basic_tabbar'
	,type: 'basic_tabbar'
	,lib: _library
	,caption: 'Basic Tabbar'
	,icon: '-560px -80px'
	,helper: prx.url.devices+ '/common/basic_tabbar/helper.png'
	,width:"full"
	,height:"50"
	,vpos: "bottom"
	,resizable : true
	,backgroundColor: 'FFFFFF'
	,borderWidth: 0
	,borderColor: 'cccccc'
	,textFont: 'sans-serif,Helvetica Neue,Arial'
	,textSize: "10"
	,textColor:  '333333'
	,textProperties: ["bold"]
	,iconpos: 'top'
	,iconSize: 3
	,activeBackgroundColor: '005fbf'
	,activeTextColor: 'FFFFFF'
	,maskEnabled: true
	,maskInactive: '333333'
	,maskActive: 'FFFFFF'
	,activeTab: 0
	,overlay: false
	,tabs: [
		{
	    	text: 'Home'
	    	,icon: {"fileId":"e6a1ba573190139ceda51280e9fdad9c.svg","name":"kub-home.svg","assetType":"icon","bucketsource":"static","url":"f1352971179296/e6a1ba573190139ceda51280e9fdad9c.svg","folderId":"f1352971179296","targetSrc":"generated/e6a1ba573190139ceda51280e9fdad9c_333333.svg","color":"333333"}
			,activeicon: {"fileId":"e6a1ba573190139ceda51280e9fdad9c.svg","name":"kub-home.svg","assetType":"icon","bucketsource":"static","url":"f1352971179296/e6a1ba573190139ceda51280e9fdad9c.svg","folderId":"f1352971179296","targetSrc":"generated/e6a1ba573190139ceda51280e9fdad9c_ffffff.svg","color":"ffffff"}
			,actions: []
	    },
		{
	    	text: 'Messages'
	    	,icon: {"fileId":"1b58b288e91e6a4cb64d90433880003d.svg","name":"mail-2.svg","assetType":"icon","bucketsource":"static","url":"f1352971179296/1b58b288e91e6a4cb64d90433880003d.svg","folderId":"f1352971179296","targetSrc":"generated/1b58b288e91e6a4cb64d90433880003d_333333.svg","color":"333333"}
		    ,activeicon: {"fileId":"1b58b288e91e6a4cb64d90433880003d.svg","name":"mail-2.svg","assetType":"icon","bucketsource":"static","url":"f1352971179296/1b58b288e91e6a4cb64d90433880003d.svg","folderId":"f1352971179296","targetSrc":"generated/1b58b288e91e6a4cb64d90433880003d_ffffff.svg","color":"ffffff"}
			,actions: []
		}
    ]
}

prx.components.basic_tabbar_retina = {
	name: 'basic_tabbar_retina'
	,type: 'basic_tabbar'
	,lib: _library
	,caption: 'Basic Tabbar'
	,icon: '-560px -80px'
	,helper: prx.url.devices+ '/common/basic_tabbar_retina/helper.png'
	,width:"full"
	,height:"96"
	,vpos: "bottom"
	,resizable : true
	,backgroundColor: 'FFFFFF'
	,borderWidth: 0
	,borderColor: 'cccccc'
	,textFont: 'sans-serif,Helvetica Neue,Arial'
	,textSize: "21"
	,textColor:  '333333'
	,textProperties: ["bold"]
	,iconpos: 'top'
	,iconSize: 3
	,activeBackgroundColor: '005fbf'
	,activeTextColor: 'FFFFFF'
	,maskEnabled: true
	,maskInactive: '333333'
	,maskActive: 'FFFFFF'
	,activeTab: 0
	,overlay: false
	,tabs: [
		{
	    	text: 'Home'
	    	,icon: {"fileId":"e6a1ba573190139ceda51280e9fdad9c.svg","name":"kub-home.svg","assetType":"icon","bucketsource":"static","url":"f1352971179296/e6a1ba573190139ceda51280e9fdad9c.svg","folderId":"f1352971179296","targetSrc":"generated/e6a1ba573190139ceda51280e9fdad9c_333333.svg","color":"333333"}
			,activeicon: {"fileId":"e6a1ba573190139ceda51280e9fdad9c.svg","name":"kub-home.svg","assetType":"icon","bucketsource":"static","url":"f1352971179296/e6a1ba573190139ceda51280e9fdad9c.svg","folderId":"f1352971179296","targetSrc":"generated/e6a1ba573190139ceda51280e9fdad9c_ffffff.svg","color":"ffffff"}
			,actions: []
	    },
		{
	    	text: 'Messages'
	    	,icon: {"fileId":"1b58b288e91e6a4cb64d90433880003d.svg","name":"mail-2.svg","assetType":"icon","bucketsource":"static","url":"f1352971179296/1b58b288e91e6a4cb64d90433880003d.svg","folderId":"f1352971179296","targetSrc":"generated/1b58b288e91e6a4cb64d90433880003d_333333.svg","color":"333333"}
		    ,activeicon: {"fileId":"1b58b288e91e6a4cb64d90433880003d.svg","name":"mail-2.svg","assetType":"icon","bucketsource":"static","url":"f1352971179296/1b58b288e91e6a4cb64d90433880003d.svg","folderId":"f1352971179296","targetSrc":"generated/1b58b288e91e6a4cb64d90433880003d_ffffff.svg","color":"ffffff"}
			,actions: []
		}
    ]
}

/***** /TOOLBAR COMPONENTS *****/

/***** FORM COMPONENTS *****/
prx.components.generic_onoffswitch = {
		name: 'generic_onoffswitch'
		,type: 'generic_onoffswitch'
		,lib: _library
		,caption: 'Generic On/Off Switch'
		,icon: '-480px -240px'
		,helper: 'flipswitch/helper.png'
		,width:"90"
		,height:"30"
		,resizable : true
		,borderRadius: 5
		,switchColor: 'FFFFFF'
		,switchSize: 34
		,activeLabelText: 'ON'
		,activeLabelColor: '6194FD'
		,activeLabelTextColor: 'FFFFFF'
		,inactiveLabelText: 'OFF'
		,inactiveLabelColor: 'FFFFFF'
		,inactiveLabelTextColor: '666666'
		,active: true
		,flipswitchActionsOnActive: []
		,flipswitchActionsOnDeactive: []
	}

/***** /FORM COMPONENTS *****/


/************************************ FUNCTIONS ****************************************/


/* FOR DYNAMIC CREATION OF TYPES */
function removeObjMembers (obj, toRemove) {
	var _len = toRemove.length;
	for(var i=0;i<_len;i++) {
		delete obj[toRemove[i]];
	}
	return obj;
}

function editProperty(props, prop, memberName, newValue) {
	var _len = props.length;
	for(var i=0;i<_len;i++) {
		if(props[i].name == prop){
			props[i][memberName] = newValue;			
			return props;
		}
	}
	return props;
}

function removeProperties(props, toRemove) {
	var _len = props.length;
	for(var i=0;i<_len;i++) {
		if(toRemove.indexOf(props[i].name) != -1){
			props.splice(i, 1);
			i--;
			_len--;
		}
	}
	return props;
}

// ADAPTED FROM http://my.opera.com/GreyWyvern/blog/show.dml/1725165
function cloneobject(obj) {
	var newObj = (obj instanceof Array) ? [] : {};
	for (i in obj) {
		if (i == 'clone') continue;
		if (obj[i] && typeof obj[i] == "object") {
			newObj[i] = cloneobject(obj[i]);
		} else newObj[i] = obj[i]
	} return newObj;
};
/* /FOR DYNAMIC CREATION OF TYPES */

function getRealDims(item, symbol) {
	var dims = {}; 
	dims.width = item.width;
	dims.height = item.height;
	
	if(typeof(symbol) == "undefined") {
		if(dims.width == 'full') { dims.width = $('#dragarea').width(); }
		if(item.wtype == 'variable') { 
			dims.width = $('#dragarea').width() - dims.width;
		}
		
		if(dims.height == 'full') { dims.height = $('#dragarea').height(); }
		if(item.htype == 'variable') { 
			dims.height = $('#dragarea').height() - dims.height; 
		}
	} else {
		var _symbolDims = prx.symbols[prx.getSymbolIndexFromId(symbol.symbolid)].dimensions;
		
		if(dims.width == 'full') { dims.width = symbol.width; }
		if(item.wtype == 'variable') { 
			dims.width = _symbolDims[0] - dims.width; 
		}
		
		if(dims.height == 'full') { dims.height = symbol.height; }
		if(item.htype == 'variable') { 
			dims.height = _symbolDims[1] - dims.height; 
		}
	}
	return dims;
}

function getRealPos(item, symbol) {
	var pos = {}; 
	pos.left = item.left;
	pos.top = item.top;
	
	if(typeof(symbol) == "undefined") {
		if(item.hpos == 'right') { 
			pos.left = $('#dragarea').width() - item.width - item.left;
		} else if(item.hpos == 'center') {
			pos.left = ($('#dragarea').width() - item.width)/2
		}
		
		if(item.vpos == 'bottom') { 
			pos.top = $('#dragarea').height() - item.height - item.top;
		} else if(item.vpos == 'middle') {
			pos.top = ($('#dragarea').height() - item.height)/2
		}
	} else {
		// ?
	}
	
	return pos;
}


function getAssetUrl(asset) {
	var assetType = asset.assetType;
	var url = asset.url;
	
	if (asset.bucketsource == "static") {	
		if(typeof(asset.targetSrc) != "undefined") {
			return prx.url.staticassets + '/' + asset.targetSrc;
		}
		return prx.url.staticassets + '/assets/' + url;
	}
	
	if(assetType == 'project') { url = '/assets/' + assetType + '/' + prx.projectid + '/' + url; } 
	else { url = '/assets/' + assetType + '/' + url; }	

	if (typeof(prx.s3Links) != "undefined") {	
		if (typeof(prx.s3Links[url]) != "undefined") {
			return prx.s3Links[url];
		}
	}
	//		prx.url['static-assets']
	return url;
}

function getFontCssFromFontFamily(fontfamily){
	if(typeof(fontfamily) == "undefined") {
		return "";
	}
	
	var fontOpts = fontfamily.split(':')
	
	var str = 'font-family: '+fontOpts[0]+';';
	
	if(fontOpts.length == 1) {
		return str;
	}
	
	if(fontOpts[1] == "regular") { return str; }
	
	if(fontOpts[1].indexOf('italic')!= -1) { 
		str += 'font-style: italic; ' 
	}
	if(!isNaN(parseInt(fontOpts[1], 10))) {
		str += 'font-weight: ' + parseInt(fontOpts[1], 10) + ';'
	}
	return str;
	
}

// taken from http://thomas.bindzus.me/2007/12/24/adding-dynamic-contents-to-iframes/
function IFrame(parentElement) {
   var iframe = document.createElement("iframe");
   if(parentElement == null)
      parentElement = document.body;
   parentElement.appendChild(iframe);
   iframe.doc = null;
   if(iframe.contentDocument) // Firefox, Opera
      iframe.doc = iframe.contentDocument;
   else if(iframe.contentWindow) // Internet Explorer
      iframe.doc = iframe.contentWindow.document;
   else if(iframe.document) // Others?
      iframe.doc = iframe.document;
 
   if(iframe.doc == null)
      //throw "Document not found, append the parent element to the DOM before creating the IFrame";
	  throw "We apologize, an error occured.";
   iframe.doc.open();
   iframe.doc.close();
   return iframe;
}