const getHexColor = (color) => {
    if (color === "lightGrey") return "#F6F4F3";
    if (color === "black") return "#000";
    if (color === "white") return "#fff";

    return null;
};

export default getHexColor;
