(function() {
var cssQueryStrings = {
	appContainerId: 'wgtBooks',
	stateAttribute: 'iam-tree-label',
	stateActive: 'sttActive',
	stateOpen: 'sttOpen',
	stateCollapsed: 'sttClose'
};

var cVpCommon = {
	addAttrValNoDelim: function( o, attr_name,  val ){
		if ( !o.hasAttribute( attr_name ) ) {
			var attr = document.createAttribute( attr_name );
			attr.value = '';
			o.setAttributeNode( attr );
		}
		
		var re = new RegExp( '(^|\\s)' + val + '(\\s|$)', 'g' );
		var attr_val = o.getAttribute( attr_name );
		if ( re.test( attr_val ) ) return;
		
		attr_val = attr_val + ' ' + val;
		o.setAttribute( attr_name, attr_val );
		
		// ie8 fix
		if (this.ie < 9)
			o.className = o.className;
	}
	
	, removeAttrValNoDelim: function( o, attr_name, val ){
		if ( !o.hasAttribute( attr_name ) ) return;

		var attr_val = o.getAttribute( attr_name );
		attr_val = attr_val.replace( val, '' );
		o.setAttribute( attr_name, attr_val );
		
		// ie8 fix
		if (this.ie < 9)
			o.className = o.className;
	}
	
	, toggleAttrVal: function( o, attr_name, val_a, val_b ){
		if ( !o.hasAttribute( attr_name ) ) return;
		
		var attrVal = o.getAttribute( attr_name );
		var is_a = attrVal.indexOf(val_a) > -1;
		var is_b = attrVal.indexOf(val_b) > -1;

		if ( is_a )
			o.setAttribute(attr_name, attrVal.replace(val_a, val_b));
		else
			if ( is_b )
				o.setAttribute(attr_name, attrVal.replace(val_b, val_a));

		if ( !is_a && !is_b )
			this.addAttrValNoDelim( o, attr_name, val_b );
		
		// ie8 fix
		if (this.ie < 9)
			o.className = o.className;
	}
	
	, ie: (function(){
		var undef,
			v = 3,
			div = document.createElement('div'),
			all = div.getElementsByTagName('i');

		while (
			div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
			all[0]
		);
	
		return v > 4 ? v : undef;
	}())
};

window.addEventListener = window.addEventListener || function (e, f) { window.attachEvent('on' + e, f); };

function setIeBody(){
	if (cVpCommon.ie)
		document.body.className = 'ie' + cVpCommon.ie;
}

function appendEventHandlers(){
	// На обработку щелчка выбираем только те элементы, которые содержат подсписки
	var placeholder = document.getElementById(cssQueryStrings.appContainerId);

	// ie11 don't support template literals =(
	var clickFolders = placeholder.querySelectorAll(
		'[' + cssQueryStrings.stateAttribute + '~=' + cssQueryStrings.stateOpen + '],'
		+ '[' + cssQueryStrings.stateAttribute + '~=' + cssQueryStrings.stateCollapsed + ']');
	
	function folderOnClick(e){
		var target = e.target ? e.target : e.srcElement; //IE8
		cVpCommon.toggleAttrVal(
			target,
			cssQueryStrings.stateAttribute,
			cssQueryStrings.stateOpen,
			cssQueryStrings.stateCollapsed);
		
		//ie8 fix
		if (cVpCommon.ie < 9){
			var sibl = target.nextSibling;
			if (sibl)
				sibl.className = sibl.className;
		}
	}
	
	for (var i = 0; i < clickFolders.length; i++){
		if (clickFolders[i].addEventListener)
			clickFolders[i].addEventListener('click', folderOnClick, false );
		else
			clickFolders[i].attachEvent('onclick', folderOnClick);
	}
	
	function labelOnClick(e){
		var target = e.target ? e.target : e.srcElement; //IE8
		var attrVal = target.getAttribute(cssQueryStrings.stateAttribute);
		var prevActive = placeholder.querySelector(
			'[' + cssQueryStrings.stateAttribute + '~=' + cssQueryStrings.stateActive + ']');

		if (prevActive)
			cVpCommon.removeAttrValNoDelim(
				prevActive,
				cssQueryStrings.stateAttribute,
				cssQueryStrings.stateActive);
			
		cVpCommon.addAttrValNoDelim(
			target,
			cssQueryStrings.stateAttribute,
			cssQueryStrings.stateActive);
		
		//ie8 fix
		if (cVpCommon.ie < 9){
			var sibl = target.nextSibling;
			if (sibl)
				sibl.className = sibl.className;
		}
	}
	
	var clickActiveLabels = placeholder.querySelectorAll('[' + cssQueryStrings.stateAttribute + ']');
	for (var i = 0; i < clickActiveLabels.length; i++){
		if (clickActiveLabels[i].addEventListener)
			clickActiveLabels[i].addEventListener('click', labelOnClick, false );
		else
			clickActiveLabels[i].attachEvent('onclick', labelOnClick);
	}
}

setIeBody();
appendEventHandlers();
})();