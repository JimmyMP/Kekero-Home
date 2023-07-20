import { $, btnReloadWallpaper, input, input_tema } from './Accesibilidad.js';
import { quotes } from '../data/quotes.js';

let user;
//Para recargar de nuevo todas las funciones de start, sin recargar la pagina, al dar click
btnReloadWallpaper.addEventListener('click', () => !JSON.parse($('#favorito')) && start());
// Al iniciar el main se inician todas estas funciones
const start = () => {
    getQuote();
    addTime();
    getWallpaper();
  };

//Para buscar
const form = document.getElementById('form');
form.addEventListener('submit', handleForm);

function handleForm(e) {
    e.preventDefault(); //Para que no se recarge la pagina
    window.location.href = `https://www.google.com/search?q=${input.value.trim()}`;
    e.target.reset();
  }
//Usar la Data de Frases ubicada en data

function addQuote(data) {
    const rootQuote = $('.quote');
    rootQuote.innerHTML = `
      <h2 class="text-lg font-medium">${data.text}</h2>
      <small class="text-md ">${data.author || 'Unknown'}</small>
    `;
  }
function getQuote() {
    const quote = Math.floor(Math.random() * quotes.length);
    addQuote(quotes[quote]);
}
//Agregar el tiempo donde sale AM o PM
function addTime() {
    let o = new Intl.DateTimeFormat('es', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
    });
    let date = new Intl.DateTimeFormat('es', {
        dateStyle: 'long',
    });
    const hour = o.format(Date.now());
    const datenow = date.format(Date.now());
    const now = new Date();
    const timeOfDay = now.getHours() >= 12 ? 'PM' : 'AM';
    const currentHour = now.getHours();
    let greeting;
    if (currentHour >= 5 && currentHour < 12) {
      greeting = 'Buenos días, Kekero';
    } else if (currentHour >= 12 && currentHour < 18) {
      greeting = 'Buenas tardes, Kekero';
    } else {
      greeting = 'Buenas noches, Kekero';
    }

    const rootClock = $('.clock');
    rootClock.innerHTML = `
        <p class=" font-extralight-bold text-2xl py-3">${greeting}</p> 
        <h2 class="font-semibold text-7xl md:text-7xl py-3">${hour} ${timeOfDay}</h2>
        <p class="text-center sm:text-xl mb-6">${datenow}</p>
    `;
}
setInterval(() => {
    addTime();
}, 60000); 
//Fondo de pantalla
function addWallpaper(data) {
    const {
      user: {
        links: { html: link_profile },
        first_name,
        location,
      },
      urls: { regular },
    } = data;
  
    const wallpaper = $('.wallpaper');
    //Para que aparezca gradualmente el fondo
    wallpaper.className = 'wallpaper animate__animated animate__fadeIn';
    wallpaper.style = `
    background: url('${regular.replace('1080', '1440')}') center center no-repeat;
    background-size: cover;
    `;
    setTimeout(() => {
      wallpaper.className = 'wallpaper';
    }, 400);
    const author = $('#author');
    author.textContent = first_name;
    author.href = link_profile;
  
    if (!location) {
      $('.location-wrapper').classList.add('hidden');
    } else {
      $('#location').textContent = location;
    }
  }

const form_tema = document.getElementById('form_tema');
form_tema.addEventListener('submit', handleForm_tema);
//Se comienza con una tematica de cafe
let url = localStorage.getItem('wallpaper_url') || 'https://api.unsplash.com/photos/random/?client_id=3j0d6XQ7CAPIECX8Srl987CrGxpQLn5g07vL3vgxdco&orientation=landscape&&query=Coffee';
function handleForm_tema(e) {
  e.preventDefault(); //Para que no se recarge la pagina
  console.log(input_tema.value.trim())
  if (input_tema.value.trim() != ''){
    //Se guarda la tematica que pones
    url = `https://api.unsplash.com/photos/random/?client_id=3j0d6XQ7CAPIECX8Srl987CrGxpQLn5g07vL3vgxdco&orientation=landscape&&query=${input_tema.value.trim()}`;
    localStorage.setItem('wallpaper_url', url);
  }
  console.log(url)
  e.target.reset();
  location.reload();
}

async function getWallpaper() {
    //Agregar una barra donde pueda escoger el tema que quieras de las fotos
    try {
      console.log(url)
      const resp = await fetch(url);
      const data = await resp.json();
      addWallpaper(data);
    } catch (e) {
      console.log(e);
    }
  }
start();