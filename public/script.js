function generateTranscript() {
    const videoUrl = document.getElementById("videoUrl").value;
    //document.getElementById("loadingMessage").style.display = "block";
    const loadingMessage = document.getElementById("loadingMessage");
    const transcriptionOutput = document.getElementById("transcriptionOutput");

    // Validar si el campo de entrada está vacío
    if (!videoUrl.trim()) {
        transcriptionOutput.classList.add("error"); // Aplica estilo de error
        transcriptionOutput.innerText = "Error: Por favor, ingrese una URL de video.";
        return; // Detener la ejecución si el campo está vacío
    }

    loadingMessage.style.display = "block";
    transcriptionOutput.innerText = ""; // Limpia cualquier texto previo
    // Simula una tarea asincrónica y oculta el mensaje después de unos segundos (opcional)
    /* setTimeout(() => {
        loadingMessage.style.display = "none";
    }, 3000); // Ocultar después de 3 segundos */

    // Enviar la URL al servidor
    fetch('/transcribe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: videoUrl })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("loadingMessage").style.display = "none";
        //const output = document.getElementById("transcriptionOutput");
        //output.innerText = `Transcripción: ${data.transcript}`;
        if (data.transcript) {
            transcriptionOutput.classList.remove("error"); // Elimina estilo de error si existía
            //transcriptionOutput.innerText = `Transcripción: ${data.transcript}`;
            //Llamado a segun da api para generacion de cuestionario
            const transcriptText = data.transcript;
            console.log(JSON.stringify({
                content: `${transcriptText} Según el texto que tienes anteriormente puedes generarme las preguntas y las opciones de respuestas de manera ordenada Por favor.`
            }));
            fetch('/generate-questions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    content: `${transcriptText} Según el texto que tienes anteriormente puedes generarme las preguntas y las opciones de respuestas de manera ordenada Por favor.`
                })
            })
            .then(response => {
                console.log(response);
                if (!response.ok) {
                    
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log(data); // Aquí puedes manejar la respuesta del backend con las preguntas generadas
                transcriptionOutput.innerText = data.texto;
            })
            .catch(error => {
                console.error("Error:", error);
                document.getElementById("loadingMessage").style.display = "none";
                transcriptionOutput.classList.add("error"); // Aplica estilo de error
                transcriptionOutput.innerText = "Error: " + error.message;
            });

        } else {
            transcriptionOutput.classList.add("error"); // Aplica estilo de error en caso de fallo
            transcriptionOutput.innerText = "Error: " + data.error;
        }
    })
    .catch(error => {
        console.error("Error:", error);
        document.getElementById("loadingMessage").style.display = "none";
        transcriptionOutput.classList.add("error"); // Aplica estilo de error
        transcriptionOutput.innerText = "Error: " + error.message;
    });
}