(function($){

    var $recordButton = $('#main-record-button');
    var $resultText = $('#result-text');
    var transcript;
    if('webkitSpeechRecognition' in window )
    {
        var recognition = new webkitSpeechRecognition();
        recognition.lang = 'en-US';
        recognition.continuous = false;
        recognition.interimResults = true;
        
        $recordButton.on("click", function (e) {
            recognition.start();
            $recordButton.addClass('pulse')
            $recordButton.addClass('red');
            $recordButton.addClass('darken-1');
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

})(jQuery);