export function generatePassword(): string {
    const length = 8;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@$!%*?&";
  
    let passwordArray: string[] = [];
    
    // Ensure at least one of each required character type
    passwordArray.push("ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random() * 26)]); // Uppercase
    passwordArray.push("abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 26)]); // Lowercase
    passwordArray.push("0123456789"[Math.floor(Math.random() * 10)]); // Digit
    passwordArray.push("@$!%*?&"[Math.floor(Math.random() * 7)]); // Special character
  
    // Fill the rest with random characters
    while (passwordArray.length < length) {
      passwordArray.push(charset[Math.floor(Math.random() * charset.length)]);
    }
  
    // Shuffle the password to avoid predictable patterns
    passwordArray = passwordArray.sort(() => Math.random() - 0.5);
  
    return passwordArray.join("");
  }