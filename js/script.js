// Variables y arrays
const planes = ["Principiante", "Intermedio", "Avanzado"];
let nombre, edad, objetivo;

// Función para pedir datos
function pedirDatos() {
    nombre = prompt("Ingresa tu nombre:");
    edad = parseInt(prompt("Ingresa tu edad:"));
    objetivo = prompt("¿Cuál es tu objetivo? (Fuerza / Resistencia / Pérdida de peso)").toLowerCase();
    console.log("Datos ingresados:", nombre, edad, objetivo);
}

// Función para asignar plan
function asignarPlan() {
    let plan;
    if (edad < 18) {
        plan = planes[0];
    } else if (edad <= 40) {
        plan = planes[1];
    } else {
        plan = planes[2];
    }
    alert(`Hola ${nombre}, tu plan asignado es: ${plan}`);
    return plan;
}

// Función para mostrar ejercicios de la semana
function mostrarRutina(plan) {
    const ejercicios = ["Sentadillas", "Flexiones", "Abdominales", "Cardio"];
    console.log(`Rutina para el plan ${plan}:`);
    for (let i = 0; i < ejercicios.length; i++) {
        console.log(`Día ${i + 1}: ${ejercicios[i]}`);
    }
    alert("Revisa la consola para ver tu rutina semanal.");
}

// Flujo principal
if (confirm("¿Quieres comenzar el simulador de gimnasio?")) {
    pedirDatos();
    const plan = asignarPlan();
    mostrarRutina(plan);
    alert("¡Gracias por usar el simulador!");
} else {
    alert("Has cancelado el simulador.");
}
