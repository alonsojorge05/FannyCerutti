const container = document.getElementById("box")
let currentPage = 1

// Total in display //

const displayCharacters = document.getElementById("total-characters")

// Characters in cards //

let totalPages = 0

const nowBtn = document.getElementById("current-page")
const totalBtn = document.getElementById("total-pages")

const getCharacters = (pageNumber) => {
  container.innerHTML = ""
  fetch (`https://rickandmortyapi.com/api/character?page=${pageNumber}`)
  .then((res) => res.json())
  .then((data) => {
    renderCharacters(data)
    totalPages = data.info.pages

    nowBtn.innerHTML = pageNumber;
    renderCharacters(data)

    totalBtn.innerHTML = totalPages;
    renderCharacters(data)
  })
}

getCharacters(currentPage)

const renderCharacters = (data) => {
  displayCharacters.innerHTML = data.results.length
  data.results.forEach(personaje => {
  container.innerHTML +=
    `<article>
    <div class="image-container">
    <img src="${personaje.image}" alt="Character">
    </div>
    <h2>${personaje.name}</h2>
    <p>Género: ${personaje.gender}</p>
    <p>Especie: ${personaje.species}</p>
    <p>Estado: ${personaje.status}</p>
    <p>Origen: ${personaje.origin.name}</p>
    <p>Ubicación: ${personaje.location.name}</p>
    </article>`
  })
}

// Pagination //

const nextBtn = document.getElementById("next-page")
const prevBtn = document.getElementById("previous-page")
const firstBtn = document.getElementById("first-page")
const lastBtn = document.getElementById("last-page")


nextBtn.addEventListener("click", () => {
  if (currentPage <= 1){
    currentPage++
  } else if (currentPage >1 && currentPage < totalPages) {
    prevBtn.removeAttribute("disabled", false)
    currentPage++
  }
  else {
    nextBtn.setAttribute("disabled", true)
    currentPage++
  }

  getCharacters(currentPage)
})

prevBtn.addEventListener("click", () => {
  if (currentPage <= 1){
    prevBtn.setAttribute("disabled", true)
  } else if (currentPage >1 && currentPage <= totalPages) {
    currentPage--
    nextBtn.removeAttribute("disabled", false)
  }
  else {
    nextBtn.setAttribute("disabled", true)
    currentPage--
  }

  getCharacters(currentPage)
})

firstBtn.addEventListener("click", () => {
  if(currentPage > 2){
    currentPage = 1
  }

  getCharacters(currentPage)
})

lastBtn.addEventListener("click", () => {
  if(currentPage < totalPages){
    currentPage = totalPages
  }

  getCharacters(currentPage)
})

// Filters //

const allBtn = document.getElementById("all")
const femaleBtn = document.getElementById("female")
const maleBtn = document.getElementById("male")
const genderlessBtn = document.getElementById("gl")
const unknownBtn = document.getElementById("uk")

const filterCharacters = (filterParam, valueParam) => {
  fetch(`https://rickandmortyapi.com/api/character/?${filterParam}=${valueParam}`)
  .then(res => res.json())
  .then((data) => renderCharacters(data))
}

femaleBtn.addEventListener ("click",() => { 
  filterCharacters("gender", "Female")})

maleBtn.addEventListener ("click",() => { 
  filterCharacters("gender", "Male")})

genderlessBtn.addEventListener ("click",() => { 
  filterCharacters("gender", "Genderless")})

unknownBtn.addEventListener ("click",() => { 
  filterCharacters("gender", "Unknown")})

allBtn.addEventListener ("click",() => { 
  filterCharacters()})
