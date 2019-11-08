// import '../css/custom-modal.css'
/**
 * 공통의로 사용할 수 있는 modal
 * Email: jakyoung.kim@catenoid.net
 * 
 * parent {Element}     modal 을 append 할 element
 * object {Object}      modal 설정에 들어갈 options
 */
(function (parent, object) {
    parent.custom_modal = object;
})(window, function (new_options) {
    var modal_html = "";
    var modal_el = {};
    var options = {};

    /**
     * modal string html setting
     * 
     * @param {String} text     modal을 초기화 하고 text 를 삽입
     */
    function set_modal_html (text, buttonText) {
        modal_html = "<table id='custom_modal_table'>" + 
                        "<tr>" +
                            "<td style='text-align: center;'>" +
                                "<div class='custom_modal_container'>" +
                                    "<div id='custom_modal_text'>" + text + "</div>" + 
                                    "<div id='custom_modal_button'>" +
                                        "<a id='conform_click'>"+ buttonText +"</a>" +
                                    "</div>" + 
                                "</div>" +
                            "</td>" +
                        "</tr>" +
                    "</table>";
    }

    /**
     * modal string return
     * 
     * @return {String} modal_html      String html 
     */
    function get_modal_html () {
        return modal_html;
    }

    function get_spinner_html () {
        return "<table id='custom_modal_table'>" + 
                    "<tr>" +
                        "<td style='text-align: center;'>" +
                            "<div class='custom_modal_container_spinner'></div>" +
                        "</td>" +
                    "</tr>" +
                "</table>";
    }

    /**
     * modal Element seter
     * 
     * @param {Element} el  modal Element
     */
    function set_modal_el (el) {
        modal_el = el;
    }

    /**
     * modal Element seter
     * 
     * @return modal_el     modal Element
     */
    function get_modal_el () {
        return modal_el;
    }

    /**
     * modal options setter
     * 
     * @param {*} op 
     */
    function set_options (op) {
        options = op;
    }

    /**
     * modal options getter
     */
    function get_options () {
        return options
    }

    /**
     * modal 의 click event 등록한다.
     * 
     * @param {Element} modal       modal element 
     * @param {Object} options      modal init options {conform_button}
     */
    function clickFunction (modal, options) {
        var click_el;
        if (document.querySelector) {
            click_el = modal.querySelector('#conform_click');
        } else {
            // ie7 일때 button element 찾는다.
            click_el = modal.childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0];
        }
        /**
         * conform_button options 에 click_function OR href option 이 있을경우
         * event 등록한다.
         * 
         * click_function {Function}    버튼 클릭시 이벤트
         * href           {String}      button (<a> tag) 메핑할 href 주소
         */
        if (options.conform_button.click_function) {
            if (document.addEventListener) {
                click_el.addEventListener('click', options.conform_button.click_function);
            } else if (document.attachEvent) {
                click_el.attachEvent('click', options.conform_button.click_function);
            } else {
                click_el["onclick"] = options.conform_button.click_function;
            }
        }
        if (options.conform_button.href) {
            click_el.href = options.conform_button.href;
        }
    }

    /**
     * string to element
     * 
     * @return {Element}    string 을 element object 로 반환
     */
    function stringToElement(string_el) {
        var divEl = document.createElement('div');
        divEl.innerHTML = string_el;
        return divEl.firstChild;
    }

    /**
     * new custom_modal(OPTIONS) or custom_modal.init(OPTIONS) 
     * 둘다 사용가능하며 custom_modal.init(OPTIONS) 이 우선시 된다.
     * 
     * @param {Object} init_option      modal 초기화 options
     */
    function init (init_option) {
        set_options(init_option ? init_option : new_options);

        if (options === undefined) {
            console.error('not fount options');
            return;
        }
        // modal 초기화
        set_modal_html(options.modal_text, options.conform_button.text? options.conform_button.text : 'close');
        // modal element
        var modal_el = stringToElement(get_modal_html());
        // modal click event
        clickFunction(modal_el, get_options());
        // modal_el set
        set_modal_el(modal_el);
    }

    /**
     * modal 연다.
     */
    function open (options) {
        if (options) {
            set_options(options);
        }
        var modalOption = get_options()
        if (modalOption.append_target_el) {
            modalOption.append_target_el.appendChild(get_modal_el());
        } else {
            if (modalOption.modal_text) {
                document.body.appendChild(get_modal_el());
            } else {
                console.error('modal not init oprions {modal_text}');
            }
        }
    }

    /**
     * 모든modal 닫기
     * modal element 를 html 에서 제거한다.
     */
    function close () {
       var remove_target = document.getElementById('custom_modal_table');
       if (remove_target) {
           if (options.append_target_el) {
                options.append_target_el.removeChild(remove_target);
           } else {
            document.body.removeChild(remove_target);
           }
       }
    }

    /**
     * modal spinner 연다.
     * 초기 init 이 없어도 spinner 은 사용할 수 있다.
     */
    function openSpinner () {
        if (options.append_target_el) {
            options.append_target_el.appendChild(stringToElement(get_spinner_html()));
        } else {
            document.body.appendChild(stringToElement(get_spinner_html()));
        } 
    }

    /**
     *  custom_modal return 한수
     * 
     *  init    :   초기화  
     *  close   :   닫기
     *  open    :   열기
     */
    return {
        init: init,
        open: open,
        close: close,
        openSpinner: openSpinner
    }
})