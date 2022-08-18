import { fetchLanguage } from "./api/api.js";
import SearchInput from "./SearchInput.js";
import SelectedList from "./SelectedList.js";
import { getStorage, setStorage } from "./storage/storage.js";
import SuggestList from "./SuggestList.js";

export default function App({ $target }) {
    this.state = {
        suggestList: [],
        selectedList: getStorage('select_list', []),
    };

    this.setState = (nextState) => {
        this.state = {
            ...this.state,
            ...nextState,
        };
        suggestComponent.setState({
            suggestList: this.state.suggestList,
            selectedIndex: 0,
        });
        selectedComponent.setState({
            selectedList: this.state.selectedList,
        });
        setStorage('select_list', this.state.selectedList)
    };

    const searchComponent = new SearchInput({
        $target,
        initialState: "",
        onChange: async (keyword) => {
            if (keyword.length === 0) {
                this.setState({
                    suggestList: [],
                });
            } else {
                const res = await fetchLanguage(keyword);
                this.setState({
                    suggestList: res,
                });
            }
        },
        onKeyDown: () => {
            suggestComponent.setState({
                selectedIndex:
                    suggestComponent.state.suggestList.length ===
                    suggestComponent.state.selectedIndex + 1
                        ? 0
                        : suggestComponent.state.selectedIndex + 1,
            });
        },
        onKeyUp: () => {
            suggestComponent.setState({
                selectedIndex:
                    suggestComponent.state.selectedIndex === 0
                        ? suggestComponent.state.suggestList.length - 1
                        : suggestComponent.state.selectedIndex - 1,
            });
        },
        onEnter: () => {
            setSelectLanguage(suggestComponent.state.selectedIndex);
        },
    });

    const suggestComponent = new SuggestList({
        $target,
        initialState: {
            suggestList: [],
        },
        onClick: (index) => {
            setSelectLanguage(index);
        },
    });

    const selectedComponent = new SelectedList({
        $target,
        initialState: {
            selectedList: this.state.selectedList,
        },
    });

    const setSelectLanguage = (targetIndex) => {
        const targetLanguage = suggestComponent.state.suggestList[targetIndex];

        if (this.state.selectedList.includes(targetLanguage)) {
            const filteredList = this.state.selectedList.filter(
                (list) => list !== targetLanguage
            );
            alert(targetLanguage);
            this.setState({
                selectedList: [...filteredList, targetLanguage],
            });
        } else {
            if (this.state.selectedList.length === 5) {
                const filteredList = this.state.selectedList.filter(
                    (list, idx) => idx !== 0
                );
                alert(targetLanguage);
                this.setState({
                    selectedList: [...filteredList, targetLanguage],
                });
            } else {
                alert(targetLanguage);
                this.setState({
                    selectedList: [...this.state.selectedList, targetLanguage],
                });
            }
        }
    };
}
