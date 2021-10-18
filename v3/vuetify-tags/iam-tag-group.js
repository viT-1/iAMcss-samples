// wrapper for vuetify components: v-chip, v-chip-group & v-tooltip
(function() {
	Vue.component('iam-tag-group', {
		data: function() {
			return {
				selectedIndexes: [],
				selectedLabels: [],
			};
		},
		props: {
			// iAMcss modifier
			context: {
				required: true,
				type: String,
			},
			// list of tags shoud have such structure: { label: '...', describe: '...' }
			tags: {
				type: Array,
				default: function _default() {
					return [];
				},
			},
			title: {
				type: String,
			}
		},
		template: '#iam-tag-group',
		methods: {
			setAttrValueForTag: function(tagLabel) {
				var isActive = this.selectedLabels.includes(tagLabel);

				return isActive ? this.context + ' active' : this.context;
			},
			setActiveLabelsByIndexes: function() {
				var self = this;
				var filtered = self.tags.filter(function(tag, i) {
					return self.selectedIndexes.includes(i);
				});

				self.selectedLabels = filtered.map(function(o) {
					return o.label;
				});
			},
			onChange: function(val) {
				this.selectedIndexes = val;
				this.setActiveLabelsByIndexes();

				this.$emit('tags-selected', {
					context: this.context,
					indexes: val,
					labels: this.selectedLabels,
				});
			},
		},
	});
})();