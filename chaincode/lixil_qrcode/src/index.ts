/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Qrcode } from "./contracts/qrcode";
export { Qrcode } from "./contracts/qrcode";
import { Org } from "./contracts/org";
export { Org } from "./contracts/org";
import { User } from "./contracts/user";
export { User } from "./contracts/user";
import { Media } from "./contracts/media";
export { Media } from "./contracts/media";
import { Traxem } from "./contracts/traxem";
export { Traxem } from "./contracts/traxem";

export const contracts: any[] = [Qrcode, Org, User, Media, Traxem];
