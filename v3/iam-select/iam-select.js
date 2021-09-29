(function() {
	var iamStates = {
		valUndefined: 'is-undef',
		optionsVisible: 'is-open',
		optionsInvisible: 'is-closed',
	}

	Vue.component('iam-select', {
		directives: {
			onClickaway: VueClickaway.directive,
		},
		props: [
			'id', //user should give us id, not generated here (by component)
			'groups', // plain array with text labels of groups
			'name', // standard html attribute
			'mods', // all iamCSS modifiers
			'options', // array with plain json data (grouped by groupIndex)
			'placeholder', // default text (preffered instead of slot-option)
			'titleIfDisabled', // User needs suggestion, why this select is disabled (but shown)
			'disabled', // standard html attribute
		],
		template: '#iam-select',
		data: function() {
			return {
				isOpenState: false, // programming state for setting iamCSS-modifiers
				calcGroups: [], // data from default slot by "optgroup" tags
				calcOptions: [], // data from default slot by "option" & "optgroup" tags
				optPlaceholder: 'Choose one', // default text (may contain html through slot-option)
				undef: true, // if option without value selected
			};
		},
		computed: {
			// component main css attribute should exist anyway
			iamMods: function () {
				return this.mods ? this.mods + ' ' + this.selectStates : this.selectStates;
			},

			selectStates: function () {
				var isOpen = this.isOpenState ? iamStates.optionsVisible : iamStates.optionsInvisible;
				if (this.undef)
					return isOpen + ' ' + iamStates.valUndefined;

				return isOpen
			},

			ttl: function () {
				if (typeof this.disabled !== 'undefined') {
					return this.titleIfDisabled;
				}
			},
		},

		mounted: function() {
			var slotOptions = []; // plain slot options not in optgroups
			var slotOptGroups = []; // plain slot optgroup tags only
			if (this.$slots.default) {
				slotOptions = this.$slots.default.filter(function(node) {
					return node.tag === 'option';
				});

				slotOptGroups = this.$slots.default.filter(function(node) {
					return node.tag === 'optgroup';
				});
			}

			var self = this;

			// get data from slot plain options (without optgroups)
			if (slotOptions.length) {
				slotOptions.forEach(function(opt) {
					if (typeof opt.elm !== 'undefined') {
						if (opt.data && opt.data.attrs && opt.data.attrs.value) {
							self.calcOptions.push({
								value: opt.data.attrs ? opt.data.attrs.value : undefined,
								html: opt.elm.innerHTML,
								selected: opt.elm.selected,
								disabled: opt.elm.disabled,
							});

							// selected by default placeholder
							// (no value attr on option) is not defined value!
							if (opt.elm.selected) {
								self.undef = false;
							}
						} else {
							// placeholder option (or group title?!)
							if (opt.elm.hasAttribute('placeholder')) {
								self.optPlaceholder = opt.elm.innerHTML;
							}
						}

					} else {
						// TODO: throw error
					}
				});
			} 
			
			// get data from slot options (with optgroups)
			if (slotOptGroups.length) {
				slotOptGroups.forEach(function(group, i) {
					self.calcGroups.push({
						value: group.data.attrs.label,
						disabled: group.elm && group.elm.disabled,
					});

					var childOptions = group.children.filter(function(node) {
						return node.tag === 'option';
					});

					childOptions.forEach(function(opt) {
						if (typeof opt.elm !== 'undefined') {
							self.calcOptions.push({
								value: opt.data.attrs ? opt.data.attrs.value : undefined,
								html: opt.elm.innerHTML,
								selected: opt.elm.selected,
								disabled: opt.elm.disabled,
								groupIndex: i,
							});

							// selected by default placeholder
							// (no value attr on option) is not defined value!
							if (opt.elm.selected) {
								self.undef = false;
							}
						}
					});
				});
			}

			if (self.groups && self.groups.length)
				self.calcGroups = self.groups;

			// property options rewrite slot options
			// needs to sort by groups (if groups exists) & enrich with data
			self.calcOptions = self.enrichOptionsGroupTitles(
				self.options ? self.options : self.calcOptions,
				self.calcGroups,
			);
		},

		methods: {
			enrichOptionsGroupTitles(opts, groups) {
				var sortedOpts = opts.sort(function(a, b) {
					if (typeof a.groupIndex === 'undefined' && typeof b.groupIndex === 'undefined')
    					return 0;
					else if (typeof a.groupIndex === 'undefined')
						return -1;
					else if (typeof b.groupIndex === 'undefined' )
						return 1;
					else
						return a.groupIndex - b.groupIndex;
				});

				if (groups && groups.length) {
					sortedOpts.forEach(function(opt, i) {
						if (typeof opt.groupIndex !== 'undefined') {
							var group = groups[opt.groupIndex];
							if ((i == 0)
								|| (i > 0 && sortedOpts[i - 1].groupIndex !== opt.groupIndex)) {
								opt.groupTitle = group.value;
							}

							if (typeof opt.disabled === 'undefined'	|| group.disabled)
								opt.disabled = group.disabled ? true : false;
						}

						if (typeof opt.selected === 'undefined')
							opt.selected = false;					
					});
				}

				return sortedOpts;
			},

			toggleVisibility() {
				this.isOpenState = !this.isOpenState;
				this.$emit(this.isOpenState ? 'open' : 'close', this.id);
			},

			onSelect: function(opt) {
				this.undef = false;
				this.$emit('input', opt.value, this.id);
				this.$emit('select', opt, this.id);
				this.toggleVisibility();
			},

			away: function(evt) {
				if (this.isOpenState)
					this.toggleVisibility();
			}
		}
	});
})();
