(function($){

    var $recordButton = $('#main-record-button');
   // var $resultText = $('#result-text');
    var transcript;
    var interimResult = '';
    var textArea = $('#result-text');
    var textAreaID = 'result-text';

    if('webkitSpeechRecognition' in window )
    {
        var recognition = new webkitSpeechRecognition();
        recognition.lang = 'en-US';
        recognition.continuous = true;
        recognition.interimResults = true;
        
        $recordButton.on("click", function (e) {
            if($(this).hasClass('stopped')){
                console.log("started!");
                recognition.start();
                textArea.focus();
                $recordButton.addClass('pulse');
                $recordButton.addClass('red');
                $recordButton.addClass('darken-1');
                $(this).removeClass('stopped');
            }else{
                console.log("stopped!");
                recognition.stop();
                $recordButton.removeClass('pulse');
                $recordButton.removeClass('red');
                $recordButton.removeClass('darken-1');
                $(this).addClass('stopped');
            }

        })

        recognition.onresult = function (event) {
            var pos = textArea.getCursorPosition() - interimResult.length;
            textArea.val(textArea.val().replace(interimResult, ''));
            interimResult = '';
            textArea.setCursorPosition(pos + '');
            for (var i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    insertAtCaret(textAreaID, event.results[i][0].transcript);
                    transcript = event.results[i][0].transcript;
                } else {
                    isFinished = false;
                    insertAtCaret(textAreaID, event.results[i][0].transcript + '\u200B');
                    interimResult += event.results[i][0].transcript + '\u200B';
                    transcript = interimResult;
                }
            }
        };
        /*recognition.onresult = function (event) {
            $resultText.text('');
            for(var i = event.resultIndex; i < event.results.length; ++i)
            {
                //recognition.stop()
                transcript = event.results[i][0].transcript;
                $resultText.text($resultText.text() + transcript);

            }

        }*/
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

