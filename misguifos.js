const SelectedTheme = document.querySelector('#temaSeleccionado');
const LightButton = document.getElementById('temaDia');
const DarkButton = document.getElementById('temaNoche');
const start = document.getElementById('start');
const video = document.getElementById('video');
const repeat = document.querySelector('.repeat');
const lastInstrucctions = document.querySelector('.lastInstrucctions');
const APIKey = '&api_key=hFYriceFEWn4cgRYY3anwzszCH4HNbcD'; 
const uploadURL = 'https://upload.giphy.com/v1/gifs?';
const idSearchURL = 'https://api.giphy.com/v1/gifs/';
const guifosUploaded = document.getElementById('guifosUploaded')




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



const cameraAccess = () => { 
    navigator.mediaDevices.getUserMedia({    
    audio: false,    
        video: {    
        height: { max: 830 }    
        }
    
    })
    
    .then((stream) => {
    
    video.srcObject = stream;    
    video.play()   
    document.querySelector('.crearGuifos').style.display = 'none';
    document.querySelector('.check').style.display = 'flex';
    
    })

    .catch((response) => alert(response.name + ': solo puedes grabar tu guifo dando acceso a tu camara. \n Para volver a intentar, recarga la pagina y da acceso a tu camara' ) )
}

const videoRec = () => {
    const stream = video.srcObject;
    videoRecording =  new RecordRTCPromisesHandler(stream, {
        type: 'video'
    });
    recorder = RecordRTC(stream, {
        type: 'gif',
        frameRate: 1,
        quality: 10,
        width: 360,
        hidden: 240,
        
        onGifRecordingStarted: function() {
         console.log('started')
       },
      }); 
    recorder.startRecording();
    document.querySelector('#recordHeading').innerText = 'Capturando tu guifo';
    document.getElementById('recordLogo').setAttribute('src', 'imagenes/recording.svg');
    document.querySelector('#capture').innerText = 'Listo';
    document.getElementById('buttons').className = 'stop';
    document.getElementById('preview').style.display = 'none';
    video.style.display = 'initial';
    
    
    
    
}

const processData = () => {
    let form = new FormData();
    form.append('file', recorder.getBlob(), 'juanGif.gif');    
    console.log(form.get('file'))
    console.log(recorder.getBlob());
    
    
}

const stopRec = () => {
    recorder.stopRecording(processData)
    objectURL = URL.createObjectURL(recorder.getBlob())
    
    video.style.display = 'none';
    document.getElementById('preview').style.display = 'inherit';
    document.getElementById('preview').src = objectURL;
    document.querySelector('#recordHeading').innerText = 'Vista previa';
    console.log(objectURL);
    document.getElementById('buttons').className = 'grabar';
    lastInstrucctions.style.display = 'flex';
    document.getElementById('download').setAttribute('href', objectURL);

    
}



start.addEventListener('click', cameraAccess)

const buttons = document.getElementById('buttons')
buttons.addEventListener('click', ()=> {
    if (buttons.className === 'grabar') {
        videoRec();
    }
    else if (buttons.className === 'stop') {
        stopRec();
        document.querySelector('.grabar').style.display = 'none';
        
    }
    else {
        alert('clase indefinida')
    }
})


repeat.addEventListener('click',() => {
    videoRec();
    document.querySelector('.stop').style.display = 'flex';
    lastInstrucctions.style.display = 'none';
    
});

const uploadGif = () => {
    let form = new FormData();
    form.append('file', recorder.getBlob(), 'juanGif.gif');
    fetch(uploadURL + APIKey, {
        method: 'POST',
        body: form,
        json: true
    })
    
    
    .then((response) => {
      return response.json()
    })

    .then((myJson) => {
        let gifid = myJson.data.id;
        fetch(idSearchURL + gifid + '?' + APIKey)

        .then((res) => {
            return res.json()
        })
        .then((json) => { 
            
            const id = json.data.id;
            const gifData = JSON.stringify(json);
            localStorage.setItem(id, gifData); 
            document.getElementById('linkGif').value = json.data.images.original.url                    
            loadMyGifos();
            alert('tu guifo ha sido guardado!')
            lastInstrucctions.style.display = 'none'
            document.querySelector('.gifDone').style.display = 'flex';
            document.getElementById('done').style.display = 'flex';
        });
    })
  
    .catch((error) => {
        console.error(error);
    })
}

document.getElementById('upload').addEventListener('click', uploadGif);

const loadMyGifos = () => {
    guifosUploaded.innerHTML = null;

    let arrayGif = [];
    for(var i = 0; i < localStorage.length; i++){        
        arrayGif.push(localStorage.key(i));
           
    };
    if (arrayGif.indexOf('theme') !== -1 ) {
        let indexTheme = arrayGif.indexOf('theme');
        arrayGif.splice(indexTheme,1)
    };
      
    for(var i = 0; i < arrayGif.length; i++) {
    let idGif = arrayGif[i];
    let objectGif = localStorage.getItem(arrayGif[i])
    let objectparsed = JSON.parse(objectGif);
    let gif = document.createElement('img');
	let containerDiv = document.createElement('div');     
	gif.src = objectparsed.data.images.original.url;
	guifosUploaded.appendChild(containerDiv);
	containerDiv.appendChild(gif);
	};
}

window.addEventListener('load', loadMyGifos)


let copy = document.getElementById('copyLink');

copy.addEventListener('click', () => {
    document.getElementById('linkGif').select();
    document.execCommand('copy');
})

document.getElementById('done').addEventListener('click', () => {
    document.querySelector('.check').style.display = 'none';
})
    
