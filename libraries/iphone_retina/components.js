/********************************************************************************************/
/********************************************************************************************/
/*******************************            IPHONE             ******************************/
/********************************************************************************************/
/********************************************************************************************/


/************************************* DEVICE SETTINGS *************************************/
/*
prx.devices.iphone = {
		name: "iphone"
		,caption: "iPhone 4 Retina Display"
		,defaultOrientation: 'portrait' // portrait, landscape
		,portrait: [320,480]
		,landscape: [480,320]
		,statusbarportrait: [320,460]
		,statusbarlandscape: [480,300]
		,normalportrait: [320,480]
		,normallandscape: [480,320]
}
*/

var _library = 'iphone_retina';
var _path = '/iphone_retina/';

/************************************* COMPONENT TYPES *************************************/
/***** TOOLBAR COMPONENTS *****/
//TYPE: TOOLBAR
prx.types.toolbar_retina = {
	name: "toolbar_retina"
	,onDisplay: function(item,containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;

		if(typeof(item.overlay) == "undefined") { item.overlay = false; }
		
		var _grad =  cssRGBA(item.backgroundColor, 25);
		var _grad2 =  cssRGBA(item.backgroundColor, 65);
		var _grad3 =  cssRGBA(item.backgroundColor, 20);
		var _bgHeader = cssGradient([{ c: _grad2, p: 0 }, { c: _grad, p: 49}, { c: _grad3, p: 50}, { c: '#' + item.backgroundColor, p: 100 }]);
		var cReturn = '<div id="'+_id+'" class="box pos type-toolbar-retina" '+((item.overlay)? 'data-overlay="1"': '')+'><div class="inner" style="'+_bgHeader+'"></div></div>';
		return cReturn;
	}
	,properties: [
		prx.commonproperties.backgroundColor
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
}

//TYPE: HEADER
prx.types.header_retina = {
	name: "header_retina"
		,onDisplay: function(item,containerid,pageid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;

		if(typeof(item.overlay) == "undefined") { item.overlay = false; }
		
		var _bold = (jQuery.inArray("bold",item.textProperties)>-1) ? " font-weight: bold;" : "";
		var _italic = (jQuery.inArray("italic",item.textProperties)>-1) ? " font-style: italic;" : "";
		var _underline = (jQuery.inArray("underline",item.textProperties)>-1) ? " text-decoration: underline;" : "";

		var _grad =  cssRGBA(item.backgroundColor, 25);
		var _grad2 =  cssRGBA(item.backgroundColor, 65);
		var _grad3 =  cssRGBA(item.backgroundColor, 20);
		var _bgHeader = cssGradient([{ c: _grad2, p: 0 }, { c: _grad, p: 49}, { c: _grad3, p: 50}, { c: '#' + item.backgroundColor, p: 100 }]);
		
		var _dims = getRealDims(item,symbol);
		var cReturn = '<div id="'+_id+'" class="box pos type-header-retina" '+((item.overlay)? 'data-overlay="1"': '')+'><div class="inner" style="'+_bgHeader+' '+getFontCssFromFontFamily(item.textFont)+' font-size: '+item.textSize+'px; color: #'+item.textColor+';text-align: center;line-height:'+_dims.height+'px;'+_bold+_underline+_italic+' text-shadow: 0 -1px 0 rgba(0,0,0,0.5);">'+item.text+'</div></div>';
		return cReturn;
	}
	,onResize: function(item,containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		var _dims = getRealDims(item);
		$("#"+_id+' .inner').css("line-height", _dims.height + "px");
	}
	,properties: [
		{
				caption: 'Header Text'
				,name: 'text'
				,type: 'input'
				,value: function(item,name) {
				return item.text;
			}
		}
		,prx.commonproperties.textFont
		,prx.commonproperties.textSize
		,prx.commonproperties.textColor
		,prx.commonproperties.textProperties
		,prx.commonproperties.backgroundColor
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
}

//TYPE: TAB BAR
prx.types.tabbar_retina = {
	name: "tabbar_retina"
	,onDisplay: function(item,containerid,pageid,symbol) {

		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
	
		var cR = "";
		var icon = '';
		
		var _dims = getRealDims(item,symbol);
		var _itemwidth = _dims.width;

		var _width = Math.floor(_itemwidth/item.tabs.length);
		var _bg = cssGradient([{ c: '#3F3F3F', p: 0 }, { c: '#0F0F0F', p: 49}, { c: '#000000', p: 50 }]); 
		
		if(typeof(item.overlay) == "undefined") { item.overlay = false; }
		if(typeof(item.iconSize) == "undefined") { item.iconSize = 3; }
		if(typeof(item.maskIcons) == "undefined") { item.maskIcons = true; }
		
		cR = cR +  '<div id="' + _id + '" class="box pos type-tabbar-retina '+((item.iconSize==4) ? 'large-icons' : '') +'" '+((item.overlay)? 'data-overlay="1"': '')+' style="'+_bg+'">';
		if(item.maskIcons && $.browser.webkit && !prx.editor) {
			cR = cR += '<style>#'+_id+' li input:checked + label em { background: ' + prx.tabbargradient + '!important; }</style>';
		}
		cR = cR +  '<ul>';
		
		var _iconActive = 'background: ' + prx.tabbargradient + ';';
		
		$.each(item.tabs, function(i,elm){
			_icon = '';
			if(item.maskIcons && $.browser.webkit && !prx.editor) {
				_icon += '-webkit-mask-image: url('+getAssetUrl(elm.icon)+'); background: -webkit-gradient(linear, left top, left bottom, from(#555555), to(#666666));';
			} else {
				_icon += 'background-image: url('+getAssetUrl(elm.icon)+');';
			}
			
			var cChecked = '';
			if (i==item.selected) {
				cChecked = ' checked="checked"';
			}
			cR += '<li id="'+_id+'-tabs-'+i+'" style="width: '+_width+'px;">';
			cR += '<input type="radio" name="'+_id+'-radio" id="'+_id+'-radio-'+i+'"'+cChecked+' data-role="none" />';
			cR += '<label for="'+_id+'-radio-'+i+'"><em style="'+_icon+'+"><img src="'+getAssetUrl(elm.icon)+'" /></em><span class="caption">'+elm.caption+'</span></label>';
			cR += '</li>'; 
		});
		cR = cR +  '</ul>';
		cR = cR + '</div>';
		
		return cR;
	}
	,onResize: function(item, containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		var _dims = getRealDims(item);		
		var _width = Math.floor(_dims.width/item.tabs.length);
		
		$('#'+_id+' li').width(_width);
	}
	,properties: [
	              	{
		      			caption: 'Active tab'
		      			,name: 'selected'
		      			,type: 'select'
		      			,value: function(item,name) {
	              			return item.selected;
	              		}
	              		,values: function(item,name) {
	              			var _rA = [{value: '999',displayValue: 'None'}];
	              			for (var n = 0; n < item.tabs.length; n++) {
	              				_rA.push({value: n,displayValue: item.tabs[n].caption});
	              			}	
	              			return _rA;
	              		} 
	      			},
	      			{
	      				caption: 'Icon Size'
	      				,name: 'iconSize'
	      				,type: 'select'
	      				,value: function(item,name) {
	      					return item.iconSize;
	      				}
	      				,values: [{ value: '3', displayValue: 'Normal'}, { value: '4', displayValue: 'Large'}]
	      			},
		      		{
		      			caption: 'Mask icons'
		      			,name: 'maskIcons'
		      			,type: 'onoff'
		      				,value: function(item,name) { if(typeof(item.maskIcons) == "undefined") {item.maskIcons = true;} return item.maskIcons; }
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
			caption: "Tab title"
			,icon: {"fileId":"bde3b4b21fcd4738af96ae886eb0f8eb.png","folderId":"f1304072873692","assetType":"gallery","url":"f1304072873692/bde3b4b21fcd4738af96ae886eb0f8eb.png","name":"018-envelope@2x.png"}
			,actions: []
		}
		,properties: [
		              	{
			      			caption: 'Title'
			      			,name: 'caption'
			      			,type: 'input'
			      			,value: function(item,name,index) {
		              			return item.tabs[index].caption;
		              		}
		      			}
		              	
		              	,
		              	{
			      			caption: 'Icon'
			      			,name: 'icon'
			      			,type: 'combo-asset'
			      			,value: function(item,name,index) {
		              			return $.toJSON({
		      						allow: 'image',
		      						asset: item.tabs[index].icon
		      					});
		              		}
			              	,displayValue: function(item,name,index) {
		      					if(item.tabs[index].icon.url == '') {
		      						return 'No icon selected.';
		      					}
		      					return item.tabs[index].icon.name;
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
};


/***** /TOOLBAR COMPONENTS *****/

/***** BUTTON COMPONENTS *****/

//TYPE: BUTTON2
prx.types.button2_retina = {
	name: "button2_retina"
	,onDisplay: function(item,containerid,pageid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		
		var bgBtnCss = '';
		var bgArrCss = '';

		var arr = "";
		var content = "";
		var text = "";		

		var _dims = getRealDims(item,symbol);
		
		if(typeof(item.textProperties) == "undefined") { item.textProperties = []; }
		var _props = (jQuery.inArray("bold",item.textProperties)>-1) ? " font-weight: bold;" : "";
		_props += (jQuery.inArray("italic",item.textProperties)>-1) ? " font-style: italic;" : "";
		_props += (jQuery.inArray("underline",item.textProperties)>-1) ? " text-decoration: underline;" : "";

		if(typeof(item.shadowColor) == "undefined") { item.shadowColor = '212121'; }

		var shadowColor = cssRGBA(item.backgroundColor, -150, 0.3); 

		if(eval(item.bgGradient)) {
			if(item.backgroundColor != 'none') { 
				var _grad =  cssRGBA(item.backgroundColor, 25);
				var _grad2 =  cssRGBA(item.backgroundColor, 65);
				var _grad3 =  cssRGBA(item.backgroundColor, 15);
				bgBtnCss += cssGradient([{ c: _grad2, p: 0 }, { c: _grad, p: 49}, { c: _grad3, p: 50}, { c: '#' + item.backgroundColor, p: 100 }]);
				bgArrCss += cssGradient([{ c: _grad2, p: 0 }, { c: _grad, p: 49}, { c: _grad3, p: 50}, { c: '#' + item.backgroundColor, p: 100 }], '135deg');
				
				switch(item.arrowDirection){
				case 'right':
					arr += cssBoxShadow(['0 0 2px ' + shadowColor + ' inset','1px 1px 2px rgba(255,255,255,0.3)']);
					content += cssBoxShadow(['0 2px 0 ' + shadowColor + ' inset','0 1px 0 rgba(255,255,255,0.3)']); 
					break;
				case 'left':
					arr += cssBoxShadow(['1px 0 2px ' + shadowColor + ' inset','1px 1px 2px rgba(255,255,255,0.3)']);
					content += cssBoxShadow(['0 1px 0 ' + shadowColor + ' inset','0px 1px 0px rgba(255,255,255,0.3)']);
					break;
				case 'none':
				default: 
					content += cssBoxShadow(['0 1px 2px ' + shadowColor + ' inset','0 1px 2px rgba(255,255,255,0.3)']);
					break;		
				}
			}
		}
		text += 'text-shadow: 0px -1px 2px #'+item.shadowColor+';';
		bgBtnCss += 'background-color: #' + item.backgroundColor + '; ';
		bgArrCss += 'background-color: #' + item.backgroundColor + '; ';
		bgBtnCss += 'border-color: #' + item.borderColor+ ';';
		bgArrCss += 'border: '+item.borderWidth+'px solid #' + item.borderColor+ ';';
		
		if(item.arrowDirection != 'none') {
			var arrow_h = Math.round(Math.sqrt((_dims.height * _dims.height)/2));
			var arrow_pos = Math.round((_dims.height - arrow_h)/2);
			var content_left = Math.round(_dims.height /2);
			var content_width = Math.round(_dims.width - content_left);
		}
		
		switch(item.arrowDirection){
		case 'right':
			arr += 'right: '+arrow_pos+'px;';
			content += 'right: '+content_left+'px; border-width: '+item.borderWidth+'px 0 '+item.borderWidth+'px '+item.borderWidth+'px; width: '+content_width+'px;';
			content += cssBorderRadius(item.borderRadius + 'px 0 0 '+item.borderRadius+'px'); 
			break;
		case 'left':
			arr += 'left: '+arrow_pos+'px;';
			content += 'left: '+content_left+'px; border-width: '+item.borderWidth+'px '+item.borderWidth+'px '+item.borderWidth+'px 0; width: '+content_width+'px;';
			content += cssBorderRadius('0 ' + item.borderRadius + 'px '+item.borderRadius+'px 0');
			break;
		case 'none':
		default: 
			content += 'width: 100%; border-width: '+item.borderWidth+'px;';
			content += cssBorderRadius(item.borderRadius + 'px');
			break;		
		}
		
		var cR = "";
		cR = cR +  '<div id="' + _id + '" class="box pos type-button-retina">';
		if(item.arrowDirection != 'none') {
			cR = cR + '<div class="button-arrow" style="overflow: hidden; height: 100%; width: '+Math.round(_dims.height/2)+'px; '+item.arrowDirection+': 0;"><div style="height: '+arrow_h+'px; width: '+arrow_h+'px; '+arr+' top: '+arrow_pos+'px; '+bgArrCss+'"></div></div>';
		}
		cR = cR + '<div class="button-content" style="'+content+' height: 100%; '+bgBtnCss+' line-height: '+eval(_dims.height-item.borderWidth*2)+'px; '+getFontCssFromFontFamily(item.textFont)+_props+' color: #'+item.textColor+'; font-size: '+item.textSize+'px;"><span style="'+text+' margin-'+item.arrowDirection+': -'+eval(content_left/2)+'px;">'
		
		
		switch(item.iconpos) {
		case 'left': 
		case 'right':
			if(item.buttonicon.url != '') {
				cR = cR + '<img src="'+getAssetUrl(item.buttonicon)+'" style="position: absolute; '+item.iconpos+': 16px; height: '+eval((_dims.height-item.borderWidth*2)*0.2*item.iconSize)+'px; padding-top: '+eval((_dims.height-item.borderWidth*2)*0.1*(5-item.iconSize))+'px; " />'+ item.text;
			} else {
				cR = cR + item.text;
			}
			break;
		case 'notext':
			//cR = cR + '<img src="'+getAssetUrl(item.buttonicon.assetType, item.buttonicon.url)+'" style="height: '+eval((_dims.height-item.borderWidth*2)*0.2*item.iconSize)+'px; padding-top: '+eval((_dims.height-item.borderWidth*2)*0.1*(5-item.iconSize))+'px; " />';
			cR = cR + '<img src="'+getAssetUrl(item.buttonicon)+'" style="height: '+eval((_dims.height-item.borderWidth*2)*0.2*item.iconSize)+'px; vertical-align: middle;" />';
			break;
		case '':
		default:
			cR = cR + item.text;
			break
		}
		
		cR = cR + '</span></div>';
		cR = cR + '</div>';
		return cR;
	}
	,onResize: function(item,containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		
		var _dims = getRealDims(item);
		
		if(item.arrowDirection != 'none') {
			var arrow_h = Math.round(Math.sqrt((_dims.height * _dims.height)/2));
			var arrow_pos = Math.round((_dims.height - arrow_h)/2);
			var content_left = Math.round(_dims.height /2);
			var content_width = Math.round(_dims.width - content_left);
			
			var arrow_w = Math.round(_dims.height/2);
			$("#"+_id + ' .button-arrow').width(arrow_w);
			
			$("#"+_id + ' .button-arrow > div').css({
				'height': arrow_h + 'px',
				'width': arrow_h + 'px',
				'top': arrow_pos + 'px'
			});
			$("#"+_id + ' .button-content').css({
				'width': content_width + 'px',
				'height': _dims.height + 'px',
				'line-height': eval(_dims.height-item.borderWidth*2) + 'px'
			});
			$("#"+_id + ' .button-content span').css('margin-'+item.arrowDirection, '-'+eval(content_left/2)+'px');	
			
			switch (item.arrowDirection) {
			case 'left':
				$("#"+_id + ' .button-arrow > div').css({ 'left': arrow_pos + 'px' });
				$("#"+_id + ' .button-content').css({ 'left': content_left + 'px' });
				break;
			case 'right':
				$("#"+_id + ' .button-arrow > div').css({ 'right': arrow_pos + 'px' });
				$("#"+_id + ' .button-content').css({ 'right': content_left + 'px' });
				break;
			}
		} else {
			$("#"+_id + ' .button-content').css({ 'line-height': (_dims.height-item.borderWidth*2) + 'px' });
		}
		
		if(item.iconpos != '') {
			if(item.iconpos == 'notext') {
				$("#"+_id + ' .button-content span img').css({
					height: eval((_dims.height-item.borderWidth*2)*0.2*item.iconSize)+'px'
				})
			} else {
				$("#"+_id + ' .button-content span img').css({
					height: eval((_dims.height-item.borderWidth*2)*0.2*item.iconSize)+'px',
					'padding-top': eval((_dims.height-item.borderWidth*2)*0.1*(5-item.iconSize))+'px'
				})
			}
		}
		
	}
	,properties: [
	              	{
						caption: 'Arrow Direction'
						,name: 'arrowDirection'
						,type: 'select'
						,value: function(item,name) {
							return item.arrowDirection;
						}
						,values: [{value: 'none',displayValue: 'No arrow'},{value: 'left',displayValue: 'Left'},{value: 'right',displayValue: 'Right'}]
					}
	      			,
	      			prx.commonproperties.backgroundColor
	      			,
	      			{
	      				caption: 'Generate background gradient?'
	      				,name: 'bgGradient'
	      				,type: 'onoff'
	      				,value: function(item,name) {
	      	  				return item.bgGradient;
	      	  			}
	      	  		}
	      			,
	      			prx.commonproperties.text
	      			,prx.commonproperties.textFont
	      			,prx.commonproperties.textSize
	      			,prx.commonproperties.textColor
	      			,prx.commonproperties.textProperties
	      			,{
	      				caption: 'Shadow Color'
	      				,name: 'shadowColor'
	      				,type: 'colorpicker'
	      				,value: function(item, name){
	      					return item.shadowColor;
	      				}
	      			}
	      			,prx.commonproperties.borderWidth
	      			,prx.commonproperties.borderColor
	      			,prx.commonproperties.borderRadius
	      			,
	              	{
		      			caption: 'Icon position'
		      			,name: 'iconpos'
		      			,type: 'select'
		      			,value: function(item,name) {
	      					return item.iconpos;
	              		}
	      				,values: [{value: '',displayValue: 'No icon'},{value: 'left',displayValue: 'Left'},{value: 'right',displayValue: 'Right'},{value: 'notext',displayValue: 'Icon only (no text)'}]
	      				,onChange: function(item){
	      					if(item.iconpos == '') {
	      						$('#property-buttonicon, #property-iconSize').hide();
	      					} else {
	      						$('#property-buttonicon, #property-iconSize').show();
	      					}
		      				return false;
	      				}
	      			}
	      			,
	      			{
	      				caption: 'Icon'
	      				,name: 'buttonicon'
	      				,type: 'combo-asset'
	      				,displayValue: function(item,name) {
	      					if(item.buttonicon.url == '') {
      							return 'No icon selected';
      						}
      						return item.buttonicon.name;
	      				}
	      				,value: function(item,name) {
	      					return $.toJSON({
	      						allow: 'image',
	      						asset: item.buttonicon
	      					});
	      				}
	      				,hiddenByDefault: function(item,name){
	      					return (item.iconpos == '');
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
	      			prx.commonproperties.actions
	              ]
};

/* TYPE = ARROW BUTTON */
prx.types.arrowbutton_retina = cloneobject(prx.types.button2_retina);
prx.types.arrowbutton_retina.name = 'arrowbutton_retina';
prx.types.arrowbutton_retina.properties = editProperty(prx.types.arrowbutton_retina.properties, 'arrowDirection', 'values', [{value: 'left',displayValue: 'Left'},{value: 'right',displayValue: 'Right'}]);


//TYPE: FULLWIDTH BUTTON
prx.types.fullwidthbutton_retina = {
	name: "fullwidthbutton_retina"
	,onDisplay: function(item,containerid,pageid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		
		var _props = (jQuery.inArray("bold",item.textProperties)>-1) ? " font-weight: bold;" : "";
		_props += (jQuery.inArray("italic",item.textProperties)>-1) ? " font-style: italic;" : "";
		_props += (jQuery.inArray("underline",item.textProperties)>-1) ? " text-decoration: underline;" : "";
		
		var _btnBg = cssGradient([{c: "rgba(255,255,255,0.3)", p:0},{c: "rgba(255,255,255,0.2)", p:50},{c: "rgba(255,255,255,0.1)", p:51},{c: "rgba(255,255,255,0.0)", p:100}])
		
		var cR = '';
		cR += '<div id="'+_id+'" class="box pos type-fullwidthbutton-retina"><div class="inner-btn" style="'+_btnBg+';font-size: '+item.textSize+'px; '+getFontCssFromFontFamily(item.textFont)+_props+' background-color: #'+item.backgroundColor+'; color: #'+item.textColor+'; border-color: #'+item.borderColor+';line-height: '+(parseInt(getRealDims(item,symbol).height)-12)+'px;">'+item.text+'</div></div>';
		return cR;
	}
	,onResize: function(item,containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		
		var _dims = getRealDims(item);
		
		$("#"+_id + ' .inner-btn').css({ 'line-height': (parseInt(_dims.height)-12) + 'px' });
	}
	,properties: [
  			prx.commonproperties.text
  			,prx.commonproperties.textFont
  			,prx.commonproperties.textSize
  			,prx.commonproperties.textColor
  			,prx.commonproperties.textProperties
  			,prx.commonproperties.backgroundColor
  			,prx.commonproperties.borderColor
  			,prx.commonproperties.actions
  		]
}

//TYPE: BUTTONGROUP
prx.types.buttongroup_retina = {
	name: "buttogroup_retina"
	,onDisplay: function(item,containerid,pageid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		
		var bgBtnCss = '';
	
		var content = "";
		var text = "";
		var _span = "";
		var shadowColor = cssRGBA(item.backgroundColor, -150, 0.3); 
		
		var _dims = getRealDims(item,symbol);
		
		if(typeof(item.textProperties) == "undefined") { item.textProperties = []; }
		var _props = (jQuery.inArray("bold",item.textProperties)>-1) ? " font-weight: bold;" : "";
		_props += (jQuery.inArray("italic",item.textProperties)>-1) ? " font-style: italic;" : "";
		_props += (jQuery.inArray("underline",item.textProperties)>-1) ? " text-decoration: underline;" : "";
		
		if(eval(item.bgGradient)) {
			var _grad =  cssRGBA(item.backgroundColor, 25);
			var _grad2 =  cssRGBA(item.backgroundColor, 65);
			var _grad3 =  cssRGBA(item.backgroundColor, 15);
			bgBtnCss += cssGradient([{ c: _grad2, p: 0 }, { c: _grad, p: 49}, { c: _grad3, p: 50}, { c: '#' + item.backgroundColor, p: 100 }]);
						
			content += cssBoxShadow(['0 1px 2px ' + shadowColor + ' inset','0 1px 2px rgba(255,255,255,0.3)']);
			text += 'text-shadow: 0px -1px 2px rgba(33, 33, 33, 1);';
		}
		bgBtnCss += 'background-color: #' + item.backgroundColor + '; ';
		bgBtnCss += 'border-color: #' + item.borderColor+ ';';

		content += 'width: 100%; border-width: '+item.borderWidth+'px;';
		content += cssBorderRadius(item.borderRadius + 'px');
		
		var cR = "";
		cR = cR +  '<div id="' + _id + '" class="box pos type-buttongroup-retina">';
		cR = cR + '<div class="button-content" style="'+ content+' height: 100%; '+bgBtnCss+' line-height: '+eval(_dims.height-item.borderWidth*2)+'px; '+getFontCssFromFontFamily(item.textFont)+_props+' color: #'+item.textColor+'; font-size: '+item.textSize+'px; '+text+'">'
		$.each(item.buttons, function(i,elm){
			_span = 'width: '+100/item.buttons.length+'%;';
			if(i!=0) { _span += ' border-left: ' + item.borderWidth + 'px solid #' + item.borderColor + ';'; }
			cR += '<span id="'+_id+'-buttons-'+i+'" style="'+_span+'">';
			switch(item.iconpos) {
			case 'left': 
			case 'right':
				cR = cR + '<img src="'+getAssetUrl(elm.buttonicon)+'" style="position: absolute; '+item.iconpos+': 16px; height: '+eval((_dims.height-item.borderWidth*2)*0.2*item.iconSize)+'px; padding-top: '+eval((_dims.height-item.borderWidth*2)*0.1*(5-item.iconSize))+'px; " />'+ elm.text;
				break;
			case 'notext':
				cR = cR + '<img src="'+getAssetUrl(elm.buttonicon)+'" style="height: '+eval((_dims.height-item.borderWidth*2)*0.2*item.iconSize)+'px; " />';
				break;
			case '':
			default:
				cR = cR + elm.text;
				break;
			}
			cR += '</span>';
		});
		cR = cR + '</div>';
		cR = cR + '</div>';
		return cR;
	}
	,onResize: function(item,containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		
		var _dims = getRealDims(item);
		
		$("#"+_id + ' .button-content').css({ 'line-height': (_dims.height-item.borderWidth*2) + 'px' });
		if(item.iconpos != '') {
			$("#"+_id + ' .button-content span img').css({
				height: eval((_dims.height-item.borderWidth*2)*0.2*item.iconSize)+'px'
			})
			if(item.iconpos != 'notext') {
				$("#"+_id + ' .button-content span img').css({
					'padding-top': eval((_dims.height-item.borderWidth*2)*0.1*(5-item.iconSize))+'px'
				})
			}
		}
		
	}
	,properties: [
      	prx.commonproperties.backgroundColor
		,
		{
			caption: 'Generate background gradient?'
			,name: 'bgGradient'
			,type: 'onoff'
			,value: function(item,name) {
  				return item.bgGradient;
  			}
  		}
		,prx.commonproperties.textFont
		,prx.commonproperties.textSize
		,prx.commonproperties.textColor
		,prx.commonproperties.textProperties
		,prx.commonproperties.borderWidth
		,prx.commonproperties.borderColor
		,prx.commonproperties.borderRadius
		,
      	{
  			caption: 'Icon position'
  			,name: 'iconpos'
  			,type: 'select'
  			,value: function(item,name) {
				return item.iconpos;
      		}
			,values: [{value: '',displayValue: 'No icon'},{value: 'left',displayValue: 'Left'},{value: 'right',displayValue: 'Right'},{value: 'notext',displayValue: 'Icon only (no text)'}]
		    ,onChange: function(item){
				if(item.iconpos == '') {
					$('[id=property-buttonicon], #property-iconSize').hide();
				} else {
					$('[id=property-buttonicon], #property-iconSize').show();
				}
				if(item.iconpos == 'notext') {
					$('[id=property-text]').hide();
				} else {
					$('[id=property-text]').show();
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
     ]
     ,dynamicProperties: {
 		data: 'buttons'
 		,propertyCaption: 'Buttons'
 		,propertyName: 'Button'
 		,addCaption: 'Add button'
 		,deleteCaption: 'Delete'
 		,blankItem: {
 			text: 'Label',
 			buttonicon: { fileId: '', folderId: '', url: '', assetType: '', name: '' }
 			,actions: []
 		}
		,properties: [
			{
				caption: 'Text'
				,name: 'text'
				,type: 'input'
				,value: function(item,name,index) {
					return item.buttons[index].text;
				}
				,hiddenByDefault: function(item,name){
					return (item.iconpos == 'notext');
				}
			}
			,
			{
				caption: 'Icon'
				,name: 'buttonicon'
				,type: 'combo-asset'
				,displayValue: function(item,name,index) {
					if(item.buttons[index].buttonicon.url == '') {
						return 'No icon selected';
					}
					return item.buttons[index].buttonicon.name;
				}
				,value: function(item,name,index) {
					return $.toJSON({
						allow: 'image',
						asset: item.buttons[index].buttonicon
					});
				}
  				,hiddenByDefault: function(item,name,index){
  					return (item.iconpos == '');
  				}
			}
			,
			{
				caption: 'Interactions'
				,name: 'actions'
				,type: 'action'
				,value: function(item,name,index) {
					if (typeof(item.buttons[index].actions) == "undefined") {
						item.buttons[index].actions = [];
					}		
				
					return item.buttons[index].actions.length;
				}
			}    
        ]
	}
        
};

//TYPE: SEGMENTEDCONTROL
prx.types.segmentedcontrol_retina = {
	name: "segmentedcontrol_retina"
	,onDisplay: function(item,containerid,pageid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		
		var cR = '';
		var _active = "";
		
		var _dims = getRealDims(item,symbol);
		
		if(item.style == 'plain') {
			var _labelH = _dims.height;
		} else {
			var _labelH = eval(_dims.height - 4);
		}
		
		var bgBtnCss = '';
		var bgBtnCssActive = '';
		if(item.style=='bar') {
			var shadowColor = cssRGBA(item.backgroundColor, -150, 0.3); 
			var _grad =  cssRGBA(item.backgroundColor, 25);
			var _grad2 =  cssRGBA(item.backgroundColor, 65);
			var _grad3 =  cssRGBA(item.backgroundColor, 15);
			bgBtnCss += cssGradient([{ c: _grad2, p: 0 }, { c: _grad, p: 49}, { c: _grad3, p: 50}, { c: '#' + item.backgroundColor, p: 100 }]);
			
			var shadowColorA = cssRGBA(item.activeBackgroundColor, -150, 0.3); 
			var _gradA =  cssRGBA(item.activeBackgroundColor, 25);
			var _grad2A =  cssRGBA(item.activeBackgroundColor, 65);
			var _grad3A =  cssRGBA(item.activeBackgroundColor, 15);
			bgBtnCssActive += cssGradient([{ c: _grad2A, p: 0 }, { c: _gradA, p: 49}, { c: _grad3A, p: 50}, { c: '#' + item.activeBackgroundColor, p: 100 }]);
			
			bgBtnCss += cssBoxShadow(['0 1px 2px ' + shadowColor + ' inset','0 1px 2px rgba(255,255,255,0.3)']);
			bgBtnCssActive += cssBoxShadow(['0 1px 2px ' + shadowColorA + ' inset','0 1px 2px rgba(255,255,255,0.3)']);
		}
		
		var _props = (jQuery.inArray("bold",item.textProperties)>-1) ? " font-weight: bold;" : "";
		_props += (jQuery.inArray("italic",item.textProperties)>-1) ? " font-style: italic;" : "";
		_props += (jQuery.inArray("underline",item.textProperties)>-1) ? " text-decoration: underline;" : "";
		
		cR += '<div id="' + _id + '" class="box pos type-segmentedcontrol-retina style-'+item.style+'">';
		
		cR += '<style>#' + _id + ' input:checked + label { '+bgBtnCssActive+' background-color: #'+item.activeBackgroundColor+'; color: #'+item.activeTextColor+'; }</style>'
		
		cR += '<ul class="label-container" style="'+bgBtnCss+' background-color: #'+item.backgroundColor+'; '+getFontCssFromFontFamily(item.textFont)+_props+' font-size: '+item.textSize+'px; color: #'+item.textColor+'; border-color: #'+item.borderColor+'; '+cssBorderRadius(item.borderRadius + 'px')+'">';
		$.each(item.options, function(i,elm){
			_active = "";
			_style= "";
			_spanstyle= "";
			if(item.selected == i) {
				_active = ' checked="checked"'; 
			}
			if(i == 0) {
				_style += cssBorderRadius([item.borderRadius, null, null, item.borderRadius]);
			}
			if(i == item.options.length -1) {
				_style += cssBorderRadius([null, item.borderRadius, item.borderRadius, null]);
			}
			_spanstyle += 'width: ' + Math.floor(100/item.options.length) + '%; '
			_style += ' height: ' + _labelH + 'px; line-height: '+_labelH+'px;';
			
			cR += '<li style="'+_spanstyle+'" id="'+_id+'-options-'+i+'"><input type="radio" name="'+_id+'-radio" id="'+_id+'-radio-'+i+'"'+_active+' data-role="none" />';
			cR +='<label for="'+_id+'-radio-'+i+'" style="'+_style+' border-color: #'+item.borderColor+'">'+elm.text+'</label>';
			cR += '</li>';
		});
		cR += '</ul></div>';
		return cR;
	}
	,onResize: function(item,containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		
		var _dims = getRealDims(item);
		
		if(item.style == 'plain') {
			var _labelH = _dims.height;
		} else {
			var _labelH = eval(_dims.height - 4);
		}
		$('#' + _id + ' label').css({ height: _labelH + 'px', 'line-height': _labelH +'px' });
	}
	,properties: [
		/*{
			caption: 'Style'
			,name: 'style'
			,type: 'select'
			,value: function(item,name){
				return item.style;
			}
			,values: [{ value: 'plain', displayValue: 'Plain' }, { value: 'bordered', displayValue: 'Bordered' }, { value: 'bar', displayValue: 'Bar' }, { value: 'bezeled', displayValue: 'Bezeled' }]
			,onChange: function(item){
	    		if(item.style != "plain") {
					$('#property-borderColor').show();
				} else {
					$('#property-borderColor').hide();
				}
				return false;
			}
		},
		{
			caption: 'Reset to style default options',
			name: 'resetStyles',
			type: 'link',
			onClick: function(item) {
				switch(item.style){
	    		case 'plain':
	    		case 'bordered':
	    			item.borderRadius = 10;
	    			item.borderColor = 'CCCCCC'
	    			item.textSize = 17;
	    			item.textColor = '7f7f7f'
	    			item.textProperties = ['bold'];
	    			item.backgroundColor = 'FFFFFF';
	    			item.activeBackgroundColor = '6194FD';
	    			item.activeTextColor = 'FFFFFF';
	    			break;
	    		case 'bar':
	    			item.borderRadius = 5;
	    			item.borderColor = '416491'
	    			item.textSize = 12;
	    			item.textColor = 'FFFFFF'
	    			item.textProperties = ['bold'];
	    			item.backgroundColor = '4d6687';
	    			item.activeBackgroundColor = '2f507a';
	    			item.activeTextColor = 'FFFFFF';
	    			
	    			break;
	    		case 'bezeled':
	    			item.borderRadius = 4;
	    			item.borderColor = '515d96'
	    			item.textSize = 12;
	    			item.textColor = '344d72'
	    			item.textProperties = ['bold'];
	    			item.backgroundColor = 'd0deed';
	    			item.activeBackgroundColor = '738db5';
	    			item.activeTextColor = 'FFFFFF';
	    			break;
	    		default: break;
	    		}
				return item;
			}
		},*/
		{ 
			caption: 'Border color', 
			name: 'borderColor', 
			type: 'colorpicker', 
			value: function(item,name) { return item.borderColor; }, 
			hiddenByDefault: function(item,name) { return (item.style == 'plain') } 
		}
		,prx.commonproperties.borderRadius
		,prx.commonproperties.textFont
		,prx.commonproperties.textSize
		,prx.commonproperties.textColor
		,prx.commonproperties.textProperties
		,prx.commonproperties.backgroundColor
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
		},
		{
  			caption: 'Active tab'
  			,name: 'selected'
  			,type: 'select'
  			,value: function(item,name) {
      			return item.selected;
      		}
      		,values: function(item,name) {
      			//var _rA = []; 
      			var _rA = [{value: '999',displayValue: 'None'}];
      			for (var n = 0; n < item.options.length; n++) {
      				_rA.push({value: n,displayValue: item.options[n].text});
      			}	
      			return _rA;
      		} 
		}
    ]
	,dynamicProperties: {
		data: 'options'
		,propertyCaption: 'Options'
		,propertyName: 'Option'
		,addCaption: 'Add option'
		,deleteCaption: 'Delete'
		,blankItem: {
			text: 'Label'
			,actions: []
		},properties: [
		    {
		    	caption: 'Label'
		    	,name: 'text'
		    	,type: 'input'
		    	,value: function(item,name,index) {
		    		return item.options[index].text;
		    	}
		    }
		    ,{
      			caption: 'Interactions'
      			,name: 'actions'
      			,type: 'action'
      			,value: function(item,name,index) {
  					if (typeof(item.options[index].actions) == "undefined") {
  						item.options[index].actions = [];
  					}		
          		
          			return item.options[index].actions.length;
          		}
          	}
		]
	}
}



prx.types.pagecontroller_retina = {
	name: "pagecontroller_retina"
	,onDisplay: function(item,containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		var cR = '<div id="' + _id + '" class="box pos type-pagecontroller-retina ' + ((item.vertical) ? 'type-pagecontroller-vertical' : '') + '"><ul>';
		var _defaultBtnStyle = 'background-color: #' + item.buttonColor + '; height: ' + item.buttonSize + 'px; width: ' + item.buttonSize + 'px; ' + cssBorderRadius(item.buttonBorderRadius + 'px') + ' margin-'+((item.vertical) ? 'bottom' : 'right')+': '+item.buttonSpacing+'px;';
		var _checked = "";
		$.each(item.buttons, function(i,elm){
			_checked = "";
			if(i == item.selected) {
				_checked = "checked"
			}
			cR += '<li '+((item.vertical) ? 'style="display: block; height: '+(parseInt(item.buttonSize)+ parseInt(item.buttonSpacing))+'px;"' : '')+'>';
			cR += '<input type="radio" data-role="none" name="'+_id+'-radio" id="'+_id+'-option-'+i+'" '+_checked+'/>'
			cR += '<label for="'+_id+'-option-'+i+'" id="'+_id+'-buttons-'+i+'" class="page" style="'+_defaultBtnStyle+'"></label>'
			cR += '</li>';
		});
		cR += '<style>#'+_id+' input:checked + label { background-color: #'+item.activeButtonColor+'!important; }</style>'
		cR += '</ul></div>'
		return cR;
	}
	,properties: [
					{
						caption: 'Default Button Color'
						,name: 'buttonColor'
						,type: 'colorpicker'
						,value: function(item,name) {
							return item.buttonColor;
						}
					},
					{
						caption: 'Active Button Color'
						,name: 'activeButtonColor'
						,type: 'colorpicker'
						,value: function(item,name) {
							return item.activeButtonColor;
						}
					},
					{
						caption: 'Button size'
						,name: 'buttonSize'
						,type: 'slider-select'
						,value: function(item,name) {
							return item.buttonSize;
						}
						,values: { min: 10, max: 40, step: 1 }
					},
					{
						caption: 'Button border radius'
						,name: 'buttonBorderRadius'
						,type: 'slider-select'
						,value: function(item,name) {
							return item.buttonBorderRadius;
						}
						,values: { min: 2, max: 20, step: 2 }
					},
					{
						caption: 'Button spacing'
						,name: 'buttonSpacing'
						,type: 'slider-select'
						,value: function(item,name) {
							return item.buttonSpacing;
						}
						,values: { min: 10, max: 30, step: 1 }
					},
					{
						caption: 'Vertical?'
						,name: 'vertical'
						,type: 'onoff'
						,value: function(item,name) {
							if(typeof(item.vertical) == "undefined") {
								item.vertical = false;
							}
							return item.vertical;
						}
					},
					{
		      			caption: 'Active button'
		      			,name: 'selected'
		      			,type: 'select'
		      			,value: function(item,name) {
	              			return item.selected;
	              		}
	              		,values: function(item,name) {
	              			var _rA = [{value: '999',displayValue: 'None'}];
	              			for (var n = 0; n < item.buttons.length; n++) {
	              				_rA.push({value: n,displayValue: (n+1)});
	              			}	
	              			return _rA;
	              		} 
	      			}
	              ]
	,dynamicProperties: {
  		data: 'buttons'
  		,propertyCaption: 'Buttons'
  		,propertyName: 'Button'
  		,addCaption: 'Add button'
  		,deleteCaption: 'Delete'
  		,blankItem: {
  			actions: []
  		}
  		,properties: [
  		    {
				caption: 'Interactions'
				,name: 'actions'
				,type: 'action'
				,value: function(item,name,index) {
					if (typeof(item.buttons[index].actions) == "undefined") {
						item.buttons[index].actions = [];
					}		
				
					return item.buttons[index].actions.length;
				}
			}    
	    ]
	}
	             
}

/***** /BUTTON COMPONENTS *****/

/***** FORM COMPONENTS *****/

//TYPE: LABEL
prx.types.label_retina = {
	name: "label_retina"
	,onDisplay: function(item,containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		var _bold = (jQuery.inArray("bold",item.textProperties)>-1) ? " font-weight: bold;" : "";
		var _italic = (jQuery.inArray("italic",item.textProperties)>-1) ? " font-style: italic;" : "";
		var _underline = (jQuery.inArray("underline",item.textProperties)>-1) ? " text-decoration: underline;" : "";
		var _shadow = (item.enableShadow) ? " text-shadow: 0 1px 0 #FFFFFF;" : "";
		var cReturn = '<div id="' + _id + '" class="box pos type-text-retina" style="color: #'+item.textColor+'; '+getFontCssFromFontFamily(item.textFont)+' font-size: '+item.textSize+'px; background-color: #'+item.backgroundColor+'; '+_bold+_italic+_underline+_shadow+' text-align: '+item.textAlign+'; "><div style="overflow: hidden; width: 100%; height: 100%;">'+item.text+'</div></div>';
		return cReturn;
	}
	,properties: [
	              	prx.commonproperties.text
	              	,prx.commonproperties.textFont
	              	,prx.commonproperties.textSize
	              	,prx.commonproperties.textColor
              		,prx.commonproperties.textProperties
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
                ]
};

//TYPE: TEXTFIELD
prx.types.textfield_retina = {
	name: 'textfield_retina'
	,onDisplay: function(item,containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		if(typeof(item.textProperties) == "undefined") { item.textProperties = []; }
		var _props = (jQuery.inArray("bold",item.textProperties)>-1) ? " font-weight: bold;" : "";
		_props += (jQuery.inArray("italic",item.textProperties)>-1) ? " font-style: italic;" : "";
		_props += (jQuery.inArray("underline",item.textProperties)>-1) ? " text-decoration: underline;" : "";
		if(item.backgroundColor == "none") { var _bg = "transparent" } else { var _bg = "#" + item.backgroundColor }
		var cR = '';
		cR += '<div id="' + _id + '" class="box pos type-textfield-retina"><input type="text" value="" style="display: none; width: 0px; height: 0px;" autofocus/><input type="'+item.inputtype+'" value="'+item.value+'" placeholder="'+item.placeholder+'" style="background-color: '+_bg+'; color: #'+item.textColor+'; font-size: '+item.textSize+'px; '+getFontCssFromFontFamily(item.textFont)+' border: '+item.borderWidth+'px solid #'+item.borderColor+'; '+cssBorderRadius(item.borderRadius + 'px')+ _props + '" data-role="none" /></div>';
		cR += '<style>#'+_id+' input:-moz-placeholder { color: #'+item.placeholderColor+'!important } #'+_id+' input::-webkit-input-placeholder { color: #'+item.placeholderColor+'!important } </style>'
		return cR;
	}
	,properties: [
	    {
	    	caption: 'Value'
	    	,name: 'value'
	    	,type: 'input'
	    	,value: function(item,name) {
	    		return item.value;
	    	}
	    }
      	,{
	    	caption: 'Placeholder (If "Value" is empty)'
	    	,name: 'placeholder'
	    	,type: 'input'
	    	,value: function(item,name) {
	    		return item.placeholder;
	    	}
	    }
      	,prx.commonproperties.backgroundColor
      	,prx.commonproperties.textColor
      	,{ 
      		caption: 'Placeholder Color', 
      		name: 'placeholderColor', 
      		type: 'colorpicker', 
      		value: function(item,name) { if(typeof(item.placeholderColor)=='undefined') { return '999999'; } return item.placeholderColor; } 
      	}
      	,prx.commonproperties.textFont
      	,prx.commonproperties.textSize
  		,prx.commonproperties.textProperties
      	,prx.commonproperties.borderWidth
      	,prx.commonproperties.borderColor
      	,prx.commonproperties.borderRadius
      	,prx.commonproperties.actions
   ]
};


//TYPE: RADIO BUTTON
prx.types.radiobutton_retina = {
	name: "radiobutton_retina"
	,onDisplay: function(item,containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		
		var cR = '';
		
		var _bg = 'background-color: #'+item.backgroundColor+';';
		var _active = "";
		
		if(item.active) {
			_active = 'checked="checked"'
		}
		
		if(typeof(item.actAsCheckbox) == "undefined") { item.actAsCheckbox = false; }
		var _type = (item.actAsCheckbox) ? 'checkbox' : 'radio';
		
		cR += '<div id="' + _id + '" class="box pos type-radio-retina">';
		cR += '<input type="'+_type+'" '+_active+ ' id="'+_id+'-checkbox" data-role="none" />';
		cR += '<label for="'+_id+'-checkbox" style="'+_bg+'"><span style="'+_bg+'"></span></label>';
		cR += '</div>';
		return cR;
	}
	,properties: [
	    prx.commonproperties.backgroundColor
	    ,{
			caption: 'Active'
        	,name: 'active'
			,type: 'onoff'
			,value: function(item,name) {
				return item.active;
			}
		}
	    ,{
			caption: 'Act as checkbox'
        	,name: 'actAsCheckbox'
			,type: 'onoff'
			,value: function(item,name) {
				return item.actAsCheckbox;
			}
		}
	    ,{ 
  			caption: 'Interactions on activation', 
  			name: 'checkboxActionsOnActive', 
  			type: 'action',
  			value: function(item,name) {
  				if(typeof(item.checkboxActionsOnActive) == "undefined") {
  					item.checkboxActionsOnActive = [];
  				}
  				return item.checkboxActionsOnActive.length; 
  			} 
  		}
  		,{ 
  			caption: 'Interactions on deactivation', 
  			name: 'checkboxActionsOnDeactive', 
  			type: 'action', 
  			value: function(item,name) {
      			if(typeof(item.checkboxActionsOnDeactive) == "undefined") {
  					item.checkboxActionsOnDeactive = [];
  				}
  				return item.checkboxActionsOnDeactive.length; 
  			}  
  		}
	]
}


// TYPE: CHECKBOX
prx.types.checkbox_retina = {
	name: "checkbox_retina"
	,onDisplay: function(item,containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		
		var cR = '';
		
		var _bg = 'background-color: #'+item.backgroundColor+';';
		var _check = '<span style="font-size: '+item.height+'px; color: #'+item.activeColor+';">&#10004;</span>';
		var _active = "";
		
		if(item.active) {
			_active = 'checked="checked"';
		}
		cR += '<div id="' + _id + '" class="box pos type-checkbox-retina">';
		cR += '<input type="checkbox" id="'+_id+'-checkbox" '+_active+' name="test" style="display: none;" data-role="none" />';
		cR += '<label for="'+_id+'-checkbox" style="'+_bg+' display: block; width: 100%; height: 100%;">'+_check+'</label>';
		cR += '</div>';
		return cR;
	}
	,onResize: function(item,containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		$('#'+ _id + ' span').css('font-size', item.height + 'px');
	}
	,properties: [
  	    prx.commonproperties.backgroundColor
  	    ,{
  			caption: 'Active color'
          	,name: 'activeColor'
  			,type: 'colorpicker'
  			,value: function(item,name) {
  				return item.activeColor;
  			}
  		}
  	    ,{
  			caption: 'Active'
          	,name: 'active'
  			,type: 'onoff'
  			,value: function(item,name) {
  				return item.active;
  			}
  		}
	    ,{ 
  			caption: 'Interactions on activation', 
  			name: 'checkboxActionsOnActive', 
  			type: 'action',
  			value: function(item,name) {
  				if(typeof(item.checkboxActionsOnActive) == "undefined") {
  					item.checkboxActionsOnActive = [];
  				}
  				return item.checkboxActionsOnActive.length; 
  			} 
  		}
  		,{ 
  			caption: 'Interactions on deactivation', 
  			name: 'checkboxActionsOnDeactive', 
  			type: 'action', 
  			value: function(item,name) {
      			if(typeof(item.checkboxActionsOnDeactive) == "undefined") {
  					item.checkboxActionsOnDeactive = [];
  				}
  				return item.checkboxActionsOnDeactive.length; 
  			}  
  		}
  	]
}


//TYPE: CHECKBOXLIST
prx.types.checkboxlist_retina = {
	name: "checkboxlist_retina"
	,onDisplay: function(item,containerid,pageid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		
		if(typeof(item.textProperties) == "undefined") { item.textProperties = []; }
		var _props = (jQuery.inArray("bold",item.textProperties)>-1) ? " font-weight: bold;" : "";
		_props += (jQuery.inArray("italic",item.textProperties)>-1) ? " font-style: italic;" : "";
		_props += (jQuery.inArray("underline",item.textProperties)>-1) ? " text-decoration: underline;" : "";
		
		var cR = '';
		var _active = "";
		var _hor = "";
		
		var _dims = getRealDims(item,symbol);
		
		cR += '<div id="' + _id + '" class="box pos type-checkboxlist-retina">';
		
		cR += '<style>#' + _id + ' input:checked + label { background: #'+item.activeBackgroundColor+'; color: #'+item.activeTextColor+'; }</style>'
		
		if(item.horizontal) { _hor += ' horizontal' }
		cR += '<div class="label-container'+_hor+'" style="text-align: '+item.textAlign+';background-color: #'+item.backgroundColor+'; '+getFontCssFromFontFamily(item.textFont)+' font-size: '+item.textSize+'px; color: #'+item.textColor+'; border-color: #'+item.borderColor+'; '+cssBorderRadius(item.borderRadius + 'px')+_props+'">';
		$.each(item.checkboxes, function(i,elm){
			_active = "";
			_style= "";
			_spanstyle= "";
			if(elm.active) {
				_active = ' checked="checked"'; 
			}
			if(i == 0) {
				if(!item.horizontal) {
					_style += cssBorderRadius([item.borderRadius, item.borderRadius, null, null]);
				} else {
					_style += cssBorderRadius([item.borderRadius, null, null, item.borderRadius]);
				}
			}
			if(i == item.checkboxes.length -1) {
				if(!item.horizontal) {
					_style += cssBorderRadius([null, null, item.borderRadius, item.borderRadius]);
				} else {
					_style += cssBorderRadius([null, item.borderRadius, item.borderRadius, null]);
				}
			}
			
			var _height;
			if(item.horizontal) {
				_spanstyle += 'width: ' + Math.floor(100/item.checkboxes.length) + '%; '
				_height = eval(_dims.height-4);
				_style += ' height: ' + _height + 'px; line-height: '+_height+'px;';
			} else {
				_height = (_dims.height-2-item.checkboxes.length) / item.checkboxes.length;
				_style += ' height: ' + _height + 'px; line-height: ' + _height + 'px;';
			}
			
			var _checkmark = ""
			if(item.appendCheckmark) {
				_checkmark = '<img src="' +getAssetUrl(item.checkmarkicon)+ '" class="checkmark" style="float: ' + item.iconpos + '; height: ' + eval(_height*0.2*2)+'px; padding-top: '+eval(_height*0.1*(5-2))+'px; padding-'+ ((item.iconpos=="left") ? 'right' : 'left') +': 20px;" />';
			}
			cR += '<span style="'+_spanstyle+'"><input type="'+item.inputtype+'" name="'+_id+'-checkbox" id="'+_id+'-checkbox-'+i+'"'+_active+' data-role="none" />';
			cR += '<label for="'+_id+'-checkbox-'+i+'" style="'+_style+' border-color: #'+item.borderColor+';">'+elm.text+ _checkmark + '</label>';
			cR += '</span>';
		});
		cR += '</div></div>';		
		return cR;
	}
	,onResize: function(item,containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		
		var _dims = getRealDims(item);
		
		if(item.horizontal) {
			$('#' + _id + ' label').css({ height: _dims.height-4 + 'px', 'line-height': _dims.height-4+'px' });
		} else {
			$('#' + _id + ' label').css({ height: (_dims.height-2-item.checkboxes.length) / item.checkboxes.length + 'px', 'line-height': (_dims.height-2-item.checkboxes.length) / item.checkboxes.length + 'px' });
		}
	}
	,properties: [
		prx.commonproperties.borderColor
		,prx.commonproperties.borderRadius
		,prx.commonproperties.textFont
		,prx.commonproperties.textSize
  		,prx.commonproperties.textProperties
		,prx.commonproperties.textColor
		,{ 
			caption: 'Text align', 
			name: 'textAlign', 
			type: 'radio', 
			value: function(item,name) {
				if(typeof(item.textAlign) == "undefined") { return 'center'; }
				return item.textAlign; 
			}, 
			values: [{ value: 'left', displayValue: 'Left'}, { value: 'center', displayValue: 'Center'}, { value: 'right', displayValue: 'Right'}] 
		}
		,prx.commonproperties.backgroundColor
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
		}
		,{
			caption: 'Append checkmark on selected rows'
			,name: 'appendCheckmark'
			,type: 'onoff'
			,value: function(item,name) {
				if(typeof(item.appendCheckmark) == "undefined") { return false; }
				return item.appendCheckmark
			},
			onChange: function(item) {
				if(item.appendCheckmark) {
					$('#property-checkmarkicon, #property-iconpos').show();
				} else {
					$('#property-checkmarkicon, #property-iconpos').hide();
				}
				return false;
			}
		}
		,
		{
  			caption: 'Checkmark Icon'
  			,name: 'checkmarkicon'
  			,type: 'combo-asset'
  			,value: function(item,name) {
      			if(typeof(item.checkmarkicon) == "undefined") {
      				item.checkmarkicon = {
      					assetType: "gallery",
      					fileId: "63e18f9f3815a02467df5665fffbdde8.png",
      					folderId: "f1304073291358",
      					name: " checkmark.png",
      					url: "f1304073291358/63e18f9f3815a02467df5665fffbdde8.png"
      				};
      			}
      			return $.toJSON({
					allow: 'image',
					asset: item.checkmarkicon
				});
      		}
      		,displayValue: function(item,name) {
				if(item.checkmarkicon.url == '') {
					return 'No asset selected.';
				}
				return item.checkmarkicon.name;
			},
      		hiddenByDefault: function(item,name){
				return (!item.appendCheckmark);
			}
		}
		,
      	{
  			caption: 'Icon position'
  			,name: 'iconpos'
  			,type: 'select'
  			,value: function(item,name) {
      			if(typeof(item.iconpos) == "undefined"){ return 'right'; }
      			return item.iconpos;
      		}
			,values: [{value: 'left',displayValue: 'Left'},{value: 'right',displayValue: 'Right'}]
			,hiddenByDefault: function(item,name){
				return (!item.appendCheckmark);
			}
		}
    ]
	,dynamicProperties: {
		data: 'checkboxes'
		,propertyCaption: 'Options'
  		,propertyName: 'Option'
		,addCaption: 'Add option'
		,deleteCaption: 'Delete'
		,blankItem: {
			text: 'Label'
			,active: false
		},properties: [
		    {
		    	caption: 'Label'
		    	,name: 'text'
		    	,type: 'input'
		    	,value: function(item,name,index) {
		    		return item.checkboxes[index].text;
		    	}
		    }
		    ,{
				caption: 'Active'
	        	,name: 'active'
				,type: 'onoff'
				,value: function(item,name,index) {
		    		return item.checkboxes[index].active;
				}
			}
		]
	}
}

// TYPE: FLIPSWITCH 
prx.types.flipswitch_retina = {
	name: 'flipswitch_retina'
	,onDisplay: function(item,containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		var cR = '';
		var _active = '';
		
		if(typeof(item.ios5) == "undefined") {
			item.ios5 = false;
		}
		if(item.active) {
			_active = 'checked="checked"';
		}
		
		cR += '<div id="' + _id + '" class="box pos type-flipswitch-retina '+((item.ios5) ? 'flipswitch-ios5' : '') +'">';
		
		cR += '<style>'
		if(!item.ios5) {
			cR += '#'+_id+' .activelabel { width: '+(item.width-4)+'px; line-height: '+(item.height-4)+'px; padding-right: '+parseInt(item.width*0.4)+'px; background-color: #'+item.activeLabelColor+'; color: #'+item.activeLabelTextColor+'; }'
			cR += '#'+_id+' .inactivelabel { width: '+(+item.width-4)+'px; line-height: '+(item.height-4)+'px; padding-left: '+parseInt(item.width*0.4)+'px; background-color: #'+item.inactiveLabelColor+'; color: #'+item.inactiveLabelTextColor+'; }'
			cR += '#'+_id+' .switch { right: '+(item.width*0.6)+'px; background-color: #'+item.switchColor+'; }'	
		} else {
			cR += '#'+_id+' label { '+cssBorderRadius(item.height + 'px')+' }'
			cR += '#'+_id+' .activelabel { width: '+(item.width-4)+'px; line-height: '+(item.height-4)+'px; padding-right: '+parseInt(item.height*0.75)+'px; background-color: #'+item.activeLabelColor+'; color: #'+item.activeLabelTextColor+'; '+cssBorderRadius([item.height/2, null, null, item.height/2])+'}'
			cR += '#'+_id+' .inactivelabel { width: '+(+item.width-4)+'px; line-height: '+(item.height-4)+'px; padding-left: '+parseInt(item.height*0.75)+'px; background-color: #'+item.inactiveLabelColor+'; color: #'+item.inactiveLabelTextColor+'; '+cssBorderRadius([null, item.height/2, item.height/2, null])+' }'
			cR += '#'+_id+' .switch { right: '+(item.width - item.height)+'px; width: '+item.height+'px; background-color: #'+item.switchColor+'; }'	
		}
		cR += '</style>'
		
		cR += '<input type="checkbox" '+_active+ ' id="'+_id+'-flipswitch" data-role="none" />';
		cR += '<label for="'+_id+'-flipswitch">';
		cR += '<div class="flipswitch-inner">'
		cR += '<span class="activelabel">'+item.activeLabelText+'</span>';
		cR += '<span class="inactivelabel">'+item.inactiveLabelText+'</span>';
		cR += '</div>';
		cR += '<span class="switch"></span>'; 
		cR += '</label>';
		cR += '</div>';
		return cR;
	}
	,onResize: function(item,containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;

		if(typeof(item.ios5) == "undefined") {
			item.ios5 = false;
		}
		
		$('#'+_id+' .activelabel, #'+_id+' .inactivelabel').css({
			width: (item.width-4) + 'px',
			'line-height': (item.height-4) + 'px'
		})
		
		if(!item.ios5) {
			$('#'+_id+' .activelabel').css('padding-right', parseInt(item.width*0.4)+'px');
			$('#'+_id+' .inactivelabel').css('padding-left', parseInt(item.width*0.4)+'px');
			$('#'+_id+' .switch').css('right', (item.width*0.6) + 'px')
		} else {
			
			$('#'+_id+' label').css({
				'-moz-border-radius': (item.height) + 'px',
				'-webkit-border-radius': (item.height) + 'px',
				'border-radius': (item.height) + 'px'
			})
			
			$('#'+_id+' .activelabel').css({
				'padding-right': parseInt(item.height*0.75) + 'px',
				'-moz-border-radius': (item.height/2) + 'px 0 0 '+(item.height/2) + 'px',
				'-webkit-border-radius': (item.height/2) + 'px 0 0 '+(item.height/2) + 'px',
				'border-radius': (item.height/2) + 'px 0 0 '+(item.height/2) + 'px'
			})
			$('#'+_id+' .inactivelabel').css({
				'padding-left': parseInt(item.height*0.75) + 'px',
				'-moz-border-radius': '0 '+ (item.height/2) + 'px '+(item.height/2) + 'px 0',
				'-webkit-border-radius': '0 '+ (item.height/2) + 'px '+(item.height/2) + 'px 0',
				'border-radius': '0 '+ (item.height/2) + 'px '+(item.height/2) + 'px 0'
			})
			$('#'+_id+' .switch').css({
				width: item.height + 'px',
				right: (item.width - item.height)+'px'
			});
		}
	
	}
	,properties: [
		{
			caption: 'Switch color'
			,name: 'switchColor'
			,type: 'colorpicker'
			,value: function(item,name) {
				return item.switchColor;
			}
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
		/*,
		{
			caption: 'iOS 5 style'
			,name: 'ios5'
			,type: 'onoff'
			,value: function(item,name) {
				return item.ios5;
			}
		}*/
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
					if (typeof(item.actionsOnActive) == "undefined") { 
						item.flipswitchActionsOnActive = []; 
					} else {
						item.flipswitchActionsOnActive = item.actionsOnActive;
					}
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
					if (typeof(item.actionsOnDeactive) == "undefined") { 
						item.flipswitchActionsOnDeactive = []; 
					} else {
						item.flipswitchActionsOnDeactive = item.actionsOnDeactive;
					}
				}
				return item.flipswitchActionsOnDeactive.length; 
			}  
		}
	]
}

//TYPE: TEXTAREA
prx.types.textarea_retina = {
	name: 'textarea_retina'
	,onDisplay: function(item,containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		if(typeof(item.textProperties) == "undefined") { item.textProperties = []; }
		var _props = (jQuery.inArray("bold",item.textProperties)>-1) ? " font-weight: bold;" : "";
		_props += (jQuery.inArray("italic",item.textProperties)>-1) ? " font-style: italic;" : "";
		_props += (jQuery.inArray("underline",item.textProperties)>-1) ? " text-decoration: underline;" : "";
		
		var cR = '';
		cR += '<div id="' + _id + '" class="box pos type-textarea-retina"><textarea placeholder="'+item.placeholder+'" style="background-color: #'+item.backgroundColor+'; color: #'+item.textColor+'; font-size: '+item.textSize+'px; '+getFontCssFromFontFamily(item.textFont)+' border: '+item.borderWidth+'px solid #'+item.borderColor+'; '+cssBorderRadius(item.borderRadius + 'px')+_props+'" data-role="none">'+item.value+'</textarea></div>';
		cR += '<style>#'+_id+' textarea:-moz-placeholder { color: #'+item.placeholderColor+'!important } #'+_id+' textarea::-webkit-input-placeholder { color: #'+item.placeholderColor+'!important } </style>'
		return cR;
	}
	,properties: [
	    {
	    	caption: 'Value'
	    	,name: 'value'
	    	,type: 'input'
	    	,value: function(item,name) {
	    		return item.value;
	    	}
	    }
      	,{
	    	caption: 'Placeholder (If "Value" is empty)'
	    	,name: 'placeholder'
	    	,type: 'input'
	    	,value: function(item,name) {
	    		return item.placeholder;
	    	}
	    }
      	,prx.commonproperties.backgroundColor
      	,prx.commonproperties.textColor
      	,{ 
      		caption: 'Placeholder Color', 
      		name: 'placeholderColor', 
      		type: 'colorpicker', 
      		value: function(item,name) { if(typeof(item.placeholderColor)=='undefined') { return '999999'; } return item.placeholderColor; } 
      	}
      	,prx.commonproperties.textFont
      	,prx.commonproperties.textSize
      	,prx.commonproperties.textProperties
      	,prx.commonproperties.borderWidth
      	,prx.commonproperties.borderColor
      	,prx.commonproperties.borderRadius
      	,prx.commonproperties.actions
   ]
};

//TYPE: SLIDER
prx.types.slider_retina = {
	name: 'slider_retina'
	,onDisplay: function(item,containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		var cR = '';
		
		if(typeof(item.vertical) == "undefined") { item.vertical = false }
		
		cR += '<style>'
		if(item.vertical) {
			cR += '#'+_id+' .slider-bar { width: '+item.barThickness+'px; background-color: #'+item.barColor+'; left: '+((item.sliderSize - item.barThickness)/2)+'px; }'
			cR += '#'+_id+' .slider-bar-filled { height: '+item.sliderPosition+'%; background-color: #'+item.fillBarColor+' }'
			cR += '#'+_id+' .slider-button { background-color: #'+item.sliderColor+'; '+cssBorderRadius(item.sliderBorderRadius+'px')+' width: '+item.sliderSize+'px; height: '+item.sliderSize+'px; margin-bottom: -'+(item.sliderSize/2)+'px; ' + ((item.sliderPosition == 100) ? 'top: 0;' : 'bottom: '+item.sliderPosition+'%;') + ' }'
		} else {
			cR += '#'+_id+' .slider-bar { height: '+item.barThickness+'px; background-color: #'+item.barColor+'; top: '+((item.sliderSize - item.barThickness)/2)+'px; }'
			cR += '#'+_id+' .slider-bar-filled { width: '+item.sliderPosition+'%; background-color: #'+item.fillBarColor+' }'
			cR += '#'+_id+' .slider-button { background-color: #'+item.sliderColor+'; '+cssBorderRadius(item.sliderBorderRadius+'px')+' height: '+item.sliderSize+'px; width: '+item.sliderSize+'px; margin-left: -'+(item.sliderSize/2)+'px; ' + ((item.sliderPosition == 100) ? 'right: 0;' : 'left: '+item.sliderPosition+'%;') + ' }'
		}
		cR += '</style>'
			
		cR += '<div id="' + _id + '" class="box pos type-slider-retina '+((item.vertical) ? 'type-slider-vertical' : '')+'">';
		cR += '<div class="slider-bar">';
		if(item.twoColored) {
			cR += '<div class="slider-bar-filled"></div>'
		}
		cR += '</div>';
		cR += '<span class="slider-button"></span>';
		cR += '</div>';
		return cR;
	}
	,afterDisplay: function(item,containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		if(typeof(item.vertical) == "undefined") { item.vertical = false }
		
		if(item.vertical) {
			$('#'+_id+' .slider-button').draggable({
				axis: 'y',
				containment: $('#'+_id),
				drag: function(e, ui) {
					$('#'+_id+' .slider-bar-filled').height($('#'+_id).height() - ui.position.top);
				}
			})
			
			$('#'+_id+' .slider-bar').click(function(e){
				var _pos = e.pageY - $(this).offset().top;
				
				$(this).find('.slider-bar-filled').height($(this).height() - _pos);
				$(this).siblings('.slider-button').css({ top: _pos + 'px' });
			});
		} else {
			$('#'+_id+' .slider-button').draggable({
				axis: 'x',
				containment: $('#'+_id),
				drag: function(e, ui) {
					$('#'+_id+' .slider-bar-filled').width(ui.position.left);
				}
			})
			
			$('#'+_id+' .slider-bar').click(function(e){
				var _pos = e.pageX - $(this).offset().left;
				
				$(this).find('.slider-bar-filled').width(_pos);
				$(this).siblings('.slider-button').css({ left: _pos + 'px' });
			});
		}
		if(!prx.editor) {
			$('#'+_id+' .slider-button').addTouch();
		}
	}
	,properties: [
					{
						caption: 'Slider Color'
						,name: 'sliderColor'
						,type: 'colorpicker'
						,value: function(item,name) {
							return item.sliderColor;
						}
					},
					{
						caption: 'Slider size'
						,name: 'sliderSize'
						,type: 'slider-select'
						,value: function(item,name) {
							return item.sliderSize;
						}
						,values: { min: 4, max: 40, step: 2 }
					},
					{
						caption: 'Slider border radius'
						,name: 'sliderBorderRadius'
						,type: 'slider-select'
						,value: function(item,name) {
							return item.sliderBorderRadius;
						}
						,values: { min: 0, max: 20, step: 2 }
					},
					{
						caption: 'Bar Color'
						,name: 'barColor'
						,type: 'colorpicker'
						,value: function(item,name) {
							return item.barColor;
						}
					},
					{
						caption: 'Bar Thickness'
						,name: 'barThickness'
						,type: 'slider-select'
						,value: function(item,name) {
							return item.barThickness;
						}
						,values: { min: 2, max: 20, step: 2 }
					},
					{
						caption: 'Two-colored bar?'
						,name: 'twoColored'
						,type: 'onoff'
						,value: function(item,name) {
							return item.twoColored;
						}
						,onChange: function(item) {
							if(item.twoColored) {
								$('#property-fillBarColor').show();
							} else {
								$('#property-fillBarColor').hide();
							}
							return false;
						}
					},
					{
						caption: 'Fill Bar Color'
						,name: 'fillBarColor'
						,type: 'colorpicker'
						,value: function(item,name) {
							return item.fillBarColor;
						}
						,hiddenByDefault: function(item){
							return !item.twoColored;
						}
					},
					{
						caption: 'Original slider position (%)'
						,name: 'sliderPosition'
						,type: 'slider-select'
						,value: function(item,name) {
							return item.sliderPosition;
						}
						,values: { min: 0, max: 100, step: 10 }
					}
					,{
						caption: 'Vertical?'
						,name: 'vertical'
						,type: 'onoff'
						,value: function(item,name) {
							if(typeof(item.vertical) == "undefined") { return false; }
							return item.vertical;
						}
						,onChange: function(item){
							var _dims = getRealDims(item);
							
							item.height = _dims.width;
							item.width = _dims.height;
							item.htype = 'fixed';
							item.wtype = 'fixed';
							
							return item;
						}
					}
	              ]
}

prx.types.picker_retina = {
	name: 'picker_retina'
	,onDisplay: function(item,containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		var cR = '<div id="' + _id + '" class="box pos type-picker-retina"><div class="outer" style="background-color: #'+item.containerColor+';">';
		var _options = item.values.split("<br />");
		var _props = (jQuery.inArray("bold",item.textProperties)>-1) ? " font-weight: bold;" : "";
		_props += (jQuery.inArray("italic",item.textProperties)>-1) ? " font-style: italic;" : "";
		_props += (jQuery.inArray("underline",item.textProperties)>-1) ? " text-decoration: underline;" : "";
		
		cR += '<div class="inner" id="' + _id + '-inner" style="background-color: #'+item.listColor+'; color: #'+item.textColor+'; '+getFontCssFromFontFamily(item.textFont)+' '+_props+'">';
		cR += '<ul style="padding: '+(item.height/2-44)+'px 0;">';

		for(var i = 0; i < _options.length; i++) {
			if(item.showBar) {
				cR += '<li><label for="'+_id+'-option'+i+'">' + _options[i] + '</label></li>';
			} else {
				cR += '<li><input type="radio" data-role="none" id="'+_id+'-option'+i+'" name="'+_id+'-input" '+((i == item.selectedValue) ? 'checked' : '' )+'/><label for="'+_id+'-option'+i+'"><span>&#10004;</span>' + _options[i] + '</label></li>';
			}
		};
		cR += '</ul>'
		
		if(item.showBar) {
			cR += '<div class="bar" style="background-color: #'+item.barColor+';"></div>';
		} else {
			cR += '<style>.type-picker .inner ul input:checked + label {color: #'+item.activeTextColor+';}</style>';
		}
		
		cR += '</div>';
		cR += '</div>';
		cR += '</div>';
		return cR;
	}
	,onResize: function(item,containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		$('#' + _id + ' ul').css('padding', (item.height/2-44)+'px 0');
	}
	,afterDisplay: function(item,containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		var manualScroll = false;
		if(!prx.editor) {
			if (typeof(prx.scroller[_id + '-inner'])=='undefined') {
				try {
					prx.scroller[_id + '-inner'] = new iScroll(_id + '-inner',{
						hScroll: false,
						hScrollbar: false,
						vScrollbar: false,
						//useTransform: false,
						useTransition: true,
						onScrollEnd: function(){
							// ROUND POSITION TO NEAREST LI (64 = LI HEIGHT)
							var offset = 64 * Math.round(prx.scroller[_id + '-inner'].y/64);
							prx.scroller[_id + '-inner']._pos(0,offset);
						}
					});
					
					var RESIZE_EV = 'onorientationchange' in window ? 'orientationchange' : 'resize';
					prx.scroller[_id + '-inner']._unbind(RESIZE_EV, window);
					
					// ALLOWS MOVE OVER SELECTION INDICATOR - now done with css pointer-events: none;
					/*
					var START_EV = ('ontouchstart' in window) ? 'touchstart' : 'mousedown',
					END_EV = ('ontouchstart' in window) ? 'touchend' : 'mouseup',
					MOVE_EV = ('ontouchstart' in window) ? 'touchmove' : 'mousemove';
					
					$('#' + _id).bind(START_EV, function(e){
						$('#' + _id + ' .bar').bind(MOVE_EV, function(e){
							prx.scroller[_id + '-inner']._move(e);
						});
					}).bind(END_EV, function(e){
						$('#' + _id + ' .bar').unbind(MOVE_EV);
						e.touches = [];
						e.changedTouches = [];
						prx.scroller[_id + '-inner']._end(e);
					});
					*/
					
					//BRINGS SELECTED LI TO CENTER, UNDER INDICATOR, ON CLICK
					$('#' + _id + ' li').click(function(e){
						log(_id + '-inner')
						prx.scroller[_id + '-inner'].scrollTo(0,-$(this).index() * 64, 300);
					})
					
					// DEFAULT SELECTED ITEM
					var _options = item.values.split("<br />");
					if(item.selectedValue <= _options.length && item.selectedValue!=-1) {
						prx.scroller[_id + '-inner']._pos(0,-item.selectedValue * 64);
					}
				} catch(err){};
			}
		} else {
			var _options = item.values.split("<br />");
			if(item.selectedValue < _options.length && item.selectedValue!=-1) {
				$('#' + _id + ' ul').css('margin-top', (-item.selectedValue * 64) + 'px');
			}
		}
	}
	,properties: [
	    {
	    	caption: 'Container Background color'
	    	,name: 'containerColor'
	    	,type: 'colorpicker'
	    	,value: function(item,name) {
	    		return item.containerColor
	    	}
	    },
	    {
	    	caption: 'List Background color'
	    	,name: 'listColor'
	    	,type: 'colorpicker'
	    	,value: function(item,name) {
	    		return item.listColor
	    	}
	    },
	    prx.commonproperties.textColor,
	    {
	    	caption: 'Active Text color'
	    	,name: 'activeTextColor'
	    	,type: 'colorpicker'
	    	,value: function(item,name) {
	    		return item.activeTextColor
	    	}
	    	,hiddenByDefault: function(item){
	    		return (item.showBar)
	    	}
	    },
	    prx.commonproperties.textFont,
	    prx.commonproperties.textProperties,
	    {
	    	caption: 'Show selection indicator?'
    		,name: 'showBar'
   			,type: 'onoff'
			,value: function(item,name) {
	    		return item.showBar;
	    	},
	    	onClick: function(item) {
	    		if(item.showBar) {
	    			$('#property-barColor').show();
	    			$('#property-activeTextColor').hide();
	    		} else {
	    			$('#property-activeTextColor').show();
	    			$('#property-barColor').hide();
	    		}
	    		return false;
	    	}
	    },
	    {
	    	caption: 'Bar color'
	    	,name: 'barColor'
	    	,type: 'colorpicker'
	    	,value: function(item,name) {
	    		return item.barColor
	    	}
	    	,hiddenByDefault: function(item){
	    		return (!item.showBar)
	    	}
	    },
        {
	    	caption: 'Values (Separated by line breaks)'
		    ,name: 'values'
		    ,type: 'textarea'
		    ,value: function(item,name) {
		    	return item.values;
		    }
	    },
	    {
	    	caption: 'Selected value'
		    ,name: 'selectedValue'
		    ,type: 'select'
		    ,value: function(item,name) {
		    	return item.selectedValue;
		    }
		    ,values: function(item,name){
		    	var _options = item.values.split("<br />");
		    	var _values = [{displayValue: 'None', value: -1}];
				for(var i = 0; i < _options.length; i++) {
					_values.push({
						displayValue: _options[i],
						value: i
					});
				}
		    	return _values;
		    }
	    }
	]
}

/***** /FORM COMPONENTS *****/

/***** LIST COMPONENTS *****/

//TYPE: LISTCOMPLEX
prx.types.listcomplex_retina = {
	name: 'listcomplex_retina'
	,onDisplay: function(item,containerid,pageid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		
		var cR = '';
		var _active = "";
		var _style ='';
		var _BRstyle = "";
		var _icon = "";
		var _borderRadius = item.borderRadius;
		var _activevalue = "";
		var _inactivevalue = "";
		var _thumbnail = "";
		var _activetext = "";
		var _inactivetext = "";
		var _badge = "";
		
		if(typeof(item.textProperties) == "undefined") { item.textProperties = []; }
		var _textprops = (jQuery.inArray("bold",item.textProperties)>-1) ? " font-weight: bold;" : "";
		_textprops += (jQuery.inArray("italic",item.textProperties)>-1) ? " font-style: italic;" : "";
		_textprops += (jQuery.inArray("underline",item.textProperties)>-1) ? " text-decoration: underline;" : "";
		
		if(typeof(item.subProperties) != "undefined") {
			var _subprops = (jQuery.inArray("bold",item.subProperties)>-1) ? " font-weight: bold;" : "";
			_subprops += (jQuery.inArray("italic",item.subProperties)>-1) ? " font-style: italic;" : "";
			_subprops += (jQuery.inArray("underline",item.subProperties)>-1) ? " text-decoration: underline;" : "";
		}
		if(typeof(item.valueProperties) != "undefined") {
			var _valueprops = (jQuery.inArray("bold",item.valueProperties)>-1) ? " font-weight: bold;" : "";
			_valueprops += (jQuery.inArray("italic",item.valueProperties)>-1) ? " font-style: italic;" : "";
			_valueprops += (jQuery.inArray("underline",item.valueProperties)>-1) ? " text-decoration: underline;" : "";
		}
		if(typeof(item.badgeProperties) != "undefined") {
			var _badgeprops = (jQuery.inArray("bold",item.badgeProperties)>-1) ? " font-weight: bold;" : "";
			_badgeprops += (jQuery.inArray("italic",item.badgeProperties)>-1) ? " font-style: italic;" : "";
			_badgeprops += (jQuery.inArray("underline",item.badgeProperties)>-1) ? " text-decoration: underline;" : "";
		}
		
		if(item.style=="plain") { 
			_borderRadius = 0; 
			_style = 'border-width: '+item.borderWidth+'px 0!important; '
		}
		
		var _dims = getRealDims(item,symbol);
		
		cR += '<div id="' + _id + '" class="box pos type-list-retina">';
		
		cR += '<style>'
		cR += '#' + _id + ' input:checked + label { background: #'+item.activeBackgroundColor+'; color: #'+item.activeTextColor+'; }'
		cR += '#' + _id + ' input:checked + label .value { color: #'+item.activeValueColor+'!important; }'
		cR += '#' + _id + ' input:checked + label .subtitle { color: #'+item.activeSubColor+'!important; }'
		cR += '</style>'
		
		cR += '<ul class="label-container" style="'+_style+'text-align: '+item.textAlign+'; background-color: #'+item.backgroundColor+'; '+getFontCssFromFontFamily(item.textFont)+' font-size: '+item.textSize+'px; color: #'+item.textColor+'; border: '+item.borderWidth+'px solid #'+item.borderColor+'; '+cssBorderRadius(_borderRadius + 'px')+'">';
		
		var _width = _dims.width - 40;
		var _height = Math.round((_dims.height-item.borderWidth*(item.listitems.length+1)) / item.listitems.length);
		var _iconheights = 'height: '+eval((_height-2)*0.2*item.iconSize)+'px; padding-top: '+eval((_height-2)*0.1*(5-item.iconSize))+'px;';
		var _thumbheights = 'height: '+eval((_height-2)*0.7)+'px; padding-top: '+eval((_height-2)*0.2)+'px;';
		
		$.each(item.listitems, function(i,elm){		
			
			_BRstyle = "";
			_style = "";
			_icon = "";
			_activevalue = "";
			_inactivevalue = "";
			_thumbnail = "";
			_activetext = '<div class="va-outer text"><div class="va-inner" style="width: '+_width+'px; height: '+_height+'px"><span style="'+_textprops+'">'+elm.text+'</span>';
			_inactivetext = '<div class="va-outer text"><div class="va-inner" style="width: '+_width+'px; height: '+_height+'px"><span style="'+_textprops+'">'+elm.text+'</span>';
			_badge = "";
			
			if(i == 0) {
				_BRstyle += cssBorderRadius([_borderRadius, _borderRadius, null, null]);
			}
			if(i == item.listitems.length -1) {
				_BRstyle += cssBorderRadius([null, null, _borderRadius, _borderRadius]);
			}
			
			_style += 'style="' + _BRstyle + ' height: ' + _height + 'px; line-height: '+_height+'px; border-top: '+item.borderWidth+'px solid #'+item.borderColor+';';
			
			/* THUMBNAIL */
			if(elm.hasThumbnail && elm.thumbnail.url != '') {
				_thumbnail = '<img src="' + getAssetUrl(elm.thumbnail) + '" style="'+_thumbheights+' float: left; margin-right: 20px;" class="thumb" />';
			}
			/* /THUMBNAIL */
			
			/* LIST WITH VALUES */
			if(elm.itemtype == 'withValue' || elm.itemtype == 'nestedWithValue' || elm.itemtype == 'withIconAndValue' || elm.itemtype == 'nestedWithBadgeAndValue') {
				//this will probably be changed later to allow for tableviewstyle2
				//_activevalue = '<span class="va-outer"><span class="va-inner value" style="height: '+_height+'px; '+_valueprops+' font-family: '+item.valueFont+'; font-size: '+item.valueSize+'px; color: #'+item.activeValueColor+'; padding-left: 20px;">' + elm.value + '</span></span>';
				_inactivevalue = '<span class="va-outer"><span class="va-inner value" style="height: '+_height+'px; '+getFontCssFromFontFamily(item.valueFont)+_valueprops+' font-size: '+item.valueSize+'px; color: #'+item.valueColor+'; padding-left: 20px;">' + elm.value + '</span></span>';
			}
			/* /VALUES */
			
			/* SUBTITLES */
			if(typeof(elm.subtitle) != "undefined" && elm.subtitle != "") {
				//_activetext += '<span class="subtitle" style="'+_subprops+' font-family: '+item.subFont+'; font-size: '+item.subSize+'px; color: #'+item.activeSubColor+';" >'+elm.subtitle+'</span>';
				_inactivetext += '<span class="subtitle" style="'+getFontCssFromFontFamily(item.subFont) + _subprops+'; font-size: '+item.subSize+'px; color: #'+item.subColor+';">'+elm.subtitle+'</span>'
			}
			/* /SUBTITLES */
			_style += '"';
			
			//_activetext += '</div></div>';
			_inactivetext += '</div></div>';
			
			/* LISTS WITH ICONS */
			if(elm.itemtype == 'nested' || elm.itemtype == 'checkbox' || elm.itemtype == 'nestedWithValue' || elm.itemtype == 'withIcon' || elm.itemtype == 'withIconAndValue' || elm.itemtype == 'nestedWithBadge' || elm.itemtype == 'withIconAndBadge' || elm.itemtype == 'nestedWithBadgeAndValue') {

				if(typeof (elm.buttonicon) != "undefined" && elm.buttonicon.url != ''){
					var _iconclass = 'class="listicon"';
					if(elm.itemtype == 'checkbox') { _iconclass = 'class="listicon checkmark"'; }
					switch(item.iconpos) {
					case 'left': 
						_icon += '<img src="'+getAssetUrl(elm.buttonicon)+'" style="float: '+item.iconpos+'; '+_iconheights+' padding-right: 20px;" '+_iconclass+' />';
						break;
					case 'right':
						_icon += '<img src="'+getAssetUrl(elm.buttonicon)+'" style="float: '+item.iconpos+'; '+_iconheights+' padding-left: 20px;" '+_iconclass+' />';
						break;
					case '':
					default:
						break;
					}
				}
			}
			/* /ICONS */
			
			/* BADGES */
			if(elm.itemtype == 'withBadge' || elm.itemtype == 'nestedWithBadge' || elm.itemtype == 'withIconAndBadge' || elm.itemtype == 'nestedWithBadgeAndValue') {
				var _badgeStyle = (item.badgeGlassStyle) ? ' glass' : '';
				_badge = '<div class="va-outer"><div class="va-inner" style="height: '+_height+'px"><span class="badge'+_badgeStyle+'" style="'+getFontCssFromFontFamily(item.badgeFont)+_badgeprops+'; font-size: '+item.badgeSize+'px; color: #'+item.badgeColor+'; background-color: #'+item.badgeBackgroundColor+';" >'+elm.badgeText+'</span></div></div>';
			}
			/* /BADGES */
			
			cR += '<li '+_style+' id="'+_id+'-listitems-'+i+'">';
			cR += '<input type="'+((elm.itemtype == 'checkbox') ? 'checkbox': 'radio') +'" name="'+_id+'-checkbox" id="'+_id+'-checkbox-'+i+'" data-role="none" '+ ((elm.itemtype == 'checkbox' && elm.checked) ? 'checked' : '') +' />';
			cR +='<label for="'+_id+'-checkbox-'+i+'" style="'+_BRstyle+'">' +_icon + _thumbnail + _badge + _inactivevalue + _inactivetext+'</label>';
			//cR +='<label class="active" for="'+_id+'-checkbox-'+i+'" style="'+_BRstyle+' background: #'+item.activeBackgroundColor+'; color: #'+item.activeTextColor+';">'+_icon + _thumbnail + _badge + _activevalue + _activetext+'</label>';
			cR += '</li>';
		});
		cR += '</ul></div>';	
		return cR;
	}
	,onResize: function(item,containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		var _dims = getRealDims(item);
		var _height = Math.round((_dims.height-1-item.listitems.length) / item.listitems.length);
		var _width = _dims.width - 40;
		
		$('#' + _id + ' li, #' + _id + ' .va-inner').height(_height);
		$('#' + _id + '.va-outer.text').width(_width);
		
		if(item.iconpos != '') {
			$("#"+_id + ' label img.listicon').css({
				height: eval((_height-2)*0.2*item.iconSize)+'px',
				'padding-top': eval((_height-2)*0.1*(5-item.iconSize))+'px'
			})
		}
		$("#"+_id + ' label img.thumb').css({
			height: eval((_height-2)*0.7)+'px',
			'padding-top': eval((_height-2)*0.2)+'px'
		})
	
	}
	,properties: [
	    {
	    	caption: 'Style'
	    	,name: 'style'
	    	,type: 'select'
	    	,value: function(item,name){
				return item.style;
			}
	    	,values: [{ value: 'plain', displayValue: 'Plain' }, { value: 'grouped', displayValue: 'Grouped' }]
	    	,onChange: function(item){
	    		if(item.style== 'plain') {
	    			$('#property-borderRadius').hide();
	    		} else {
	    			$('#property-borderRadius').show();
	    		}
	    		return false;
	    	}
	    }
		,prx.commonproperties.borderColor
		,{ 
			caption: 'Border (px)', 
			name: 'borderWidth', 
			type: 'slider-select', 
			value: function(item,name) 
			{ 
				if(typeof(item.borderWidth) == "undefined") {
					return 1;
				}
				return item.borderWidth; 
			}, 
			values: { min: 0, max: 10, step: 1 } 
		}
		,{ 
			caption: 'Border Radius (px)', 
			name: 'borderRadius', 
			type: 'slider-select', 
			value: function(item,name) { return item.borderRadius; }, 
			values: { min: 0, max: 20, step: 1 },
			hiddenByDefault: function(item,name) { return (item.style=='plain'); }
		}
		,prx.commonproperties.textFont
		,prx.commonproperties.textSize
		,prx.commonproperties.textColor
		,prx.commonproperties.textProperties
		,prx.commonproperties.textAlign
		,{ 
			caption: 'Subtitle Font', 
			name: 'subFont', 
			type: 'select', 
			value: function(item,name) { if (typeof(item.subFont) == "undefined") { return 'Helvetica, Arial, sans-serif'; } return item.subFont; }, 
			values: function() { return prx.comps.fonts; } 
		}
		,{ 
			caption: 'Subtitle Size', 
			name: 'subSize', 
			type: 'combo-select', 
			value: function(item,name) { if (typeof(item.subSize) == "undefined") {return 12;} return item.subSize; }, 
			values: prx.comps.textsize 
		}
		,{ 
			caption: 'Subtitle Color', 
			name: 'subColor', 
			type: 'colorpicker', 
			value: function(item,name) { if (typeof(item.subColor) == "undefined") {return '999999';} return item.subColor; } 
		}
		,{ 
			caption: 'Subtitle properties', 
			name: 'subProperties', 
			type: 'checkbox', 
			value: function(item,name) { if(typeof(item.subProperties) == "undefined") {item.subProperties = [];} return item.subProperties; }, 
			values: [{ value: 'bold', displayValue: '<b style="font-family: Georgia">B</b>'}, { value: 'italic', displayValue: '<i style="font-family: Georgia">I</i>'}, { value: 'underline', displayValue: '<u style="font-family: Georgia">U</u>'}] 
		}
		,{ 
			caption: 'Value Font', 
			name: 'valueFont', 
			type: 'select', 
			value: function(item,name) { return item.valueFont; }, 
			values: function() { return prx.comps.fonts; } 
		}
		,{ 
			caption: 'Value Size', 
			name: 'valueSize', 
			type: 'combo-select', 
			value: function(item,name) { return item.valueSize; }, 
			values: prx.comps.textsize 
		}
		,{ 
			caption: 'Value Color', 
			name: 'valueColor', 
			type: 'colorpicker', 
			value: function(item,name) { return item.valueColor; } 
		}
		,{ 
			caption: 'Value properties', 
			name: 'valueProperties', 
			type: 'checkbox', 
			value: function(item,name) { if(typeof(item.valueProperties) == "undefined") {item.valueProperties = [];} return item.valueProperties; }, 
			values: [{ value: 'bold', displayValue: '<b style="font-family: Georgia">B</b>'}, { value: 'italic', displayValue: '<i style="font-family: Georgia">I</i>'}, { value: 'underline', displayValue: '<u style="font-family: Georgia">U</u>'}] 
		}
		,{ 
			caption: 'Badge Font', 
			name: 'badgeFont', 
			type: 'select', 
			value: function(item,name) { return item.badgeFont; }, 
			values: function() { return prx.comps.fonts; } 
		}
		,{ 
			caption: 'Badge Size', 
			name: 'badgeSize', 
			type: 'combo-select', 
			value: function(item,name) { return item.badgeSize; }, 
			values: prx.comps.textsize 
		}
		,{ 
			caption: 'Badge Color', 
			name: 'badgeColor', 
			type: 'colorpicker', 
			value: function(item,name) { return item.badgeColor; } 
		}
		,{ 
			caption: 'Badge properties', 
			name: 'badgeProperties', 
			type: 'checkbox', 
			value: function(item,name) { if(typeof(item.badgeProperties) == "undefined") {item.badgeProperties = [];} return item.badgeProperties; }, 
			values: [{ value: 'bold', displayValue: '<b style="font-family: Georgia">B</b>'}, { value: 'italic', displayValue: '<i style="font-family: Georgia">I</i>'}, { value: 'underline', displayValue: '<u style="font-family: Georgia">U</u>'}] 
		}
		,{
			caption: 'Badge Background Color',
			name: 'badgeBackgroundColor',
			type: 'colorpicker',
			value: function(item,name){
				return item.badgeBackgroundColor			
			}
		}
		,
		{
			caption: 'Badge Glass Style?',
			name: 'badgeGlassStyle',
			type: 'onoff',
			value: function(item,name) {
				return item.badgeGlassStyle;
			}
		}
		,prx.commonproperties.backgroundColor
		,{
			caption: 'Active Background Color',
			name: 'activeBackgroundColor',
			type: 'colorpicker',
			value: function(item,name){
				return item.activeBackgroundColor			
			}
		}
		,{
			caption: 'Active Text Color',
			name: 'activeTextColor',
			type: 'colorpicker',
			value: function(item,name){
				return item.activeTextColor			
			}
		}
		,{
			caption: 'Active Subtitle Color',
			name: 'activeSubColor',
			type: 'colorpicker',
			value: function(item,name){
				if(typeof(item.activeSubColor) == "undefined") { return 'FFFFFF'; }
				return item.activeSubColor			
			}
		}
		,{
			caption: 'Active Value Color',
			name: 'activeValueColor',
			type: 'colorpicker',
			value: function(item,name){
				return item.activeValueColor			
			}
		}
		,
	  	{
			caption: 'Icon position'
			,name: 'iconpos'
			,type: 'select'
			,value: function(item,name) {
				//item.iconpos == '') { item.iconpos = 'right'}
				return item.iconpos;
			}
			,values: [{value: 'left',displayValue: 'Left'},{value: 'right',displayValue: 'Right'}]
		   /* ,onChange: function(item){
				if(item.iconpos == '') {
					$('[id=property-buttonicon], [id=property-removeIcon], #property-iconSize').hide();
				} else {
					$('[id=property-buttonicon], [id=property-removeIcon], #property-iconSize').show();
				}
				return false;
			}*/
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
			/*,hiddenByDefault: function(item,name){
				return (item.iconpos == '');
			}*/
		}
	]
	,dynamicProperties: {
		data: 'listitems'
		,propertyCaption: 'List items'
  		,propertyName: 'List item'
		,addCaption: 'Add list item'
		,deleteCaption: 'Delete'
		,blankItem: {
			text: 'Label'
			,itemtype: 'basic'
			,value: 'Insert value'
			,subtitle: ''
			,badgeText: '1'
			,hasThumbnail: false
			,thumbnail: {
				fileId: '',
				folderId: '',
				url: '',
				assetType: '',
				name: ''
			}
			,buttonicon: {
				fileId: '',
				folderId: '',
				url: '',
				assetType: 'icon',
				name: ''
			},
			checked: true,
			actions: []
		},properties: [
		    {
		    	caption: 'Type'
		    	,name: 'itemtype'
		    	,type: 'select'
		    	,value: function(item,name,index) {
		    		if(typeof(item.listitems[index].itemtype) == "undefined") {
		    			item.listitems[index].itemtype = 'basic'
		    		}
		    		return item.listitems[index].itemtype;
		    	}
		    	,values: [
		    	          { value: 'basic', displayValue: 'Basic'}
		    	          ,{ value: 'nested', displayValue: 'Nested'}
		    	          ,{ value: 'withIcon', displayValue: 'With Icon' }
		    	          ,{ value: 'checkbox', displayValue: 'Checkbox (On/off)'} 
		    	          ,{ value: 'withBadge', displayValue: 'With Badge' }
		    	          ,{ value: 'withValue', displayValue: 'With Value'}
		    	          ,{ value: 'nestedWithValue', displayValue: 'Nested with Value'} 
		    	          ,{ value: 'withIconAndValue', displayValue: 'With icon and value' }
		    	          ,{ value: 'nestedWithBadge', displayValue: 'Nested with Badge' }
		    	          ,{ value: 'withIconAndBadge', displayValue: 'With icon and badge' }
		    	          ,{ value: 'nestedWithBadgeAndValue', displayValue: 'Nested with badge and value' }
		    	],
		    	onChange: function(item, index) {
		    		switch(item.itemtype) {
		    		case 'basic':
		    			$('.dynamic-property:eq(' + index + ')')
		    				.find('#property-buttonicon, #property-value, #property-checked, #property-badgeText').hide();
		    			break;
		    		case 'withIcon': 
		    		case 'withIconAndValue':
		    		case 'withIconAndBadge':
		    			item.buttonicon = { fileId: '', folderId: '', url: '', assetType: 'icon', name: '' };
		    			return item;
		    			break;
		    		case 'nested':
		    		case 'nestedWithValue':
		    		case 'nestedWithBadge':
		    		case 'nestedWithBadgeAndValue':
		    			item.buttonicon = {"fileId":"54d11361d17fef026e2d6b2c1a8fe379.svg","name":"chevron-right.svg","assetType":"icon","bucketsource":"static","url":"f1352971179296/54d11361d17fef026e2d6b2c1a8fe379.svg","folderId":"f1352971179296","targetSrc":"generated/54d11361d17fef026e2d6b2c1a8fe379_999999.svg","color":"999999"};
			    		return item;
			    		break;
		    		case 'checkbox':
		    			item.buttonicon = { assetType: "gallery",  fileId: "63e18f9f3815a02467df5665fffbdde8.png", folderId: "f1304073291358", name: " checkmark.png", url: "f1304073291358/63e18f9f3815a02467df5665fffbdde8.png" };
			    		return item;
		    			break;
		    		case 'withValue': 
		    			$('.dynamic-property:eq(' + index + ')')
			    			.find('#property-buttonicon, #property-checked, #property-badgeText').hide()
			    			.end()
			    			.find('#property-value').show();
			    		break;
		    		case 'withBadge':
		    			$('.dynamic-property:eq(' + index + ')')
			    			.find('#property-buttonicon, #property-checked, #property-value').hide()
			    			.end()
			    			.find('#property-badgeText').show();
			    		break;
		    		default: break;
		    		}
		    		return false;
		    	}
        	}
        	,
        	{
		    	caption: 'Label'
		    	,name: 'text'
		    	,type: 'input'
		    	,value: function(item,name,index) {
		    		return item.listitems[index].text;
		    	}
		    }
		    ,
		    {
		    	caption: 'Value'
		    	,name: 'value'
		    	,type: 'input'
		    	,value: function(item,name,index) {
		    		return item.listitems[index].value;
		    	}
			    ,hiddenByDefault: function(item,name,index){
					return (item.listitems[index].itemtype != 'nestedWithValue' && item.listitems[index].itemtype != 'withValue' && item.listitems[index].itemtype != 'withIconAndValue' && item.listitems[index].itemtype != 'nestedWithBadgeAndValue');
				}
		    }
		    ,
		    {
		    	caption: 'Badge text'
		    	,name: 'badgeText'
		    	,type: 'input'
		    	,value: function(item,name,index) {
		    		return item.listitems[index].badgeText;
		    	}
			    ,hiddenByDefault: function(item,name,index){
					return (item.listitems[index].itemtype != 'withBadge' && item.listitems[index].itemtype != 'nestedWithBadge' && item.listitems[index].itemtype != 'withIconAndBadge' && item.listitems[index].itemtype != 'nestedWithBadgeAndValue');
				}
		    }
		    ,
		    /*{
		    	caption: 'Has subtitle?'
		    	,name: 'hasSubtitle'
		    	,type: 'onoff'
		    	,value: function(item,name,index) {
		    		return item.listitems[index].hasSubtitle;
		    	}
		    	,onChange: function(item,index) {
		    		if(item.hasSubtitle) {
			    		$('.dynamic-property:eq(' + index + ')')
	    					.find('#property-subtitle').show();
		    		} else {
		    			$('.dynamic-property:eq(' + index + ')')
 						.find('#property-subtitle').hide();
		    		}
		    		return false;
		    	}
		    }
		    ,*/
		    {
		    	caption: 'Subtitle'
		    	,name: 'subtitle'
		    	,type: 'input'
		    	,value: function(item,name,index) {
		    		if(typeof(item.listitems[index].subtitle) == 'undefined') { return ''; }
		    		return item.listitems[index].subtitle;
		    	}
			    /*,hiddenByDefault: function(item,name,index){
					return (!item.listitems[index].hasSubtitle);
				}*/
		    }
		    ,
		    {
		    	caption: 'Has thumbnail?'
		    	,name: 'hasThumbnail'
		    	,type: 'onoff'
		    	,value: function(item,name,index) {
		    	if(typeof(item.listitems[index].hasThumbnail) == 'undefined') { return false; }
		    		return item.listitems[index].hasThumbnail;
		    	}
		    	,onChange: function(item,index) {
		    		if(item.hasThumbnail) {
			    		$('.dynamic-property:eq(' + index + ')')
	    					.find('#property-thumbnail').show();
		    		} else {
		    			$('.dynamic-property:eq(' + index + ')')
 						.find('#property-thumbnail').hide();
		    		}
		    		return false;
		    	}
		    }
		    ,
			{
				caption: 'Thumbnail'
				,name: 'thumbnail'
				,type: 'combo-asset'
				,displayValue: function(item,name,index) {
					if(typeof(item.listitems[index].thumbnail) == 'undefined' || item.listitems[index].thumbnail.url == '') {
						return 'No thumbnail selected';
					}
					return item.listitems[index].thumbnail.name;
				}
				,value: function(item,name,index) {
					return $.toJSON({
						allow: 'image',
						asset: item.listitems[index].thumbnail
					});
				}
				,hiddenByDefault: function(item,name,index){
					return (!item.listitems[index].hasThumbnail);
				}
			}
		    ,
			{
				caption: 'Icon'
				,name: 'buttonicon'
				,type: 'combo-asset'
				,displayValue: function(item,name,index) {
					if(item.listitems[index].buttonicon.url == '') {
						return 'No icon selected';
					}
					return item.listitems[index].buttonicon.name;
				}
				,value: function(item,name,index) {
					return $.toJSON({
						allow: 'image',
						asset: item.listitems[index].buttonicon
					});
				}
				,hiddenByDefault: function(item,name,index){
					return (item.listitems[index].itemtype != 'nested' && item.listitems[index].itemtype != 'withIcon' && item.listitems[index].itemtype != 'withIconAndValue' && item.listitems[index].itemtype != 'nestedWithValue' && item.listitems[index].itemtype != 'checkbox' && item.listitems[index].itemtype != 'withIconAndBadge' && item.listitems[index].itemtype != 'nestedWithBadgeAndValue');
				}
			}
		    ,{
		    	caption: 'Checked?'
		    	,name: 'checked'
		    	,type: 'onoff'
		    	,value: function(item,name,index){
		    		return item.listitems[index].checked;
		    	}
		    	,hiddenByDefault: function(item,name,index){
		    		return (item.listitems[index].itemtype != 'checkbox');
		    	}
		    }
		    ,{
	  			caption: 'Interactions'
	  			,name: 'actions'
	  			,type: 'action'
	  			,value: function(item,name,index) {
						if (typeof(item.listitems[index].actions) == "undefined") {
							item.listitems[index].actions = [];
						}		
	      		
	      			return item.listitems[index].actions.length;
	      		}
	      	}
		]
	}
}

/* TYPE = LISTNESTED */
prx.types.listnested_retina = cloneobject(prx.types.listcomplex_retina);
prx.types.listnested_retina.name = 'listnested_retina';
removeProperties(prx.types.listnested_retina.properties, ['valueFont', 'valueSize', 'valueColor', 'valueProperties', 'activeValueColor', 'badgeFont', 'badgeSize', 'badgeColor', 'badgeProperties', 'badgeGlassStyle', 'badgeBackgroundColor']);
removeProperties(prx.types.listnested_retina.dynamicProperties.properties, ['itemtype', 'value', 'checked', 'badgeText']);
prx.types.listnested_retina.dynamicProperties.blankItem = removeObjMembers(prx.types.listnested_retina.dynamicProperties.blankItem, ['value', 'checked', 'badgeText']);
prx.types.listnested_retina.dynamicProperties.blankItem.itemtype = 'nested';
prx.types.listnested_retina.dynamicProperties.blankItem.buttonicon = {"fileId":"54d11361d17fef026e2d6b2c1a8fe379.svg","name":"chevron-right.svg","assetType":"icon","bucketsource":"static","url":"f1352971179296/54d11361d17fef026e2d6b2c1a8fe379.svg","folderId":"f1352971179296","targetSrc":"generated/54d11361d17fef026e2d6b2c1a8fe379_999999.svg","color":"999999"};
prx.types.listnested_retina.dynamicProperties.properties = editProperty(prx.types.listnested_retina.dynamicProperties.properties, 'itemtype', 'value', 'nested');
prx.types.listnested_retina.dynamicProperties.properties = editProperty(prx.types.listnested_retina.dynamicProperties.properties, 'itemtype', 'hiddenByDefault', true);
prx.types.listnested_retina.dynamicProperties.properties = editProperty(prx.types.listnested_retina.dynamicProperties.properties, 'buttonicon', 'hiddenByDefault', false);

//TYPE = LISTBASIC 
prx.types.listbasic_retina = cloneobject(prx.types.listnested_retina);
prx.types.listbasic_retina.name = 'listbasic_retina';
removeProperties(prx.types.listbasic_retina.properties, ['iconpos', 'iconSize'])
removeProperties(prx.types.listbasic_retina.dynamicProperties.properties, ['buttonicon']);
prx.types.listbasic_retina.dynamicProperties.blankItem = removeObjMembers(prx.types.listbasic_retina.dynamicProperties.blankItem, ['buttonicon']);
prx.types.listbasic_retina.dynamicProperties.blankItem.itemtype = 'basic';
prx.types.listbasic_retina.dynamicProperties.properties = editProperty(prx.types.listbasic_retina.dynamicProperties.properties, 'itemtype', 'value', 'basic');

/* TYPE = LISTWITHICON */
prx.types.listwithicon_retina = cloneobject(prx.types.listnested_retina);
prx.types.listwithicon_retina.name = 'listwithicon_retina';
prx.types.listwithicon_retina.dynamicProperties.blankItem.itemtype = 'withIcon';
prx.types.listwithicon_retina.dynamicProperties.blankItem.buttonicon = { fileId: '', folderId: '', url: '', assetType: '', name: '' };;
prx.types.listwithicon_retina.dynamicProperties.properties = editProperty(prx.types.listwithicon_retina.dynamicProperties.properties, 'itemtype', 'value', 'withIcon');

/* TYPE = LISTWITHICONANDVALUE */
prx.types.listwithiconandvalue_retina = cloneobject(prx.types.listcomplex_retina);
prx.types.listwithiconandvalue_retina.name = 'listwithiconandvalue_retina';
removeProperties(prx.types.listwithiconandvalue_retina.properties, [/*'subFont', 'subSize', 'subColor', 'subProperties', 'activeSubColor',*/ 'badgeFont', 'badgeSize', 'badgeColor', 'badgeProperties', 'badgeGlassStyle', 'badgeBackgroundColor'])
removeProperties(prx.types.listwithiconandvalue_retina.dynamicProperties.properties, ['itemtype', 'checked', 'badgeText']);
prx.types.listwithiconandvalue_retina.dynamicProperties.blankItem = removeObjMembers(prx.types.listwithiconandvalue_retina.dynamicProperties.blankItem, ['checked', 'badgeText']);
prx.types.listwithiconandvalue_retina.dynamicProperties.blankItem.itemtype = 'withIconAndValue';
prx.types.listwithiconandvalue_retina.dynamicProperties.properties = editProperty(prx.types.listwithiconandvalue_retina.dynamicProperties.properties, 'itemtype', 'value', 'withIconAndValue');
prx.types.listwithiconandvalue_retina.dynamicProperties.properties = editProperty(prx.types.listwithiconandvalue_retina.dynamicProperties.properties, 'itemtype', 'hiddenByDefault', true);
prx.types.listwithiconandvalue_retina.dynamicProperties.properties = editProperty(prx.types.listwithiconandvalue_retina.dynamicProperties.properties, 'value', 'hiddenByDefault', false);


/* TYPE = LISTNESTEDWITHVALUE */
prx.types.listnestedwithvalue_retina = cloneobject(prx.types.listwithiconandvalue_retina);
prx.types.listnestedwithvalue_retina.name = 'listnestedwithvalue_retina';
prx.types.listnestedwithvalue_retina.dynamicProperties.blankItem.itemtype = 'nestedWithValue';
prx.types.listnestedwithvalue_retina.dynamicProperties.blankItem.buttonicon = { fileId: 'a6b50021ca1cefe6af2aa49f5a703d08.png', folderId: 'f1304073334107', url: 'f1304073334107/a6b50021ca1cefe6af2aa49f5a703d08.png', assetType: 'gallery', name: ' list_arrow.png' };
prx.types.listnestedwithvalue_retina.dynamicProperties.properties = editProperty(prx.types.listnestedwithvalue_retina.dynamicProperties.properties, 'itemtype', 'value', 'nestedWithValue');

/* TYPE = LISTWITHVALUE */
prx.types.listwithvalue_retina = cloneobject(prx.types.listnestedwithvalue_retina);
prx.types.listwithvalue_retina.name = 'listwithvalue_retina';
removeProperties(prx.types.listwithvalue_retina.properties, ['iconpos', 'iconSize'])
removeProperties(prx.types.listwithvalue_retina.dynamicProperties.properties, ['buttonicon']);
prx.types.listwithvalue_retina.dynamicProperties.blankItem = removeObjMembers(prx.types.listwithvalue_retina.dynamicProperties.blankItem, ['buttonicon']);
prx.types.listwithvalue_retina.dynamicProperties.blankItem.itemtype = 'withValue';
prx.types.listwithvalue_retina.dynamicProperties.properties = editProperty(prx.types.listwithvalue_retina.dynamicProperties.properties, 'itemtype', 'value', 'withValue');

/*
// TYPE = LISTNESTEDWITHSUBTITLE 
prx.types.listnestedwithsubtitle = cloneobject(prx.types.listcomplex);
prx.types.listnestedwithsubtitle.name = 'listnestedwithsubtitle';
removeProperties(prx.types.listnestedwithsubtitle.properties, ['valueFont', 'valueSize', 'valueColor', 'valueProperties', 'activeValueColor', 'badgeFont', 'badgeSize', 'badgeColor', 'badgeProperties', 'badgeGlassStyle', 'badgeBackgroundColor'])
removeProperties(prx.types.listnestedwithsubtitle.dynamicProperties.properties, ['itemtype', 'value', 'checked', 'badgeText']);
prx.types.listnestedwithsubtitle.dynamicProperties.blankItem = removeObjMembers(prx.types.listnestedwithsubtitle.dynamicProperties.blankItem, ['value', 'checked']);
prx.types.listnestedwithsubtitle.dynamicProperties.properties = editProperty(prx.types.listnestedwithsubtitle.dynamicProperties.properties, 'itemtype', 'value', 'nested');
prx.types.listnestedwithsubtitle.dynamicProperties.properties = editProperty(prx.types.listnestedwithsubtitle.dynamicProperties.properties, 'itemtype', 'hiddenByDefault', true);
prx.types.listnestedwithsubtitle.dynamicProperties.properties = editProperty(prx.types.listnestedwithsubtitle.dynamicProperties.properties, 'buttonicon', 'hiddenByDefault', false);

// TYPE = LISTWITHSUBTITLE 
prx.types.listwithsubtitle = cloneobject(prx.types.listnestedwithsubtitle);
prx.types.listwithsubtitle.name = 'listwithsubtitle';
removeProperties(prx.types.listwithsubtitle.properties, ['iconpos', 'iconSize'])
removeProperties(prx.types.listwithsubtitle.dynamicProperties.properties, ['buttonicon']);
prx.types.listwithsubtitle.dynamicProperties.blankItem = removeObjMembers(prx.types.listwithsubtitle.dynamicProperties.blankItem, ['buttonicon']);
prx.types.listwithsubtitle.dynamicProperties.properties = editProperty(prx.types.listwithsubtitle.dynamicProperties.properties, 'itemtype', 'value', 'basic');
*/

/* TYPE = LISTNESTEDWITHBADGE */
prx.types.listnestedwithbadge_retina = cloneobject(prx.types.listcomplex_retina);
prx.types.listnestedwithbadge_retina.name = 'listnestedwithbadge_retina';
removeProperties(prx.types.listnestedwithbadge_retina.properties, ['valueFont', 'valueSize', 'valueColor', 'valueProperties', 'activeValueColor'])
removeProperties(prx.types.listnestedwithbadge_retina.dynamicProperties.properties, ['itemtype', 'value', 'checked']);
prx.types.listnestedwithbadge_retina.dynamicProperties.blankItem = removeObjMembers(prx.types.listnestedwithbadge_retina.dynamicProperties.blankItem, ['value', 'checked']);
prx.types.listnestedwithbadge_retina.dynamicProperties.blankItem.itemtype = 'nestedWithBadge';
prx.types.listnestedwithbadge_retina.dynamicProperties.blankItem.buttonicon = { fileId: 'a6b50021ca1cefe6af2aa49f5a703d08.png', folderId: 'f1304073334107', url: 'f1304073334107/a6b50021ca1cefe6af2aa49f5a703d08.png', assetType: 'gallery', name: ' list_arrow.png' };
prx.types.listnestedwithbadge_retina.dynamicProperties.properties = editProperty(prx.types.listnestedwithbadge_retina.dynamicProperties.properties, 'itemtype', 'value', 'nestedWithBadge');
prx.types.listnestedwithbadge_retina.dynamicProperties.properties = editProperty(prx.types.listnestedwithbadge_retina.dynamicProperties.properties, 'itemtype', 'hiddenByDefault', true);
prx.types.listnestedwithbadge_retina.dynamicProperties.properties = editProperty(prx.types.listnestedwithbadge_retina.dynamicProperties.properties, 'buttonicon', 'hiddenByDefault', false);

/* TYPE = LISTWITHICONANDBADGE */
prx.types.listwithiconandbadge_retina = cloneobject(prx.types.listnestedwithbadge_retina);
prx.types.listwithiconandbadge_retina.name = 'listwithiconandbadge_retina';
prx.types.listwithiconandbadge_retina.dynamicProperties.blankItem.itemtype = 'withIconAndBadge';
prx.types.listwithiconandbadge_retina.dynamicProperties.blankItem.buttonicon = { fileId: '', folderId: '', url: '', assetType: '', name: '' };
prx.types.listwithiconandbadge_retina.dynamicProperties.properties = editProperty(prx.types.listwithiconandbadge_retina.dynamicProperties.properties, 'itemtype', 'value', 'withIconAndBadge');


/* TYPE = LISTWITHBADGE */
prx.types.listwithbadge_retina = cloneobject(prx.types.listnestedwithbadge_retina);
prx.types.listwithbadge_retina.name = 'listwithbadge';
removeProperties(prx.types.listwithbadge_retina.properties, ['iconpos', 'iconSize'])
removeProperties(prx.types.listwithbadge_retina.dynamicProperties.properties, ['buttonicon']);
prx.types.listwithbadge_retina.dynamicProperties.blankItem = removeObjMembers(prx.types.listwithbadge_retina.dynamicProperties.blankItem, ['buttonicon']);
prx.types.listwithbadge_retina.dynamicProperties.blankItem.itemtype = 'withBadge';
prx.types.listwithbadge_retina.dynamicProperties.properties = editProperty(prx.types.listwithbadge_retina.dynamicProperties.properties, 'itemtype', 'value', 'withBadge');


/***** /LIST COMPONENTS *****/

/***** OTHER COMPONENTS *****/
//TYPE: ALERT 
prx.types.alert_retina = {
	name: "alert_retina"
	,onDisplay: function(item,containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		var cR = '';
		
		var _bg = cssGradient([{c: "rgba(255,255,255,0.4)", p: 0},{c: "rgba(255,255,255,0.3)", p: 15},{c: "rgba(255,255,255,0.2)", p: 20},{c: "transparent", p: 40}]);
		
		cR += '<div id="' + _id + '" class="box pos type-alert-retina"><div class="alert-inner" style="'+cssBorderRadius(item.borderRadius+'px')+' border: '+item.borderWidth+'px solid #'+item.borderColor+'; background: '+_bg+';background-color: #' + item.backgroundColor + ';"><span class="alert-title">' + item.title + '</span><span class="alert-text">' + item.text + '</span>';
		cR += '<div class="buttons">';
		var _btnWidth = Math.floor(100/item.buttons.length);
		$.each(item.buttons, function(i,elm){
			switch(elm.style) {
			case 'dark':
				_btnBg = cssGradient([{c: "rgba(255,255,255,0.5)", p:0},{c: "rgba(255,255,255,0.3)", p:50},{c: "rgba(255,255,255,0.2)", p:51},{c: "rgba(255,255,255,0.1)", p:100}])
				break;
			case 'light':
			default: 
				_btnBg = cssGradient([{c: "rgba(255,255,255,0.9)", p:0},{c: "rgba(255,255,255,0.5)", p:50},{c: "rgba(255,255,255,0.4)", p:51},{c: "rgba(255,255,255,0.2)", p:100}])				
				break;
			}
			cR += '<span id="' + _id + '-buttons-'+i+'" style="width: '+_btnWidth+'%;"><span style="'+_btnBg+' background-color: #'+item.backgroundColor+';">' + elm.text + '</span></span>';
		});
		cR += '</div></div></div>';
		return cR;
	}
	,properties: [
		{
			caption: 'Title'
			,name: 'title'
			,type: 'input'
			,value: function(item,name) {
				return item.title;
			}
		}
		,prx.commonproperties.text
		/*,prx.commonproperties.backgroundColor
		,prx.commonproperties.borderColor
		,prx.commonproperties.borderWidth
		,prx.commonproperties.borderRadius*/
		
	]
	,dynamicProperties: {
        data: 'buttons'
		,propertyCaption: 'Buttons'
  		,propertyName: 'Button'
		,addCaption: 'Add button'
		,deleteCaption: 'Delete'
		,blankItem: {
			text: "Button text"
			,style: 'light'
			,actions: []
		}
		,properties: [
		    {
		    	caption: 'Button text'
				,name: 'text'
				,type: 'input'
				,value: function(item,name,index) {
          			return item.buttons[index].text;
          		}
			}
		    ,
		    {
		    	caption: 'Button style'
		    	,name: 'style'
		    	,type: 'radio'
		    	,value: function(item,name,index) {
          			return item.buttons[index].style;
          		}
		    	,values: [{ value: 'light', displayValue: 'Light'}, { value: 'dark', displayValue: 'Dark'}]
		    }
		    ,
          	{
      			caption: 'Interactions'
      			,name: 'actions'
      			,type: 'action'
      			,value: function(item,name,index) {
  					if (typeof(item.buttons[index].actions) == "undefined") {
  						item.buttons[index].actions = [];
  					}		
          		
          			return item.buttons[index].actions.length;
          		}
          	}
		]
	}
}

//TYPE: ACTIONSHEET
prx.types.actionsheet_retina = {
	name: "actionsheet_retina"
	,onDisplay: function(item,containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		
		var _bg = cssGradient([{c: "rgba(255,255,255,0.2)", p:0}, {c: "rgba(255,255,255,0.3)", p: 100}])
		var _btnBg = cssGradient([{c: "rgba(255,255,255,0.3)", p:0},{c: "rgba(255,255,255,0.2)", p:50},{c: "rgba(255,255,255,0.1)", p:51},{c: "rgba(255,255,255,0.0)", p:100}])
		
		var cR = '';
		cR += '<div id="' + _id + '" class="box pos type-actionsheet-retina"><div style="padding: '+item.padding+'px; '+_bg+' background-size: 100% 40px; background-repeat: no-repeat; background-color: #'+item.backgroundColor+';">';
		$.each(item.buttons, function(i,elm){
			cR += '<div id="'+_id+'-buttons-'+i+'" class="actionsheet-button" style="'+_btnBg+'; background-color: #'+elm.backgroundColor+'; color: #'+elm.textColor+';">'+elm.text+'</div>';
		});
		cR +='</div></div>';
		return cR;
	}
	,properties: [
          prx.commonproperties.backgroundColor
          ,{ 
        	  caption: 'Padding (px)', 
        	  name: 'padding', 
        	  type: 'slider-select', 
        	  value: function(item,name) { 
        	  	return item.padding;
        	  }, 
        	  values: { min: 0, max: 40, step: 4 } 
          }
	]
	,dynamicProperties: {
		data: 'buttons'
		,propertyCaption: 'Buttons'
  		,propertyName: 'Button'
		,addCaption: 'Add button'
		,deleteCaption: 'Delete'
		,blankItem: {
			text: 'Label'
			,backgroundColor: '333333'
			,textColor: 'FFFFFF'
			,actions: []
		}
		,properties: [
			{
				caption: 'Text'
				,name: 'text'
				,type: 'input'
				,value: function(item,name,index) {
					return item.buttons[index].text;
				}
			},
			{
				caption: 'Background Color'
				,name: 'backgroundColor'
				,type: 'colorpicker'
				,value: function(item,name,index) {
					return item.buttons[index].backgroundColor;
				}
			},
			{
				caption: 'Text Color'
				,name: 'textColor'
				,type: 'colorpicker'
				,value: function(item,name,index) {
					return item.buttons[index].textColor;
				}
			},
            {
            	caption: 'Interactions'
            	,name: 'actions'
				,type: 'action'
				,value: function(item,name,index) {
					if (typeof(item.buttons[index].actions) == "undefined") {
						item.buttons[index].actions = [];
					}		
				
					return item.buttons[index].actions.length;
				}
			}     
		]
	}
}

//TYPE: PROGRESSVIEW
prx.types.progressview_retina = {
	name: 'progressview_retina'
	,onDisplay: function(item,containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		var cR = '';
		cR += '<div id="' + _id + '" class="box pos type-progressview-retina">';
		cR += '<div class="slider-bar" style="height: 100%; background-color: #'+item.barColor+';">';
		cR += '<div class="slider-bar-filled" style="width: '+item.progress+'%; background-color: #'+item.fillBarColor+'";></div>'
		cR += '</div></div>';
		return cR;
	}
	,properties: [
					{
						caption: 'Bar Color'
						,name: 'barColor'
						,type: 'colorpicker'
						,value: function(item,name) {
							return item.barColor;
						}
					},
					{
						caption: 'Fill Bar Color'
						,name: 'fillBarColor'
						,type: 'colorpicker'
						,value: function(item,name) {
							return item.fillBarColor;
						}
					},
					{
						caption: 'Progress (%)'
						,name: 'progress'
						,type: 'slider-select'
						,value: function(item,name) {
							return item.progress;
						}
						,values: { min: 0, max: 100, step: 10 }
					}
	              ]
}


// TYPE: POPOVER
prx.types.popover_retina = {
	name: "popover_retina"
	,onDisplay: function(item,containerid,pageid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		
		var _height, _width, _ttBg, _pos, _height2;
		
		var _dims = getRealDims(item,symbol);
		
		switch (item.ttDirection) {
		case 'top':
		case 'bottom':
			_width = '100%';
			_height = eval(_dims.height - 30) + 'px';
			_pos = 'width: 70px; height: 30px; left: ' + eval((_dims.width * item.ttPosition/100) - (70 * item.ttPosition/100)) + 'px;';
			break;
		case 'left':
		case 'right':
			_height = '100%';
			_width = eval(_dims.width - 30) + 'px';
			_pos = 'width: 30px; height: 70px; top: ' + eval((_dims.height * item.ttPosition/100) - (70 * item.ttPosition/100)) + 'px;';
			break;
		case 'none':
			_height = '100%';
			_width = '100%';
			_pos = 'width: 0px; height: 0px';
			break;
		}

		var _grad2 =  cssRGBA(item.borderColor, 75);
		var _grad3 =  cssRGBA(item.borderColor, 150);

		if(eval(item.hasHeader)) {
			var _grad =  cssRGBA(item.borderColor, 20);
			
			if(_height != '100%') {
				_height2 = parseInt(_height) - 70 + 'px';
			} else {
				_height2 = _dims.height - 70 + 'px';
			}
			var _borderRadius =  cssBorderRadius('0 0 ' + item.borderRadius + 'px ' +item.borderRadius+'px'); 
		} else {
			_height2 = _height;
			var _borderRadius = cssBorderRadius(item.borderRadius+'px');
		}
		
		
		switch (item.ttDirection) {
			case 'top': 
				if(eval(item.hasHeader)) {
					_ttBg = cssGradient([{ c: _grad3, p: 0 }, { c: _grad2, p: 40}], '135deg');
				} else {
					_ttBg = cssGradient([{ c: _grad2, p: 0 }, { c: '#' + item.borderColor, p: 50}], '135deg');
				}
				 break;
			case 'bottom': _ttBg = cssGradient([{ c: _grad2, p: 0 }, { c: '#' + item.borderColor, p: 50}], '-45deg'); break;
			case 'left': _ttBg = cssGradient([{ c: _grad2, p: 0 }, { c: '#' + item.borderColor, p: 50}], '45deg'); break;
			case 'right': _ttBg = cssGradient([{ c: _grad2, p: 0 }, { c: '#' + item.borderColor, p: 50}], '225deg'); break;
		}
		
		
		cR = '<div id="'+_id+'" class="box pos type-popover-retina">'
		cR += '<div style="position: absolute; overflow: hidden; '+item.ttDirection+': 0; '+_pos+'"><div class="popover-tooltip" style="background: '+_ttBg+'; '+item.ttDirection+': 0;"></div></div>'
		cR += '<div style="position: absolute; margin-'+item.ttDirection+': 30px; width: '+_width+'; height: '+_height+';">';
		if(eval(item.hasHeader)) {
			var _bgHeader = cssGradient([{ c: _grad2, p: 0 }, { c: _grad, p: 49}, { c: '#' + item.borderColor, p: 50 }]); 
			
			cR += '<div style="line-height: 60px; height: 50px; '+_bgHeader+' padding: 10px 0; text-align: center;'+getFontCssFromFontFamily(item.textFont)+' color: #'+item.textColor+'; font-size: '+item.textSize+'px; ' + cssBorderRadius(item.borderRadius+'px '+item.borderRadius+'px 0 0') + '">'+item.text+'</div>';			
		}
		cR += '<div class="popover-content" style="height: '+_height2+'; '+_borderRadius+' border: 10px solid #'+item.borderColor+'; background-color: #'+item.backgroundColor+'"></div>';
		cR += '</div></div>';
		
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
			_height = eval(_dims.height - 30) + 'px';
			$("#" + _id + " > div").first().css("left", eval((_dims.width * item.ttPosition/100) - (70 * item.ttPosition/100)) + 'px')
			break;
		case 'left':
		case 'right':
			_height = '100%';
			_width = eval(_dims.width - 30) + 'px';
			$("#" + _id + " > div").first().css("top", eval((_dims.height * item.ttPosition/100) - (70 * item.ttPosition/100)) + 'px')
			break;
		case 'none':
			_height = '100%';
			_width = '100%';
			break;
		}
		
		if(eval(item.hasHeader)) {
			if(_height != '100%') {
				_height2 = parseInt(_height) - 70 + 'px';
			} else {
				_height2 = _dims.height - 70 + 'px';
			}
		} else {
			_height2 = _height;
		}
		
		$("#" + _id + " .popover-content").css({
			width: _width,
			height: _height2
		});
		
		$("#" + _id + " > div").eq(1).css({
			width: _width,
			height: _height
		})
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
		},
     	{
			caption: 'Has Header?'
			,name: 'hasHeader'
			,type: 'onoff'
			,value: function(item,name) {
  				return item.hasHeader;
  			}
			,onChange: function(item) {
				if(item.hasHeader) {
					$('#property-text').show()
				} else {
					$('#property-text').hide()
				}
				return false;
			}
  		},
       	{
  			caption: 'Header Text'
  			,name: 'text'
  			,type: 'input'
  			,value: function(item,name) {
    			return item.text;
    		}
  			,hiddenByDefault: function(item,name){
  				return (!item.hasHeader);
  			}
		}
       	,prx.commonproperties.textFont
		/*,prx.commonproperties.textSize*/
       	,prx.commonproperties.textColor
		,prx.commonproperties.borderColor
		,prx.commonproperties.backgroundColor
       	,prx.commonproperties.borderRadius
    ]
	
};
/***** /OTHER COMPONENTS *****/


/************************************* COMPONENTS (OBJECTS) *************************************/
/***** TOOLBAR COMPONENTS *****/
prx.components.toolbar_retina = {
	name: 'toolbar_retina'
	,type: 'toolbar_retina'
	,lib: _library
	,caption: 'Toolbar'
	,icon: '-400px -80px'
	,helper: prx.url.devices+_path + 'toolbar/helper.png'
	,width:"full"
	,height:"88"
	,resizable : true
	,backgroundColor: '6e84a2'
	,overlay: false
}

prx.components.tabbar_retina = {
	name: 'tabbar_retina'
	,type: 'tabbar_retina'
	,lib: _library
	,caption: 'Tab bar'
	,icon: '-640px -80px'
	,helper: prx.url.devices+_path + 'tabbar/helper.png'		
	,textColor:  'black'
	,backgroundColor:  'none'
	,width:"full"
	,height:"96"
	,vpos: "bottom"
	,tabs: [
	           {
	        	   caption: "Home"
	        	   ,icon: {"fileId":"caeebe7f3a62939528c6a4ed009de42c.svg","name":"home.svg","assetType":"icon","bucketsource":"static","url":"f1352971179296/caeebe7f3a62939528c6a4ed009de42c.svg","folderId":"f1352971179296","targetSrc":"generated/caeebe7f3a62939528c6a4ed009de42c_666666.svg","color":"666666"}
	           	}
	           ,{
	        	   caption: "Favorites"
        		   ,icon: {"fileId":"94a90bf9a645dba63ad7a41d18f82ea7.svg","name":"star.svg","assetType":"icon","bucketsource":"static","url":"f1352971179296/94a90bf9a645dba63ad7a41d18f82ea7.svg","folderId":"f1352971179296","targetSrc":"generated/94a90bf9a645dba63ad7a41d18f82ea7_666666.svg","color":"666666"}
	           }
	           ]
	,selected: 0
	,resizable : true
	,resizeHandles : "e,w"
	,properties: "v,l,hpos,vpos,w"
	,overlay: false
	,maskIcons: true
	,iconSize: 3
}

prx.components.header_retina = {
	name: 'header_retina'
	,type: 'header_retina'
	,lib: _library
	,caption: 'Header'
	,icon: '-480px -80px'
	,helper: prx.url.devices+_path + 'header/helper.png'
	,width:"full"
	,height:"88"
	,resizable : true
	,backgroundColor: '6e84a2'
	,text: 'Header'
	,textFont: 'sans-serif,Helvetica Neue,Arial'
	,textSize: "40"
	,textColor:  'FFFFFF'
	,textProperties: ['bold']
  	,overlay: false
}
/***** /TOOLBAR COMPONENTS *****/

/***** BUTTON COMPONENTS *****/
prx.components.button2_retina = {
	name: 'button2_retina'
	,type: 'button2_retina'
	,lib: _library
	,caption: 'Menu Button'
	,icon: '-720px -80px'
	,helper: prx.url.devices+_path + 'button/helper.png'
	,width:"150"
	,height:"60"
	,resizable : true
	,backgroundColor: '4d6687'
	,bgGradient: true
	,text: 'Button'
	,textFont: 'sans-serif,Helvetica Neue,Arial'
	,textSize: "24"
	,textColor:  'FFFFFF'
	,textProperties: ["bold"]
	,shadowColor: '212121'
	,arrowDirection: 'none'
	,borderWidth: 2
	,borderColor: '416491'
	,borderRadius: 6
	,iconpos: ''
	,buttonicon: {
		fileId: '',
		folderId: '',
		url: '',
		assetType: 'icon',
		name: ''
	}
	,iconSize: 3
}

prx.components.arrowbutton_retina = {
	name: 'arrowbutton_retina'
	,type: 'arrowbutton_retina'
	,lib: _library
	,caption: 'Arrow Button'
	,icon: '-800px -80px'
	,helper: prx.url.devices+_path + 'arrowbutton/helper.png'
	,width:"150"
	,height:"60"
	,resizable : true
	,backgroundColor: '4d6687'
	,bgGradient: true
	,text: 'Button'
	,textFont: 'sans-serif,Helvetica Neue,Arial'
	,textSize: "24"
	,textColor:  'FFFFFF'
	,textProperties: ["bold"]
	,shadowColor: '212121'
	,arrowDirection: 'left'
	,borderWidth: 2
	,borderColor: '416491'
	,borderRadius: 6
	,iconpos: ''
	,buttonicon: {
		fileId: '',
		folderId: '',
		url: '',
		assetType: 'icon',
		name: ''
	}
	,iconSize: 3
}

prx.components.fullwidthbutton_retina = {
	name: 'fullwidthbutton_retina'
	,type: 'fullwidthbutton_retina'
	,lib: _library
	,caption: 'Full Width Button'
	,icon: '0 -160px'
	,helper: prx.url.devices+_path + 'fullwidthbutton/helper.png'
	,width:"600"
	,height:"90"
	,resizable : true
	,text: 'Button 1'
	,textFont: 'sans-serif,Helvetica Neue,Arial'
	,textSize: "32"
	,textColor:  'FFFFFF'
	,textProperties: ["bold"]
	,backgroundColor: '2c333c'
	,borderColor: '333333'
	,textColor: 'FFFFFF'
	,actions: []
}

prx.components.buttongroup_retina = {
	name: 'buttongroup_retina'
	,type: 'buttongroup_retina'
	,lib: _library
	,caption: 'Button Group'
	,icon: '-80px -160px'
	,helper: prx.url.devices+_path + 'buttongroup/helper.png'
	,width:"300"
	,height:"60"
	,resizable : true
	,backgroundColor: '4d6687'
	,bgGradient: true
	,textFont: 'sans-serif,Helvetica Neue,Arial'
	,textSize: "24"
	,textColor:  'FFFFFF'
	,textProperties: ["bold"]
	,borderWidth: 2
	,borderColor: '416491'
	,borderRadius: 6
	,iconpos: ''
	,iconSize: 3
	,buttons: [
		{
	    	text: 'Button 1',
	    	buttonicon: {
				fileId: '',
				folderId: '',
				url: '',
				assetType: 'icon',
				name: ''
			},
			actions: []
	    },
		{
	    	text: 'Button 2',
	    	buttonicon: {
				fileId: '',
				folderId: '',
				url: '',
				assetType: 'icon',
				name: ''
				},
				actions: []
		    }
        ]
    ,dynamicSizeExpand: 'h'
}

prx.components.segmentedcontrolplain_retina = {
	name: 'segmentedcontrolplain_retina'
	,type: 'segmentedcontrol_retina'
	,lib: _library
	,caption: 'Segmented Control Plain'
	,icon: '-160px -160px'
	,helper: prx.url.devices+_path + 'segmentedcontrol/helper.png'
	,width:"480"
	,height:"80"
	,resizable : true
	,borderRadius: 20
	,borderColor: 'CCCCCC'
	,textSize: 34
	,textFont: 'sans-serif,Helvetica Neue,Arial'
	,textColor: '7f7f7f'
	,textProperties: ["bold"]
	,backgroundColor: 'FFFFFF'
	,activeBackgroundColor: '6194FD'
	,activeTextColor: 'FFFFFF'
	,selected: 0
	,style: 'plain'
	,options: [
	   {
		   text: 'Label 1',
		   actions: []
	   },
	   {
		   text: 'Label 2',
	    	   actions: []
	       }
	   ]
	,dynamicSizeExpand: 'h'
}


prx.components.segmentedcontrol_retina = {
	name: 'segmentedcontrol_retina'
	,type: 'segmentedcontrol_retina'
	,lib: _library
	,caption: 'Segm. Control Bordered'
	,icon: '-240px -160px'
	,helper: prx.url.devices+_path + 'segmentedcontrol/helper.png'
	,width:"480"
	,height:"80"
	,resizable : true
	,borderRadius: 20
	,borderColor: 'CCCCCC'
	,textSize: 34
	,textFont: 'sans-serif,Helvetica Neue,Arial'
	,textColor: '7f7f7f'
	,textProperties: ["bold"]
	,backgroundColor: 'FFFFFF'
	,activeBackgroundColor: '6194FD'
	,activeTextColor: 'FFFFFF'
	,selected: 0
	,style: 'bordered'
	,options: [
       {
    	   text: 'Label 1',
    	   actions: []
       },
       {
    	   text: 'Label 2',
        	   actions: []
           }
       ]
    ,dynamicSizeExpand: 'h'
}


prx.components.segmentedcontrolbar_retina = {
	name: 'segmentedcontrolbar_retina'
	,type: 'segmentedcontrol_retina'
	,lib: _library
	,caption: 'Segmented Control Bar'
	,icon: '-320px -160px'
	,helper: prx.url.devices+_path + 'segmentedcontrolbar/helper.png'
	,width:"400"
	,height:"60"
	,resizable : true
	,borderRadius: 10
	,borderColor: '416491'
	,textSize: 24
	,textFont: 'sans-serif,Helvetica Neue,Arial'
	,textColor: 'FFFFFF'
	,textProperties: ["bold"]
	,backgroundColor: '4d6687'
	,activeBackgroundColor: '2f507a'
	,activeTextColor: 'FFFFFF'
	,selected: 0
	,style: 'bar'
	,options: [
       {
    	   text: 'Label 1',
    	   actions: []
       },
       {
    	   text: 'Label 2',
        	   actions: []
           }
       ]
    ,dynamicSizeExpand: 'h'
}

prx.components.segmentedcontrolbezeled_retina = {
	name: 'segmentedcontrolbezeled_retina'
	,type: 'segmentedcontrol_retina'
	,lib: _library
	,caption: 'Segm. Control Bezeled'
	,icon: '-400px -160px'
	,helper: prx.url.devices+_path + 'segmentedcontrolbezeled/helper.png'
	,width:"400"
	,height:"60"
	,resizable : true
	,borderRadius: 8
	,borderColor: '515d96'
	,textFont: 'sans-serif,Helvetica Neue,Arial'
	,textSize: 24
	,textColor: '344d72'
	,textProperties: ["bold"]
	,backgroundColor: 'd0deed'
	,activeBackgroundColor: '738db5'
	,activeTextColor: 'FFFFFF'
	,selected: 0
	,style: 'bezeled'
	,options: [
       {
    	   text: 'Label 1',
    	   actions: []
       },
       {
    	   text: 'Label 2',
        	   actions: []
           }
       ]
    ,dynamicSizeExpand: 'h'
}

prx.components.pagecontroller_retina = {
		name: 'pagecontroller_retina'
		,type: 'pagecontroller_retina'
		,lib: _library
		,caption: 'Page Controller'
		,icon: '-480px -160px'
		,helper: prx.url.devices+_path + 'pagecontroller/helper.png'
		,width:"200"
		,height:"20"
		,resizable : true
		,buttonColor: '4d4d4d'
		,activeButtonColor: 'ffffff'
		,buttonSize: 16
		,buttonBorderRadius: 20
		,buttonSpacing: 10
		,vertical: false
		,selected: 999
		,buttons: [
	       {
	    	   actions: []
	       },
	       {
        	   actions: []
           }
       ]
	}

/***** /BUTTON COMPONENTS *****/

/***** FORM COMPONENTS *****/
prx.components.label_retina = {
	name: 'label_retina'
	,type: 'label_retina'
	,lib: _library
	,caption: 'Label'
	,icon: '-560px -160px'
	,helper: prx.url.devices+_path + 'label/helper.png'		
	,text: 'Label'
	,textFont: 'sans-serif,Helvetica Neue,Arial'
	,textSize: "32"
	,textColor:  '4c566c'
	,backgroundColor:  'none'
	,width:"400"
	,height:"40"
	,textProperties: ['bold']
	,textAlign: 'left'
	,enableShadow: true
}

prx.components.textfield_retina = {
	name: 'textfield_retina'
	,type: 'textfield_retina'
	,lib: _library
	,caption: 'Text Field'
	,icon: '-640px -160px'
	,helper: prx.url.devices+_path + 'textfield/helper.png'		
	,width:"600"
	,height:"80"
	,value: ''
	,placeholder: 'Placeholder'
	,inputtype: 'text'
	,backgroundColor: 'ffffff'
	,textFont: 'sans-serif,Helvetica Neue,Arial'
	,textSize: "32"
	,textColor:  '000000'
	,placeholderColor: '999999'
	,borderWidth: 2
	,borderColor: 'cccccc'
	,borderRadius: 10
}

prx.components.passwordfield_retina = {
	name: 'passwordfield_retina'
	,type: 'textfield_retina'
	,lib: _library
	,caption: 'Password Field'
	,icon: '-720px -160px'
	,helper: prx.url.devices+_path + 'passwordfield/helper.png'		
	,width:"600"
	,height:"80"
	,value: ''
	,placeholder: 'Placeholder'
	,inputtype: 'password'
	,backgroundColor: 'ffffff'
	,textFont: 'sans-serif,Helvetica Neue,Arial'
	,textSize: "32"
	,textColor:  '000000'
	,placeholderColor: '999999'
	,borderWidth: 2
	,borderColor: 'cccccc'
	,borderRadius: 10
}

prx.components.radiobutton_retina = {
	name: 'radiobutton_retina'
	,type: 'radiobutton_retina'
	,caption: 'Radio Button'
	,icon: '0 -240px'
	,helper: prx.url.devices+_path + 'radiobutton/helper.png'
	,width:"32"
	,height:"32"
	,resizable : true
	,backgroundColor: 'cccccc'
	,active: false
	,actAsCheckbox: true
	,checkboxActionsOnActive: []
   	,checkboxActionsOnDeactive: []
}

prx.components.radiolist_retina = {
	name: 'radiolist_retina'
	,type: 'checkboxlist_retina'
	,lib: _library
	,caption: 'Radiobutton List'
	,icon: '-80px -240px'
	,helper: prx.url.devices+_path + 'radiofield/helper.png'
	,width:"600"
	,height:"160"
	,resizable : true
	,inputtype: 'radio'
	,borderRadius: 10
	,borderColor: 'CCCCCC'
	,textSize: 30
	,textFont: 'sans-serif,Helvetica Neue,Arial'
	,textColor: '999999'
	,textProperties: ['bold']
	,backgroundColor: 'FFFFFF'
	,activeBackgroundColor: 'ffffff'
	,activeTextColor: '333333'
	,textAlign: 'center'
	,appendCheckmark: false
	,checkmarkicon: {
		assetType: "gallery",
		fileId: "63e18f9f3815a02467df5665fffbdde8.png",
		folderId: "f1304073291358",
		name: " checkmark.png",
		url: "f1304073291358/63e18f9f3815a02467df5665fffbdde8.png"
	}
	,iconpos: 'right'	
	,horizontal: false
	,inputtype: 'radio'
	,checkboxes: [
       {
    	   text: 'Radio Button 1',
    	   active: false
       },
       {
    	   text: 'Radio Button 2',
    	   active: false
       }
   ]
   ,dynamicSizeExpand: 'v'
}

prx.components.horizontalradiolist_retina = {
	name: 'horizontalradiolist_retina'
	,type: 'checkboxlist_retina'
	,lib: _library
	,caption: 'Horizontal Radio List'
	,icon: '-160px -240px'
	,helper: prx.url.devices+_path + 'horizontalradiolist/helper.png'
	,width:"600"
	,height:"80"
	,resizable : true
	,inputtype: 'radio'
	,borderRadius: 10
	,borderColor: 'CCCCCC'
	,textSize: 30
	,textFont: 'sans-serif,Helvetica Neue,Arial'
	,textColor: '999999'
	,textAlign: 'center'
	,textProperties: ['bold']
	,backgroundColor: 'FFFFFF'
	,activeBackgroundColor: 'ffffff'
	,activeTextColor: '333333'
	,appendCheckmark: false
	,checkmarkicon: {
		assetType: "gallery",
		fileId: "63e18f9f3815a02467df5665fffbdde8.png",
		folderId: "f1304073291358",
		name: " checkmark.png",
		url: "f1304073291358/63e18f9f3815a02467df5665fffbdde8.png"
	}
	,iconpos: 'right'	
	,horizontal: true
	,inputtype: 'radio'
	,checkboxes: [
       {
    	   text: 'Radio Button 1',
    	   active: false
       },
       {
    	   text: 'Radio Button 2',
    	   active: false
       }
   ]
   ,dynamicSizeExpand: 'h'
}

prx.components.checkbox_retina = {
	name: 'checkbox_retina'
	,type: 'checkbox_retina'
	,lib: _library
	,caption: 'Checkbox'
	,icon: '-240px -240px'
	,helper: prx.url.devices+_path + 'checkbox/helper.png'
	,width:"32"
	,height:"32"
	,resizable : true
	,backgroundColor: 'cccccc'
	,activeColor: 'ffffff'
	,active: false
	,checkboxActionsOnActive: []
   	,checkboxActionsOnDeactive: []
}

prx.components.checkboxlist_retina = {
	name: 'checkboxlist_retina'
	,type: 'checkboxlist_retina'
	,lib: _library
	,caption: 'Checkbox List'
	,icon: '-320px -240px'
	,helper: prx.url.devices+_path + 'checkboxlist/helper.png'
	,width:"600"
	,height:"160"
	,resizable : true
	,borderRadius: 10
	,borderColor: 'CCCCCC'
	,textSize: 30
	,textFont: 'sans-serif,Helvetica Neue,Arial'
	,textColor: '999999'
	,textAlign: 'center'
	,textProperties: ['bold']
	,backgroundColor: 'FFFFFF'
	,activeBackgroundColor: 'ffffff'
	,activeTextColor: '333333'
	,appendCheckmark: false
	,checkmarkicon: {
		assetType: "gallery",
		fileId: "63e18f9f3815a02467df5665fffbdde8.png",
		folderId: "f1304073291358",
		name: " checkmark.png",
		url: "f1304073291358/63e18f9f3815a02467df5665fffbdde8.png"
	}
	,iconpos: 'right'	
	,horizontal: false
	,inputtype: 'checkbox'
	,checkboxes: [
       {
    	   text: 'Checkbox 1',
    	   active: false
       },
       {
    	   text: 'Checkbox 2',
    	   active: false
       }
   ]
   ,dynamicSizeExpand: 'v'
}

prx.components.horizontalcheckboxlist_retina = {
	name: 'horizontalcheckboxlist_retina'
	,type: 'checkboxlist_retina'
	,lib: _library
	,caption: 'Horizontal Checkbox List'
	,icon: '-400px -240px'
	,helper: prx.url.devices+_path + 'horizontalcheckboxlist/helper.png'
	,width:"600"
	,height:"80"
	,resizable : true
	,borderRadius: 10
	,borderColor: 'CCCCCC'
	,textSize: 30
	,textFont: 'sans-serif,Helvetica Neue,Arial'
	,textColor: '999999'
	,textAlign: 'center'
	,textProperties: ['bold']
	,backgroundColor: 'FFFFFF'
	,activeBackgroundColor: 'ffffff'
	,activeTextColor: '333333'
	,appendCheckmark: false
	,checkmarkicon: {
		assetType: "gallery",
		fileId: "63e18f9f3815a02467df5665fffbdde8.png",
		folderId: "f1304073291358",
		name: " checkmark.png",
		url: "f1304073291358/63e18f9f3815a02467df5665fffbdde8.png"
	}
	,iconpos: 'right'	
	,horizontal: true
	,inputtype: 'checkbox'
	,checkboxes: [
       {
    	   text: 'Checkbox 1',
    	   active: false
       },
       {
    	   text: 'Checkbox 2',
        	   active: false
           }
       ]
    ,dynamicSizeExpand: 'h'
}
	

prx.components.flipswitch_retina = {
	name: 'flipswitch_retina'
	,type: 'flipswitch_retina'
	,lib: _library
	,caption: 'Flip Switch'
	,icon: '-480px -240px'
	,helper: prx.url.devices+_path + 'flipswitch/helper.png'
	,width:"180"
	,height:"60"
	,resizable : true
	,switchColor: 'FFFFFF'
	,activeLabelText: 'ON'
	,activeLabelColor: '6194FD'
	,activeLabelTextColor: 'FFFFFF'
	,inactiveLabelText: 'OFF'
	,inactiveLabelColor: 'FFFFFF'
	,inactiveLabelTextColor: '666666'
	,ios5: false
	,active: true
	,flipswitchActionsOnActive: []
	,flipswitchActionsOnDeactive: []
}

prx.components.flipswitch_ios5_retina = {
	name: 'flipswitch_ios5_retina'
	,type: 'flipswitch_retina'
	,lib: _library
	,caption: 'iOS5 Flip Switch'
	,icon: '-560px -240px'
	,helper: prx.url.devices+_path + 'flipswitch_ios5/helper.png'
	,width:"180"
	,height:"60"
	,resizable : true
	,switchColor: 'FFFFFF'
	,activeLabelText: 'ON'
	,activeLabelColor: '1687E2'
	,activeLabelTextColor: 'FFFFFF'
	,inactiveLabelText: 'OFF'
	,inactiveLabelColor: 'FFFFFF'
	,inactiveLabelTextColor: '666666'
	,ios5: true
	,active: true
	,flipswitchActionsOnActive: []
	,flipswitchActionsOnDeactive: []
}


prx.components.textarea_retina = {
	name: 'textarea_retina'
	,type: 'textarea_retina'
	,lib: _library
	,caption: 'Textarea'
	,icon: '-640px -240px'
	,helper: prx.url.devices+ _path + 'textarea/helper.png'		
	,width:"600"
	,height:"300"
	,value: ''
	,placeholder: 'Placeholder'
	,backgroundColor: 'ffffff'
	,textFont: 'sans-serif,Helvetica Neue,Arial'
	,textSize: "32"
	,textColor:  '999999'
	,placeholderColor: '999999'
	,textProperties: ['bold']
	,borderWidth: 2
	,borderColor: 'cccccc'
	,borderRadius: 20
}

prx.components.slider_retina = {
	name: 'slider_retina'
	,type: 'slider_retina'
	,lib: _library
	,caption: 'Slider'
	,icon: '-720px -240px'
	,helper: prx.url.devices+_path + 'slider/helper.png'
	,width:"600"
	,height:"44"
	,resizable : true
	,sliderColor: 'ffffff'
	,sliderSize: '40'
	,sliderBorderRadius: '20' 
	,barColor: 'ffffff'
	,barThickness: '14'
	,twoColored: true
	,fillBarColor: '6194FD'
	,sliderPosition: 70
	,vertical: false
}

prx.components.picker_retina = {
	name: 'picker_retina'
	,type: 'picker_retina'
	,lib: _library
	,caption: 'Picker'
	,icon: '0 -320px'
	,helper: prx.url.devices+_path + 'picker/helper.png'
	,width:"full"
	,height:"300"
	,vpos: "bottom"
	,resizable : true
	,containerColor: '05192d'
	,listColor: 'ffffff'
	,textColor: '000000'
	,activeTextColor: '2A3666'
	,textFont: 'sans-serif,Helvetica Neue,Arial'
	,textProperties: ['bold']
	,showBar: true
	,barColor: '5d6489'
	,values: "Label 1<br />Label 2<br />Label 3<br />Label 4<br />Label 5"
	,selectedValue: 0
}
/***** /FORM COMPONENTS *****/

/***** LIST COMPONENTS *****/
prx.components.listbasic_retina = {
	name: 'listbasic_retina'
	,type: 'listbasic_retina'
	,lib: _library
	,caption: 'Basic List'
	,icon: '-80px -320px'
	,helper: prx.url.devices+_path + 'listbasic/helper.png'
	,width:"600"
	,height:"160"
	,resizable : true
	,style: 'grouped'
	,borderWidth: 2
	,borderRadius: 10
	,borderColor: 'CCCCCC'
	,textSize: 30
	,textFont: 'sans-serif,Helvetica Neue,Arial'
	,textColor: '333333'
	,textAlign: 'left'
	,textProperties: ['bold']
  	,subSize: 24
  	,subFont: 'sans-serif,Helvetica Neue,Arial'
  	,subColor: '999999'
  	,subProperties: []
	,backgroundColor: 'FFFFFF'
	,activeBackgroundColor: '6194FD'
	,activeTextColor: 'FFFFFF'
	,activeSubColor: 'FFFFFF'
	,iconpos: ''
	,iconSize: 2
	,listitems: [
       {
    	   itemtype: 'basic'
    	   ,text: 'Label 1'
    	   ,actions: []
    	   ,hasThumbnail: false
    	   ,thumbnail: { fileId: '', folderId: '', url: '', assetType: '', name: '' }
    	   ,subtitle: ''
       },
       {
    	   itemtype: 'basic'
    	   ,text: 'Label 2'
    	   ,actions: []
    	   ,hasThumbnail: false
    	   ,thumbnail: { fileId: '', folderId: '', url: '', assetType: '', name: '' }
    	   ,subtitle: ''
       }
    ]
    ,dynamicSizeExpand: 'v'
}

prx.components.listnested_retina = {
	name: 'listnested_retina'
	,type: 'listnested_retina'
	,lib: _library
	,caption: 'Nested List'
	,icon: '-160px -320px'
	,helper: prx.url.devices+_path + 'listnested/helper.png'
	,width:"600"
	,height:"160"
	,resizable : true
	,style: 'grouped'
	,borderWidth: 2
	,borderRadius: 10
	,borderColor: 'CCCCCC'
	,textSize: 30
	,textFont: 'sans-serif,Helvetica Neue,Arial'
	,textColor: '333333'
	,textAlign: 'left'
	,textProperties: ['bold']
	,subSize: 24
	,subFont: 'sans-serif,Helvetica Neue,Arial'
	,subColor: '999999'
	,subProperties: []
	,backgroundColor: 'FFFFFF'
	,activeBackgroundColor: '6194FD'
	,activeTextColor: 'FFFFFF'
	,activeSubColor: 'FFFFFF'
	,iconpos: 'right'
	,iconSize: 2
	,listitems: [
       {
    	   itemtype: 'nested'
    	   ,text: 'Label 1'
    	   ,buttonicon: {"fileId":"54d11361d17fef026e2d6b2c1a8fe379.svg","name":"chevron-right.svg","assetType":"icon","bucketsource":"static","url":"f1352971179296/54d11361d17fef026e2d6b2c1a8fe379.svg","folderId":"f1352971179296","targetSrc":"generated/54d11361d17fef026e2d6b2c1a8fe379_999999.svg","color":"999999"}
    	   ,actions: []
    	   ,hasThumbnail: false
    	   ,thumbnail: { fileId: '', folderId: '', url: '', assetType: '', name: '' }
    	   ,subtitle: ''
       },
       {
    	   itemtype: 'nested'
		   ,text: 'Label 2'
		   ,buttonicon: {"fileId":"54d11361d17fef026e2d6b2c1a8fe379.svg","name":"chevron-right.svg","assetType":"icon","bucketsource":"static","url":"f1352971179296/54d11361d17fef026e2d6b2c1a8fe379.svg","folderId":"f1352971179296","targetSrc":"generated/54d11361d17fef026e2d6b2c1a8fe379_999999.svg","color":"999999"}
    	   ,actions: []
    	   ,hasThumbnail: false
    	   ,thumbnail: { fileId: '', folderId: '', url: '', assetType: '', name: '' }
    	   ,subtitle: ''
       }
    ]
    ,dynamicSizeExpand: 'v'
}

prx.components.listwithicon_retina = {
	name: 'listwithicon_retina'
	,type: 'listwithicon_retina'
	,lib: _library
	,caption: 'List with Icon'
	,icon: '-240px -320px'
	,helper: prx.url.devices+_path + 'listbasic/helper.png'
	,width:"600"
	,height:"160"
	,resizable : true
	,style: 'grouped'
	,borderWidth: 2
	,borderRadius: 10
	,borderColor: 'CCCCCC'
	,textSize: 30
	,textFont: 'sans-serif,Helvetica Neue,Arial'
	,textColor: '333333'
	,textAlign: 'left'
	,textProperties: ['bold']
	,subSize: 24
  	,subFont: 'sans-serif,Helvetica Neue,Arial'
  	,subColor: '999999'
  	,subProperties: []
	,backgroundColor: 'FFFFFF'
	,activeBackgroundColor: '6194FD'
	,activeTextColor: 'FFFFFF'
	,activeSubColor: 'FFFFFF'
	,iconpos: 'right'
	,iconSize: 2
	,listitems: [
       {
    	   itemtype: 'withIcon'
    	   ,text: 'Label 1'
    	   ,buttonicon: { fileId: '', folderId: '', url: '', assetType: 'icon', name: '' }
    	   ,actions: []
    	   ,hasThumbnail: false
    	   ,thumbnail: { fileId: '', folderId: '', url: '', assetType: '', name: '' }
    	   ,subtitle: ''
    	
       },
       {
    	   itemtype: 'withIcon'
    	   ,text: 'Label 2'
    	   ,buttonicon: { fileId: '', folderId: '', url: '', assetType: 'icon', name: '' }
    	   ,actions: []
    	   ,hasThumbnail: false
    	   ,thumbnail: { fileId: '', folderId: '', url: '', assetType: '', name: '' }
    	   ,subtitle: ''
       }
    ]
    ,dynamicSizeExpand: 'v'
}

prx.components.listwithvalue_retina = {
	name: 'listwithvalue_retina'
	,type: 'listwithvalue_retina'
	,lib: _library
	,caption: 'List with Value'
	,icon: '-320px -320px'
	,helper: prx.url.devices+_path + 'listwithvalue/helper.png'
	,width:"600"
	,height:"160"
	,resizable : true
	,style: 'grouped'
	,borderWidth: 2
	,borderRadius: 10
	,borderColor: 'CCCCCC'
	,textSize: 30
	,textFont: 'sans-serif,Helvetica Neue,Arial'
	,textColor: '333333'
	,textProperties: ['bold']
	,textAlign: 'left'
	,subSize: 24
	,subFont: 'sans-serif,Helvetica Neue,Arial'
	,subColor: '999999'
	,subProperties: []
    ,valueSize: 32
	,valueFont: 'sans-serif,Helvetica Neue,Arial'
	,valueColor: '39558a'
	,valueProperties: []
	,backgroundColor: 'FFFFFF'
	,activeBackgroundColor: '6194FD'
	,activeTextColor: 'FFFFFF'
	,activeValueColor: 'FFFFFF'
	,activeSubColor: 'FFFFFF'
	,listitems: [
		{
			text: 'Label 1'
			,itemtype: 'withValue'
			,value: 'Insert value'
			,hasThumbnail: false
			,thumbnail: { fileId: '', folderId: '', url: '', assetType: '', name: '' }
			,actions: []
			,subtitle: ''
		},
		{
			text: 'Label 2'
			,itemtype: 'withValue'
			,value: 'Insert value'
			,hasThumbnail: false
			,thumbnail: { fileId: '', folderId: '', url: '', assetType: '', name: '' }
			,actions: []
			,subtitle: ''
		}
    ]
    ,dynamicSizeExpand: 'v'
}

prx.components.listnestedwithvalue_retina = {
	name: 'listnestedwithvalue_retina'
	,type: 'listnestedwithvalue_retina'
	,lib: _library
	,caption: 'Nested List with Value'
	,icon: '-400px -320px'
	,helper: prx.url.devices+_path + 'listnestedwithvalue/helper.png'
	,width:"600"
	,height:"160"
	,resizable : true
	,style: 'grouped'
	,borderWidth: 2
	,borderRadius: 10
	,borderColor: 'CCCCCC'
	,textSize: 30
	,textFont: 'sans-serif,Helvetica Neue,Arial'
	,textColor: '333333'
	,textProperties: ['bold']
	,textAlign: 'left'
  	,subSize: 24
  	,subFont: 'sans-serif,Helvetica Neue,Arial'
  	,subColor: '999999'
  	,subProperties: []
    ,valueSize: 32
	,valueFont: 'sans-serif,Helvetica Neue,Arial'
	,valueColor: '39558a'
	,valueProperties: []
	,backgroundColor: 'FFFFFF'
	,activeBackgroundColor: '6194FD'
	,activeTextColor: 'FFFFFF'
	,activeValueColor: 'FFFFFF'
	,activeSubColor: 'FFFFFF'
	,iconpos: 'right'
	,iconSize: 2
	,listitems: [
		{
			text: 'Label 1'
			,itemtype: 'nestedWithValue'
			,value: 'Insert value'
			,hasThumbnail: false
			,thumbnail: { fileId: '', folderId: '', url: '', assetType: '', name: '' }
			,buttonicon: {"fileId":"54d11361d17fef026e2d6b2c1a8fe379.svg","name":"chevron-right.svg","assetType":"icon","bucketsource":"static","url":"f1352971179296/54d11361d17fef026e2d6b2c1a8fe379.svg","folderId":"f1352971179296","targetSrc":"generated/54d11361d17fef026e2d6b2c1a8fe379_999999.svg","color":"999999"}
			,actions: []
			,subtitle: ''
		},
		{
			text: 'Label 2'
			,itemtype: 'nestedWithValue'
			,value: 'Insert value'
			,hasThumbnail: false
			,thumbnail: { fileId: '', folderId: '', url: '', assetType: '', name: '' }
			,buttonicon: {"fileId":"54d11361d17fef026e2d6b2c1a8fe379.svg","name":"chevron-right.svg","assetType":"icon","bucketsource":"static","url":"f1352971179296/54d11361d17fef026e2d6b2c1a8fe379.svg","folderId":"f1352971179296","targetSrc":"generated/54d11361d17fef026e2d6b2c1a8fe379_999999.svg","color":"999999"}
			,actions: []
			,subtitle: ''
		}
    ]
    ,dynamicSizeExpand: 'v'
}

prx.components.listwithiconandvalue_retina = {
	name: 'listwithiconandvalue_retina'
	,type: 'listwithiconandvalue_retina'
	,lib: _library
	,caption: 'List with Icon and Value'
	,icon: '-480px -320px'
	,helper: prx.url.devices+_path + 'listwithvalue/helper.png'
	,width:"600"
	,height:"160"
	,resizable : true
	,style: 'grouped'
	,borderWidth: 2
	,borderRadius: 10
	,borderColor: 'CCCCCC'
	,textSize: 30
	,textFont: 'sans-serif,Helvetica Neue,Arial'
	,textColor: '333333'
	,textProperties: ['bold']
	,textAlign: 'left'
  	,subSize: 24
  	,subFont: 'sans-serif,Helvetica Neue,Arial'
  	,subColor: '999999'
  	,subProperties: []
    ,valueSize: 32
	,valueFont: 'sans-serif,Helvetica Neue,Arial'
	,valueColor: '39558a'
	,valueProperties: []
	,backgroundColor: 'FFFFFF'
	,activeBackgroundColor: '6194FD'
	,activeTextColor: 'FFFFFF'
	,activeValueColor: 'FFFFFF'
	,activeSubColor: 'FFFFFF'
	,iconpos: 'right'
	,iconSize: 2
	,listitems: [
		{
			text: 'Label 1'
			,itemtype: 'withIconAndValue'
			,value: 'Insert value'
			,hasThumbnail: false
			,thumbnail: { fileId: '', folderId: '', url: '', assetType: '', name: '' }
			,buttonicon: { fileId: '', folderId: '', url: '', assetType: 'icon', name: '' }
			,actions: []
			,subtitle: ''
		},
		{
			text: 'Label 2'
			,itemtype: 'withIconAndValue'
			,value: 'Insert value'
			,hasThumbnail: false
			,thumbnail: { fileId: '', folderId: '', url: '', assetType: '', name: '' }
			,buttonicon: { fileId: '', folderId: '', url: '', assetType: 'icon', name: '' }
			,actions: []
			,subtitle: ''
		}
    ]
    ,dynamicSizeExpand: 'v'
}

prx.components.listwithbadge_retina = {
	name: 'listwithbadge_retina'
	,type: 'listwithbadge_retina'
	,lib: _library
	,caption: 'List with Badge'
	,icon: '-560px -320px'
	,helper: prx.url.devices+_path + 'listwithbadge/helper.png'
	,width:"600"
	,height:"160"
	,resizable : true
	,style: 'grouped'
	,borderWidth: 2
	,borderRadius: 10
	,borderColor: 'CCCCCC'
	,textSize: 30
	,textFont: 'sans-serif,Helvetica Neue,Arial'
	,textColor: '333333'
	,textProperties: ['bold']
    ,subSize: 24
	,subFont: 'sans-serif,Helvetica Neue,Arial'
	,subColor: '999999'
	,subProperties: []
    ,badgeSize: 24
	,badgeFont: 'sans-serif,Helvetica Neue,Arial'
	,badgeColor: 'ffffff'
	,badgeProperties: ['bold']
    ,badgeBackgroundColor: '8895B0'
    ,badgeGlassStyle: false
	,textAlign: 'left'
	,backgroundColor: 'FFFFFF'
	,activeBackgroundColor: '6194fd'
	,activeTextColor: 'FFFFFF'
	,activeSubColor: 'FFFFFF'
	,listitems: [
		{
			text: 'Label 1'
			,itemtype: 'withBadge'
			,subtitle: ''
			,badgeText: '1'
			,hasThumbnail: false
			,thumbnail: { fileId: '', folderId: '', url: '', assetType: '', name: '' }
			,actions: []
		},
		{
			text: 'Label 2'
			,itemtype: 'withBadge'
			,subtitle: ''
			,badgeText: '1'
			,hasThumbnail: false
			,thumbnail: { fileId: '', folderId: '', url: '', assetType: '', name: '' }
			,actions: []
		}
    ]
    ,dynamicSizeExpand: 'v'
}

prx.components.listnestedwithbadge_retina = {
	name: 'listnestedwithbadge_retina'
	,type: 'listnestedwithbadge_retina'
	,lib: _library
	,caption: 'Nested List with Badge'
	,icon: '-640px -320px'
	,helper: prx.url.devices+_path + 'listnestedwithbadge/helper.png'
	,width:"600"
	,height:"160"
	,resizable : true
	,style: 'grouped'
	,borderWidth: 2
	,borderRadius: 10
	,borderColor: 'CCCCCC'
	,textSize: 30
	,textFont: 'sans-serif,Helvetica Neue,Arial'
	,textColor: '333333'
	,textProperties: ['bold']
    ,subSize: 24
	,subFont: 'sans-serif,Helvetica Neue,Arial'
	,subColor: '999999'
	,subProperties: []
    ,badgeSize: 24
	,badgeFont: 'sans-serif,Helvetica Neue,Arial'
	,badgeColor: 'ffffff'
	,badgeProperties: ['bold']
    ,badgeBackgroundColor: '8895B0'
    ,badgeGlassStyle: false
	,textAlign: 'left'
	,backgroundColor: 'FFFFFF'
	,activeBackgroundColor: '6194fd'
	,activeTextColor: 'FFFFFF'
	,activeSubColor: 'FFFFFF'
	,iconpos: 'right'
	,iconSize: 2
	,listitems: [
		{
			text: 'Label 1'
			,itemtype: 'nestedWithBadge'
			,subtitle: ''
			,badgeText: '1'
			,hasThumbnail: false
			,thumbnail: { fileId: '', folderId: '', url: '', assetType: '', name: '' }
			,buttonicon: {"fileId":"54d11361d17fef026e2d6b2c1a8fe379.svg","name":"chevron-right.svg","assetType":"icon","bucketsource":"static","url":"f1352971179296/54d11361d17fef026e2d6b2c1a8fe379.svg","folderId":"f1352971179296","targetSrc":"generated/54d11361d17fef026e2d6b2c1a8fe379_999999.svg","color":"999999"}
			,actions: []
		},
		{
			text: 'Label 2'
			,itemtype: 'nestedWithBadge'
			,subtitle: ''
			,badgeText: '1'
			,hasThumbnail: false
			,thumbnail: { fileId: '', folderId: '', url: '', assetType: '', name: '' }
			,buttonicon: {"fileId":"54d11361d17fef026e2d6b2c1a8fe379.svg","name":"chevron-right.svg","assetType":"icon","bucketsource":"static","url":"f1352971179296/54d11361d17fef026e2d6b2c1a8fe379.svg","folderId":"f1352971179296","targetSrc":"generated/54d11361d17fef026e2d6b2c1a8fe379_999999.svg","color":"999999"}
				,actions: []
			}
	    ]
	    ,dynamicSizeExpand: 'v'
}

prx.components.listwithiconandbadge_retina = {
	name: 'listwithiconandbadge_retina'
	,type: 'listwithiconandbadge_retina'
	,lib: _library
	,caption: 'List with Icon and Badge'
	,icon: '-720px -320px'
	,helper: prx.url.devices+_path + 'listwithbadge/helper.png'
	,width:"600"
	,height:"160"
	,resizable : true
	,style: 'grouped'
	,borderWidth: 2
	,borderRadius: 10
	,borderColor: 'CCCCCC'
	,textSize: 30
	,textFont: 'sans-serif,Helvetica Neue,Arial'
	,textColor: '333333'
	,textProperties: ['bold']
    ,subSize: 24
	,subFont: 'sans-serif,Helvetica Neue,Arial'
	,subColor: '999999'
	,subProperties: []
    ,badgeSize: 24
	,badgeFont: 'sans-serif,Helvetica Neue,Arial'
	,badgeColor: 'ffffff'
	,badgeProperties: ['bold']
    ,badgeBackgroundColor: '8895B0'
    ,badgeGlassStyle: false
	,textAlign: 'left'
	,backgroundColor: 'FFFFFF'
	,activeBackgroundColor: '6194fd'
	,activeTextColor: 'FFFFFF'
	,activeSubColor: 'FFFFFF'
	,iconpos: 'right'
	,iconSize: 2
	,listitems: [
		{
			text: 'Label 1'
			,itemtype: 'nestedWithBadge'
			,subtitle: ''
			,badgeText: '1'
			,hasThumbnail: false
			,thumbnail: { fileId: '', folderId: '', url: '', assetType: '', name: '' }
			,buttonicon: { fileId: '', folderId: '', url: '', assetType: 'icon', name: '' }
			,actions: []
		},
		{
			text: 'Label 2'
			,itemtype: 'nestedWithBadge'
			,subtitle: ''
			,badgeText: '1'
			,hasThumbnail: false
			,thumbnail: { fileId: '', folderId: '', url: '', assetType: '', name: '' }
			,buttonicon: { fileId: '', folderId: '', url: '', assetType: 'icon', name: '' }
			,actions: []
		}
    ]
    ,dynamicSizeExpand: 'v'
}

prx.components.listcomplex_retina = {
	name: 'listcomplex_retina'
	,type: 'listcomplex_retina'
	,lib: _library
	,caption: 'Complex List'
	,icon: '0 -400px'
	,helper: prx.url.devices+_path + 'listbasic/helper.png'
	,width:"600"
	,height:"160"
	,resizable : true
	,style: 'grouped'
	,borderWidth: 2
	,borderRadius: 10
	,borderColor: 'CCCCCC'
	,textSize: 30
	,textFont: 'sans-serif,Helvetica Neue,Arial'
	,textColor: '333333'
	,textProperties: ['bold']
    ,subSize: 24
	,subFont: 'sans-serif,Helvetica Neue,Arial'
	,subColor: '999999'
	,subProperties: []
    ,valueSize: 32
	,valueFont: 'sans-serif,Helvetica Neue,Arial'
	,valueColor: '39558a'
	,valueProperties: []
    ,badgeSize: 24
	,badgeFont: 'sans-serif,Helvetica Neue,Arial'
	,badgeColor: 'ffffff'
	,badgeProperties: ['bold']
    ,badgeBackgroundColor: '8895B0'
    ,badgeGlassStyle: false
	,textAlign: 'left'
	,backgroundColor: 'FFFFFF'
	,activeBackgroundColor: 'FFFFFF'
	,activeTextColor: '445289'
	,activeSubColor: '445289'
	,activeValueColor: '445289'
	,iconpos: 'right'
	,iconSize: 2
	,listitems: [
		{
			text: 'Label 1'
			,itemtype: 'basic'
			,value: 'Insert value'
			,subtitle: ''
			,badgeText: '1'
			,hasThumbnail: false
			,thumbnail: { fileId: '', folderId: '', url: '', assetType: '', name: '' }
			,buttonicon: { fileId: '', folderId: '', url: '', assetType: 'icon', name: '' }
			,checked: true
			,actions: []
		},
		{
			text: 'Label 2'
			,itemtype: 'basic'
			,value: 'Insert value'
			,subtitle: ''
			,badgeText: '1'
			,hasThumbnail: false
			,thumbnail: { fileId: '', folderId: '', url: '', assetType: '', name: '' }
			,buttonicon: { fileId: '', folderId: '', url: '', assetType: 'icon', name: '' }
			,checked: true
			,actions: []
		}
    ]
    ,dynamicSizeExpand: 'v'
}
/***** /LIST COMPONENTS *****/

/***** OTHER COMPONENTS *****/
prx.components.alert_retina = {
	name: 'alert_retina'
	,type: 'alert_retina'
	,lib: _library
	,caption: 'Alert'
	,icon: '-160px -400px'
	,helper: prx.url.devices+_path + 'alert/helper.png'
	,width:"500"
	,height:"300"
	,resizable : true
	,backgroundColor: '162344'
	,title: 'Alert Label'
	,text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit'
	,borderColor: 'CCCCCC'
	,borderWidth: 4
	,borderRadius: 14
	,buttons: [{
			text: 'Cancel'
			,style: 'dark'
		},{
			text: 'Continue'
			,style: 'light'
		}]
}

prx.components.actionsheet_retina = {
	name: 'actionsheet_retina'
	,type: 'actionsheet_retina'
	,lib: _library
	,caption: 'Actionsheet'
	,icon: '-240px -400px'
	,helper: prx.url.devices+_path + 'actionsheet/helper.png'
	,width:"640"
	,height:"286"
	,vpos: "bottom"
	,resizable : true
	,backgroundColor: '60656f'
	,padding: 32
	,buttons: [{
			text: 'Button 1'
			,backgroundColor: '2c333c'
			,textColor: 'FFFFFF'
			,actions: []
		},
		{
			text: 'Button 2'
			,backgroundColor: 'bf0000'
			,textColor: 'FFFFFF'
			,actions: []
		}]
}

prx.components.progressview_retina = {
	name: 'progressview_retina'
	,type: 'progressview_retina'
	,lib: _library
	,caption: 'Progress View'
	,icon: '-320px -400px'
	,helper: prx.url.devices+_path + 'progressview/helper.png'
	,width:"600"
	,height:"10"
	,resizable : true
	,barColor: 'ffffff'
	,fillBarColor: '6194FD'
	,progress: 70
}

prx.components.popover_retina = {
		name: 'popover_retina'
		,type: 'popover_retina'
		,lib: _library
		,caption: 'Popover'
		,icon: '-80px -400px'
		,helper: prx.url.devices+_path + 'popover/helper.png'
		,image: prx.url.devices+_path + 'popover/image.png'
		,width: '440'
		,height: '700'
		,resizable : true
		,borderColor: '091018'
		,backgroundColor: 'none'
		,hasHeader: true
		,text: 'Header'
		,textFont: 'sans-serif'
		,textSize: "40"
		,textColor:  'FFFFFF'
		,borderRadius: 20
		,ttDirection: 'top'
		,ttPosition: '5'
	};


/***** /OTHER COMPONENTS *****/

