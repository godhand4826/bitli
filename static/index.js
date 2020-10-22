$('#gen-button').on('click', () => {
    let url = $('#origin').val()
    if (isURL(url)) {
        $.post('./api/', { origin: url })
            .done(() => loadCookie())
            .fail(() => alert('server errror'))
    } else {
        alert('invalid url')
    }
})

function cookie(name){
    const kvs = document.cookie.split(';').map(kv => kv.trim())
    for (let kv of kvs) {
        let [k, v] = kv.split('=')
        if (k == name) {
            return v
        }
    }
}
$(loadCookie)
function loadCookie(){
    $('#origin').val(cookie('origin') || '')
    const key = cookie('shorten')
    $('#shorten').val(key ? `${document.location}api/${key}` : '')
}

$('#origin').on('keyup', function () {
    if (isURL($(this).val())) {
        $(this).removeClass('is-invalid')
    } else {
        $(this).addClass('is-invalid')
    }
})

function isURL(url){
    try {
        new URL(url)
    } catch (e){
        return false
    }
    return true
}

$('#copy-button').on('copied', function(e, message){
    $(this).attr('title', message).tooltip('show')
    $(this).on('hidden.bs.tooltip', function() {
        $(this).tooltip('dispose').attr('title', 'Copy to Clipboard')
    })
})

new ClipboardJS('#copy-button')
    .on('success', e => $('#copy-button').trigger('copied', 'Copied!'))
    .on('error', e => $('#copy-button').trigger('copied', 'Copy with ctrl-c'))
