// sem začni psát svůj program


// nadefinujeme globální proměnné
// ty jsou pak použitelné kdekoliv v programu

let panacek, panacekX, panacekY, panacekSirka, panacekVyska;
let mince, mineX, minceY, minceSirka, minceVyska;
let score, pocetMinci;
let zvukMince, zvukFanfara;
let hrajeHudba = false;   //*TODO proč je tam to false?


// tato funkce se spustí při načtení stránky
// tj. ve chvíli, kdy je načtené komplet HTML, CSS a všechny obrázky a zvuky

function priNacteniStranky() {

	//! do globálních proměnných si uložíme odkaz na objekty panacka, mince, score atd.
	panacek = document.querySelector('#panacek');
	mince = document.querySelector('#mince');
	score = document.querySelector('#score');
	zvukMince = document.querySelector('#zvukmince');
	zvukFanfara = document.querySelector('#zvukfanfara');


	//! zjistíme šířku a výšku panáčka
	panacekSirka = panacek.width;
	panacekVyska = panacek.height;
	console.log(panacekSirka, panacekVyska)

	//! a umístíme panáčka do středu okna
	
	panacekX = Math.round(window.innerWidth / 2 - panacekSirka / 2);
	panacekY = Math.round(window.innerHeight / 2 - panacekVyska / 2);
	console.log(panacekX, panacekY)

	//panacek.style.left = "50%";
	//panacek.style.top = "50%";

	//! umístíme panáčka na startovní pozici  
	
	umistiPanacka()


	//! zjistíme šířku a výšku mince

	minceSirka = mince.width;
	minceVyska = mince.height;
	console.log(minceSirka, minceVyska)

	//! a vygenerujeme první minci na náhodné pozici
	novaMince();

	//Načtení skore
	pocetMinci = 0
		
}

	//! funkce, která umístí panáčka na jeho souřadnice
	// tj. nastaví jeho style.left a style.top na hodnoty panacekX, panacekY
	function umistiPanacka() {
		panacek.style.left = panacekX + 'px';
		panacek.style.top = panacekY + 'px';
	}

	//! funkce pro nahodné vygenerování nové pozice mince
	// a umístění mince na tyto souřadnice
	function novaMince() {
		minceX = Math.round(Math.random() * (window.innerWidth - minceSirka));
		minceY = Math.round(Math.random() * (window.innerHeight - minceVyska));
		mince.style.left = minceX + 'px';
		mince.style.top = minceY + 'px';
	}


//! tato funkce se zavolá při stisku klávesy
// do proměnné "udalost" se vloží objekt s parametry události¨
// kde lze najít např. i vlastnost "key",
// která obsahuje znak stisknuté klávesy
function priStisknutiKlavesy(udalost) {

	if(!hrajeHudba){  //*TODO zeptat se proč to tak je
		document.querySelector('#hudba').play();
		console.log('Zapínám hudbu...');
		hrajeHudba = true;
	}

	//let moveBy = 5;

	// šipka vlevo
	if (udalost.keyCode === 37) {
		//panacek.style.left = parseInt(panacek.style.left) - moveBy + 'px';
		panacekX = panacekX - 10;
		if (panacekX < 0) {
			panacekX = 0
		}

		panacek.src = 'obrazky/panacek-vlevo.png'
	}

	// šipka vpravo
	if (udalost.keyCode === 39) {
		//panacek.style.left = parseInt(panacek.style.left) + moveBy + 'px';
		panacekX = panacekX + 10;
		if (panacekX + panacekSirka > window.innerWidth){
			panacekX = window.innerWidth - panacekSirka;
		}

		panacek.src = 'obrazky/panacek-vpravo.png';
	}

	// šipka nahoru
	if(udalost.keyCode === 38) {
		//panacek.style.top = parseInt(panacek.style.top) - moveBy + 'px';
		panacekY = panacekY - 10;
		if (panacekY < 0){
			panacekY = 0
		}
		

		panacek.src = 'obrazky/panacek-nahoru.png';
	}

	// šipka dolů
	if(udalost.keyCode === 40) {
		//panacek.style.top = parseInt(panacek.style.top) + moveBy + 'px';
		panacekY = panacekY + 10;
		if(panacekY + panacekVyska > window.innerHeight){
			panacekY = window.innerHeight - panacekVyska;
		}
	
		panacek.src = 'obrazky/panacek.png';
	}

	// panáčka umistíme na nově vypočítanou pozici
	umistiPanacka()           //*TODO proč je to takto zvlášt? 

	// otestujeme kolizi panáčka s mincí
	otestujKolizi()           //*TODO proč je to takto zvlášt? 

}

//! fuknce pro otestování kolize panáčka s mincí
function otestujKolizi() {
	if (!( panacekX + panacekSirka < minceX || minceX + minceSirka < panacekX || panacekY + panacekVyska < minceY || minceY + minceVyska < panacekY)) {
		// panacek a mince se prekryvaji
		 //*TODO proč je tam vykřičník? 
		novaMince();

		document.querySelector('#zvukmince').play();
		console.log('Popadl jsem minci...')
		zvukMince = true;

		score = document.querySelector('#score');
		pocetMinci = pocetMinci + 1;
		score.innerHTML = pocetMinci;
		console.log('Skóre je:' + pocetMinci);
	}

	if(pocetMinci === 5){
		document.querySelector('#zvukfanfara').play();
		console.log('Fanfara...');
		pocetMinci = true;

		alert('Gartulace, vyhrál jsi!!!')
	

	}

	
}

