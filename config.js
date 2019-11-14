(function config (target, func) {
    target.listConfig = func;
})(window, function () {
    const list_items = [
        {
            title: 'custom-modal',
            path: './custom-modal/sample.html',
            info: 'html5 모달로 사용자가 원하는 문구를 화면에 보여 줄수 있다.모달 함수를 생성하여 init 메소드로 초기화한다.'
        },
        {
            title: 'custom-modal',
            path: './custom-modal/sample.html',
            info: 'html5 모달로 사용자가 원하는 문구를 화면에 보여 줄수 있다. 모달 함수를 생성하여 init 메소드로 초기화한다.'
        },
        {
            title: 'custom-modal',
            path: './custom-modal/sample.html',
            info: 'html5 모달로 사용자가 원하는 문구를 화면에 보여 줄수 있다. 모달 함수를 생성하여 init 메소드로 초기화한다.'
        },
        {
            title: 'custom-modal',
            path: './custom-modal/sample.html',
            info: 'html5 모달로 사용자가 원하는 문구를 화면에 보여 줄수 있다. 모달 함수를 생성하여 init 메소드로 초기화한다.'
        },
        {
            title: 'custom-modal',
            path: './custom-modal/sample.html',
            info: 'html5 모달로 사용자가 원하는 문구를 화면에 보여 줄수 있다. 모달 함수를 생성하여 init 메소드로 초기화한다.'
        }
    ];


    function init () {
        return list_items
    }

    return {
        init: init
    }
});