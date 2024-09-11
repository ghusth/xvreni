    // Definición de la tabla de datos
    const tableData = [
      { phone: "123456789", name: "Juan Pérez", confirmation: "Pendiente" },
      { phone: "987654321", name: "Ana López", confirmation: "Pendiente" },
      { phone: "555555555", name: "María García", confirmation: "Pendiente" },
      { phone: "123456789", name: "Carlos Pérez", confirmation: "Pendiente" },
      { phone: "111222333", name: "Pedro Ramírez", confirmation: "Pendiente" }
    ];

    // Función para buscar el teléfono en la tabla
    function searchPhone(phone) {
      return tableData.filter(entry => entry.phone === phone);
    }

    // Controlador del formulario de búsqueda
    document.getElementById('searchForm').addEventListener('submit', function(event) {
      event.preventDefault(); // Evita el envío del formulario por defecto

      const phoneInput = document.getElementById('phone').value;
      const results = searchPhone(phoneInput);

      const resultsContainer = document.getElementById('results');
      const noResultsMessage = document.getElementById('noResultsMessage');

      resultsContainer.innerHTML = ''; // Limpia los resultados anteriores
      noResultsMessage.style.display = 'none'; // Oculta el mensaje de "no se encontró"

      if (results.length > 0) {
        results.forEach((result, index) => {
          const div = document.createElement('div');
          div.classList.add('confirmation-section');

          div.innerHTML = `
            <h3>Bienvenido, ${result.name}</h3>
            <p>¿Confirma su asistencia?</p>
            <select id="confirmationSelect${index}">
              <option value="Sí asistiré">Sí asistiré</option>
              <option value="No podré asistir">No podré asistir</option>
            </select>
            <input type="button" value="Confirmar" onclick="confirmAttendance(${index}, '${result.phone}')">
          `;

          resultsContainer.appendChild(div);
          div.style.display = 'block'; // Muestra el resultado
        });
      } else {
        noResultsMessage.style.display = 'block'; // Muestra el mensaje de "no se encontró"
      }
    });

    // Función para confirmar la asistencia y actualizar la tabla
    function confirmAttendance(index, phone) {
      const selectedOption = document.getElementById(`confirmationSelect${index}`).value;

      // Busca el índice de la entrada en la tabla y actualiza la confirmación
      const entry = tableData.find(entry => entry.phone === phone);
      if (entry) {
        entry.confirmation = selectedOption;
        alert(`Confirmación registrada: ${selectedOption} para ${entry.name}`);
      }
    }
