export default function removeDups(arr) {
    return arr.filter((it, idx) => {
        return arr.indexOf(it, ++idx) == -1;
    });
}
