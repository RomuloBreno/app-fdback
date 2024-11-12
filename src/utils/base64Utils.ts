
export function isBase64(str:string) {
    if (typeof str !== 'string') {
        return false;
    }
  
    // Verifica se a string está vazia ou tem um comprimento múltiplo de 4
    if (str.length === 0 || str.length % 4 !== 0) {
        return false;
    }
  
    // Expressão regular para validar o formato Base64
    const base64Regex = /^[A-Za-z0-9+/]+={0,2}$/;
    return base64Regex.test(str);
  }