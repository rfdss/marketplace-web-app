export const isRequired = value => (value ? undefined : '* campo obrigatório');

export const isEmail = (value) => {
  if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return 'E-mail inválido';
  }

  return undefined;
};

export const min8 = value => minLength(value, 8);

export const checkPassword = (value, allValues) => {
  const { senha } = allValues;
  // console.log(value, allValues);
  return value !== senha ? 'Senhas não conferem' : undefined;
};

const minLength = (value, min) => {
  if (min > value.length) {
    return `* O campo deve ter pelo menos ${min} caracteres`;
  }

  return undefined;
};

export const checkTime = value => {
  if (!value) return '* campo obrigatório'

  const split = value.split(':')
  const hour = parseInt(split[0])
  const minute = parseInt(split[1])

  if (split[0] != '00' && (hour < 0 || hour > 24)) return '* hora inválida'
  if (split[1] != '00' && (minute < 0 || minute > 59)) return '* minuto inválido'
  
  return undefined
}

export const checkCNPJ = cnpj => {
  cnpj = cnpj.replace(/[^\d]+/g,'');
  if (cnpj == '' || cnpj.length != 14) return 'CNPJ inválido';

  // Elimina CNPJs invalidos conhecidos
  if (cnpj == "00000000000000" || 
    cnpj == "11111111111111" || 
    cnpj == "22222222222222" || 
    cnpj == "33333333333333" || 
    cnpj == "44444444444444" || 
    cnpj == "55555555555555" || 
    cnpj == "66666666666666" || 
    cnpj == "77777777777777" || 
    cnpj == "88888888888888" || 
    cnpj == "99999999999999") return 'CNPJ inválido';
    
  // Valida DVs
  tamanho = cnpj.length - 2
  numeros = cnpj.substring(0,tamanho);
  digitos = cnpj.substring(tamanho);
  soma = 0;
  pos = tamanho - 7;

  for (i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }

  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

  if (resultado != digitos.charAt(0)) return 'CNPJ inválido';

  tamanho = tamanho + 1;
  numeros = cnpj.substring(0,tamanho);
  soma = 0;
  pos = tamanho - 7;

  for (i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }

  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

  if (resultado != digitos.charAt(1)) return 'CNPJ inválido';

  return undefined;
}