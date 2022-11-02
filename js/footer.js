var $f = jQuery.noConflict();
$f(document).ready(function() {
	
	// Add class to mailto link
	// Needed to separate the disabling of the default action AND copy email to clipboard
	$f('a[href^=mailto]').addClass('mailto-link');

	var mailto = $f('.mailto-link');
	var messageCopy = 'Click to copy Email';
	var messageSuccess = 'Copied!';
	
	mailto.append('<span class="mailto-message"></span>');
	$f('.mailto-message').append(messageCopy);
	
	// Disable opening your email client. yuk.
	$f('a[href^=mailto]').click(function() {
		return false; 
	})
	
	// On click, get href and remove 'mailto:' from value
	// Store email address in a variable.
	mailto.click(function() {
		var href = $(this).attr('href');
		var email = href.replace('mailto:', '');
		copyToClipboard(email);
		$f('.mailto-message').empty().append(messageSuccess);
		setTimeout(function() {
			$f('.mailto-message').empty().append(messageCopy);}, 2000); 
	});
	
});

// Grabbed this from Stack Overflow.
// Copies the email variable to clipboard
function copyToClipboard(text) {
    var dummy = document.createElement("input");
    document.body.appendChild(dummy);
    dummy.setAttribute('value', text);
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
}