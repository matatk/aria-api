exports.attributes = {
	// widget
	'autocomplete': 'token',
	'checked': 'tristate',
	'current': 'token',
	'disabled': 'bool',
	'expanded': 'bool-undefined',
	'haspopup': 'token',
	'hidden': 'bool',  // !
	'invalid': 'token',
	'keyshortcuts': 'string',
	'label': 'string',
	'level': 'int',
	'modal': 'bool',
	'multiline': 'bool',
	'multiselectable': 'bool',
	'orientation': 'token',
	'placeholder': 'string',
	'pressed': 'tristate',
	'readonly': 'bool',
	'required': 'bool',
	'roledescription': 'string',
	'selected': 'bool-undefined',
	'valuemax': 'number',
	'valuemin': 'number',
	'valuenow': 'number',
	'valuetext': 'string',

	// live
	'atomic': 'bool',
	'busy': 'bool',
	'live': 'token',
	'relevant': 'token-list',

	// dragndrop
	'dropeffect': 'token-list',
	'grabbed': 'bool-undefined',

	// relationship
	'activedescendant': 'id',
	'colcount': 'int',
	'colindex': 'int',
	'colspan': 'int',
	'controls': 'id-list',
	'describedby': 'id-list',
	'details': 'id',
	'errormessage': 'id',
	'flowto': 'id-list',
	'labelledby': 'id-list',
	'owns': 'id-list',
	'posinset': 'int',
	'rowcount': 'int',
	'rowindex': 'int',
	'rowspan': 'int',
	'setsize': 'int',
	'sort': 'token',
};

exports.attributeStrongMapping = {
	'disabled': 'disabled',
	'placeholder': 'placeholder',
	'readonly': 'readOnly',
	'required': 'required',
};

exports.attributeWeakMapping = {
	'checked': 'checked',
	'colspan': 'colSpan',
	'expanded': 'open',
	'multiselectable': 'multiple',
	'rowspan': 'rowSpan',
	'selected': 'selected',
};

// https://www.w3.org/TR/html-aam-1.0/#html-element-role-mappings
// https://www.w3.org/TR/wai-aria/roles
exports.roles = {
	alert: {
		childRoles: ['alertdialog'],
		defaults: {
			'live': 'assertive',
			'atomic': true,
		},
	},
	article: {
		selectors: ['article'],
	},
	button: {
		selectors: [
			'button',
			'input[type="button"]',
			'input[type="image"]',
			'input[type="reset"]',
			'input[type="submit"]',
			'summary',
		],
		nameFromContents: true,
	},
	cell: {
		selectors: ['td'],
		childRoles: ['gridcell', 'rowheader'],
	},
	checkbox: {
		selectors: ['input[type="checkbox"]'],
		childRoles: ['menuitemcheckbox', 'switch'],
		nameFromContents: true,
		defaults: {
			'checked': 'false',
		},
	},
	columnheader: {
		selectors: ['th[scope="col"]'],
		nameFromContents: true,
	},
	combobox: {
		selectors: [
		'input:not([type])[list]',
			'input[type="email"][list]',
			'input[type="search"][list]',
			'input[type="tel"][list]',
			'input[type="text"][list]',
			'input[type="url"][list]',
			'select:not([size]):not([multiple])',
			'select[size="0"]:not([multiple])',
			'select[size="1"]:not([multiple])',
		],
		defaults: {
			'expanded': false,
			'haspopup': 'listbox',
		},
	},
	command: {
		childRoles: ['button', 'link', 'menuitem'],
	},
	complementary: {
		selectors: ['aside'],
	},
	composite: {
		childRoles: ['grid', 'select', 'spinbutton', 'tablist'],
	},
	definition: {
		selectors: ['dd'],
	},
	dialog: {
		selectors: ['dialog'],
		childRoles: ['alertdialog'],
	},
	'doc-backlink': {
		nameFromContents: true,
	},
	'doc-biblioref': {
		nameFromContents: true,
	},
	'doc-glossref': {
		nameFromContents: true,
	},
	'doc-noteref': {
		nameFromContents: true,
	},
	document: {
		selectors: ['body'],
		childRoles: ['article', 'graphics-document'],
	},
	figure: {
		selectors: ['figure'],
	},
	form: {
		selectors: ['form[aria-label]', 'form[aria-labelledby]', 'form[title]'],
	},
	grid: {
		childRoles: ['treegrid'],
	},
	gridcell: {
		childRoles: ['columnheader', 'rowheader'],
		nameFromContents: true,
	},
	group: {
		selectors: ['details', 'optgroup'],
		childRoles: ['row', 'select', 'toolbar', 'graphics-object'],
	},
	heading: {
		selectors: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
		nameFromContents: true,
		defaults: {
			'level': 2,
		},
	},
	img: {
		selectors: ['img:not([alt=""])', 'graphics-symbol'],
		childRoles: ['doc-cover'],
	},
	input: {
		childRoles: ['checkbox', 'option', 'radio', 'slider', 'spinbutton', 'textbox'],
	},
	landmark: {
		childRoles: [
			'banner',
			'complementary',
			'contentinfo',
			'doc-acknowledgments',
			'doc-afterword',
			'doc-appendix',
			'doc-bibliography',
			'doc-chapter',
			'doc-conclusion',
			'doc-credits',
			'doc-endnotes',
			'doc-epilogue',
			'doc-errata',
			'doc-foreword',
			'doc-glossary',
			'doc-introduction',
			'doc-part',
			'doc-preface',
			'doc-prologue',
			'form',
			'main',
			'navigation',
			'region',
			'search',
		],
	},
	link: {
		selectors: ['a[href]', 'area[href]', 'link[href]'],
		childRoles: ['doc-backlink', 'doc-biblioref', 'doc-glossref', 'doc-noteref'],
		nameFromContents: true,
	},
	list: {
		selectors: ['dl', 'ol', 'ul'],
		childRoles: ['directory', 'feed'],
	},
	listbox: {
		selectors: [
			'select[multiple]',
			'select[size]:not([size="0"]):not([size="1"])',
		],
		defaults: {
			'orientation': 'vertical',
		},
	},
	listitem: {
		selectors: ['dt', 'ul > li', 'ol > li'],
		childRoles: ['doc-biblioentry', 'doc-endnote', 'treeitem'],
	},
	log: {
		defaults: {
			'live': 'polite',
		},
	},
	main: {
		selectors: ['main'],
	},
	math: {
		selectors: ['math'],
	},
	menu: {
		selectors: ['menu[type="context"]'],
		childRoles: ['menubar'],
		defaults: {
			'orientation': 'vertical',
		},
	},
	menubar: {
		defaults: {
			'orientation': 'horizontal',
		},
	},
	menuitem: {
		selectors: ['menuitem[type="command"]'],
		childRoles: ['menuitemcheckbox'],
		nameFromContents: true,
	},
	menuitemcheckbox: {
		selectors: ['menuitem[type="checkbox"]'],
		childRoles: ['menuitemradio'],
		nameFromContents: true,
		defaults: {
			'checked': 'false',
		},
	},
	menuitemradio: {
		selectors: ['menuitem[type="radio"]'],
		nameFromContents: true,
		defaults: {
			'checked': 'false',
		},
	},
	navigation: {
		selectors: ['nav'],
		childRoles: ['doc-index', 'doc-pagelist', 'doc-toc'],
	},
	note: {
		childRoles: ['doc-notice', 'doc-tip'],
	},
	option: {
		selectors: ['option'],
		childRoles: ['treeitem'],
		nameFromContents: true,
		defaults: {
			'selected': 'false',
		},
	},
	progressbar: {
		selectors: ['progress'],
	},
	radio: {
		selectors: ['input[type="radio"]'],
		childRoles: ['menuitemradio'],
		nameFromContents: true,
		defaults: {
			'checked': 'false',
		},
	},
	range: {
		childRoles: ['progressbar', 'scrollbar', 'slider', 'spinbutton'],
	},
	region: {
		selectors: ['section[aria-label]', 'section[aria-labelledby]', 'section[title]'],
	},
	roletype: {
		childRoles: ['structure', 'widget', 'window'],
	},
	row: {
		selectors: ['tr'],
		nameFromContents: true,
	},
	rowheader: {
		selectors: ['th[scope="row"]'],
		nameFromContents: true,
	},
	rowgroup: {
		selectors: ['tbody', 'thead', 'tfoot'],
		nameFromContents: true,
	},
	scrollbar: {
		defaults: {
			'orientation': 'vertical',
			'valuemin': 0,
			'valuemax': 100,
			// FIXME: halfway between actual valuemin and valuemax
			'valuenow': 50,
		},
	},
	searchbox: {
		selectors: ['input[type="search"]:not([list])'],
	},
	section: {
		childRoles: [
			'alert',
			'cell',
			'definition',
			'doc-abstract',
			'doc-colophon',
			'doc-credit',
			'doc-dedication',
			'doc-epigraph',
			'doc-example',
			'doc-footnote',
			'doc-qna',
			'figure',
			'group',
			'img',
			'landmark',
			'list',
			'listitem',
			'log',
			'marquee',
			'math',
			'note',
			'status',
			'table',
			'tabpanel',
			'term',
			'tooltip',
		],
	},
	sectionhead: {
		childRoles: [
			'columnheader',
			'doc-subtitle',
			'heading',
			'rowheader',
			'tab',
		],
		nameFromContents: true,
	},
	select: {
		childRoles: ['combobox', 'listbox', 'menu', 'radiogroup', 'tree'],
	},
	separator: {
		selectors: ['hr'],
		childRoles: ['doc-pagebreak'],
		defaults: {
			'orientation': 'horizontal',
			'valuemin': 0,
			'valuemax': 100,
			'valuenow': 50,
		},
	},
	slider: {
		selectors: ['input[type="range"]'],
		defaults: {
			'orientation': 'horizontal',
			'valuemin': 0,
			'valuemax': 100,
			// FIXME: halfway between actual valuemin and valuemax
			'valuenow': 50,
		},
	},
	spinbutton: {
		selectors: ['input[type="number"]'],
		defaults: {
			// FIXME: no valuemin/valuemax
			'valuenow': 0,
		},
	},
	status: {
		selectors: ['output'],
		childRoles: ['timer'],
		defaults: {
			'live': 'polite',
			'atomic': true,
		},
	},
	switch: {
		nameFromContents: true,
		defaults: {
			'checked': false,
		},
	},
	structure: {
		childRoles: [
			'application',
			'document',
			'none',
			'presentation',
			'rowgroup',
			'section',
			'sectionhead',
			'separator',
		],
	},
	tab: {
		nameFromContents: true,
		defaults: {
			'selected': false,
		},
	},
	table: {
		selectors: ['table'],
		childRoles: ['grid'],
	},
	tablist: {
		defaults: {
			'orientation': 'horizontal',
		},
	},
	term: {
		selectors: ['dfn', 'dt'],
	},
	textbox: {
		selectors: [
			'input:not([type]):not([list])',
			'input[type="email"]:not([list])',
			'input[type="tel"]:not([list])',
			'input[type="text"]:not([list])',
			'input[type="url"]:not([list])',
			'textarea',
		],
		childRoles: ['searchbox'],
	},
	toolbar: {
		defaults: {
			'orientation': 'horizontal',
		},
	},
	tooltip: {
		nameFromContents: true,
	},
	tree: {
		childRoles: ['treegrid'],
		defaults: {
			'orientation': 'vertical',
		},
	},
	treeitem: {
		nameFromContents: true,
	},
	widget: {
		childRoles: [
			'command',
			'composite',
			'gridcell',
			'input',
			'range',
			'row',
			'separator',
			'tab',
		],
	},
	window: {
		childRoles: ['dialog'],
	},
};

exports.scoped = [
	'main *',
	// https://www.w3.org/TR/html/dom.html#sectioning-content-2
	'article *', 'aside *', 'nav *', 'section *',
	// https://www.w3.org/TR/html/sections.html#sectioning-roots
	'blockquote *', 'details *', 'dialog *', 'fieldset *', 'figure *', 'td *',
].join(',');

var getSubRoles = function(role) {
	var children = (exports.roles[role] || {}).childRoles || [];
	var descendents = children.map(getSubRoles);

	var result = [role];

	descendents.forEach(function(list) {
		list.forEach(function(r) {
			if (result.indexOf(r) === -1) {
				result.push(r);
			}
		});
	});

	return result;
};

for (var role in exports.roles) {
	exports.roles[role].subRoles = getSubRoles(role);
}
exports.roles['none'] = exports.roles['none'] || {};
exports.roles['none'].subRoles = ['none', 'presentation'];
exports.roles['presentation'] = exports.roles['presentation'] || {};
exports.roles['presentation'].subRoles = ['presentation', 'none'];

exports.nameFromDescendant = {
	'figure': 'figcaption',
	'table': 'caption',
	'fieldset': 'legend',
};

exports.nameDefaults = {
	'input[type="submit"]': 'Submit',
	'input[type="reset"]': 'Reset',
	'summary': 'Details',
};

exports.labelable = [
	'button',
	'input:not([type="hidden"])',
	'keygen',
	'meter',
	'output',
	'progress',
	'select',
	'textarea',
];
