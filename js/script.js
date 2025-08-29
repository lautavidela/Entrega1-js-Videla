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

// Función para mostrar la rutina de un usuario
function mostrarRutina(usuario) {
    let rutinaHTML = `<h2>Rutina de ${usuario.nombre} (${usuario.plan})</h2>`;
    rutinas[usuario.plan].forEach((dia, i) => {
        rutinaHTML += `<p><b>Día ${i + 1}</b>: ${dia.grupo} → ${dia.ejercicios}</p>`;
    });
    resultado.innerHTML = rutinaHTML;
}

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

    // Validar plan
    const planes = ["Principiante", "Intermedio", "Avanzado"];
    if (opcion < 1 || opcion > 3) {
        resultado.innerHTML = "<p style='color:red;'>Seleccione un plan válido.</p>";
        return;
    }
    const plan = planes[opcion - 1];

// Crear usuario
const usuario = new Usuario(nombre, edad, objetivo, plan);

// Guardar en localStorage
let usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];

let existe = false;
for (let i = 0; i < usuariosGuardados.length; i++) {
    if (
        usuariosGuardados[i].nombre === usuario.nombre &&
        usuariosGuardados[i].edad === usuario.edad &&
        usuariosGuardados[i].objetivo === usuario.objetivo &&
        usuariosGuardados[i].plan === usuario.plan
    ) {
        existe = true;
        break;
    }
}

if (!existe) {
    usuariosGuardados.push(usuario);
    localStorage.setItem("usuarios", JSON.stringify(usuariosGuardados));
}


mostrarRutina(usuario);
});