export function getStats(stat: string): string {
  switch (stat) {
    case "hp":
      return "HP";
    case "attack":
      return "Atk";
    case "defense":
      return "Def";
    case "special-attack":
      return "SP Atk";
    case "special-defense":
      return "SP Def";
    case "speed":
      return "Speed";
    default:
      return "str";
  }
}
