export class jQuingoHTTP {
    static POST(
        postData: jQuingoPostData
    ) {
        $.ajax({
            url: postData.url,
            type: "POST",
            dataType: postData.dataType,
            contentType: postData.contentType,
            data: JSON.stringify(postData.data) || {},
            success: postData.onSucces,
            error: postData.onError,
            headers: {
                Authorization: postData.token !== null ? "Bearer " + postData.token : "",
            },
        });
    }
}

export type jQuingoPostData = {
    url: string;
    dataType: string;
    contentType: string;
    data?: any;
    token?: string;
    onSucces?: (
        data: any,
        status: JQuery.Ajax.SuccessTextStatus,
        request: JQuery.jqXHR<any>
    ) => void;
    onError?: (
        error: JQuery.jqXHR<any>
    ) => void
};
