(function() {
	var tableData = {
		headers: [
			{ text: 'Name', value: 'link', class: 'iam-v-data-table-th --th-name'},
			{ text: 'Description', value: 'descr', class: 'iam-v-data-table-th --th-descr'},
			{ text: 'Markup', value: 'tags.markup', class: 'iam-v-data-table-th --th-markup'},
			{ text: 'Style', value: 'tags.style', class: 'iam-v-data-table-th --th-style'},
			{ text: 'Script', value: 'tags.script', class: 'iam-v-data-table-th --th-script'},
			{ text: 'Node', value: 'tags.node', class: 'iam-v-data-table-th --th-node'},
		],
		items: [
			{
				link: 'https://github.com/viT-1/systemjs-ts-es6',
				name: 'systemjs-ts-es6',
				descr: 'Starter project with Node, SystemJS and ES6 modules in browser support.',
				tags: {
					node: ['esm', 'gulp', 'systemjs', 'tsc'],
					script: ['airbnb', 'es6', 'esm', 'eslint', 'ts']
				},
			},
			{
				link: 'https://github.com/viT-1/systemjs-ts-es6-vue',
				name: 'systemjs-ts-es6-vue',
				descr: 'Pet project for bundling es-modules for modern browsers and SystemJs-modules'
				+ ' for IE10 (and other). No Webpack or Rollup using, but warm tube Gulp ;) Used Jest with esm support!',
				tags: {
					markup: ['html4'],
					node: ['esm', 'gulp', 'tsc', 'ttsc', 'systemjs', 'jest'],
					script: ['airbnb', 'es6', 'esm', 'eslint', 'ts', 'vue', 'vue@decor', 'vuex'],
					style: ['iam', 'print']
				},
			},
		],
	};

	new Vue({
		el: '[iam-app]',
		vuetify: new Vuetify(),
		data: function() {
			return {
				selectedIndexes: {
					markup: [],
					node: [],
					script: [],
					style: [],
				},
				tags: {
					markup: [
						{ label: 'aria', describe: 'В вёрстке используются ARIA-атрибуты' },
						{ label: 'html4' },
						{ label: 'html5' },
						{ label: 'svg', describe: 'Когда svg в качестве основного контента (не оформление)' },
						{ label: 'xml' },
					],
					node: [
						{ label: 'allure', describe: 'Web-отчёты о тестировании' },
						{ label: 'esm', describe: 'ECMAScript модули (не используется require)' },
						{ label: 'gulp' },
						{ label: 'jest', describe: 'Тестирование кода вне браузера' },
						{ label: 'rollup' },
						{ label: 'selenium' },
						{ label: 'systemjs' },
						{ label: 'tdd', describe: 'Разработка сначала тестов - что должен делать компонент, а затем реализация функционала' },
						{ label: 'tsc', describe: 'В качестве сборщика только интерпретартор TypeScript' },
						{ label: 'ttsc', describe: 'Для трансформации ts в js используются дополнительные плагины' },
						{ label: 'webdriverio', describe: 'Тестирование с имитацией кликов браузера' },
						{ label: 'webpack' },
					],
					script: [
						{ label: 'airbnb' },
						{ label: 'angularjs' },
						{ label: 'axios' },
						{ label: 'eslint' },
						{ label: 'es5' },
						{ label: 'es6' },
						{ label: 'jquery', describe: 'Интеграция с jQuery' },
						{ label: 'js', describe: 'Используется JavaScript' },
						{ label: 'jsoff', describe: 'Если выключить JavaScript, то всё равно информация считывается' },
						{ label: 'esm', describe: 'ECMAScript модули' },
						{ label: 'ts', describe: 'TypeScript' },
						{ label: 'vue' },
						{ label: 'vue@decor', describe: 'Написание компонент vue в виде es6 классов через vue-property-decorator' },
						{ label: 'vuex' },
					],
					style: [
						{ label: 'bem', describe: 'БЭМ, но при этом не iAMcss' },
						{ label: 'fonticons', describe: 'Использует для векторных иконок шрифты' },
						{ label: 'iam', describe: 'iAMcss - способ на основе AMCSS и БЭМ, но с меньшей многословностью чем БЭМ' },
						{ label: 'ie6', describe: 'Поддержка умершего браузера Internet Explorer v6' },
						{ label: 'media', describe: 'Адаптивность под размер по горизонтали при помощи media queries' },
						{ label: 'nakedcss', describe: 'Если выключить CSS, то всё равно информация считывается' },
						{ label: 'normalize' },
						{ label: 'print', describe: 'Настройка отображения для печати на принтере (Print preview)' },
						{ label: 'skins', describe: 'Возможность изменять цветовую гамму' },
						{ label: 'stylus', describe: 'Единственный in-browser CSS-процессор с препроцессорной поддержкой импорта JSON' },
						{ label: 'svg' },
						{ label: 'vars', describe: 'css variables' },
					],
				},
				tableData: {
					headers: [
						{ text: 'Name', value: 'link', class: 'iam-v-data-table-th --th-name'},
						{ text: 'Description', value: 'descr', class: 'iam-v-data-table-th --th-descr'},
						{ text: 'Markup', value: 'tags.markup', class: 'iam-v-data-table-th --th-markup'},
						{ text: 'Style', value: 'tags.style', class: 'iam-v-data-table-th --th-style'},
						{ text: 'Script', value: 'tags.script', class: 'iam-v-data-table-th --th-script'},
						{ text: 'Node', value: 'tags.node', class: 'iam-v-data-table-th --th-node'},
					],
					items: [
						{
							link: 'https://github.com/viT-1/systemjs-ts-es6',
							name: 'systemjs-ts-es6',
							descr: 'Starter project with Node, SystemJS and ES6 modules in browser support.',
							tags: {
								node: ['esm', 'gulp', 'systemjs', 'tsc'],
								script: ['airbnb', 'es6', 'esm', 'eslint', 'ts'],
							},
						},
						{
							link: 'https://github.com/viT-1/systemjs-ts-es6-vue',
							name: 'systemjs-ts-es6-vue',
							descr: 'Pet project for bundling es-modules for modern browsers and SystemJs-modules'
							+ ' for IE10 (and other). No Webpack or Rollup using, but warm tube Gulp ;) Used Jest with esm support!',
							tags: {
								markup: ['html4'],
								node: ['esm', 'gulp', 'tsc', 'ttsc', 'systemjs', 'jest'],
								script: ['airbnb', 'es6', 'esm', 'eslint', 'ts', 'vue', 'vue@decor', 'vuex'],
								style: ['iam', 'print'],
							},
						},
						{
							link: 'https://github.com/viT-1/ngUsers/tree/develop',
							name: 'ngUsers',
							descr: 'SPA with user cards',
							tags: {
								markup: ['html4'],
								script: ['angularjs', 'es6'],
								style: ['bem', 'stylus'],
								node: ['jest', 'tdd', 'webpack'],
							},
						},
						{
							link: 'https://github.com/viT-1/iamcss-modeler',
							name: 'iamcss-modeler',
							descr: 'Bpmn schemes on iamcss markup',
							tags: {
								markup: ['html4', 'svg'],
								script: ['axios', 'es6', 'jquery', 'vue', 'vuex'],
								style: ['bem'],
								node: ['jest', 'tdd', 'webpack'],
							},
						},
						{
							link: 'https://vit-1.github.io/iAMcss-samples/v3/aria-collapsable/',
							name: 'aria-collapsable',
							descr: 'Styled select control without JavaScript.',
							tags: {
								markup: ['aria', 'html5'],
								style: ['iam', 'skins', 'vars'],
							},
						},
						{
							link: 'http://vit-1.github.io/larinayoga/index-ru.xml',
							name: 'larinayoga.ru',
							descr: 'Yoga-teacher homepage.',
							tags: {
								markup: ['aria', 'html4', 'xml'],
								script: ['es5', 'jsoff'],
								style: ['bem', 'fonticons', 'media', 'nakedcss', 'normalize', 'print', 'skins'],
							},
						},
						{
							link: 'https://vit-1.github.io/hobby/',
							name: 'hobby',
							descr: 'Homepage with em points - scaling by increase/decrease base font size.',
							tags: {
								markup: ['html4'],
								script: ['es5'],
								style: ['nakedcss', 'print', 'skins'],
							},
						},
						{
							link: 'https://vit-1.github.io/iAMcss-samples/v3/xml-tree/',
							name: 'xml-tree',
							descr: 'Collapsible treeview with svg icons on xml data.',
							tags: {
								markup: ['html4', 'xml'],
								script: ['es5'],
								style: ['iam', 'svg'],
							},
						},
						{
							link: 'https://vit-1.github.io/iAMcss-samples/v3/json-tree/',
							name: 'json-tree',
							descr: 'Collapsible treeview with svg icons on json data.',
							tags: {
								markup: ['html4'],
								script: ['es5'],
								style: ['iam', 'svg'],
							},
						},
						{
							link: 'https://vit-1.github.io/iAMcss-samples/v3/iconed-buttons/',
							name: 'iconed buttons',
							tags: {
								markup: ['aria', 'html4'],
								script: ['es5', 'vue'],
								style: ['iam', 'svg'],
							},
						},
						{
							link: 'https://codepen.io/viT-1/pen/YvBgbd',
							name: 'organisation structure',
							descr: 'Mapping array to treeview control.',
							tags: {
								markup: ['html4'],
								script: ['es5', 'vue'],
								style: ['bem', 'fonticons', 'vars'],
							},
						},
						{
							link: 'https://github.com/viT-1/iAMcss',
							name: 'iAMcss',
							descr: 'Markup methodology based on AMCss & Yandex BEM',
							tags: {
								style: ['bem', 'iam'],
							},
						},
					],
				},
			}
		},
		computed: {
			filteredTableItems: function() {
				var self = this;

				var allIndexesAreEmpty = Object.keys(self.selectedIndexes).every(function(key) {
					return self.selectedIndexes[key].length === 0;
				});

				// if tag filter is not set return original array
				if (allIndexesAreEmpty)
					return self.tableData.items;

				return self.tableData.items.filter(self.itemHasOneOfSelectedTags);
			}
		},
		methods: {
			getActiveTags: function(context) {
				var self = this;
				var filtered = self.tags[context].filter(function(tag, i) {
					return self.selectedIndexes[context].includes(i);
				});

				return filtered.map(function(o) {
					return o.label;
				});
			},
			itemHasOneOfSelectedTags: function(item) {
				var self = this;

				var hasMarkupTag = item.tags.markup ? item.tags.markup.some(function(r) {
					return self.getActiveTags('markup').includes(r);
				}): false;

				var hasStyleTag = item.tags.style ? item.tags.style.some(function(r) {
					return self.getActiveTags('style').includes(r);
				}) : false;

				var hasScriptTag = item.tags.script ? item.tags.script.some(function(r) {
					return self.getActiveTags('script').includes(r);
				}) : false;

				var hasNodeTag = item.tags.node ? item.tags.node.some(function(r) {
					return self.getActiveTags('node').includes(r);
				}) : false;

				return hasMarkupTag || hasStyleTag || hasScriptTag || hasNodeTag;
			},
			setAttrValueForTag: function(tag, context) {
				var isActive = this.getActiveTags(context).includes(tag);

				return isActive ? context + ' active' : context;
			}
		},
	});

})();