import React, { useState, useEffect } from 'react';

const Banner = ({ laboratorio, registros, esHoraDesocupar, getBannerText, onClickLaboratorio }) => {
  const [bannerClase, setBannerClase] = useState('disponible');

  useEffect(() => {
    const usuariosActuales = registros.filter(
      (registro) => registro.laboratorio === laboratorio && !registro.salida
    );

    const nuevaBannerClase =
      usuariosActuales.length === 0
        ? 'disponible'
        : usuariosActuales.some((usuario) => esHoraDesocupar(usuario.entrada))
        ? 'por-desocupar'
        : 'ocupado';

    setBannerClase(nuevaBannerClase);
  }, [laboratorio, registros, esHoraDesocupar]);

  const handleClick = () => {
    onClickLaboratorio(laboratorio);
  };

  return (
    <div className={`banner ${bannerClase}`} onClick={handleClick}>
      <span>{laboratorio}: {getBannerText(bannerClase)}</span>
    </div>
  );
};

export default Banner;