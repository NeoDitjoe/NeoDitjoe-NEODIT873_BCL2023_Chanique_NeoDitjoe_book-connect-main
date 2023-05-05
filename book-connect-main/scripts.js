import {authors, genres, books, BOOKS_PER_PAGE} from './data.js'

const dataListItems = document.querySelector('[data-list-items]')   //div the display books
const dataListButton = document.querySelector('[ data-list-button]') //button used to show more
const searchOverlay = document.querySelector('[data-search-overlay]') // the input to search
const dataSearchTitle = document.querySelector('[data-search-title]') //search by title in the search from
const dataSearchCancel = document.querySelector('[data-search-cancel]') //to close the search form 
const dataSearchForm = document.querySelector('[data-search-form]')  // used to click the button on the form to didplay redults
const dataHeaderSearch = document.querySelector('[data-header-search]') //search icon on the header used to pop the search form
const dataListActive = document.querySelector('[data-list-active]') //div used to display preview 
const dataListClose = document.querySelector('[data-list-close]') //closes the preview
const dataSearchGenres = document.querySelector('[data-search-genres]') //select option for genres
const dataSettingOverlay = document.querySelector('[data-settings-overlay]')//the over lay for the theme settings
const dataSettingForm = document.querySelector('[data-settings-form]') //used as button to set the selected them
const dataSettingsCancel = document.querySelector('[data-settings-cancel]') //cancel option from the themseetting to exit overly without changes
const dataListDescription = document.querySelector("[data-list-description]") //holds the decription on the preview overlay
const dataListSubtitle = document.querySelector("[data-list-subtitle]")//empty div to keep the subtitle
const dataListTitle = document.querySelector("[data-list-title]") //emty h3 to hold title for the preview
const dataListBlur = document.querySelector("[data-list-blur]")//setting the backround image to bluh on the preview
const dataListImage = document.querySelector("[data-list-image]")//to display imagee on preview
const dataSettingsTheme = document.querySelector("[data-settings-theme]")//if statement to display them
const dataSearchResults = document.querySelector("[data-search-results]")//empty div to append the search results
const dataErrorMessage = document.querySelector('[class="list__message"]')// div that contain error message


const matches = books  //assigned books to new variable
let page = 1; //assigned 1 to variable


/**
 * this object contains the color of themes 
 */
const css = {  
    day : {
        dark: '10, 10, 20',
        light: '255, 255, 255',
    },  
    night : {
        dark: '255, 255, 255',
        light: '10, 10, 20',
    }
    
}

/**
 * Hold the select option for choosing your favourite genres then appends to the @dataSearchResults div
 */
const genresOption = document.createDocumentFragment() 
let element = document.createElement('option') 
element.value = 'any'                        
element.innerHTML = 'All Genres' 
genresOption.appendChild(element)  

for (const [id, name] of Object.entries(genres)) {
    const element = document.createElement('option') 
    element.value = id  //value
    element.innerText = name //text
    genresOption.appendChild(element)
} 
dataSearchGenres.appendChild(genresOption)  

/**
 * Hold the select option for choosing your favourite author then appends to the @dataSearchResults div
 */
const dataSearchAuthors = document.querySelector('[data-search-authors]') //to append author options
let authorOptions = document.createDocumentFragment()  
let elementAuthor = document.createElement('option')
elementAuthor.value = 'any'  
elementAuthor.innerText = 'All Authors' 
authorOptions.appendChild(elementAuthor)

for (const [id, name] of Object.entries(authors)) {  
    const elementAuthor = document.createElement('option')
    elementAuthor.value = id 
    elementAuthor.innerHTML = name 
    authorOptions.appendChild(elementAuthor)
}

dataSearchAuthors.appendChild(authorOptions) 



dataSearchCancel.addEventListener('click', ()=>{
    searchOverlay.open = false
});
dataHeadersetting.addEventListener('click', ()=>{
    dataSettingOverlay.open = true
});
dataSettingsCancel.addEventListener('click', ()=>{
    dataSettingOverlay.open = false
});

dataSettingForm.addEventListener("submit",() => { 
    settings.submit 
});
dataListClose.addEventListener('click',() => { 
    dataListActive.open = false
 });





dataHeaderSearch.addEventListener('click', () =>{
    searchOverlay.open = true
    dataSearchTitle.focus()
});


const fragment = document.createDocumentFragment()

//display books

let extracted = books.slice(0, 36)

  function displayBooksList(DomAppend, extract){
    for(const { author, image, title, id }of extract){
    let element = document.createElement('button');
    element.classList = 'preview';
    element.setAttribute('data-preview', id);

    element.innerHTML =
     `<img 
        class="preview__image" 
        src="${image}"
        />
        <div class="preview__info">
            <h3 class="preview__title">${title}</h3>
            <div class="preview__author">${authors[author]}</div>
        </div>
        `;
    fragment.appendChild(element);
    DomAppend.appendChild(fragment);
    
      };}
    displayBooksList(dataListItems, extracted)


dataSearchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    searchOverlay.open = false
    dataListItems.innerHTML = '';
    dataSearchResults.innerHTML = '';


const formData = new FormData(event.target)
const title = formData.get('title');
const genre = formData.get('genre');
const author = formData.get('author');


const filteredBooks = [];
for (let i = 0; i < books.length; i++) {
  const book = books[i];
  if (genre === 'any' && author === 'any') {
   if (book.title.toLowerCase().includes(title.toLowerCase())){
    filteredBooks.push(book);
   }
  }
  if (genre === 'any') {
    if (book.title.toLowerCase().includes(title.toLowerCase()) && book.author === author){
     filteredBooks.push(book);
    }
   }
   if (title === '') {
    if (book.author === author && book.genres.includes(genre)){
     filteredBooks.push(book);
    }
   }
   if (title === '' && author === 'any' ) {
    if (book.genres.includes(genre)){
     filteredBooks.push(book);
    }
   }
   if(filteredBooks.length > 0 ){
    dataErrorMessage.style.display = 'none'
    
}else{
    dataErrorMessage.style.display = 'block'
}
}

displayBooksList(dataSearchResults, filteredBooks)
   


    dataSearchForm.reset()  

    document.querySelector("[data-backdrop]").style.display = "none"; //backdrop div

})


//show more      

let ShowMorePosition = 0;
let ShowMore = 36

dataListButton.addEventListener("click", () => {
    ShowMorePosition += ShowMore ;
    let extractedShowMore = books.slice(ShowMorePosition, ShowMorePosition + ShowMore);
    displayBooks(extractedShowMore)
});



function displayBooks(extractedShowMore){
    fragment.innerHTML = '';

    
for(const { author, image, title, id }of extractedShowMore){
    let element = document.createElement('button');
    element.classList = 'preview';
    element.setAttribute('data-preview', id);

    element.innerHTML =
     `<img 
        class="preview__image" 
        src="${image}"
        />
        <div class="preview__info">
            <h3 class="preview__title">${title}</h3>
            <div class="preview__author">${authors[author]}</div>
        </div>
        `;  
    fragment.appendChild(element);
    dataListItems.appendChild(fragment);
      };
 
      
}


// const initial = matches.length - [page * BOOKS_PER_PAGE];
// "remaining" === "hasRemaining" ? initial : 0;
// dataListButton.disabled = initial <= 0

// dataListButton.innerHTML = /* html */ `
//       <span>Show more</span>
//       <span class="list__remaining"> (${initial})</span>
     
//    `

   
dataListButton.innerText = "Show more" + (matches.length - BOOKS_PER_PAGE)

//dataListButton.disabled = (matches.length - [page * BOOKS_PER_PAGE] <= 0)//.removed ! and changed to less than equal to

dataListButton.innerHTML = /* html */ [
    `<span>Show more</span>
    <span class="list__remaining"> (${matches.length - [page * BOOKS_PER_PAGE] > 0 ? matches.length - [page * BOOKS_PER_PAGE] : 0})</span>`,
]

   window.scrollTo({ top: 0, behavior: 'smooth' });
    searchOverlay.open = false;

dataSettingsTheme.value = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day';
const visual = window.matchMedia('(prefers-color-scheme: dark)').matches? 'night' : 'day';

if(dataSettingsTheme.value === 'night'){
    document.documentElement.style.setProperty('--color-dark', css['night'].dark);
    document.documentElement.style.setProperty('--color-light', css['day'].light);
}
if(visual === 'night'){
    document.documentElement.style.setProperty('--color-dark', css['night'].dark);
    document.documentElement.style.setProperty('--color-light', css['day'].light);
}

dataSettingOverlay.addEventListener("submit", (event) =>  {
    event.preventDefault();
    const formData = new FormData(event.target);
    const result = Object.fromEntries(formData);
    document.documentElement.style.setProperty('--color-dark', css[result.theme].dark);
    document.documentElement.style.setProperty('--color-light', css[result.theme].light);
    dataSettingOverlay.open = false;
})

function preview(preview){
    preview.addEventListener('click', (event) => {
    
        dataListActive.open = true
       
        let pathArray = Array.from(event.path || event.composedPath()) 
        let active = null
        
        for (const node of  pathArray) {
            if (active) 
            {break};
            const previewId = node?.dataset?.preview
            
            for (const singleBook of books) {
                if (singleBook.id === previewId ) {
                    active = singleBook
                    {break};
                }
                
            } 
            
        };
        
      
        dataListActive.open = true
        dataListImage.setAttribute('src', active.image);
        dataListBlur.style.background  =` url(${active.image})`;
        
        dataListTitle.textContent = active.title;
        
        dataListSubtitle.textContent = `${authors[active.author]} (${new Date(active.published).getFullYear()})`
        dataListDescription.textContent = active.description
    }) ;
}

preview(dataListItems)
preview(dataSearchResults)