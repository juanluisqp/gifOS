const buttons = document.querySelectorAll('.verMas');  // PARA FUNCION BOTONES VER MAS
const random = Math.floor(Math.random() * 20) + 1; // PARA TENDENCIAS
const SelectedTheme = document.querySelector('#temaSeleccionado'); // PARA SETEAR TEMAS
const LightButton = document.getElementById('temaDia'); // PARA SETEAR TEMAS
const DarkButton = document.getElementById('temaNoche'); // PARA SETEAR TEMAS
const APIKey = '&api_key=hFYriceFEWn4cgRYY3anwzszCH4HNbcD'; 
const URLTrend = 'http://api.giphy.com/v1/gifs/trending?';
const URLSearch = 'http://api.giphy.com/v1/gifs/search?';
const q = '&q=';
const APISearch = URLSearch + APIKey + q;
const APITrend = URLTrend + APIKey;
const searchInput = document.getElementById('searchBar');
const searchSuggestion = document.querySelector('.searchRelacionados');
const botonBuscar = document.querySelector('.botonBuscar');
const trendContainer = document.querySelector('.trendy');
const resultsContainer = document.getElementById('searchResults');



setLightTheme = () => {
SelectedTheme.setAttribute('class', 'themeDay');
localStorage.setItem('theme', 'light');
}


setDarkTheme = () => {
	SelectedTheme.setAttribute('class', 'themeNight');
	localStorage.setItem('theme', 'dark');
}

LightButton.addEventListener('click', setLightTheme);
DarkButton.addEventListener('click', setDarkTheme);



lastTheme = () => {
	let selectedTheme = localStorage.getItem('theme');
	switch(selectedTheme) {
		case 'light': {setLightTheme()}
		break;
		case 'dark': {setDarkTheme()}
		break;
		default: {setLightTheme()};
	}
};

window.addEventListener('load', lastTheme);





const fetchGifs = () => {
	const temasSugeridos = ['rick+morty', 'breaking+bad', 'godfather', 'javascript']
	for (i=0; i<4; i++) {		
		let suggestion = document.getElementById('sugerido' + i)
		let gif = document.createElement('img');
		
		fetch(APISearch + temasSugeridos[i] + '&limit=1' + '&offset=' + random)           
		.then((response) => response.json())
		
		.then((myJson) => {
			gif.src= myJson.data[0].images.downsized.url;
			suggestion.appendChild(gif)
		})
		
		.catch((response) => {
			alert('Fallo al intentar fetch sugerido, respuesta: ' + response)
		});
	}
};

let fetchTrend = () => { 
	
	fetch(APITrend + '&limit=20')
	.then((response) => response.json())
	.then(function(myJson) {  
			myJson.data.forEach(data => {
			let gif = document.createElement('img');
			let titulo = document.createElement('p');
			let containerDiv = document.createElement('div');
			titulo.innerHTML = data.title;                    
			gif.src = data.images.downsized.url;
			trendContainer.appendChild(containerDiv);
			containerDiv.appendChild(gif);
			containerDiv.appendChild(titulo);
		});
		
		
	})
	
	.catch((response) => {
		alert('fallo en el fetch de tendencias. Causa:' + response)
	})
	
};

//ESTA FUNCION FALTA POR COMPLETAR*
buttons.forEach(button => {  // Funcion para los botones ver mas
	button.addEventListener('click', (event) => {
		const relatedTopic = event.target.previousSibling.previousSibling.innerText
		console.log(relatedTopic)})
});
// FALTA HACER EL FETCH*

const searchGif = () =>  {
	document.getElementById('trend').style.display = 'none';
	resultsContainer.innerHTML = "";	
	fetch(APISearch + searchInput.value + '&limit=4') //VOLVER A CAMBIAR A 20 EL LIMITE
		.then((response) => response.json())
		.then(function(myJson) {  
			myJson.data.forEach(data => {
			let gif = document.createElement('img');
			let titulo = document.createElement('p');
			let containerDiv = document.createElement('div');
			titulo.innerHTML = data.title;					                 
			gif.src = data.images.downsized.url;
			resultsContainer.appendChild(containerDiv);
			containerDiv.appendChild(gif);
			containerDiv.appendChild(titulo);
			});
		})
		.catch((response) => {
		alert('fallo en el fetch de tendencias. Causa:' + response)
		})
	}

const inputFill = () => {
	if (searchInput.value) {
		searchSuggestion.style.display = 'initial';
		document.getElementById('buscar').className = 'botonBuscar active';}
	else {
		searchSuggestion.style.display = 'none'; 
		document.getElementById('buscar').className = 'botonBuscar'
		}	
}
searchInput.addEventListener('input', inputFill); // Ejecuta la funcion al llenar el imput

	
const search = (click) => {
	if (searchInput.value) {
	let header = document.querySelector('.divTitle');
	header.innerText = 'Resultados para: ' + searchInput.value; 	
	searchGif();
	searchInput.value = '';
	searchSuggestion.style.display = 'none';
	document.getElementById('buscar').className = 'botonBuscar'}
	else {
		click.preventDefault();
	}
};
botonBuscar.addEventListener('click', search); // Ejecuta la funcion al hacer click en el boton





const launcher = () => {
fetchGifs();
fetchTrend();
lastTheme();
}
/*
window.addEventListener('load', launcher)
*/






