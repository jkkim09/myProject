# my-utils


My Utile 모음.

## 설치


Windows:

```sh
npm install
```

## Utile list

1. custom-modal : Browser alert 이 아닌 cutome 가능한 html modal
2. scroll-event : mouse or touch 이벤트를 이용하여 스크롤

## Release History

* 0.0.1
    * custom-modal 추가
* 0.0.2
	* scroll-event 추가


# 1 . custom-modal

## - 사용법

```javascript
const util = new custom_modal();
util.init({
	append_target_el: document.body,
	modal_text: document.getElementById('title').value,
	conform_button: {
		text: document.getElementById('button-title').value,
		// href: 'https://naver.com',
		click_function: function() {
			// util.close();
		}
	}
});
```

## - Options

```
{
	append_target_el : // modal 을 화면에 append 할 element
	modal_text: 	// modal 에 표시 할 text
	conform_button : {
		text : //	modal button 에 표시할 text, 설정이 없을 시 "close" 표시
		click_function: //	modal button 클릭 시 callback 이벤트
	}
}
```

## - RETURN 함수
| 함수 | 설명 |
|---|:---:|
| `init` | modal 을 초기화 한다. |
| `open` | 초기화된 modal 을 연다. |
| `close` | 모달을 닫는다. |  
| `openSpinner` | spinner 을 연다. |


# 2 . scroll-event

## - 사용법

```javascript
const scrollUtil = new mouseScrollJs();
scrollUtil.init({
    target_id: 'player_html5_api',
    add_css: 'width: auto;',
    class_add: true,
    init_callback: function (e) {
        // console.log(e);
    }
});
```

## - Options

```
{
	target_id : // scroll event 가 걸릴 element "id"
	add_css: 	// scroll 이벤트가 발생할 target element의 추가적인 css
	class_add : // false 이거나 설정이 없을 때 target style 직접 css 설정하고 
				// true 일경우 class 생성하여 적용한다.
	init_callback : // event 초기화가 끝나고 발생하는 callback
}
```

## - RETURN 함수
| 함수 | 설명 |
|---|:---:|
| `init` | scroll event 초기화하고 적용한다. |
| `reSet` | scroll 영역 position 을 초기화 한다. |