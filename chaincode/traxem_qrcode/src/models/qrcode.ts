export interface IQrcode {
    code: string;
    codeurl?: string;
    name?: string;
    description?: string;
    orgId?: string;
    factoryId?: string;
    productId?: string;
    historyDataId?: string[];
    mediaId?: string[];
    guaranteeId?: string;
    maintenanceId?: string;
    createdBy: string;
    updatedBy?: string;
    qrcodeRef?: string;
    createdTime?: Date;
    updatedTime?: Date;
}
