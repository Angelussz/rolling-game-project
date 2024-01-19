
const searchForm = document.getElementById("searchForm");
const inputSearch = document.getElementById("inputSearch");
searchForm.addEventListener("submit",(e)=>{
    // const valor = e.target.value;
    e.preventDefault();
    console.log(inputSearch.value)
    location.assign(`/pages/filtro.html#${inputSearch.value}`)
})