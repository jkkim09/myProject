# my-utils
> 작업환경.

개인적으로 쓰는 Utile 모음.

## 설치


Windows:

```sh
npm install
```

## Utile list

1. custom-modal : Browser alert 이 아닌 cutome 가능한 html modal


## Release History

* 0.0.1
    * custom-modal: 초기 설계


> custom-modal

# 설정 Options

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

