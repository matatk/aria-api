// https://www.w3.org/TR/html-aria/#docconformance
var extraSelectors = {
	article: ['article'],
	banner: ['body > header'],
	button: [
		'button',
		'input[type="button"]',
		'input[type="image"]',
		'input[type="reset"]',
		'input[type="submit"]',
		'summary',
	],
	cell: ['td'],
	checkbox: ['input[type="checkbox"]'],
	columnheader: ['th[scope="col"]'],
	combobox: [
		'input[type="email"][list]',
		'input[type="search"][list]',
		'input[type="tel"][list]',
		'input[type="text"][list]',
		'input[type="url"][list]',
	],
	complementary: ['aside'],
	contentinfo: ['body > footer'],
	definition: ['dd'],
	dialog: ['dialog'],
	document: ['body'],
	figure: ['figure'],
	form: ['form'],
	group: ['details', 'optgroup'],
	heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
	img: ['img:not[alt=""])'],
	link: ['a[href]', 'area[href]', 'link[href]'],
	listbox: ['datalist', 'select'],
	list: ['dl', 'ol', 'ul'],
	listitem: ['ul > li', 'ol > li'],
	main: ['main'],
	math: ['math'],
	menuitemcheckbox: ['menuitem[type="checkbox"]'],
	menuitem: ['menuitem[type="command"]'],
	menuitemradio: ['menuitem[type="radio"]'],
	menu: ['menu[type="context"]'],
	navigation: ['nav'],
	option: ['option'],
	progressbar: ['progress'],
	radio: ['input[type="radio"]'],
	region: ['section'],
	rowgroup: ['tbody', 'thead', 'tfoot'],
	rowheader: ['th[scope="row"]'],
	row: ['tr'],
	searchbox: ['input[type="search"]:not([list])'],
	separator: ['hr'],
	slider: ['input[type="range"]'],
	spinbutton: ['input[type="number"]'],
	status: ['output'],
	table: ['table'],
	textbox: [
		'input[type="email"]:not([list])',
		'input[type="tel"]:not([list])',
		'input[type="text"]:not([list])',
		'input[type="url"]:not([list])',
		'textarea',
	],
};

// https://www.w3.org/TR/wai-aria/roles
var subRoles = {
	command: ['button', 'link', 'menuitem'],
	composite: ['grid', 'select', 'tablist'],
	input: ['checkbox', 'option', 'select', 'spinbutton', 'textbox'],
	landmark: [
		'application',
		'banner',
		'complementary',
		'contentinfo',
		'form',
		'main',
		'navigation',
		'search',
	],
	range: ['progressbar', 'spinbutton'],
	roletype: ['structure', 'widget', 'window'],
	section: [
		'definition',
		'gridcell',
		'group',
		'img',
		'listitem',
		'marquee',
		'math',
		'note',
		'region',
		'tooltip',
	],
	sectionhead: ['columnheader', 'heading', 'rowheader', 'tab'],
	select: ['combobox', 'listbox', 'menu', 'radiogroup', 'tree'],
	structure: [
		'document',
		'presentation',
		'section',
		'sectionhead',
		'separator',
	],
	widget: [
		'columnheader',
		'command',
		'composite',
		'gridcell',
		'input',
		'range',
		'row',
		'rowheader',
		'tab',
	],
	window: ['dialog'],
	alert: ['alertdialog'],
	checkbox: ['menuitemcheckbox'],
	dialog: ['alertdialog'],
	gridcell: ['columnheader', 'rowheader'],
	menuitem: ['menuitemcheckbox'],
	menuitemcheckbox: ['menuitemradio'],
	option: ['treeitem'],
	radio: ['menuitemradio'],
	status: ['timer'],
	grid: ['treegrid'],
	menu: ['menubar'],
	tree: ['treegrid'],
	directory: ['tablist'],
	document: ['article'],
	group: ['row', 'rowgroup', 'select', 'toolbar'],
	list: ['directory', 'listbox', 'menu'],
	listitem: ['treeitem'],
	region: [
		'alert',
		'article',
		'grid',
		'landmark',
		'list',
		'log',
		'status',
		'tabpanel',
	],
};

var getChildRoles = function(role) {
	var children = subRoles[role] || [];
	var descendents = children.map(getChildRoles);

	var result = [role];

	children.forEach(function(r) {
		if (result.indexOf(r) == -1) {
			result.push(r);
		}
	});
	descendents.forEach(function(list) {
		list.forEach(function(r) {
			if (result.indexOf(r) == -1) {
				result.push(r);
			}
		});
	});

	return result;
};

var _getSelector = function(role) {
	var selector = '[role="' + role + '"]';
	var extra = (extraSelectors[role] || []).map(sel => sel + ':not([role])');
	return [selector].concat(extra).join(',');
};

var getSelector = function(role) {
	var roles = getChildRoles(role);
	return roles.map(_getSelector).join(',');
};

// http://www.ssbbartgroup.com/blog/how-the-w3c-text-alternative-computation-works/
var getName = function(el) {
	var ret = '';

	if (el.matches('[aria-labelledby]')) {
		var id = el.getAttribute('aria-labelledby');
		var label = document.getElementById(id);
		ret = getName(label);
	} else if (el.matches('[aria-label]')) {
		ret = el.getAttribute('aria-label');
	} else if (el.label && el.labels.length > 0) {
		ret = getName(el.labels[0]);
	} else if (el.placeholder) {
		ret = el.placeholder;
	// figcaption
	} else if (el.alt) {
		ret = el.alt;
	// caption
	// table
	} else if (el.textContent) {
		ret = el.textContent;
	} else if (el.title) {
		ret = el.title;
	} else if (el.value) {
		ret = el.value;
	}

	return ret.trim().replace(/\s+/g, ' ');
};

var createDialog = function() {
	var dialog = document.createElement('dialog');
	dialog.addEventListener('close', function() {
		dialog.parentNode.removeChild(dialog);
	});
	document.body.appendChild(dialog);
	return dialog;
};

var createList = function(items) {
	var ul = document.createElement('ul');
	Array.prototype.forEach.call(items, function(item) {
		var li = document.createElement('li');
		li.appendChild(item);
		ul.appendChild(li);
	});
	return ul;
};

document.addEventListener('keyup', function(event) {
	if (event.ctrlKey && !event.altKey && event.key == 'm') {
		var dialog = createDialog();

		var landmarks = document.querySelectorAll(getSelector('landmark'));
		var links = Array.prototype.map.call(landmarks, function(el) {
			var a = document.createElement('a');
			a.href = '#';
			a.addEventListener('click', function(event) {
				event.preventDefault();
				dialog.close();
				el.tabIndex = -1;
				el.focus();
			});
			a.textContent = getName(el);
			return a;
		});

		dialog.appendChild(createList(links));
		dialog.showModal();
	}
});