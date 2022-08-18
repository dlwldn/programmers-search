export default function SuggestList({ $target, initialState, onClick }) {
    const $component = document.createElement('div');
    $component.className = 'Suggestion';
    this.state = {
        selectedIndex: 0,
        suggestList: initialState
    };

    $target.appendChild($component);

    this.render = () => {
        const { suggestList = [] } = this.state;
        if(suggestList.length > 0) {
            $component.style.display = 'block';
            $component.innerHTML = `
                <ul>
                    ${this.state.suggestList.map((suggestItem, idx) => `
                        <li data-index="${idx}" class=${idx === this.state.selectedIndex ? 'Suggestion__item--selected' : ''} >
                            <span>${suggestItem}</span>
                        </li>
                    `).join('')}
                </ul>
            `
        } else {
            $component.style.display = 'none';
            $component.innerHTML = ''
        }   
      
    }

    this.setState = (nextState) => {
        this.state = {
            ...this.state,
            ...nextState,
        };
        this.render();
    }

    $component.addEventListener('click', (e) => {
        const $li = e.target.closest('li');
        const { index } = $li.dataset;

        onClick(index);
    })

    this.render();
}