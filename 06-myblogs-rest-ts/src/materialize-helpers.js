export let chipsInstances;
document.addEventListener('DOMContentLoaded', function () {
    const elems = document.querySelectorAll('.chips');
    chipsInstances = M.Chips.init(elems);
});