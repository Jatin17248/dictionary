let pdefinition = document.querySelector('.definition');
let pexample = document.querySelector('.example');
let psynonyms = document.querySelector('.synonyms');
let pantonyms = document.querySelector('.antonyms');
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
/*  // Example of dynamically changing the source (you can call this with your API endpoint)
  function changeSource(newSource) {
    audio.src = newSource;
    audio.load(); // Load the new source
    audio.play(); // Play the audio
  }
*/
sbmt.addEventListener('click', async (evt) =>{
	evt.preventDefault();
	let wrd = document.querySelector('#wrd');
	//console.log(wrd.value);
	let word = wrd.value;
	if (word === '' || word <= 0){
		word = 'development';
		
	}
	
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
	
	window.scrollTo({
  top: window.innerHeight,  // 100vh
  behavior: 'smooth'        // Smooth scrolling
});
//	msg1.innerText = `From ${data1[fromCur.value.toLowerCase()]} To ${data1[toCur.value.toLowerCase()]} \n As On ${AsPer}`;
	//msg.innerText = `${amount} ${fromCur.value} = ${amount*rate} ${toCur.value}`; */
	
	
	

try {
  let response = await fetch(URL)
  
  let data = await response.json();

  let definition = data[0].meanings[0].definitions[0].definition;
   let pos = data[0].meanings[0].partOfSpeech;
  let example = data[0].meanings[0].definitions[0].example;
  let synonyms = data[0].meanings[0].definitions[0].synonyms;
  let antonyms = data[0].meanings[0].definitions[0].antonyms;
  let newAudioLink = data[0].phonetics[0].audio;	//.meanings[0].definitions[0].antonyms;
  let audioText = data[0].phonetics[0].text;

  await updateAllElements(word, pos, definition, example, synonyms, antonyms, audioText, newAudioLink);
  let count = 0;
  await NeverShowUndefined(count);
  
} catch (error) {
	pword.innerText = word.toLowerCase();
	await NeverShowUndefined(6);
	console.error('Error fetching data:', error);
}

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
  
  /*
  for( select of dropdowns){
	  select.addEventListener("change", (evt) => {
		flagChange(evt.target);
	});
	for(code in countryList ) {
	
	let newOption = document.createElement("option");
	newOption.innerText = code;
	newOption.value = code;
	select.append(newOption);
	if(select.name === "from" && code === "INR"){
		newOption.selected = "selected";
	}
	if(select.name === "to" && code === "RUB"){
		newOption.selected = "selected";
	}
	
	}
  }*/
  
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