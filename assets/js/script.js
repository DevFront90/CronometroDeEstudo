// Pegando os elementos do HTML
let display = document.getElementById('display');
let hours = document.getElementById('hours');
let minutes = document.getElementById('minutes');
let seconds = document.getElementById('seconds');
let start = document.getElementById('start');
let pause= document.getElementById('pause');
let reset = document.getElementById('reset');
let audio = document.getElementById('sound');
//

// Variáveis que irão armazenar os valores escolhidos pelo usuário
var hoursCurrent;
var stopwatchSeg;
var minutesCurrent;
var secondsCurrent;
var interval = null; 
var isPaused = false; // controle de pausa //
//

for(var i = 0; i < 24; i++) {   // Adiciona as opções de 0 a 23 para as horas
    hours.innerHTML += `<option value="${i}">${i}</option>`;
}

for(var i = 0; i < 60; i++) { // Adiciona de 0 a 60 para os minutos
    minutes.innerHTML += `<option value="${i}"> ${i} </option>`;
}

for(var i = 0; i < 60; i++) {  // Adiciona de 0 a 60 para os segundos
    seconds.innerHTML += `<option value="${i}">${i}</option>`;
}

start.addEventListener('click', function() { //botão iniciar //
     
     if(interval) return;  // Evita múltiplos intervalos //


       audio.load();
    audio.play().then( () => {
        audio.pause();
        audio.currentTime = 0;
    }).catch((erro => {

        Swal.fire({
            icon: 'info',
            title: 'Autoplay bloqueado',
            text: 'O navegador bloqueou a reprodução automática. O alarme tocará normalmente no final do cronômetro.',
            confirmButtonColor: '#eb2d2d'
        });
        
    }));

     // Se não estiver pausado, pega os valores dos selects //

     if(!isPaused) {
           // Se for a primeira vez ou foi resetado, pega os valores //
        hoursCurrent = parseInt(hours.value);
        minutesCurrent = parseInt(minutes.value);
        secondsCurrent = parseInt(seconds.value);

        if(hoursCurrent === 0 && minutesCurrent === 0 && secondsCurrent === 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Tempo não definido',
                text: 'Por favor, selecione pelo menos um valor de hora, minuto ou segundo.',
                confirmButtonColor: '#eb2d2d'
            });

            return;
        }
     }

     isPaused = false; // sai do modo pausado //

     interval = setInterval(function() {

         if(secondsCurrent == 0) {

            if(minutesCurrent == 0) {

                if(hoursCurrent == 0) {
                      clearInterval(interval);
                      interval = null;
                      
                      Swal.fire({
                        icon: 'success',
                        title: 'O tempo de estudo acabou!', 
                        text: 'Tempo encerrado!',
                        confirmButtonColor: '#2ecc71'
                     });

                      document.getElementById('sound').play();
                      return;
                } else {
                    hoursCurrent--;
                    minutesCurrent = 59;
                    secondsCurrent = 59;
                }
            }  else {
                 minutesCurrent--;
                 secondsCurrent = 59;
            }
         } else {
             secondsCurrent--;
         }

         const hrs = String(hoursCurrent).padStart(2,'0');
         const min = String(minutesCurrent).padStart(2, '0');
         const sec = String(secondsCurrent).padStart(2, '0');


         display.querySelector('h3').innerHTML = `${hrs}:${min}:${sec}`;
        
     },1000);
});


pause.addEventListener('click',function(){
    if(interval) {
        clearInterval(interval); // Pausa o cronômetro //
        interval = null;
        isPaused = true;
    }
});

reset.addEventListener('click',function() {
    clearInterval(interval) // Pausar o cronômetro //
    interval = null;
    isPaused = false;

    hoursCurrent = 0;
    minutesCurrent = 0; // Reseta os valores para 0 //
    secondsCurrent = 0;

    // Atualizar o display // 

    display.querySelector('h3').innerHTML = `00:00:00`;

    // Zera os selects //

    hours.value = 0;
    minutes.value = 0;
    seconds.value = 0;
    // Parar o alarme se estiver tocando //
    audio.pause();
    audio.currentTime = 0;

    Swal.fire({
        icon: 'question',
        title: 'Bora estudar!',
        text: 'Todos os valores foram zerados.',
        timer: 2000,
        showConfirmButton: false
    });


});










