(function($){

    var $recordButton = $('#main-record-button');
    var $resultText = $('#result-text');
    var transcript;
    if('webkitSpeechRecognition' in window )
    {
        var recognition = new webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        
        $recordButton.on("click", function (e) {
            if($(this).hasClass('stopped')){
                console.log("started!");
                var language = $( "#inputlang" ).val();
                recognition.lang = language;
                console.log(language);

                recognition.start();
                $recordButton.addClass('pulse');
                $recordButton.removeClass('cyan');
                $recordButton.addClass('red');
                $recordButton.addClass('darken-1');
                $(this).removeClass('stopped');
            }else{
                console.log("stopped!");
                recognition.stop();
                $recordButton.removeClass('pulse');
                $recordButton.removeClass('red');
                $recordButton.addClass('cyan');
                $recordButton.removeClass('darken-1');
                $(this).addClass('stopped');
            }

        })
        
        recognition.onresult = function (event) {
            $resultText.text('');
            for(var i = event.resultIndex; i < event.results.length; i++)
            {
                //recognition.stop();
                transcript = event.results[i][0].transcript;
                $resultText.text($resultText.text() + transcript);

            }


        }
        recognition.onend = function (event) {
            $recordButton.removeClass('pulse');
            $recordButton.removeClass('red');
            $recordButton.removeClass('darken-1');
            var msg = new SpeechSynthesisUtterance(transcript);
            //msg.lang = 'en-US';
            speechSynthesis.speak(msg);
        }

    }
    else
    {
        $recordButton.hide();
    }

    $(document).ready(function(){
        $('#inputlang').formSelect();
        $('#outputlang').formSelect();
    });

})(jQuery);