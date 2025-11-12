import { Prices } from "./prices";
import { Services } from "./services";

export class Cottage{
    idC = 0;
    name = "";
    location = "";
    owner = "";
    rating = 0.0;
    phone = "";
    x = 0.0;
    y = 0.0;
    pricelist: Prices[] = [
        { idP: 0,idC: 0, period: "Summer", price: 0, changed: false },
        { idP: 0,idC: 0, period: "Winter", price: 0, changed: false },
        { idP: 0, idC: 0, period: "Holiday", price: 0, changed: false }
    ];
    services: Services[] = [];
    gallery: string[] = [];
    editMode = false;
    serviceStr = ""
    toBan = false;
    baned = ""
    isBanned = false;
}