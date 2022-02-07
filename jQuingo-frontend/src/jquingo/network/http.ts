export class jQuingoHTTP {
    static POST(
        url: string,
        dataType: string,
        data: Object = {},
        token: string | null = null,
        onSucces: (
            data: any,
            status: JQuery.Ajax.SuccessTextStatus,
            request: JQuery.jqXHR<any>
        ) => void = (
            data: any,
            status: JQuery.Ajax.SuccessTextStatus,
            request: JQuery.jqXHR<any>
        ) => {},
        onError: (error: JQuery.jqXHR<any>) => void = (
            error: JQuery.jqXHR<any>
        ) => {}
    ) {
        $.ajax({
            url: url,
            type: "POST",
            dataType: dataType,
            data: data || {},
            success: onSucces,
            error: onError,
            headers: {
                Authorization:
                    token !== null ? "Bearer " + token : "",
            },
        });
    }
}