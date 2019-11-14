(function config (target, func) {
    target.listConfig = func;
})(window, function () {
    const list_items = [
        {
            title: 'custom-modal',
            path: './custom-modal/sample.html'
        },
        {
            title: 'custom-modal',
            path: './custom-modal/sample.html'
        },
        {
            title: 'custom-modal',
            path: './custom-modal/sample.html'
        },
        {
            title: 'custom-modal',
            path: './custom-modal/sample.html'
        },
        {
            title: 'custom-modal',
            path: './custom-modal/sample.html'
        }
    ];


    function init () {
        return list_items
    }

    return {
        init: init
    }
});