// Variables y arrays
const planes = ["Principiante", "Intermedio", "Avanzado"];
let nombre, edad, objetivo, opcion, plan;


// Función para pedir datos
function pedir_datos() {
    nombre = prompt("Ingresa tu nombre:");
    edad = parseInt(prompt("Ingresa tu edad:"));

    // Validación para la edad
    while (isNaN(edad) || edad <= 0) {
        alert("Por favor, ingresa una edad válida.");
        edad = parseInt(prompt("Ingresa tu edad:"));
    }

    objetivo = prompt("¿Cuál es tu objetivo?: ");
    opcion = parseInt(prompt("Elige tu plan:\n1 - Principiante\n2 - Intermedio\n3 - Avanzado"));
    console.log(`Información del cliente: Nombre: ${nombre}, Edad: ${edad}, Objetivo: ${objetivo}`);

}


// Función para asignar un plan de entrenamiento
function asignar_plan() {
    let opcionValida = false;

    do {
        if (opcion === 1) {
            plan = planes[0];
            opcionValida = true;
        } else if (opcion === 2) {
            plan = planes[1];
            opcionValida = true;
        } else if (opcion === 3) {
            plan = planes[2];
            opcionValida = true;
        } else {
            alert("Opción inválida. Intenta de nuevo.");
            opcion = parseInt(prompt("Elige tu plan:\n1 - Principiante\n2 - Intermedio\n3 - Avanzado"));
        }
    } while (!opcionValida);

    alert(`Hola ${nombre}, tu plan elegido es: ${plan}`);
    return true;
}


// Función para mostrar ejercicios de la semana
function mostrar_rutina() {
    let ejercicios = [];
    let grupos_musculares = [];
    let dias = 0;

    if (plan === "Principiante") {
        grupos_musculares = ["Tren Superior", "Tren Inferior"];
        ejercicios = [
            "Flexiones | Press de hombros | Remo con bandas",
            "Sentadillas | Zancadas | Puente de glúteos"
        ];
        dias = 2;

    } else if (plan === "Intermedio") {
        grupos_musculares = ["Pecho/Tríceps/Hombro", "Piernas", "Espalda/Bíceps"];
        ejercicios = [
            "Flexiones | Banco plano con mancuernas | Banco plano con barra",
            "Sentadillas | Peso muerto | Prensa de piernas",
            "Dominadas | Remo con barra | Curl bíceps"
        ];
        dias = 3;

    } else if (plan === "Avanzado") {
        grupos_musculares = ["Pecho", "Espalda", "Piernas", "Brazos", "Hombros", "Cardio"];
        ejercicios = [
            "Press banca inclinado | Aperturas | Fondos",
            "Dominadas | Remo en máquina | Pullover",
            "Sentadillas | Peso muerto | Zancadas búlgaras",
            "Curl bíceps | Extensiones tríceps | Martillo",
            "Press militar | Elevaciones laterales | Pájaro",
            "Cinta de correr | Bicicleta | HIIT"
        ];
        dias = 6;
    }

    console.log(`Rutina para el plan ${plan}:`);
    for (let i = 0; i < dias; i++) {
        console.log(`Día ${i + 1}: Grupo muscular: ${grupos_musculares[i]} | Ejercicios: ${ejercicios[i]}`);
    }

    alert(`Tu plan ${plan} es de ${dias} días por semana. Revisa la consola para ver la rutina completa.`);
}

// Código principal
if (confirm("¿Quieres comenzar el simulador de gimnasio?")) {
    pedir_datos();
    if (asignar_plan()) {
        mostrar_rutina();
        alert("¡Gracias por usar el simulador!");
    }
} else {
    alert("Has cancelado el simulador.");
}