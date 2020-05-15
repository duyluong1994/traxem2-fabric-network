// created by Duy Luong at 2020/05/12 17:00.
// - Blockchain Developer -
// Mail: duyluong1994@gmail.com
// Telegram: t.me/mr_eos94

import { Context, Contract } from "fabric-contract-api";
import { IQrcode } from "../models/qrcode";

export class Qrcode extends Contract {
    constructor() {
        super("Qrcode");
    }
}
