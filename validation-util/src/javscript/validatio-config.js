class ValidationConfig {

    constructor() {
        this.rule = {
            test: / {0,}/g,
            number: /\d/g,
            string: /\D/g,
        }
    }

    getOptions() {
        return this.options;
    }

    setOptions (options) {
        this.options = options;
    }

    getRule(key) {
        return key? this.rule[key] : this.rule;
    }

    setRule(key, value) {
        this.rule[key] = value;
    }
}