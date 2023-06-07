export default function validation(dogData) {
  const errors = {};

  if (!dogData.image) {
    errors.image = 'El campo de imagen es obligatorio';
  } else {
    const trimmedImage = dogData.image.trim();
    if (!isValidUrl(trimmedImage) && !isValidBlobUrl(trimmedImage)) {
      errors.image = 'El campo de imagen debe ser una URL o enlace válido';
    }
  }

  if (!dogData.name) {
    errors.name = 'El campo de nombre es obligatorio';
  } else {
    const trimmedName = dogData.name.trim().replace(/\s+/g, ' ');
    if (!isValidName(trimmedName)) {
      errors.name = 'El campo de nombre solo puede contener letras y no puede exceder los 50 caracteres';
    }
  }

  if (!dogData.height) {
    errors.height = 'El campo de altura es obligatorio';
  } else {
    const trimmedHeight = dogData.height.trim().replace(/\s+/g, ' ');
    if (!isValidHeight(trimmedHeight)) {
      errors.height = 'El campo de altura debe tener el formato adecuado (por ejemplo, "X - X" o "XX - XX")';
    }
  }

  if (!dogData.weight) {
    errors.weight = 'El campo de peso es obligatorio';
  } else {
    const trimmedWeight = dogData.weight.trim().replace(/\s+/g, ' ');
    if (!isValidWeight(trimmedWeight)) {
      errors.weight = 'El campo de peso debe tener el formato adecuado (por ejemplo, "X - X" o "XX - XX")';
    }
  }

  if (!dogData.life_span) {
    errors.life_span = 'El campo de esperanza de vida es obligatorio';
  } else {
    const trimmedLifeSpan = dogData.life_span.trim().replace(/\s+/g, ' ');
    if (!isValidLifeSpan(trimmedLifeSpan)) {
      errors.life_span = 'El campo de esperanza de vida debe tener el formato adecuado (por ejemplo, "X - X" o "XX - XX")';
    }
  }

  if (!dogData.temperaments || dogData.temperaments.length === 0) {
    errors.temperaments = 'El campo de temperamentos es obligatorio';
  }

  return errors;
}

  
  function isValidUrl(url) {
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlRegex.test(url);
  }

  function isValidBlobUrl(url) {
    const blobUrlRegex = /^blob:https?:\/\/[^ "]+$/;
    return blobUrlRegex.test(url);
  }
  
  
  function isValidName(name) {
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]{1}[a-zA-ZáéíóúÁÉÍÓÚñÑ ]{0,48}[a-zA-ZáéíóúÁÉÍÓÚñÑ]{1}$/;
    return nameRegex.test(name);
  }
  
  function isValidHeight(height) {
    const heightRegex = /^\d{1,2}\s?-\s?\d{1,2}$/;
    return heightRegex.test(height);
  }
  
  function isValidWeight(weight) {
    const weightRegex = /^\d{1,2}\s?-\s?\d{1,2}$/;
    return weightRegex.test(weight);
  }
  
  function isValidLifeSpan(lifeSpan) {
    const lifeSpanRegex = /^\d{1,2}\s?-\s?\d{1,2}$/;
    return lifeSpanRegex.test(lifeSpan);
  }

  