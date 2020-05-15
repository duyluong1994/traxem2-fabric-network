import { BIZ_ROLE } from "../enums/biz_role";
export interface IOrg {
    id?: string;
    address?: string;
    business_number?: string;
    code_prefix?: string;
    description?: string;
    email?: string;
    establishedDate?: Date;
    fax?: string;
    hotline?: string;
    logourl?: string;
    name: string;
    orgId?: string;
    phone?: string;
    representative_name?: string;
    representative_position?: string;
    short_name?: string;
    tax_number?: string;
    website?: string;
    biz_roles?: BIZ_ROLE[];
    mediaId?: string[];
    createdTime?: Date;
    updatedTime?: Date;
}
