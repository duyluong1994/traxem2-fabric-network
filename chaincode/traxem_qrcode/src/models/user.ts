import { USER_STATUS } from "../enums/user_status";
import { ROLE } from "../enums/role";
import { BIZ_ROLE } from "../enums/biz_role";
export interface IUser {
    id?: string;
    avatarurl?: string;
    birthday?: Date;
    email?: string;
    email_verified: boolean;
    email_verified_token?: string;
    firstName?: string;
    lastName?: string;
    orgId?: string[];
    password?: string;
    phone?: string;
    position?: string;
    username: string;
    status: USER_STATUS;
    role?: ROLE[];
    biz_role?: BIZ_ROLE[];
    mediaId?: string[];
    createdTime?: Date;
    updatedTime?: Date;
}
