// wrapper for vuetify components: v-chip, v-chip-group & v-tooltip
(function() {
	Vue.component('iam-tag-group', {
		props: {
			// selected tags indexes (pass v-model)
			value : {
				required: true,
				type: Array,
			},
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
			onChange: function(val) {
				this.$emit('input', val);
			},
		},
	});
})();