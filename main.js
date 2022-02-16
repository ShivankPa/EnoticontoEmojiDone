prediction1 = "";
prediction2 = "";

Webcam.set ({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 100
});

camera = document.getElementById("camera");
Webcam.attach('#camera');
function takesnap(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'">';
    });
}
console.log('ml5 version',ml5.version)
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/W8at_Vru7/model.json',modelloaded);

function modelloaded(){
    console.log('model is loaded');
}

function speak(){
    var anyname = window.speechSynthesis;
    data1 = "The first prediction is"+prediction1;
    data2 = "The second prediction is"+prediction2;
    var utter = new SpeechSynthesisUtterance(data1+data2);
    anyname.speak(utter);
}

function check(){
    image = document.getElementById("captured_image");
    classifier.classify(image,gotResult);
}

function gotResult(error,results){
    if (error){
        console.error(error)
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        prediction1 = results[0].label;
        prediction2 = results[1].label;
        speak();

        if(results[0].label == "happy"){
            document.getElementById("update_emoji").innerHTML = "&#128512;";
        }
        if(results[0].label == "sad"){
            document.getElementById("update_emoji").innerHTML = "&#128532;";
        }
        if(results[0].label == "angry"){
            document.getElementById("update_emoji").innerHTML = "&#128545;";
        }

        if(results[1].label == "happy"){
            document.getElementById("update_emoji2").innerHTML = "&#128512;";
        }
        if(results[1].label == "sad"){
            document.getElementById("update_emoji2").innerHTML = "&#128532;";
        }
        if(results[1].label == "angry"){
            document.getElementById("update_emoji2").innerHTML = "&#128545;";
        }
    }
}