export default function SearchInput({ $target, initialState, onChange, onKeyDown, onKeyUp, onEnter }) {
    const $form = document.createElement("form");
    $form.className = "SearchInput";

    this.state = initialState;
    let debounce = null;

    $target.appendChild($form);
    
    this.render = () => {
        $form.innerHTML = `
            <input class="SearchInput__input" type="text" placeholder="프로그램 언어를 입력하세요." value=${this.state}>
        `
        document.querySelector('.SearchInput__input').focus();
    }

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    }

    $form.addEventListener('submit', (e) => {
        e.preventDefault();
    })

    $form.addEventListener('input', (e) => {
        if(debounce) {
            clearTimeout(debounce);
        }

        debounce = setTimeout(() => {  
            onChange(e.target.value)
        }, 500);
    });

    $form.addEventListener('keydown', (e) => {
        if(e.key === 'ArrowDown') {
            onKeyDown();
        }
        if(e.key === 'ArrowUp') {
            onKeyUp();
        }
        if(e.key === 'Enter') {
            onEnter();
        }
    })

    this.render();
}
