class ValidationUtil extends ValidationConfig {
    constructor(options) {
        super();
    }

    sumit(options) {
        this.item_list  = options.list;
        this.success    = options.success;
        this.error      = options.error;
        this.complete   = options.complete;
        // 이전 option 초기화
        this.optionSet(false);
        this.check();
    }

    optionSet(options) {
        super.setOptions(options);
    }

    check() {
        for (const i in this.item_list) {
            const index_item = this.item_list[i];
            if (index_item.target) {
                const target_value = this.targetValue(index_item.target);
                if (target_value) {
                    this.valueTypeCheck(i, target_value, index_item.type, index_item.rule);
                }
            } else {
                this.valueTypeCheck(i, index_item.value, index_item.type, index_item.rule);
            }
        }
    }

    valueTypeCheck (index, value, type, rule) {
        const getRole = type ? type: rule;
        switch (typeof value) {
            case 'object' :
                break;
            default :
                console.log(value, getRole);
                break;
        }
    }

    targetValue (target_string) {
        let return_value;
        const target_string_type = (target_string.indexOf('#') > -1) ? 'id' : (target_string.indexOf('.') > -1) ? 'class' : 'none';

        switch (target_string_type) {
            case 'id':
                return_value = document.getElementById(target_string.replace(/#/g, '')).value;
                break;
            case 'class':
                const class_element = document.getElementsByClassName(target_string.replace(/\./g, ''));
                const class_length = class_element.length;
                if (class_length > 1) {
                    return_value = [];
                    for (let i=0; i < class_length; i++ ) {
                        return_value.push(class_element[i].value);
                    }
                } else {
                    return_value = class_element[0].value;
                }
                break;
            case 'none':
                console.error('none id and class');
                break;
        }
        return return_value;
    }
}