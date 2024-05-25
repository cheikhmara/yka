export function formatDateToYYYYMMDD(date) {
    if (!(date instanceof Date)) {
      throw new TypeError("The provided value is not a valid Date object");
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export function getNextWednesday(currentDate = new Date()) {
    // Obtenir le jour de la semaine (0 pour dimanche, 1 pour lundi, ..., 6 pour samedi)
    const dayOfWeek = currentDate.getDay();
    // Calculer le nombre de jours jusqu'au prochain mercredi
    const daysUntilNextWednesday = (3 - dayOfWeek + 7) % 7;
    // Si aujourd'hui est déjà mercredi, nous devons ajouter 7 jours pour obtenir le prochain mercredi
    const daysToAdd = daysUntilNextWednesday === 0 ? 7 : daysUntilNextWednesday;
    // Créer la date du prochain mercredi
    const nextWednesday = new Date(currentDate);
    nextWednesday.setDate(currentDate.getDate() + daysToAdd);
    return nextWednesday;
}

export function getLastThursday(fromDate) {
    // Obtenir le jour de la semaine de la date donnée
    const dayOfWeek = fromDate.getDay();
    // Calculer le nombre de jours jusqu'au dernier jeudi
    const daysSinceLastThursday = (dayOfWeek - 4 + 7) % 7;
    // Si aujourd'hui est déjà jeudi, nous devons soustraire 7 jours pour obtenir le dernier jeudi
    const daysToSubtract = daysSinceLastThursday === 0 ? 7 : daysSinceLastThursday;
    // Créer la date du dernier jeudi
    const lastThursday = new Date(fromDate);
    lastThursday.setDate(fromDate.getDate() - daysToSubtract);
    return lastThursday;
}

// Retourne un tableau contenant la liste des dates des jeudis entre startDate et endDate
export function getThursdays() {
    const thursdays = [];
    const startDate = new Date(2024, 0, 1); // 1er janvier 2024
    const endDate = new Date(2025, 0, 1); // 1er janvier 2025
  
    while (startDate < endDate) {
      if (startDate.getDay() === 4) { // 4 correspond au jeudi (0 pour dimanche, 1 pour lundi, etc.)
        thursdays.push(formatDateToYYYYMMDD(new Date(startDate)));
      }
      startDate.setDate(startDate.getDate() + 1); // Passage à la journée suivante
    }
  
    return thursdays;
}

// Ajoute 7 jours à toutes les dates du tableau retourné par la fnction getThursdays()
export function getNextSevenDays(date) {
    const nextDays = [];
    for (let i = 1; i <= 7; i++) {
      const nextDay = new Date(date);
      nextDay.setDate(date.getDate() + i);
      nextDays.push(formatDateToYYYYMMDD(new Date(nextDay)));
    }
    return nextDays;
}

// Retourne la date passée en argument + 7 jours
/*export function getPlusSevenDay(date, nombre=6) {
    const plusSevenDay = new Date(date); 
    plusSevenDay.setDate(date.getDate() + nombre);
    return formatDateToYYYYMMDD(new Date(plusSevenDay));
}*/
export function getPlusSevenDay(date, nombre = 6) { 
  let parsedDate = new Date(date);
  if (isNaN(parsedDate)) {
      throw new TypeError("The provided value is not a valid Date string");
  }
  parsedDate.setDate(parsedDate.getDate() + nombre);
  return formatDateToYYYYMMDD(parsedDate);
}