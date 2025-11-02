(() => {
  'use strict';

  let tareas = [
    { id: 16, descripcion: "Hacer mercado", completado: true },
    { id: 60, descripcion: "Estudiar para la prueba", completado: false },
    { id: 24, descripcion: "Sacar a pasear a Tobby", completado: false }
  ];

  const inputTarea = document.getElementById("nuevaTarea");
  const btnAgregar = document.getElementById("btnAgregar");
  const listaTareas = document.getElementById("listaTareas");
  const totalSpan = document.getElementById("total");
  const realizadasSpan = document.getElementById("realizadas");
  const errorEl = document.getElementById("error");

  function showError(msg) {
    if (!errorEl) return;
    errorEl.textContent = msg;
    errorEl.classList.remove('visually-hidden');
  }

  function hideError() {
    if (!errorEl) return;
    errorEl.textContent = '';
    errorEl.classList.add('visually-hidden');
  }

  function renderTareas() {
    listaTareas.innerHTML = "";

    tareas.forEach(t => {
      const tr = document.createElement("tr");

      // ID
      const tdId = document.createElement("td");
      tdId.textContent = t.id;

      // Descripción
      const tdDesc = document.createElement("td");
      tdDesc.textContent = t.descripcion;
      if (t.completado) tdDesc.classList.add("text-tachado");

      // Checkbox
      const tdCheck = document.createElement("td");
      const check = document.createElement("input");
      check.type = "checkbox";
      check.className = "form-check-input";
      check.checked = t.completado;
      check.onchange = () => toggleCompletado(t.id);
      tdCheck.appendChild(check);

      // Botón eliminar
      const tdAcc = document.createElement("td");
      const btn = document.createElement("button");
      btn.className = "btn btn-sm btn-danger";
      btn.textContent = "✖";
      btn.setAttribute('aria-label', `Eliminar tarea: ${t.descripcion}`);
      btn.onclick = () => eliminarTarea(t.id);
      tdAcc.appendChild(btn);

      tr.appendChild(tdId);
      tr.appendChild(tdDesc);
      tr.appendChild(tdCheck);
      tr.appendChild(tdAcc);
      listaTareas.appendChild(tr);
    });

    totalSpan.textContent = tareas.length;
    realizadasSpan.textContent = tareas.filter(t => t.completado).length;
  }

  function handleAgregar() {
    hideError();
    const texto = inputTarea.value.trim();
    if (!texto) {
      showError('Debe ingresar una tarea');
      inputTarea.focus();
      return;
    }

    const nueva = {
      id: Date.now(),
      descripcion: texto,
      completado: false
    };

    tareas.push(nueva);
    inputTarea.value = "";
    renderTareas();
  }

  btnAgregar.addEventListener("click", handleAgregar);

  // Soporte para presionar Enter dentro del input
  inputTarea.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAgregar();
    }
  });

  function eliminarTarea(id) {
    tareas = tareas.filter(t => t.id !== id);
    renderTareas();
  }

  function toggleCompletado(id) {
    const tarea = tareas.find(t => t.id === id);
    if (tarea) tarea.completado = !tarea.completado;
    renderTareas();
  }

  // Render inicial
  renderTareas();

})();
