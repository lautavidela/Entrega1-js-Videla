
function Usuario(nombre, edad, objetivo) {
    this.nombre = nombre;
    this.edad = edad;
    this.objetivo = objetivo;
}

async function obtenerEjerciciosAPI(objetivo) {

    const apiKey = "/ZwOhp760q1svSmExYPIFw==SOn16RgcMMldnhMr";
    const url = `https://api.api-ninjas.com/v1/exercises?muscle=${encodeURIComponent(
        objetivo
    )}`;

    const res = await fetch(url, {
        headers: { "X-Api-Key": apiKey },
    });
    if (!res.ok) throw new Error("Error API " + res.status);
    return await res.json();
}

function mostrarRutina(usuario, ejercicios) {
    const resultado = document.getElementById("resultado");

    let html = `<h2>Rutina para ${usuario.nombre}</h2>`;
    html += `<p>Objetivo: ${usuario.objetivo}</p><ul>`;


    const cantidadFija = 5;

    ejercicios.slice(0, cantidadFija).forEach((ej, i) => {
        html += `<li><b>${i + 1
            }.</b> ${ej.name} — ${ej.muscle} (${ej.difficulty})</li>`;
    });

    html += `</ul>`;
    resultado.innerHTML = html;
}

document.getElementById("formulario").addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const edad = parseInt(document.getElementById("edad").value.trim());
    const objetivo = document.getElementById("objetivo").value.trim();

    if (!nombre) {
        Swal.fire("Error", "Ingresa tu nombre", "error");
        return;
    }
    if (isNaN(edad) || edad <= 0) {
        Swal.fire("Error", "Edad inválida", "error");
        return;
    }
    if (!objetivo) {
        Swal.fire("Error", "Ingresa un objetivo/músculo", "error");
        return;
    }

    const usuario = new Usuario(nombre, edad, objetivo);

    // Guardar en localStorage
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios.push(usuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    try {
        const ejercicios = await obtenerEjerciciosAPI(objetivo);
        if (ejercicios.length === 0) {
            Swal.fire({
                title: 'Músculo no encontrado',
                text: `No se encontraron ejercicios para "${objetivo}". Recuerda que la búsqueda debe ser en inglés (Ej: chest, biceps, glutes).`,
                icon: 'warning' // Un ícono de advertencia es ideal aquí
            });
            return;
        }
        const cantidadFija = 5;

        Swal.fire({
            title: "¡Rutina generada!",
            html: `<p>Hola ${nombre}, aquí tienes algunos ejercicios:</p>
    <ul>${ejercicios
                    .slice(0, cantidadFija)
                    .map((e) => `<li>${e.name}</li>`)
                    .join("")}</ul>`,
            icon: "success",
        });

        mostrarRutina(usuario, ejercicios);
    } catch (err) {
        Swal.fire("Error", "No se pudo obtener la rutina de la API", "error");
        console.error(err);
    }
});

window.addEventListener("DOMContentLoaded", () => {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    if (usuarios.length > 0) {
        const ultimo = usuarios[usuarios.length - 1];
        document.getElementById(
            "resultado"
        ).innerHTML = `<p>Último usuario guardado: ${ultimo.nombre}, objetivo: ${ultimo.objetivo}</p>`;
    }
});