Vue.component('iam-collapser', {
	template: '#iam-collapser',
	props: {
		hue: String,
		default: '',
	},
	data: function () {
		return {
			"hueVal": 0,
			"iam-states": {
				"is-open": true,
				"is-disabled": false,
			},
		};
	},
	computed: {
		ariaHidden: function () {
			return (!this.isOpen).toString();
		},
		cssProps: function () {
			/* this code isn't working in IE11 */
			/* https://github.com/nuxodin/ie11CustomProperties/issues/93 */
			return this.hueVal ? { '--thm-hue': this.hueVal } : false;
		},
		iamStates: function () {
			var str = JSON.stringify(this['iam-states']);
			const charmap = {',': ' ', '"': ''};
			str = str.replace(/[,"]/gi, function(matched){
				return charmap[matched];
			  });
			return str.slice(1, -1);
		},
		disabledTitle: function () {
			return this.isDisabled ? 'This area is disabled!' : false;
		},
		isDisabled: function () {
			return this['iam-states']['is-disabled'];
		},
		isOpen: function () {
			return this['iam-states']['is-open'];
		}
	},
	methods: {
		onHeaderClick: function () {
			if (!this.isDisabled)
				this.toggleVisibility();
		},
		toggleVisibility: function () {
			this['iam-states']['is-open'] = !this.isOpen;
		},
	},
	created: function () {
		if (this.hue) {
			if (this.hue == 'random') {
				this.hueVal = Math.floor(Math.random()*11)*30;
			}

			if (isFinite(this.hue)) {
				this.hueVal = this.hue;
			}
		}

		// set is-disabled state
		if (this.$attrs.hasOwnProperty('disabled')) {
			const attrDis = this.$attrs['disabled'];
			if (typeof attrDis !== 'undefined')
				if ((attrDis === '') || (Boolean(attrDis) === true) )
					this['iam-states']['is-disabled'] = true;
		}
	},
});

new Vue({
	el: '[iam-app]'
});
