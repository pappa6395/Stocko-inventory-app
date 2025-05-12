export function createRoleName(displayTitle: string = ""): string {
    return displayTitle.toLowerCase().replace(/\s+/g, "_");
}
  