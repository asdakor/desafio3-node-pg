let url = "/cancion";
let tbody = document.getElementById("cuerpo");
let cancion = document.getElementById("cancion");
let artista = document.getElementById("artista");
let tono = document.getElementById("tono");

let canciones = [];

window.onload = () => {
    getData();
};

async function getData() {
    try {
        const response = await axios.get(url + "es");
        canciones = response.data;
        tbody.innerHTML = "";
        console.log(canciones);
        canciones.forEach((c, i) => {
            tbody.innerHTML += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${c.titulo}</td>
                    <td>${c.artista}</td>
                    <td>${c.tono}</td>
                    <td>
                        <button class="btn btn-warning" onclick="prepararCancion(${i}, '${c.id}')">Editar</button>
                        <button class="btn btn-danger" onclick="eliminarCancion(${i}, '${c.id}')">Eliminar</button>
                    </td>
                </tr>
            `;
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }

    // Clear the input fields
    cancion.value = "";
    artista.value = "";
    tono.value = "";
}

async function nuevaCancion() {
    let data = {
        titulo: cancion.value,
        artista: artista.value,
        tono: tono.value,
    };
    console.log(data);

    try {
        await axios.post(url, data);
        getData(); // Refresh the data after a successful post
    } catch (error) {
        console.error("Error adding new song:", error);
    }

    // Clear the input fields
    cancion.value = "";
    artista.value = "";
    tono.value = "";
}

async function eliminarCancion(index, id) {
    try {
        const response = await axios.delete(`${url}/${id}`);
        console.log(response);
        alert(`Canción ${canciones[index].titulo} eliminada`);
        getData(); // Refresh the data after a successful delete
    } catch (error) {
        console.error("Error deleting song:", error);
        alert("Ocurrió un error al eliminar la canción. Por favor, inténtelo de nuevo.");
    }
}

function prepararCancion(i, id) {
    cancion.value = canciones[i].titulo;
    artista.value = canciones[i].artista;
    tono.value = canciones[i].tono;
    document
        .getElementById("editar")
        .setAttribute("onclick", `editarCancion('${id}')`);
    document.getElementById("agregar").style.display = "none";
    document.getElementById("editar").style.display = "block";
}

async function editarCancion(id) {
    let data = {
        titulo: cancion.value,
        artista: artista.value,
        tono: tono.value,
    };

    try {
        await axios.put(`${url}/${id}`, data);
        getData();
        document.getElementById("agregar").style.display = "block";
        document.getElementById("editar").style.display = "none";
    } catch (error) {
        console.error("Error updating song:", error);
        alert("Ocurrió un error al actualizar la canción. Por favor, inténtelo de nuevo.");
    }
}