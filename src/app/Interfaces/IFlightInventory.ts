export interface IFlightInventory {
    flightInventoryId :number,
    flightNumber :number,
    airlineID :number,
    fromPlace :string,
    toPlace :string,
    startDateTime :Date|null,
    endDateTime :Date|null,
    scheduleDays :string,
    instrumentUsed :string,
    bussinesSteatsCount :number,
    nonBussinesSeatCount :number,
    ticketCost : number;
    noofRows :number,
    mealType :string
}