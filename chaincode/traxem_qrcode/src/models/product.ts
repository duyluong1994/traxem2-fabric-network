export interface IProduct {
    id?: string;
    imageUrl?: string;
    description?: string;
    name: string;
    country?: string;
    area?: string;
    quantity?: string;
    unit?: string;
    producer?: string;
    factoryName?: string;
    jobName?: string;
    ownerId?: string;
    producedDate: Date;
    expiredDate?: Date;
    createdTime?: Date;
    updatedTime?: Date;
}
