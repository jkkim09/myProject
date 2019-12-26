class ValidationUtil extends ValidationConfig {
    constructor(options) {
        super();
        if (options) this.optionSet(options);
    }

    /**
     * validation options 설정과 동시에 check 를 진행한다.
     * 
     * @param {*} options      validation options
     */
    sumit(options) {
        this.item_list  = options.list;
        this.success    = options.success;
        this.error      = options.error;
        this.complete   = options.complete;
        // 이전 option 초기화
        this.optionSet(false);
        this.check();
    }

    /**
     * validation options 설정 // 설정만 진행한다.
     * 
     * @param {*} options   validation options
     */
    optionSet(options) {
        super.setOptions(options);
    }

    /**
     * 실제 validation 진행
     * 
     * sumit 후 자동실행
     * optionsSet 후 호출 시 실행
     */
    check() {
        let return_value = [];
        let check_return_value;
        let check_error = false;
        for (const i in this.item_list) {
            const index_item = this.item_list[i];
            // target 을 지성시 html element 를 select 하여 값을 확인한다.
            if (index_item.target) {
                const target_value = this.targetValue(i, index_item.target);
                if (target_value) {
                    check_return_value = this.valueTypeCheck(i, target_value, this.stringLowCase(index_item.type), index_item.rule);
                }
            } else {
                check_return_value = this.valueTypeCheck(i, index_item.value, this.stringLowCase(index_item.type), index_item.rule);
            }
            // validation 확인
            if (!check_return_value.check_value) {
                const get_target_element = super.getTargetElement(i);
                if (get_target_element) {
                    // validation error 인 element 를 설정
                    check_return_value.target_element = get_target_element;
                }
                check_error = true;
            }
            return_value.push(check_return_value);
        }

        /**
         * check_error false : 이상없음, true : validation fail
         * 
         * success      성공일떄 반환 
         * error        실패일떄 반환
         * complete     성공 실패 모두 반환
         */
        if(!check_error) {
            this.success.call(this, {
                code: 0,
                message: 'validation check success',
                value: return_value,
            });
        } else {
            this.error.call(this, {
                code: 1,
                message: 'validation check error',
                value: return_value,
            });
        }
        this.complete.call(this, {
            code: 2,
            message: 'validation check complete',
            value: return_value,
        });
    }

    /**
     * check -> valueTypeCheck
     * 각 validation index 의 값을 type or rule 을 확인한다.
     * type, rule 둘다 있을경우 type 이 우선시 된다.
     * 
     * @param {*} index     
     * @param {*} value 
     * @param {*} type 
     * @param {*} rule 
     */
    valueTypeCheck (index, value, type, rule) {
        const getRole = type ? type: rule;
        let return_check_value = true;

        if (type) {
            switch (typeof value) {
                case 'object' :
                    for (const i in value) {
                        if (this.stringLowCase(typeof value[i]) !== getRole) {
                            return_check_value = false;
                        }
                    }
                    break;
                default :
                    if (this.stringLowCase(typeof value) !== getRole) {
                        return_check_value = false;
                    }
                    break;
            }
        } else {
            if (!rule.test(value)) {
                return_check_value = false;
            } 
        }

        return {
            index: index,
            value: value,
            set_type_or_rule: type || rule,
            check: return_check_value
        }
    }

    /**
     * options list 에 target 을로 성정된 element 값을 찾는다.
     * target이 class 일경우 복수 의 element 를 반환 한다.
     *  
     * @param {*} index 
     * @param {*} target_string 
     */
    targetValue (index, target_string) {
        let return_value;
        const target_string_type = (target_string.indexOf('#') > -1) ? 'id' : (target_string.indexOf('.') > -1) ? 'class' : 'none';
        let target_element;
        switch (target_string_type) {
            case 'id':
                target_element = document.getElementById(target_string.replace(/#/g, ''));
                super.setTargetElement(index, target_element);
                return_value = target_element.value;
                break;
            case 'class':
                target_element = document.getElementsByClassName(target_string.replace(/\./g, ''));
                super.setTargetElement(index, target_element);
                const class_length = target_element.length;
                if (class_length > 1) {
                    return_value = [];
                    for (let i=0; i < class_length; i++ ) {
                        return_value.push(target_element[i].value);
                    }
                } else {
                    return_value = target_element[0].value;
                }
                break;
            case 'none':
                console.error('none id and class');
                break;
        }
        return return_value;
    }

    /**
     * 모든 문자를 소문자로 변경한다.
     * 
     * @param {*} value 
     */
    stringLowCase (value) {
        return value? value.toLowerCase() : false;
    }
}
