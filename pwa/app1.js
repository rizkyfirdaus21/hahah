const main = document.querySelector('main')
const sourcesSelector = document.querySelector('#sourceSelector')
const defaultSource = 'bbc-news'

window.addEventListener('load', async e => {
    updateBerita()
    await updatePilihanBerita()
    sourceSelector.value = defaultSource

    sourceSelector.addEventListener('change', e => {
        updateBerita(e.target.value)
    })
    
    if('serviceWorker' in navigator){
        try {
            navigator.serviceWorker.register("sw.js")
            console.log('Service worker terdaftar')
        } catch (error) {
            console.log('Service worker tidak terdaftar')            
        }
    }
})

//mengganti chanel berita
async function updatePilihanBerita(){
    const res = await fetch(`https://newsapi.org/v2/sources?apiKey=97f1b7aab4864396a8b8042a171d0c5e`)
    const json = await res.json()

    sourceSelector.innerHTML = json.sources.map( src => `<option value="${src.id}">${src.name}</option>`)
    .join('\n')
}

// ambil data berita
async function updateBerita(source = defaultSource){
 const res = await fetch(`https://newsapi.org/v2/everything?q=${source}&apiKey=97f1b7aab4864396a8b8042a171d0c5e`)
 const json = await res.json()

 main.innerHTML = json.articles.map(buatBerita).join('\n')
}

//tampil data berita
function buatBerita(article){
    return `
    <div class ="article">
        <a href ="${article.url}">
        <h2>${article.title}"</h2>
        <img src ="${article.urlToImage}">
        <p>${article.description}"</p>
        </a>
        </div>
    `
}