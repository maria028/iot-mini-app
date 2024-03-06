import { pwdEncrypType } from "@/config";
import { SM4Encrypt } from "./sm4";
export function pwdEncrypt(value: string) {
    if (value) {
        if (pwdEncrypType) {
            switch (pwdEncrypType) {
                case "SM4": {
                    return SM4Encrypt(value);
                }
            }
        } else {
            return SM4Encrypt(value);
        }
    }
}
