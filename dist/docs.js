var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-toggle="tooltip"]'));
var tooltipList = tooltipTriggerList.map(function(elem) {
	return new bootstrap.Tooltip(elem);
});

var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-toggle="popover"]'));
var popoverList = popoverTriggerList.map(function(elem) {
	return new bootstrap.Popover(elem, { trigger: 'focus' });
});
