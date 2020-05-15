// created by Duy Luong at 2020/05/12 17:01.
// - Blockchain Developer -
// Mail: duyluong1994@gmail.com
// Telegram: t.me/mr_eos94

export interface IContract {
    id?: string;
    description?: string;
    coverage: string;
    limit: string;
    effectiveDate: Date;
    expiredDate?: Date;
    mediaId?: string[];
    contact?: string[];
    phoneServices?: string;
    address?: string;
    createdBy: string;
    updatedBy?: string;
    createdTime?: Date;
    updatedTime?: Date;
}
