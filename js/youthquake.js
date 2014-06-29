$('button.past').on('click', function() {
    $('div.past-content').show();
    $('div.present-content').hide();
});

$('button.present').on('click', function() {
    $('div.past-content').hide();
    $('div.present-content').show();
});