const API_END_POINT =
    "https://wr4a6p937i.execute-api.ap-northeast-2.amazonaws.com/dev";

export const request = async (url, options = {}) => {
    const res = await fetch(`${API_END_POINT}${url}`);
    if (res.ok) {
        return res.json();
    }
    throw new Error("error");
};

export const fetchLanguage = async (keyword) => request(`/languages?keyword=${keyword}`);
