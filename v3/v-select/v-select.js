(function () {
	// Array.includes
	// @see [stackoverflow](https://stackoverflow.com/questions/31221341/#answer-31221374)
	if (!Array.prototype.includes) {
		Object.defineProperty(Array.prototype, "includes", {
			enumerable: false,
			value: function (obj) {
				var newArr = this.filter(function (el) {
					return el == obj;
				});
				return newArr.length > 0;
			}
		});
	}
})();

(function () {
	const blockName = 'select';
	const elemOptName = blockName + '-option';

	const optActiveMod = 'selected';
	const attDataActiveName = 'data-' + optActiveMod + '-indexes';

	const selMultipleMod = 'is-multi';
	const multipleSeparator = ',';

	const cssPrefix = 'iam-';
	// const state = new WeakMap(); //global state for all marked elements with el as key

	/**
	 * Function for getting array with numbers
	 *
	 * @param {string} str
	 * @param {string} sep - separator
	 * @returns {number[]}
	 */
	function numArrayFromString(str, sep) {
		/** @type {number[]} */
		var arrNums = [];

		if (str && str.length > 0) {
			// str.replace(/[{()}]/g, '');
			arrNums = str.split(sep).map(function (n) {
				return Number(n);
			});
		}

		return arrNums;
	}

	/**
	 * Get js/default html selected state for options
	 *
	 * @param {HTMLSelectElement} el
	 * @returns {number[]} arrIndexes
	 */
	function getSelectedIndexes(el) {
		/** @type {HTMLOptionElement[]} */
		const arrOptions = Array.apply(null, el.options);

		/** @type {number[]} */
		const retSelected = [];

		arrOptions.forEach(function (opt) {
			if (opt.selected && !opt.hasAttribute('placeholder')) {
				retSelected.push(opt.index);
			}
		});

		return retSelected;
	}

	/**
	 * Set/unset js selected state (not attributes!) for options
	 *
	 * @param {HTMLSelectElement} el
	 * @param {number[]} arrIndexes
	 */
	function setSelectedByIndexes(el, arrIndexes) {
		// instead of using Array.from()
		// @see [stackoverflow](https://stackoverflow.com/questions/6138042/#answer-20616985)
		/** @type {HTMLOptionElement[]} */
		const arrOptions = Array.apply(null, el.options);

		if (arrIndexes && arrOptions) {
			arrOptions.forEach(function (opt) {
				// it is not about html attribute! State is stored in js
				opt.selected = arrIndexes.includes(opt.index); // may be better loop?

				// console.log(Date.now(), 'setSelectedByIndexes', arrIndexes, opt.selected);

				// remove default selected attributes
				if (!opt.selected) {
					opt.removeAttribute('selected');
				}

				// set bem-modifiers to plane structure
				const dis = opt.disabled || opt.parentElement.disabled ? 'disabled' : ''
				const act =  opt.selected ? optActiveMod : '';

				opt.setAttribute(cssPrefix + elemOptName, [act, dis].filter(Boolean).join(' '));
			});
		}
	}

	// @link https://stackoverflow.com/questions/40655333/#answer-40720172
	function emit(vnode, name, data) {
		const handlers = (vnode.data && vnode.data.on)
			|| (vnode.componentOptions && vnode.componentOptions.listeners);

		if (handlers && handlers[name]) {
			handlers[name].fns(data);
		}
	}

	/**
	 * Native select value is changed by js or UI
	 *
	 * @param {Event} evt
	 */
	function onChange(evt, evtArgs) {
		// bad code - modify outside
		// set data outside directive element
		/*
		if (evtArgs.vnode.context[evtArgs.binding.expression]) {
			evtArgs.vnode.context[evtArgs.binding.expression]
				= getSelectedIndexes(evtArgs.el).join(multipleSeparator);
		}
		*/

		const data = getSelectedIndexes(evtArgs.el);
		setSelectedByIndexes(evtArgs.el, data);
		emit(evtArgs.vnode, 'select-change', data);
	}

	Vue.directive(blockName, {
		/**
		 * @param {HTMLSelectElement} el
		 * @param {Object} binding
		 */
		inserted: function (el, binding, vnode) {
			/** @type {number[]} */
			var selectedIndexes = numArrayFromString(binding.value, multipleSeparator);

			if (selectedIndexes.length == 0) {
				selectedIndexes = getSelectedIndexes(el);
				if (selectedIndexes.length) {
					emit(vnode, 'select-change', selectedIndexes);
				}
			}

			// force option attribute "selected" according to binding data
			setSelectedByIndexes(el, selectedIndexes);

			el.setAttribute(attDataActiveName, selectedIndexes);
			el.setAttribute(cssPrefix + blockName, selMultipleMod + ':' + el.multiple);

			if (el.multiple) {
				// bad selectors with tag names on last position of selectors
				const qOptions = vnode.elm.querySelectorAll('option').length;
				
				// bad selectors with tag names on last position of selectors
				const qOptionsGroups = vnode.elm.querySelectorAll('optgroup[label]').length;
				el.setAttribute('size', qOptions + qOptionsGroups);
			} else {
				if (selectedIndexes.length > 1) {
					throw Error('If you want multiselect, you should set attribute "multiple"!');
				}
			}

			// save handler instead of anonymous function to removeEventListener
			el._onChangeHandler = function (evt) {
				// pass additional to evt params as Object properties
				onChange(evt, {
					el: el,
					binding: binding,
					vnode: vnode,
				});
			}

			// base html select event 'change'
			el.addEventListener('change', el._onChangeHandler);
		},

		/**
		 * @param {HTMLSelectElement} el
		 * @param {Object} binding
		 * @param {Object} vnode
		 */
		update: function (el, binding, vnode) {
			/** @type {number[]} */
			var selectedIndexes;

			// if binded "v-model" variable is changed
			if (binding.value != binding.oldValue) {
				selectedIndexes = numArrayFromString(binding.value, multipleSeparator);

				// console.log('update binding.value != binding.oldValue', selectedIndexes, binding.value, binding.oldValue);

				// but only if already selected is not the same!
				if (binding.value != getSelectedIndexes(el).join(multipleSeparator)) {
					setSelectedByIndexes(el, selectedIndexes);
				}
			}

			if (selectedIndexes) {
				el.setAttribute(attDataActiveName, selectedIndexes);
			}
		},

		/**
		 * @param {HTMLSelectElement} el
		 */
		unbind: function (el) {
			el.removeEventListener('change', el._onChangeHandler);
		}
	});

	new Vue({
		el: '[iam-app]',
		data: function () {
			return {
				selIndexes: '',
			};
		},
		methods: {
			// better code than onChange
			onSelectChange: function (data) {
				if (Array.isArray(data)) {
					this.selIndexes = data.join(multipleSeparator);
				}
			},
			onUnselect: function () {
				this.selIndexes = '';
			}
		}
	});
})();
