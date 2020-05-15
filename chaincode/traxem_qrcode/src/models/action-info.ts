// created by Duy Luong at 2020/05/12 17:01.
// - Blockchain Developer -
// Mail: duyluong1994@gmail.com
// Telegram: t.me/mr_eos94

import { DataType } from "../enums/data_type";
export interface IActionInfo {
    id?: string;
    dataContent: string;
    parseClassName: string;
    dataType?: DataType;
    createdTime?: Date;
}
