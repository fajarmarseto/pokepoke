export function getTypeColor(type: string): string {
  switch (type) {
    case "fighting":
      return "#F3950D";
    case "flying":
      return "#66806A";
    case "poison":
      return "#753188";
    case "ground":
      return "#E59934";
    case "rock":
      return "#B05E27";
    case "bug":
      return "#1F441E";
    case "ghost":
      return "#B4C6A6";
    case "steel":
      return "#CEE5D0";
    case "fire":
      return "#FF0000";
    case "water":
      return "#00C1D4";
    case "grass":
      return "#81B214";
    case "electric":
      return "#FFCC29";
    case "psychic":
      return "#150E56";
    case "ice":
      return "#9DDFD3";
    case "dragon":
      return "#E6DD3B";
    case "dark":
      return "#1B2021";
    case "fairy":
      return "#FF7171";
    case "shadow":
      return "#C8C6A7";
    default:
      return "#99A799";
  }
}
