(function() {
var cssQueryStrings = {
	appContainerId: 'punkts',
	ulAttribute: 'iam-tree-list',
	ulRootMod: 'lstRoot',
	ulInnerMod: 'lstInner',
	liAttribute: 'iam-tree-item',
	liLeafMod: 'sttLeaf',
	clickAttribute: 'iam-tree-label',
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
		// TODO: накапливаются пробелы после многократного toggle!
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

function setIeBody() {
	if (cVpCommon.ie)
		document.body.className = 'ie' + cVpCommon.ie;
}

function cVpWidget( options ) {
	var self = this;

	self._init( options );

	if (self.checkDataIsValid( self.data )) {
		self.options.placeholder.appendChild(
			self.getRenderedDomElements( self.data )
		);
		self.appendEventHandlers();
	}
}

cVpWidget.prototype = {
	data: null
	, options: null
}

cVpWidget.prototype._init = function( options ) {
	var self = this;
	
	self.data = options.data;
	self.options = options;
	delete self.options.data;
	setIeBody();
}

cVpWidget.prototype.checkDataIsValid = function( wgtData ) {
	var retVal = false;
	var self = this;
	var plhElement = self.options.placeholder;
	if (!plhElement) {
		throw 'cVpWidget: Объект placeholder не найден!"';
	} else {
		if (!wgtData)
			plhElement.appendChild(self.getEmptyDataMsgElement());
		else
		retVal = true;
    }
	return retVal;
}

cVpWidget.prototype.getEmptyDataMsgElement = function() {
	var pNoDataMsg = document.createElement('p');
	pNoDataMsg.textContent = 'Нет данных =(';
    
	return pNoDataMsg;
}

cVpWidget.prototype.getRenderedDomElements = function( wgtData ) {
	var retDomElems = document.createDocumentFragment();
	return retDomElems;
}

cVpWidget.prototype.appendEventHandlers = function() {
}

function cVpTreeView( options ) {
	cVpWidget.apply(this, arguments);
}

cVpTreeView.prototype = Object.create(cVpWidget.prototype);

cVpTreeView.prototype.getRenderedDomElements = function( wgtData ) {
	var self = this;
	var retDomElems = document.createDocumentFragment();
	var itemsContainer = document.createElement('ul');
	itemsContainer.setAttribute(cssQueryStrings.ulAttribute, cssQueryStrings.ulRootMod);
	
	var filteredData = self.filterTreeItemsData( wgtData, 0 );
	if (filteredData.length){
		self.appendTreeItemsByData(filteredData, itemsContainer);
		retDomElems.appendChild(itemsContainer);
	}
	
	return retDomElems;
}

cVpTreeView.prototype.filterTreeItemsData = function( wgtData, filteringParentId ) {
	var retDataItems;

	retDataItems = wgtData.filter(function (dataitem) {
		return dataitem.itemParentId == filteringParentId;
	});
	
	// если у данного item есть свои дочерние узлы, то облегчим себе жизнь заведением доп. свойства
	var retDataItem, children;
	for (var i = 0; i < retDataItems.length; i++) {
		retDataItem = retDataItems[i];
		children = wgtData.filter(function (dataitem) {
			return dataitem.itemParentId == retDataItem.itemId;
		});
		retDataItem.hasChildren = (children.length) ? true : false;
	}
	
	return retDataItems;
}

cVpTreeView.prototype.appendTreeItemsByData = function( filteredData, itemsContainer ) {
	var self = this;
	var listItem, listItemLabel, listItemMods, childrenData, childrenContainer;
	for (var i = 0; i < filteredData.length; i++) {
		listItem = document.createElement('li');
		listItem.setAttribute(cssQueryStrings.liAttribute, '');
		
		listItemLabel = document.createElement('span');
		listItemLabel.textContent = filteredData[i].itemName;
		
		listItem.appendChild(listItemLabel);
		itemsContainer.appendChild(listItem);
		
		listItemMods = '';
		listItemMods += self.options.skin_mod + ' ';
		
		// рекурсия
		childrenData = self.filterTreeItemsData( self.data, filteredData[i].itemId );
		if (childrenData.length) {
			childrenContainer = document.createElement('ul');
			childrenContainer.setAttribute(
				cssQueryStrings.ulAttribute, cssQueryStrings.ulInnerMod + ' ' + self.options.spaces_mod);
			self.appendTreeItemsByData(childrenData, childrenContainer);
			listItem.appendChild(childrenContainer);
			// Для элементарного кэширования иконок разных состояний
			listItemMods += (i > 0) ? cssQueryStrings.stateOpen : cssQueryStrings.stateCollapsed;
		} else {
			listItemMods += cssQueryStrings.liLeafMod;
		}
		
		listItemMods += ' ' + self.options.spaces_mod;

		listItemLabel.setAttribute(cssQueryStrings.clickAttribute, listItemMods);
	}
}

cVpTreeView.prototype.appendEventHandlers = function() {
	// На обработку щелчка выбираем только те элементы, которые содержат подсписки
	var self = this;

	// ie11 don't support template literals =(
	var clickFolders = self.options.placeholder.querySelectorAll(
		'[' + cssQueryStrings.clickAttribute + '~=' + cssQueryStrings.stateOpen + '],'
		+ '[' + cssQueryStrings.clickAttribute + '~=' + cssQueryStrings.stateCollapsed + ']');
	
	function folderOnClick(e) {
		var target = e.target ? e.target : e.srcElement; // IE8
		cVpCommon.toggleAttrVal(
			target,
			cssQueryStrings.clickAttribute,
			cssQueryStrings.stateOpen,
			cssQueryStrings.stateCollapsed);
		
		// ie8 fix
		if (cVpCommon.ie < 9) {
			var sibl = target.nextSibling;
			if (sibl)
				sibl.className = sibl.className;
		}
	}

	for (var i = 0; i < clickFolders.length; i++) {
		if (clickFolders[i].addEventListener)
			clickFolders[i].addEventListener('click', folderOnClick, false );
		else
			clickFolders[i].attachEvent('onclick', folderOnClick);
	}
	
	function labelOnClick(e) {
		var target = e.target ? e.target : e.srcElement; //IE8
		var attrVal = target.getAttribute(cssQueryStrings.clickAttribute);
		var prevActive = self.options.placeholder.querySelector(
			'[' + cssQueryStrings.clickAttribute + '~=' + cssQueryStrings.stateActive + ']');

		if (prevActive)
			cVpCommon.removeAttrValNoDelim(
				prevActive,
				cssQueryStrings.clickAttribute,
				cssQueryStrings.stateActive);
			
		cVpCommon.addAttrValNoDelim(
			target,
			cssQueryStrings.clickAttribute,
			cssQueryStrings.stateActive);
		
		//ie8 fix
		if (cVpCommon.ie < 9){
			var sibl = target.nextSibling;
			if (sibl)
				sibl.className = sibl.className;
		}
	}
	
	var clickActiveLabels = self.options.placeholder.querySelectorAll('[' + cssQueryStrings.clickAttribute + ']');
	for (var i = 0; i < clickActiveLabels.length; i++) {
		if (clickActiveLabels[i].addEventListener)
			clickActiveLabels[i].addEventListener('click', labelOnClick, false );
		else
			clickActiveLabels[i].attachEvent('onclick', labelOnClick);
	}
}

var treeOptions = {
	data: [
		{itemId:1, itemName:'пункт №1', itemParentId:0}
		, {itemId:2, itemName:'пункт №1.1', itemParentId:1}
		, {itemId:3, itemName:'пункт №1.2', itemParentId:1}
		, {itemId:4, itemName:'пункт №1.2.1', itemParentId:3}
		, {itemId:5, itemName:'пункт №1.2.2', itemParentId:3}
		, {itemId:6, itemName:'пункт №1.2.3', itemParentId:3}
		, {itemId:7, itemName:'пункт №2', itemParentId:0}
		, {itemId:8, itemName:'пункт №3', itemParentId:0}
		, {itemId:9, itemName:'пункт №3.1', itemParentId:8}
		, {itemId:10, itemName:'пункт №3.2', itemParentId:8}
		, {itemId:11, itemName:'пункт №3.3', itemParentId:8}
		, {itemId:12, itemName:'пункт №3.3.1', itemParentId:11}
		, {itemId:13, itemName:'пункт №3.3.1.1', itemParentId:12}
		, {itemId:14, itemName:'пункт №3.3.1.2', itemParentId:12}
		, {itemId:15, itemName:'пункт №3.3.1.3', itemParentId:12}
		, {itemId:16, itemName:'пункт №3.3.2', itemParentId:11}
		, {itemId:17, itemName:'пункт №4', itemParentId:0}
		, {itemId:18, itemName:'пункт №5', itemParentId:0}
		, {itemId:19, itemName:'пункт №5.1', itemParentId:18}
	]
	, placeholder: document.querySelector('#' + cssQueryStrings.appContainerId)
	, skin_mod: 'sknWindows'
	, spaces_mod: 'spcIco24px'
};

new cVpTreeView( treeOptions );

})();