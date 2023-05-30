async function createProductInventory(url, datos) {
  try {
    const respuesta = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    });

    if (!respuesta.ok) {
      throw new Error("Error en la petición POST");
    }

    const respuestaJson = await respuesta.json();
    return respuestaJson;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

module.exports = {
  createProductInventory,
};
