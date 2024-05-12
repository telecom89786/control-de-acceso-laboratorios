import React, { useState, useEffect } from 'react';
import './App.css';
import Registro from './components/Registro';
import Banner from './components/Banner';

// Datos de ejemplo (reemplazarlos con los datos reales de Arduino)
const laboratorios = ['Lab 1', 'Lab 2', 'Lab 3'];
const registrosAcceso = [];

function App() {
  const [registros, setRegistros] = useState(registrosAcceso);
  const [laboratorioSeleccionado, setLaboratorioSeleccionado] = useState(null);

  useEffect(() => {
    actualizarBanners();
  }, [registros]);

  const agregarRegistro = (data) => {
    setRegistros((prevRegistros) => [...prevRegistros, data]);
  };

  const actualizarBanners = () => {
    // Lógica para actualizar los banners de disponibilidad
  };

  const esHoraDesocupar = (horaEntrada) => {
    // Lógica para determinar si es hora de desocupar un laboratorio
    return false;
  };

  const getBannerText = (bannerClase) => {
    switch (bannerClase) {
      case 'disponible':
        return 'Disponible';
      case 'por-desocupar':
        return 'Por desocupar';
      case 'ocupado':
        return 'Ocupado';
      default:
        return '';
    }
  };

  const procesarDatosJSON = (jsonData) => {
    const data = JSON.parse(jsonData);
    agregarRegistro(data);
  };

  useEffect(() => {
    // Configura un listener para recibir datos JSON desde Arduino
    // Reemplaza 'arduino.send(jsonData)' con el método que uses para enviar datos desde Arduino
    const eventListener = (event) => {
      procesarDatosJSON(event.data);
    };
    window.addEventListener('arduino.send', eventListener);

    return () => {
      window.removeEventListener('arduino.send', eventListener);
    };
  }, []);

  const handleClickLaboratorio = (laboratorio) => {
    setLaboratorioSeleccionado(laboratorio);
  };

  const registrosFiltrados = registros.filter(
    (registro) => registro.laboratorio === laboratorioSeleccionado
  );

  return (
    <div className="App">
      <header className="App-header">
        <h1>Control de Acceso a Laboratorios</h1>
      </header>
      <main>
        {laboratorioSeleccionado && (
          <section>
            <h2>Registros de Acceso para {laboratorioSeleccionado}</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tipo</th>
                  <th>Laboratorio</th>
                  <th>Entrada</th>
                  <th>Salida</th>
                </tr>
              </thead>
              <tbody>
                {registrosFiltrados.map((registro, index) => (
                  <Registro key={index} registro={registro} />
                ))}
              </tbody>
            </table>
          </section>
        )}
        <section>
          <h2>Disponibilidad de Laboratorios</h2>
          <div className="banners">
            {laboratorios.map((lab, index) => (
              <Banner
                key={index}
                laboratorio={lab}
                registros={registros}
                esHoraDesocupar={esHoraDesocupar}
                getBannerText={getBannerText}
                onClickLaboratorio={handleClickLaboratorio}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;