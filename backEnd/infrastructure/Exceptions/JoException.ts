import ErrorMessage from "../../configuration/ErrorMessages";

export default class JoException extends Error {

    private static language: string = "eng";

    private static allMessages: any = {
        auth0001: {
            eng: "user not found",
            amh: "ተጠቃሚው አልተገኘም።"
        },
        auth0002: {
            eng: "old password does not match",
            amh: "የበፊት ይለፍ ቃል ትክክል አይደለም።"
        },
        auth0003: {
            eng: "password does not match",
            amh: "የይለፍ ቃል ትክክል አይደለም።"
        },
        db0001: {
            eng: "Unkown error! we are working on it.",
            amh: "የማይታወቅ ችግር ተፈጥሯል። በመፈታት ላይ ይገኛል።"
        },
        user0001: {
            eng: "Unknown userId",
            amh: "የማይታወቅ ተጠቃሚ መለያ አስገብተዋል"
        },
        user0002: {
            eng: "User already exist with same email address, please insert another",
            amh: "ተጠቃሚ ቀድሞውንም ተመሳሳይ የኢሜይል አድራሻ አለው፣ እባክዎ ሌላ ያስገቡ"
        },
        img0001: {
            eng: "Error saving image",
            amh: "ምስል ማስቀመጥ ላይ ስህተት ተፈጥሯል"
        },
        img0002: {
            eng: "Error reading the image file",
            amh: "የምስሉን ፋይል በማንበብ ላይ ስህተት ተፈጥሯል"
        },

    };

    constructor(exception_id: string) {
        super(JoException.allMessages[exception_id][JoException.language]);
    }

    public static changeLanguage(lang: string){
        JoException.language = lang;
    }


}