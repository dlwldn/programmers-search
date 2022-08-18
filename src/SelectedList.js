export default function SelectedList({ $target, initialState }) {
    const $component = document.createElement('div');
    $component.className = 'SelectedLanguage';

    $target.appendChild($component);

    this.state = {
        selectedList: initialState.selectedList
    };

    this.render = () => {
        $component.innerHTML = `
            <ul>
                ${this.state.selectedList.map(item => `
                    <li>${item}</li>
                `).join('')}
            </ul>
        `
    }

    this.setState = (nextState) => {
        this.state = {
            ...this.state,
            ...nextState
        };
        this.render();
    }

    this.render();
}