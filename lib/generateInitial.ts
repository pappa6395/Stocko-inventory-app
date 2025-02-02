export function generateInitial(name: string | null | undefined): string {
    if (name) {
      // Split the name by spaces
      const nameParts = name.split(" ");
   
      // Map over the parts and take the first character of each
      const initials = nameParts.map((part) => part.charAt(0).toUpperCase());
   
      // Join the initials together
      return initials.join("");
    } else {
      return "CN";
    }
  }