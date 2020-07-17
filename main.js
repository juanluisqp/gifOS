
const random = Math.floor(Math.random() * 20) + 1;
const temaElegido = document.querySelector('#temaSeleccionado');
const setTemaDia = document.getElementById('temaDia');
const setTemaNoche = document.getElementById('temaNoche');
const logo = document.querySelector('.logo');
const lupa = document.querySelector('.lupaBusqueda')
const APIKey = '&api_key=hFYriceFEWn4cgRYY3anwzszCH4HNbcD'; 
const URLTrend = 'http://api.giphy.com/v1/gifs/trending?';
const URLBusqueda = 'http://api.giphy.com/v1/gifs/search?';
const q = '&q=';
const APIBusqueda = URLBusqueda + APIKey + q;
const APITrend = URLTrend + APIKey;
const inputBusqueda = document.getElementById('searchBar');

setTemaDia.onclick = () => {
	temaElegido.setAttribute('class', 'themeDay');
	logo.setAttribute('src', 'imagenes/gifOF_logo.png');
	lupa.setAttribute('src', 'imagenes/lupa_inactive.svg');
}

setTemaNoche.onclick = () => {
	temaElegido.setAttribute('class', 'themeNight');
	logo.setAttribute('src', 'imagenes/gifOF_logo_dark.png');
	lupa.setAttribute('src', 'imagenes/combine_shape.svg');
}



let fetchGifs = () => {
	const temasSugeridos = ['rick+morty', 'breaking+bad', 'godfather', 'javascript']
	for (i=0; i<4; i++) {
		
		let sugerencia = document.getElementById('sugerido' + i)
		let gif = document.createElement('img');
		
		fetch(APIBusqueda + temasSugeridos[i] + '&limit=1' + '&offset=' + random)           
		.then((response) => response.json())
		
		.then((myJson) => {
			gif.src= myJson.data[0].images.downsized.url;
			sugerencia.appendChild(gif)
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
		console.log(myJson)
		
		myJson.data.forEach(data => {
			let tendencias = document.querySelector('.trendy');   
			let gif = document.createElement('img');
			let titulo = document.createElement('p');
			let containerDiv = document.createElement('div');
			titulo.innerHTML = data.title;                    
			gif.src = data.images.downsized.url;
			tendencias.appendChild(containerDiv);
			containerDiv.appendChild(gif);
			containerDiv.appendChild(titulo);
		});
		
		
	})
	
	.catch((response) => {
		alert('fallo en el fetch de tendencias. Causa:' + response)
	})
	
};



let inputFill = () => {
	const sugerenciaBusqueda = document.querySelector('.searchRelacionados');
	if (inputBusqueda.value) {
		sugerenciaBusqueda.style.display = 'initial';
	}
	else {
		sugerenciaBusqueda.style.display = 'none'; 
	}
}

inputBusqueda.addEventListener('input', inputFill);



fetchGifs();
fetchTrend();








