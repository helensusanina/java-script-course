(() => {
    function firstToUpper(input, splitter) {
        return input.split(splitter).map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(splitter);
    }

    function replaceRepeating(input, repeated) {
        let result = '';
        for (let i = 0; i < input.length; i++) {
            if (input[i] !== input[i+1] || input[i] !== repeated)
                result += input[i];
        }
        return result;
    }

    const allowedKeys = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя- ';
    document.addEventListener('DOMContentLoaded', () => {
        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('keypress', event => {
                event.preventDefault();
                if (allowedKeys.includes(event.key.toLowerCase())) {
                    input.value += event.key;
                }
            });

            input.addEventListener('blur', () => {
                input.value = input.value.trim();
                let result = '';

                for (const s of input.value) {
                    if (allowedKeys.includes(s)) {
                        result += s;
                    }
                }

                input.value = result.replace(/^-+/, '').replace(/a+$/, '');
                input.value = firstToUpper(input.value, ' ');
                input.value = firstToUpper(input.value, '-');
                input.value = replaceRepeating(input.value ,' ');
                input.value = replaceRepeating(input.value, '-');
            });
        });

    })
})()
