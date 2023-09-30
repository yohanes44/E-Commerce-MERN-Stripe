import ErrorMessage from "../../configuration/ErrorMessages";

export default class JoException extends Error {

    private static language: string = "amh";

    private static allMessages: any = {
        auth0001: {
            eng: "user not found",
            amh: "መለያው አልተገኘም።"
        },
        auth0002: {
            eng: "old password does not match",
            amh: "የበፊት ይለፍ ቃል ትክክል አይደለም።"
        },
        db0001: {
            eng: "Unkown error! we are working on it.",
            amh: "የማይታወቅ ችግር ተፈጥሯል። በመፈታት ላይ ይገኛል።"
        }

    };

    constructor(exception_id: string) {
        super(JoException.allMessages[exception_id][JoException.language]);
    }
}