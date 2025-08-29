// Constructor para crear un Usuario
function Usuario(nombre, edad, objetivo, plan) {
    this.nombre = nombre;
    this.edad = edad;
    this.objetivo = objetivo;
    this.plan = plan;
}

// Rutinas predefinidas
const rutinas = {
    "Principiante": [
        { grupo: "Tren Superior", ejercicios: "Flexiones | Press hombros | Remo bandas" },
        { grupo: "Tren Inferior", ejercicios: "Sentadillas | Zancadas | Puente glúteos" }
    ],
    "Intermedio": [
        { grupo: "Pecho/Tríceps/Hombro", ejercicios: "Flexiones | Banco plano | Mancuernas" },
        { grupo: "Piernas", ejercicios: "Sentadillas | Peso muerto | Prensa" },
        { grupo: "Espalda/Bíceps", ejercicios: "Dominadas | Remo barra | Curl bíceps" }
    ],
    "Avanzado": [
        { grupo: "Pecho", ejercicios: "Press inclinado | Aperturas | Fondos" },
        { grupo: "Espalda", ejercicios: "Dominadas | Remo máquina | Pullover" },
        { grupo: "Piernas", ejercicios: "Sentadillas | Peso muerto | Zancadas búlgaras" },
        { grupo: "Brazos", ejercicios: "Curl bíceps | Extensión tríceps | Martillo" },
        { grupo: "Hombros", ejercicios: "Press militar | Elevaciones laterales | Pájaro" },
        { grupo: "Cardio", ejercicios: "Cinta correr | Bicicleta | HIIT" }
    ]
};

// Capturamos el formulario
const formulario = document.getElementById("formulario");
const resultado = document.getElementById("resultado");

// Evento submit
formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    // Obtenemos valores
    const nombre = document.getElementById("nombre").value;
    const edad = parseInt(document.getElementById("edad").value);
    const objetivo = document.getElementById("objetivo").value;
    const opcion = parseInt(document.getElementById("opcion").value);

    // Validación de edad
    if (isNaN(edad) || edad <= 0) {
        resultado.innerHTML = "<p style='color:red;'>Por favor, ingrese una edad válida.</p>";
        return;
    }


    // Asignamos plan según opción
    const planes = ["Principiante", "Intermedio", "Avanzado"];
    const plan = planes[opcion - 1];

    // Creamos el usuario y lo guardamos en localStorage
    const usuario = new Usuario(nombre, edad, objetivo, plan);
    localStorage.setItem("usuario", JSON.stringify(usuario));

    // Mostramos resultados en el DOM
    mostrarRutina(usuario);
});

// Función para mostrar la rutina
function mostrarRutina(usuario) {
    let rutinaHTML = `<h2>Rutina de ${usuario.nombre} (${usuario.plan})</h2>`;
    rutinas[usuario.plan].forEach((dia, index) => {
        rutinaHTML += `<p><b>Día ${index + 1}</b>: ${dia.grupo} → ${dia.ejercicios}</p>`;
    });
    resultado.innerHTML = rutinaHTML;
}

// Si ya existe usuario en LocalStorage, mostrarlo al cargar
window.addEventListener("load", () => {
    const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));
    if (usuarioGuardado) {
        mostrarRutina(usuarioGuardado);
    }
});