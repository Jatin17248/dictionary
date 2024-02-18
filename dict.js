let pdefinition = document.querySelector('.definition');
let pexample = document.querySelector('.example');
let psynonyms = document.querySelector('.synonyms');
let pantonyms = document.querySelector('.antonyms');
let ptranslated = document.querySelector('.translated');
let ppos = document.querySelector('.pos');
let pword = document.querySelector('.word');
let NotDisplayed = document.querySelector('.NotDisplayed');
const answers = document.querySelectorAll('.ans');
let pnewAudioLink = document.querySelector('#newAudioLink');
let paudioText = document.querySelector('#audioText');
const BASE_URL = "https://api.dictionaryapi.dev/api/v2/entries/en";
let sbmt = document.querySelector('#sbmt');
var audio = document.getElementById("myAudio");
var playBtn = document.getElementById("playbtn");
let view2 = document.querySelector('.view2');
let audiobtnrow = document.querySelector('#audiobtnrow');
const dropdown = document.querySelector('select');
  
  function toggleAudio() {
    if (audio.paused) {
      audio.play();
	  playBtn.innerHTML='<i class="fa-solid fa-circle-pause g-text"></i>';
    } else {
      audio.pause();
	  playBtn.innerHTML='<i class="fa-solid fa-play g-text"></i>';
    }
	
  }
	function audioEnded(){
		playBtn.innerHTML='<i class="fa-solid fa-play g-text"></i>';
	}
	
	for(code in countries ) {
	let newOption = document.createElement("option");
	newOption.innerText = countries[code];
	newOption.value = code;
	dropdown.append(newOption);
	if(code === "hi-IN"){
		newOption.selected = "selected";
	}	
	}
	
sbmt.addEventListener('click', async (evt) =>{
	evt.preventDefault();
	let wrd = document.querySelector('#wrd');
	let word = wrd.value;
	if (word === '' || word <= 0){
		word = 'development';
	}
	document.querySelector(".loader").style.display = "block";
    document.querySelector(".container1").style.display = "none";
	pword.innerText = '';
	ppos.innerText = '';
	pdefinition.innerText = '';
	pexample.innerText = '';
	psynonyms.innerText = '';
	pantonyms.innerText = '';
	audio.src = 'be_mine.mp3';
	paudioText.innerHTML = '';
  const URL = `${BASE_URL}/${word.toLowerCase()}`;
	document.body.style.height = "200vh";
	view2.style.display="flex";
	setTimeout(function () {
    document.querySelector(".loader").style.display = "none";
    document.querySelector(".container1").style.display = "flex";
  }, 2000);
  window.scrollTo({
  top: window.innerHeight,  // 100vh
  behavior: 'smooth'        // Smooth scrolling
	});

try {
	
  let response = await fetch(URL)
  
  let data = await response.json();
	
  let definition = data[0].meanings[0].definitions[0].definition;
   let pos = data[0].meanings[0].partOfSpeech;
  let example = data[0].meanings[0].definitions[0].example;
  let synonyms = data[0].meanings[0].definitions[0].synonyms;
  let antonyms = data[0].meanings[0].definitions[0].antonyms;
  let newAudioLink = data[0].phonetics[0].audio;	
  let audioText = data[0].phonetics[0].text;
  console.log(dropdown.value);
  await translate(word, dropdown.value);
  await updateAllElements(word, pos, definition, example, synonyms, antonyms, audioText, newAudioLink);
  let count = 0;
  
  await NeverShowUndefined(count);
  
} catch (error) {
	pword.innerText = word.toLowerCase();
	await translate(word, dropdown.value);
	await NeverShowUndefined(6);
	console.error('Error fetching data:', error);
}

  });
  
  dropdown.addEventListener("change", (evt) => {
		  translate(pword.innerText, evt.target.value);
  });
  
  
  const updateAllElements = (word, pos, definition, example, synonyms, antonyms, audioText, newAudioLink) => {
	pword.innerText = word.toLowerCase();
	ppos.innerText = pos;
	pdefinition.innerText = definition;
	pexample.innerText = example;
	psynonyms.innerText = synonyms;
	pantonyms.innerText = antonyms;
	audio.src = newAudioLink;
	paudioText.innerHTML = audioText;
	
	if(paudioText.innerHTML === "" || paudioText.innerHTML == "undefined"){
		paudioText.innerHTML = pword.innerText;
	}
	else{
	paudioText.innerHTML = audioText;
	}
  }
  
  const NeverShowUndefined = (count) => {
	  audiobtnrow.style.display = "";
	  NotDisplayed.style.display = 'none';
	  for(answer of answers){
		  let undefinedRow = answer.parentNode.parentNode;
			undefinedRow.style.display = '';
		if(answer.innerText === "" || answer.innerText == "undefined"){
			
			//let undefinedRow = answer.parentNode.parentNode;
			undefinedRow.style.display = 'none';
			count = count+1;
		}
		if(count >= 6){
			NotDisplayed.style.display = 'block';
		}
	}
  if (audio.src === "" || typeof audio.src === 'undefined' || audio.src.endsWith('be_mine.mp3') || audio.src.endsWith('?') || audio.src.endsWith('/')) {
			audiobtnrow.style.display = "none";
		}

  }
  
  
  /*for(select of dropdown){
	  select.addEventListener("change", (evt) => {
		  console.log('valueChanged');
	//	evt.target;
		//abc=evt;
  });}*/
	
  
  document.addEventListener("DOMContentLoaded", function () {
    var goToTopBtn = document.getElementById("goToTopBtn");

    window.onscroll = function () {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            goToTopBtn.style.display = "block";
        } else {
            goToTopBtn.style.display = "none";
        }
    };

    goToTopBtn.addEventListener("click", function () {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    });
});



const translate = async (word, toLang) => {
let apiUrl = `https://api.mymemory.translated.net/get?q=${word}&langpair=en-GB|${toLang}`;	
	let resTrans = await fetch(apiUrl)
  
  let translation = await resTrans.json();
  ptranslated.innerText = translation.responseData.translatedText;

}

