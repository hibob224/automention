var ment_settings = {
	at: "@",
	searchKey: "text",
	displayTpl: "<li>${text}</li>",
	insertTpl: '${atwho-at}"${text}"',
	startWithSpace: true,
	maxLen: maxnamelength,
	callbacks: {
		matcher: function(flag, subtext) {
			var match, matched, regexp;
			regexp = new XRegExp('(\\s+|^)' + flag + '(\\p{L}+)$', 'gi');
			match = regexp.exec(subtext);
			if (match) {
				matched = match[2];
			}
			return matched;
		},
		remoteFilter: function(query, callback) {
			if (query.length > 2) {
				$.getJSON('xmlhttp.php?action=get_users', {query: query}, function(data) {
					callback(data);
				});			
			}
			else {
				callback([]);
			}
		}
	}
}
$(document).ready(function() {
	if (typeof $.fn.sceditor !== 'undefined') {
		if($('#message, #signature').sceditor("instance")) {
			$($('#message, #signature').sceditor("instance").getBody()).atwho('setIframe').atwho(ment_settings);
			$($('#message ~ div.sceditor-container textarea, #signature ~ div.sceditor-container textarea')[0]).atwho(ment_settings);
		}
		else {
			$('#message, #signature').atwho(ment_settings);
		}
		($.fn.on || $.fn.live).call($(document), 'click', '.quick_edit_button', function () {
			ed_id = $(this).attr('id');
			var pid = ed_id.replace( /[^0-9]/g, '');
			qse_area = 'quickedit_'+pid;
			setTimeout(function() {
				if ($('#'+qse_area+'').sceditor("instance")) {
					$($('#'+qse_area+'').sceditor("instance").getBody()).atwho('setIframe').atwho(ment_settings);
					$($('#'+qse_area+' ~ div.sceditor-container textarea')[0]).atwho(ment_settings);
				}
				else {
					$('#'+qse_area+'').atwho(ment_settings);
				}
			},600);
		});
	}
	else {
		$('#message, #signature').atwho(ment_settings);
		($.fn.on || $.fn.live).call($(document), 'click', '.quick_edit_button', function () {
			ed_id = $(this).attr('id');
			var pid = ed_id.replace( /[^0-9]/g, '');
			qse_area = 'quickedit_'+pid;
			$('#'+qse_area+'').atwho(ment_settings);
		});
	}
});